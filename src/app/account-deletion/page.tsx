"use client";
import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { policiesDict } from '@/i18n/policies';

export default function DeleteAccount() {
  const { lang } = useLanguage();
  const t = policiesDict[lang].accountDeletion;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 dark:text-slate-200">
      <h1 className="text-3xl font-bold mb-8 text-red-600">{t.title}</h1>
      <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 mb-8 text-red-700 dark:text-red-400">
        <p>{t.warning}</p>
      </div>

      <div className="space-y-6">
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h3 className="font-bold mb-2">{t.method1.h}</h3>
          <p>{t.method1.p}</p>
        </div>
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h3 className="font-bold mb-2">{t.method2.h}</h3>
          <p>{t.method2.p}</p>
        </div>
      </div>
    </div>
  );
}
