export const paymentConfig = {
  usdtTrc20Address: "TX6vMzSdkoQqznMbemgna3MfVEACMLuBQt",
  usdtTrcContractAdress: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  evmAdress: "0x5548a7c600D7D20cD94cd676643D8cee668a563C",
  ownerWhatsapp: "905364364898",
};

export interface ServiceDefinition {
  id: string;
  category: string;
  nameTr: string;
  nameEn: string;
  descriptionTr: string;
  descriptionEn: string;
  priceUsdt: number;
  depositPercent?: number;
}

export const services: ServiceDefinition[] = [
  {
    id: "landing-page",
    category: "WEB",
    nameTr: "Landing Page (Next.js)",
    nameEn: "Landing Page (Next.js)",
    descriptionTr:
      "Hiz ve donusum odakli, tek sayfalik kurumsal veya urun tanitim deneyimleri.",
    descriptionEn:
      "High-conversion single-page experiences built for speed and engagement.",
    priceUsdt: 100,
    depositPercent: 50,
  },
  {
    id: "fullstack-standart",
    category: "FULL-STACK",
    nameTr: "Full-Stack Standart Paket",
    nameEn: "Full-Stack Standart Package",
    descriptionTr:
      "Frontend + Backend + Database oluşan dört sayfalık kullanıcı arayüzü ve bunu yöneten admin paneli.",
    descriptionEn:
      "A four-page user interface comprising front-end, back-end and database components, and the admin panel that manages it.",
    priceUsdt: 400,
    depositPercent: 200,
  },
  {
    id: "fullstack-pro",
    category: "FULL-STACK",
    nameTr: "Full-Stack Pro Paket",
    nameEn: "Full-Stack Pro Package",
    descriptionTr:
      "Frontend + Backend + Database oluşan on sayfalık kullanıcı arayüzü ve bunu yöneten admin paneli.",
    descriptionEn:
      "A ten-page user interface comprising front-end, back-end and database components, and the admin panel that manages it.",
    priceUsdt: 1000,
    depositPercent: 500,
  },
  {
    id: "mobil-standart",
    category: "MOBİL",
    nameTr: "Mobil Uygulama Standart Paket",
    nameEn: "Mobile Application Standart Package",
    descriptionTr:
      "Frontend + Backend + Database oluşan dört ekranlık kullanıcı arayüzü ve bunu yöneten admin paneli.",
    descriptionEn:
      "A four-screens user interface comprising front-end, back-end and database components, and the admin panel that manages it.",
    priceUsdt: 400,
    depositPercent: 200,
  },
  {
    id: "mobil-pro",
    category: "MOBİL",
    nameTr: "Mobil Uygulama Pro Paket",
    nameEn: "Mobile Application Pro Package",
    descriptionTr:
      "Frontend + Backend + Database oluşan dört ekranlık kullanıcı arayüzü ve bunu yöneten admin paneli.",
    descriptionEn:
      "A four-screens user interface comprising front-end, back-end and database components, and the admin panel that manages it.",
    priceUsdt: 1000,
    depositPercent: 500,
  },
  {
    id: "consulting",
    category: "DANISMANLIK",
    nameTr: "Kod Inceleme & Danismanlik (saatlik)",
    nameEn: "Code Review & Consulting (hourly)",
    descriptionTr:
      "Mimari inceleme, performans analizi, kod kalitesi degerlendirmesi.",
    descriptionEn:
      "Architecture review, performance analysis, code quality assessment.",
    priceUsdt: 40,
  },
];
