export const policiesDict = {
  tr: {
    privacy: {
      title: "Gizlilik Politikasi",
      date: "Son Guncelleme: 28 Nisan 2026",
      sections: [
        {
          h: "1. Toplanan Veriler",
          p: "GeoWars, temel oyun mekaniklerini isletmek icin su verileri toplar:",
          li: ["Konum Bilgisi (GPS)", "Adim Verileri (Apple Saglik/Google Fit)", "Kimlik Bilgileri (E-posta ve Kullanici Adi)"]
        },
        {
          h: "2. Ucuncu Taraf Servisler",
          p: "Verileriniz su guvenli altyapilarda islenmektedir:",
          li: ["Supabase (Veritabani)", "OneSignal (Bildirimler)", "RevenueCat (Satin Alimlar)"]
        }
      ],
      contact: "Sorulariniz icin: destek@seninsiten.com"
    },
    accountDeletion: {
      title: "Hesap ve Veri Silme",
      warning: "Dikkat! Hesabinizi sildiginizde fethettiginiz tum bolgeler ve satin aldiginiz icerikler kalici olarak silinecektir.",
      method1: { h: "Yontem 1: Uygulama Icinden", p: "Profil - Ayarlar - Hesabimi Sil adimlarini takip edin." },
      method2: { h: "Yontem 2: Web Uzerinden", p: "destek@seninsiten.com adresine 'Hesabimin Silinmesini Istiyorum' konulu bir e-posta atin." }
    }
  },
  en: {
    privacy: {
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
    },
    accountDeletion: {
      title: "Account and Data Deletion",
      warning: "Warning! When you delete your account, all captured territories and purchased content will be permanently deleted.",
      method1: { h: "Method 1: In-App", p: "Follow: Profile - Settings - Delete My Account." },
      method2: { h: "Method 2: Via Web", p: "Send an email to support@seninsiten.com with the subject 'I Want My Account Deleted'." }
    }
  }
};
