"use client";
import React, { useState } from 'react';

const content = {
  tr: {
    title: "Hesap ve Veri Silme",
    warning: "Dikkat! Hesabınızı sildiğinizde fethettiğiniz tüm bölgeler ve satın aldığınız içerikler kalıcı olarak silinecektir.",
    method1: { h: "Yöntem 1: Uygulama İçinden", p: "Profil - Ayarlar - Hesabımı Sil adımlarını takip edin." },
    method2: { h: "Yöntem 2: Web Üzerinden", p: "destek@seninsiten.com adresine 'Hesabımın Silinmesini İstiyorum' konulu bir e-posta atın." }
  },
  en: {
    title: "Account and Data Deletion",
    warning: "Warning! When you delete your account, all captured territories and purchased content will be permanently deleted.",
    method1: { h: "Method 1: In-App", p: "Follow: Profile - Settings - Delete My Account." },
    method2: { h: "Method 2: Via Web", p: "Send an email to support@seninsiten.com with the subject 'I Want My Account Deleted'." }
  }
};

export default function DeleteAccount() {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const t = content[lang];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 dark:text-slate-200">
      <div className="flex justify-end mb-4">
        <button onClick={() => setLang('tr')} className="px-3 py-1">TR</button>
        <button onClick={() => setLang('en')} className="px-3 py-1">EN</button>
      </div>

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