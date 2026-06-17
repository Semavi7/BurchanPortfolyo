"use client";

import { LanguageProvider } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/settings";

export function Providers({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Language;
}) {
  return (
    <LanguageProvider initialLang={initialLang}>
      {children}
    </LanguageProvider>
  );
}
