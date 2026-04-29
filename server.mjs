import http from "node:http";
import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

import serverBuild from "./dist/server/index.js";

const host = process.env.HOST ?? "0.0.0.0";
const port = Number.parseInt(process.env.PORT ?? "3000", 10);

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const clientDir = path.join(currentDir, "dist", "client");

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".txt", "text/plain; charset=utf-8"],
]);

function getContentType(filePath) {
  return contentTypes.get(path.extname(filePath).toLowerCase()) ?? "application/octet-stream";
}

function getStaticFilePath(pathname) {
  const relativePath = pathname.replace(/^\/+/, "");
  if (!relativePath) {
    return null;
  }

  const resolvedPath = path.resolve(clientDir, relativePath);
  if (resolvedPath !== clientDir && !resolvedPath.startsWith(`${clientDir}${path.sep}`)) {
    return null;
  }

  return resolvedPath;
}

async function serveStaticFile(pathname, req, res) {
  const filePath = getStaticFilePath(pathname);
  if (!filePath) {
    return false;
  }

  try {
    await access(filePath);
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) {
      return false;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", getContentType(filePath));
    res.setHeader("Content-Length", fileStats.size);

    if (pathname.startsWith("/assets/")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }

    if (req.method === "HEAD") {
      res.end();
      return true;
    }

    createReadStream(filePath).pipe(res);
    return true;
  } catch {
    return false;
  }
}

function toWebRequest(req) {
  const origin = `http://${req.headers.host ?? `localhost:${port}`}`;
  const url = new URL(req.url ?? "/", origin);
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }
      continue;
    }

    if (value != null) {
      headers.set(key, value);
    }
  }

  if (req.method === "GET" || req.method === "HEAD") {
    return new Request(url, {
      headers,
      method: req.method,
    });
  }

  return new Request(url, {
    body: Readable.toWeb(req),
    duplex: "half",
    headers,
    method: req.method,
  });
}

async function sendWebResponse(webResponse, req, res) {
  res.statusCode = webResponse.status;

  webResponse.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  if (!webResponse.body) {
    res.end();
    return;
  }

  Readable.fromWeb(webResponse.body).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host ?? `localhost:${port}`}`);

    if (url.pathname === "/__health") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    if (await serveStaticFile(url.pathname, req, res)) {
      return;
    }

    const webRequest = toWebRequest(req);
    const webResponse = await serverBuild.fetch(webRequest);
    await sendWebResponse(webResponse, req, res);
  } catch (error) {
    console.error("Failed to handle request", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
