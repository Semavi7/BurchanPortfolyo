"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { Language } from "./settings";
import { defaultLanguage } from "./settings";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (tr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
  initialLang = defaultLanguage,
}: {
  children: React.ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLangState] = useState<Language>(initialLang);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const t = useCallback(
    (tr: string, en: string) => (lang === "tr" ? tr : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
