import { useTranslation } from "react-i18next";

import { type MaybeLocalizedText, pickLocalized, resolveLocale } from "@/content/site-content";

export function useSiteLocale() {
  const { i18n, t } = useTranslation();
  const locale = resolveLocale(i18n.resolvedLanguage);

  return {
    i18n,
    locale,
    t,
    pick: (value: MaybeLocalizedText) => pickLocalized(locale, value),
  };
}
