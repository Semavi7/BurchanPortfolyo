"use client";
import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { policiesDict } from '@/i18n/policies';

export default function PrivacyPolicy() {
  const { lang } = useLanguage();
  const t = policiesDict[lang].privacy;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 dark:text-slate-200">
      <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
      <p className="mb-4 text-sm opacity-70">{t.date}</p>

      {t.sections.map((s, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">{s.h}</h2>
          <p className="mb-2">{s.p}</p>
          <ul className="list-disc ml-6 space-y-2">
            {s.li.map((item, j) => <li key={j}>{item}</li>)}
          </ul>
        </section>
      ))}
      <footer className="mt-12 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
        <strong>{t.contact}</strong>
      </footer>
    </div>
  );
}
