"use client";

import { createContext, useContext, type ReactNode } from "react";
import { translations, type Translations } from "@/lib/i18n";

interface LanguageContextValue {
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ t: translations.en as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
