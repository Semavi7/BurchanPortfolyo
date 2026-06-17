export const personalDataTr = {
    name: "Mehmet Burchan Gurses",
    title: "Software Developer",
    summary: "C#, ASP.NET Core, JavaScript, Node.js, Golang ve NestJS teknolojilerinde uzmanlasmaya odaklanmis bir yazilim gelistiricisiyim. Analitik dusunme becerim ve muhasebe gecmisim sayesinde finansal surecler ve veri odakli uygulamalarda etkili cozumler uretebiliyorum. Kullanici deneyimini iyilestirme odakli, teknolojiye tutkulu ve surekli gelisen bir yazilimci olarak modern yazilim projelerinde yer almaya hazirim.",
    contact: {
        email: "semavi1151@gmail.com",
        phone: "+905364364898",
        location: "Cınar Mah. Guc.. Sok. No:2 Daire:3",
        linkedin: "mehmet-Burchan-gurses-524658340",
        github: "Semavi7"
    },
    experience: [
        {
            company: "FreeLancer",
            role: "Flutter Developer",
            period: "2025-09 - 2025-11",
            description: "Mobil uygulama gelistirme sureclerinde Flutter kullanilarak cesitli projeler uretildi."
        },
        {
            company: "Derya Emlak Who Estate",
            role: "Software Developer",
            period: "2023-03 - 2025-09",
            description: "Yazilim gelistirme sureclerinde tam zamanli gorev alindi."
        },
        {
            company: "Simirna Nora Gida San. ve Tic. Ltd. Sti.",
            role: "On Muhasebe",
            period: "2019-09 - 2020-04",
            description: "Finansal kayitlarin tutulmasi ve muhasebe sureclerinin yonetimi."
        },
        {
            company: "Murtaza Yildiz Muhasebe Ofisi",
            role: "Muhasebe Stajyeri",
            period: "2017-11 - 2019-04",
            description: "Muhasebe departmaninda stajyerlik sureci."
        }
    ],
    education: [
        {
            school: "Anadolu Universitesi Acikogretim Fakultesi",
            degree: "BILGISAYAR PROGRAMCILIGI (On Lisans)",
            period: "10/2025 - Gunumuz"
        },
        {
            school: "Anadolu Universitesi Acikogretim Sistemi",
            degree: "Isletme ve Yonetim (Lisans)",
            period: "2009-09 - 2013-09"
        },
        {
            school: "Maltepe Musiki Egitim Vakfi",
            degree: "Ney - Muzik Egitimi",
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
        accounting: ["Luca", "Parasut", "On Muhasebe", "Tek Duzen Hesap Plani"],
        languages: [
            { name: "Turkce", level: "Anadil", stars: 5 },
            { name: "Ingilizce", level: "Orta", stars: 2 }
        ]
    },
    projects: [
        {
            title: "Derya Emlak Who Estate ",
            period: "08/2025 - 09/2025",
            description: "Next.js/NestJS ile sunucusuz emlak platformudur. SEO, PWA ve anlik bildirim destegi icerir. Guvenli ve olceklenebilir bir mimaridir.",
            techStack: ["Next.js", "NestJS", "TypeScript", "MongoDB", "TypeORM", "Tailwind CSS", "Redux Toolkit", "Docker", "Google Cloud Run"],
            details: "Frontend'de Next.js, backend'de NestJS ile guclendirilen proje, Google Cloud uzerinde sunucusuz (serverless) calisarak olceklenebilirlik, maliyet verimliligi ve yuksek performans saglar.",
            repository: "https://github.com/Semavi7/who_estate_frontend"
        },
        {
            title: "MultiShop Mikroservis E-Ticaret",
            period: "04/2025 - 06/2025",
            description: ".NET tabanli, sifirdan gelistirilmis modern bir mikroservis e-ticaret platformudur. 12 adet bagimsiz servis icerir.",
            techStack: ["Docker", "Redis", "RabbitMQ", "MongoDB", "PostgreSQL", "Ocelot API Gateway", "Identity Server", "ASP.NET Core"],
            details: "API Gateway, Identity Server, JWT, CQRS, Mediator ve Containerization teknikleri kullanildi.",
            repository: "https://github.com/Semavi7/MultiShop"
        },
        {
            title: "CarBook Arac Kiralama",
            period: "02/2025 - 04/2025",
            description: "ASP.NET Core 8.0 ve Onion Architecture ile gelistirilmis kapsamli bir arac kiralama uygulamasidir.",
            techStack: ["ASP.NET Core 8.0", "Onion Architecture", "CQRS", "Mediator", "SignalR", "JWT"],
            details: "Katmanli mimari, gercek zamanli bildirimler ve modern yetkilendirme yapilari uygulandi.",
            repository: "https://github.com/Semavi7/CarBook"
        },
        {
            title: "Angular Modern E-Ticaret",
            period: "06/2025 - 07/2025",
            description: "Angular ve Nx Monorepo kullanilarak sifirdan gelistirilmis, yuksek performansli ve moduler bir e-ticaret frontend platformudur.",
            techStack: ["Angular", "Signals", "Nx Monorepo", "RxJS", "TypeScript"],
            details: "Signals yapisi, lazy loading ve standalone components mimarisi kullanildi.",
            repository: "https://github.com/Semavi7/Angular-Bitirme-Projesi"
        },
        {
            title: "Online Ticari Otomasyon",
            period: "01/2025 - 02/2025",
            description: "ASP.NET MVC 5 ve .NET Framework ile dinamik bir magaza yonetim sistemi.",
            techStack: ["ASP.NET MVC 5", "Entity Framework", "MSSQL", "LINQ"],
            details: "Admin paneli, musteri paneli ve vitrin paneli olmak uzere uc ana bolumden olusur.",
            repository: "https://github.com/Semavi7/OnlineTicariOtomasyon"
        },
        {
            title: "MyPortfolio",
            period: "01/2025 - 01/2025",
            description: "ASP.NET Core ile gelistirilmis, yonetim paneli bulunan dinamik ve modern bir portfolyo uygulamasidir.",
            techStack: ["ASP.NET Core", "MSSQL", "Entity Framework Core", "Bootstrap", "JavaScript"],
            details: "Code First, Migration ve View Component yapilari kullanilarak dinamik icerik yonetimi ve estetik bir frontend saglandi.",
            repository: "https://github.com/Semavi7/MyPortfolio"
        }
    ],
    certifications: [
        { title: "Uygulama Gelistirerek C# Ogrenin", issuer: "Udemy", date: "Ocak 2025" },
        { title: "Asp.Net MVC5 ile Online Ticari Otomasyon", issuer: "Udemy", date: "Subat 2025" },
        { title: "Asp.Net Core Api 8.0 Onion Architecture", issuer: "Udemy", date: "Nisan 2025" },
        { title: "Sifirdan Ileri Seviye React Kursu", issuer: "Udemy", date: "Mayis 2025" },
        { title: "Angular: Baslangictan Uzmanliga", issuer: "Udemy", date: "Haziran 2025" },
        { title: "Uctan Uca NodeJS", issuer: "Udemy", date: "Temmuz 2025" },
        { title: "Veri Bilimi ve Makine Ogrenmesi", issuer: "Udemy", date: "Ekim 2025" },
        { title: "C# (Basic)", issuer: "HackerRank", date: "Nisan 2025" },
        { title: "Asp.Net Core MultiShop Mikroservis E-Ticaret Kursu", issuer: "Udemy", date: "Haziran 2025" },
        { title: "Vue 3 - Uygulamali Vue Js Egitimi", issuer: "Udemy", date: "Temmuz 2025" },
        { title: "Bastan Sona NestJS", issuer: "Udemy", date: "Temmuz 2025" },
        { title: "Etik Hacker Olmak: Mobil Uygulamalar ve Telefonlar", issuer: "Udemy", date: "Kasim 2025" },
    ]
}

export const personalDataEn = {
    name: "Mehmet Burchan Gurses",
    title: "Software Developer",
    summary: "I am a software developer focused on mastering C#, ASP.NET Core, JavaScript, Node.js, Golang, and NestJS technologies. With my analytical thinking skills and accounting background, I excel at producing effective solutions for financial processes and data-driven applications. I am passionate about improving user experience and continuously evolving as a developer, ready to contribute to modern software projects.",
    contact: {
        email: "semavi1151@gmail.com",
        phone: "+905364364898",
        location: "Cınar Mah. Guc.. Sok. No:2 Daire:3",
        linkedin: "mehmet-Burchan-gurses-524658340",
        github: "Semavi7"
    },
    experience: [
        {
            company: "FreeLancer",
            role: "Flutter Developer",
            period: "2025-09 - 2025-11",
            description: "Developed various mobile application projects using Flutter."
        },
        {
            company: "Derya Emlak Who Estate",
            role: "Software Developer",
            period: "2023-03 - 2025-09",
            description: "Full-time role in software development processes."
        },
        {
            company: "Simirna Nora Gida San. ve Tic. Ltd. Sti.",
            role: "Pre-Accounting Clerk",
            period: "2019-09 - 2020-04",
            description: "Maintained financial records and managed accounting processes."
        },
        {
            company: "Murtaza Yildiz Accounting Office",
            role: "Accounting Intern",
            period: "2017-11 - 2019-04",
            description: "Internship period in the accounting department."
        }
    ],
    education: [
        {
            school: "Anadolu University Open Education Faculty",
            degree: "COMPUTER PROGRAMMING (Associate Degree)",
            period: "10/2025 - Present"
        },
        {
            school: "Anadolu University Open Education System",
            degree: "Business and Management (Bachelor's)",
            period: "2009-09 - 2013-09"
        },
        {
            school: "Maltepe Music Education Foundation",
            degree: "Ney - Music Education",
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
        accounting: ["Luca", "Parasut", "Pre-Accounting", "Uniform Chart of Accounts"],
        languages: [
            { name: "Turkish", level: "Native", stars: 5 },
            { name: "English", level: "Intermediate", stars: 2 }
        ]
    },
    projects: [
        {
            title: "Derya Emlak Who Estate ",
            period: "08/2025 - 09/2025",
            description: "A serverless real estate platform built with Next.js/NestJS. Includes SEO, PWA, and instant notification support. Secure and scalable architecture.",
            techStack: ["Next.js", "NestJS", "TypeScript", "MongoDB", "TypeORM", "Tailwind CSS", "Redux Toolkit", "Docker", "Google Cloud Run"],
            details: "The project, powered by Next.js on the frontend and NestJS on the backend, runs serverless on Google Cloud, ensuring scalability, cost efficiency, and high performance.",
            repository: "https://github.com/Semavi7/who_estate_frontend"
        },
        {
            title: "MultiShop Microservice E-Commerce",
            period: "04/2025 - 06/2025",
            description: "A modern .NET-based microservice e-commerce platform built from scratch. Contains 12 independent services.",
            techStack: ["Docker", "Redis", "RabbitMQ", "MongoDB", "PostgreSQL", "Ocelot API Gateway", "Identity Server", "ASP.NET Core"],
            details: "API Gateway, Identity Server, JWT, CQRS, Mediator, and Containerization techniques were applied.",
            repository: "https://github.com/Semavi7/MultiShop"
        },
        {
            title: "CarBook Car Rental",
            period: "02/2025 - 04/2025",
            description: "A comprehensive car rental application developed with ASP.NET Core 8.0 and Onion Architecture.",
            techStack: ["ASP.NET Core 8.0", "Onion Architecture", "CQRS", "Mediator", "SignalR", "JWT"],
            details: "Layered architecture, real-time notifications, and modern authorization structures were implemented.",
            repository: "https://github.com/Semavi7/CarBook"
        },
        {
            title: "Angular Modern E-Commerce",
            period: "06/2025 - 07/2025",
            description: "A high-performance, modular e-commerce frontend platform built from scratch using Angular and Nx Monorepo.",
            techStack: ["Angular", "Signals", "Nx Monorepo", "RxJS", "TypeScript"],
            details: "Signals architecture, lazy loading, and standalone components architecture were used.",
            repository: "https://github.com/Semavi7/Angular-Bitirme-Projesi"
        },
        {
            title: "Online Commercial Automation",
            period: "01/2025 - 02/2025",
            description: "A dynamic store management system with ASP.NET MVC 5 and .NET Framework.",
            techStack: ["ASP.NET MVC 5", "Entity Framework", "MSSQL", "LINQ"],
            details: "Consists of three main sections: admin panel, customer panel, and storefront panel.",
            repository: "https://github.com/Semavi7/OnlineTicariOtomasyon"
        },
        {
            title: "MyPortfolio",
            period: "01/2025 - 01/2025",
            description: "A dynamic and modern portfolio application with an admin panel, developed with ASP.NET Core.",
            techStack: ["ASP.NET Core", "MSSQL", "Entity Framework Core", "Bootstrap", "JavaScript"],
            details: "Dynamic content management and an aesthetic frontend were provided using Code First, Migration, and View Component structures.",
            repository: "https://github.com/Semavi7/MyPortfolio"
        }
    ],
    certifications: [
        { title: "Learn C# by Building Applications", issuer: "Udemy", date: "January 2025" },
        { title: "Online Commercial Automation with ASP.NET MVC5", issuer: "Udemy", date: "February 2025" },
        { title: "ASP.NET Core API 8.0 Onion Architecture", issuer: "Udemy", date: "April 2025" },
        { title: "Complete React Course: From Zero to Advanced", issuer: "Udemy", date: "May 2025" },
        { title: "Angular: From Beginner to Expert", issuer: "Udemy", date: "June 2025" },
        { title: "End-to-End NodeJS", issuer: "Udemy", date: "July 2025" },
        { title: "Data Science and Machine Learning", issuer: "Udemy", date: "October 2025" },
        { title: "C# (Basic)", issuer: "HackerRank", date: "April 2025" },
        { title: "ASP.NET Core MultiShop Microservice E-Commerce Course", issuer: "Udemy", date: "June 2025" },
        { title: "Vue 3 - Hands-On Vue.js Training", issuer: "Udemy", date: "July 2025" },
        { title: "Complete NestJS from Start to Finish", issuer: "Udemy", date: "July 2025" },
        { title: "Becoming an Ethical Hacker: Mobile Apps & Phones", issuer: "Udemy", date: "November 2025" },
    ]
}
