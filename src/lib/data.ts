export const personalData = {
    name: "Mehmet Burçhan Gürses",
    title: "Software Developer",
    summary: "C#, ASP.NET Core, JavaScript, Node.js, Golang ve NestJS teknolojilerinde uzmanlaşmaya odaklanmış bir yazılım geliştiricisiyim. Analitik düşünme becerim ve muhasebe geçmişim sayesinde finansal süreçler ve veri odaklı uygulamalarda etkili çözümler üretebiliyorum. Kullanıcı deneyimini iyileştirme odaklı, teknolojiye tutkulu ve sürekli gelişen bir yazılımcı olarak modern yazılım projelerinde yer almaya hazırım.",
    contact: {
        email: "semavi1151@gmail.com",
        phone: "+905364364898",
        location: "Çınar Mah. Güç Sok. No:2 Daire:3",
        linkedin: "mehmet-burçhan-gürses-524658340",
        github: "Semavi7"
    },
    experience: [
        {
            company: "FreeLancer",
            role: "Flutter Developer",
            period: "2025-09 - 2025-11",
            description: "Mobil uygulama geliştirme süreçlerinde Flutter kullanılarak çeşitli projeler üretildi."
        },
        {
            company: "Derya Emlak Who Estate",
            role: "Software Developer",
            period: "2023-03 - 2025-09",
            description: "Yazılım geliştirme süreçlerinde tam zamanlı görev alındı."
        },
        {
            company: "Simirna Nora Gıda San. ve Tic. Ltd. Şti.",
            role: "Ön Muhasebe",
            period: "2019-09 - 2020-04",
            description: "Finansal kayıtların tutulması ve muhasebe süreçlerinin yönetimi."
        },
        {
            company: "Murtaza Yıldız Muhasebe Ofisi",
            role: "Muhasebe Stajyeri",
            period: "2017-11 - 2019-04",
            description: "Muhasebe departmanında stajyerlik süreci."
        }
    ],
    education: [
        {
            school: "Anadolu Üniversitesi Açıköğretim Fakültesi",
            degree: "BİLGİSAYAR PROGRAMCILIĞI (Ön Lisans)",
            period: "10/2025 - Günümüz"
        },
        {
            school: "Anadolu Üniversitesi Açıköğretim Sistemi",
            degree: "İşletme ve Yönetim (Lisans)",
            period: "2009-09 - 2013-09"
        },
        {
            school: "Maltepe Musiki Eğitim Vakfı",
            degree: "Ney - Müzik Eğitimi",
            period: "2005-11 - 2013-09"
        }
    ],
    skills: {
        software: [
            "C#", "ASP.NET Core 8.0", "Entity Framework Core", "Onion Architecture", "Repository Pattern",
            "Mediator Pattern", "CQRS", "JWT", "SignalR", "Swagger", "Postman", "Fluent Validation",
            "LINQ", "React", "Redux Toolkit", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Bun.js",
            "Express", "NestJS", "MongoDB", "PostgreSQL", "MSSQL", "Docker", "Redis", "Microservices", "Golang", "Python", "FastApi", "Machine Learning", "Data Science", "Deep Learning"
        ],
        accounting: ["Luca", "Paraşüt", "Ön Muhasebe", "Tek Düzen Hesap Planı"],
        languages: [
            { name: "Türkçe", level: "Anadil", stars: 5 },
            { name: "İngilizce", level: "Orta", stars: 2 }
        ]
    },
    projects: [
        {
            title: "Derya Emlak Who Estate ",
            period: "08/2025 - 09/2025",
            description: "Next.js/NestJS ile sunucusuz emlak platformudur. SEO, PWA ve anlık bildirim desteği içerir. Güvenli ve ölçeklenebilir bir mimaridir.",
            techStack: ["Next.js", "NestJS", "TypeScript", "MongoDB", "TypeORM", "Tailwind CSS", "Redux Toolkit", "Docker", "Google Cloud Run"],
            details: "Frontend'de Next.js, backend'de NestJS ile güçlendirilen proje, Google Cloud üzerinde sunucusuz (serverless) çalışarak ölçeklenebilirlik, maliyet verimliliği ve yüksek performans sağlar.",
            repository: "https://github.com/Semavi7/who_estate_frontend"
        },
        {
            title: "MultiShop Mikroservis E-Ticaret",
            period: "04/2025 - 06/2025",
            description: ".NET tabanlı, sıfırdan geliştirilmiş modern bir mikroservis e-ticaret platformudur. 12 adet bağımsız servis içerir.",
            techStack: ["Docker", "Redis", "RabbitMQ", "MongoDB", "PostgreSQL", "Ocelot API Gateway", "Identity Server", "ASP.NET Core"],
            details: "API Gateway, Identity Server, JWT, CQRS, Mediator ve Containerization teknikleri kullanıldı.",
            repository: "https://github.com/Semavi7/MultiShop"
        },
        {
            title: "CarBook Araç Kiralama",
            period: "02/2025 - 04/2025",
            description: "ASP.NET Core 8.0 ve Onion Architecture ile geliştirilmiş kapsamlı bir araç kiralama uygulamasıdır.",
            techStack: ["ASP.NET Core 8.0", "Onion Architecture", "CQRS", "Mediator", "SignalR", "JWT"],
            details: "Katmanlı mimari, gerçek zamanlı bildirimler ve modern yetkilendirme yapıları uygulandı.",
            repository: "https://github.com/Semavi7/CarBook"
        },
        {
            title: "Angular Modern E-Ticaret",
            period: "06/2025 - 07/2025",
            description: "Angular ve Nx Monorepo kullanılarak sıfırdan geliştirilmiş, yüksek performanslı ve modüler bir e-ticaret frontend platformudur.",
            techStack: ["Angular", "Signals", "Nx Monorepo", "RxJS", "TypeScript"],
            details: "Signals yapısı, lazy loading ve standalone components mimarisi kullanıldı.",
            repository: "https://github.com/Semavi7/Angular-Bitirme-Projesi"
        },
        {
            title: "Online Ticari Otomasyon",
            period: "01/2025 - 02/2025",
            description: "ASP.NET MVC 5 ve .NET Framework ile dinamik bir mağaza yönetim sistemi.",
            techStack: ["ASP.NET MVC 5", "Entity Framework", "MSSQL", "LINQ"],
            details: "Admin paneli, müşteri paneli ve vitrin paneli olmak üzere üç ana bölümden oluşur.",
            repository: "https://github.com/Semavi7/OnlineTicariOtomasyon"
        },
        {
            title: "MyPortfolio",
            period: "01/2025 - 01/2025",
            description: "ASP.NET Core ile geliştirilmiş, yönetim paneli bulunan dinamik ve modern bir portfolyo uygulamasıdır.",
            techStack: ["ASP.NET Core", "MSSQL", "Entity Framework Core", "Bootstrap", "JavaScript"],
            details: "Code First, Migration ve View Component yapıları kullanılarak dinamik içerik yönetimi ve estetik bir frontend sağlandı.",
            repository: "https://github.com/Semavi7/MyPortfolio"
        }
    ],
    certifications: [
        { title: "Uygulama Geliştirerek C# Öğrenin", issuer: "Udemy", date: "Ocak 2025" },
        { title: "Asp.Net MVC5 ile Online Ticari Otomasyon", issuer: "Udemy", date: "Şubat 2025" },
        { title: "Asp.Net Core Api 8.0 Onion Architecture", issuer: "Udemy", date: "Nisan 2025" },
        { title: "Sıfırdan İleri Seviye React Kursu", issuer: "Udemy", date: "Mayıs 2025" },
        { title: "Angular: Başlangıçtan Uzmanlığa", issuer: "Udemy", date: "Haziran 2025" },
        { title: "Uçtan Uca NodeJS", issuer: "Udemy", date: "Temmuz 2025" },
        { title: "Veri Bilimi ve Makine Öğrenmesi", issuer: "Udemy", date: "Ekim 2025" },
        { title: "C# (Basic)", issuer: "HackerRank", date: "Nisan 2025" },
        { title: "Asp.Net Core MultiShop Mikroservis E-Ticaret Kursu", issuer: "Udemy", date: "Haziran 2025" },
        { title: "Vue 3 - Uygulamalı Vue Js Eğitimi", issuer: "Udemy", date: "Temmuz 2025" },
        { title: "Baştan Sona NestJS", issuer: "Udemy", date: "Temmuz 2025" },
        { title: "Etik Hacker Olmak: Mobil Uygulamalar ve Telefonlar", issuer: "Udemy", date: "Kasım 2025" },
    ]
}
