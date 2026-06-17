"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "tr" ? "en" : "tr")}
      className="font-mono text-xs tracking-wider uppercase border border-border
                 px-2 py-0.5 hover:border-primary hover:text-primary
                 transition-colors cursor-pointer bg-transparent"
      aria-label={lang === "tr" ? "Switch to English" : "Turkce'ye gec"}
      title={lang === "tr" ? "Switch to English" : "Turkce'ye gec"}
    >
      {lang === "tr" ? "EN" : "TR"}
    </button>
  );
}
