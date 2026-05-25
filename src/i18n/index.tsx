import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AppState } from "react-native";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { om } from "@/i18n/locales/om";
import { ti } from "@/i18n/locales/ti";

const translations = {
  en,
  am,
  om,
  ti,
};

export const supportedLocales = ["en", "am", "om", "ti"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

type TranslateOptions = Record<string, unknown>;

type I18nContextValue = {
  locale: SupportedLocale;
  selectedLocale: SupportedLocale | null;
  setLocale: (locale: SupportedLocale | null) => void;
  supportedLocales: readonly SupportedLocale[];
  t: (scope: string, options?: TranslateOptions) => string;
};

const i18n = new I18n(translations);
i18n.enableFallback = true;
i18n.defaultLocale = "en";

const localeMap: Record<string, SupportedLocale> = {
  en: "en",
  am: "am",
  om: "om",
  ti: "ti",
};

function normalizeLocale(locale?: string | null): SupportedLocale {
  if (!locale) {
    return "en";
  }

  const normalized = locale.toLowerCase();

  if (normalized in localeMap) {
    return localeMap[normalized];
  }

  const baseLocale = normalized.split(/[-_]/)[0];

  if (baseLocale in localeMap) {
    return localeMap[baseLocale];
  }

  return "en";
}

function getDeviceLocale(): SupportedLocale {
  const locale = getLocales()[0];
  return normalizeLocale(locale?.languageTag ?? locale?.languageCode ?? null);
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [selectedLocale, setSelectedLocale] = useState<SupportedLocale | null>(
    null,
  );
  const [deviceLocale, setDeviceLocale] =
    useState<SupportedLocale>(getDeviceLocale);

  const effectiveLocale = selectedLocale ?? deviceLocale;

  useEffect(() => {
    i18n.locale = effectiveLocale;
  }, [effectiveLocale]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state !== "active") {
        return;
      }

      setDeviceLocale(getDeviceLocale());
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const translate = useCallback(
    (scope: string, options?: TranslateOptions) => {
      return i18n.t(scope, { locale: effectiveLocale, ...options }) as string;
    },
    [effectiveLocale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale: effectiveLocale,
      selectedLocale,
      setLocale: setSelectedLocale,
      supportedLocales,
      t: translate,
    }),
    [effectiveLocale, selectedLocale, translate],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
