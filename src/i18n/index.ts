import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en";
import vi from "./locales/vi";
import ja from "./locales/ja";

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", short: "EN" },
  { code: "vi", label: "Vietnamese", short: "VI" },
  { code: "ja", label: "Japanese", short: "JA" },
] as const;

export type LangCode = (typeof SUPPORTED_LANGS)[number]["code"];

if (!i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        vi: { translation: vi },
        ja: { translation: ja },
      },
      fallbackLng: "en",
      supportedLngs: ["en", "vi", "ja"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "vjss.lang",
      },
    });
}

export default i18n;
