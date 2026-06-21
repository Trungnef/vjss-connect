import { access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import serverBuild from "../dist/server/index.js";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const projectRoot = path.resolve(currentDir, "..");
const clientDir = path.join(projectRoot, "dist", "client");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function ensureAssetExists(assetPath) {
  const relativePath = assetPath.replace(/^\/+/, "");
  const filePath = path.resolve(clientDir, relativePath);
  await access(filePath);
}

async function checkRoute(url) {
  const response = await serverBuild.fetch(new Request(url));
  const html = await response.text();

  assert(response.status === 200, `Expected 200 for ${url}, got ${response.status}`);
  assert(
    response.headers.get("content-type")?.includes("text/html"),
    `Expected HTML response for ${url}`
  );
  assert(html.includes("<!DOCTYPE html>"), `Expected document markup for ${url}`);

  const assetPaths = [...html.matchAll(/"(\/assets\/[^"]+)"/g)].map((match) => match[1]);
  assert(assetPaths.length > 0, `Expected at least one asset reference in ${url}`);

  await Promise.all(assetPaths.slice(0, 10).map((assetPath) => ensureAssetExists(assetPath)));
}

await checkRoute("http://localhost/");
await checkRoute("http://localhost/about");

console.log("Smoke check passed.");
