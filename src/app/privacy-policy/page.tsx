"use client";
import React, { useState } from 'react';

const content = {
  tr: {
    title: "Gizlilik Politikası",
    date: "Son Güncelleme: 28 Nisan 2026",
    sections: [
      {
        h: "1. Toplanan Veriler",
        p: "GeoWars, temel oyun mekaniklerini işletmek için şu verileri toplar:",
        li: ["Konum Bilgisi (GPS)", "Adım Verileri (Apple Sağlık/Google Fit)", "Kimlik Bilgileri (E-posta ve Kullanıcı Adı)"]
      },
      {
        h: "2. Üçüncü Taraf Servisler",
        p: "Verileriniz şu güvenli altyapılarda işlenmektedir:",
        li: ["Supabase (Veritabanı)", "OneSignal (Bildirimler)", "RevenueCat (Satın Alımlar)"]
      }
    ],
    contact: "Sorularınız için: destek@seninsiten.com"
  },
  en: {
    title: "Privacy Policy",
    date: "Last Updated: April 28, 2026",
    sections: [
      {
        h: "1. Data Collection",
        p: "GeoWars collects the following data to operate core game mechanics:",
        li: ["Location Information (GPS)", "Step Data (Apple Health/Google Fit)", "Identity Information (Email and Username)"]
      },
      {
        h: "2. Third Party Services",
        p: "Your data is processed in these secure infrastructures:",
        li: ["Supabase (Database)", "OneSignal (Notifications)", "RevenueCat (Purchases)"]
      }
    ],
    contact: "For questions: support@seninsiten.com"
  }
};

export default function PrivacyPolicy() {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const t = content[lang];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 dark:text-slate-200">
      <div className="flex justify-end mb-4">
        <button onClick={() => setLang('tr')} className={`px-3 py-1 ${lang === 'tr' ? 'font-bold underline' : ''}`}>TR</button>
        <span className="mx-2">|</span>
        <button onClick={() => setLang('en')} className={`px-3 py-1 ${lang === 'en' ? 'font-bold underline' : ''}`}>EN</button>
      </div>

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