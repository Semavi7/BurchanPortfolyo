// ── Tab labels ──
// ── Strings that embed inline JSX <strong> are split into parts (see page.tsx) ──

export const algoDict = {
  tr: {
    // ── Tab Navigation ──
    tabIntro: "Giriş",
    tabComplexity: "Karmaşıklık (Big O)",
    tabStructures: "Veri Yapıları",
    tabAlgorithms: "Algoritmalar",
    tabReview: "Özet & Sorular",

    // ── Intro Section ──
    introHeading: "Algoritma ve Veri Yapıları",
    // description split around two <strong> elements
    introDescPart1: "Yazılımın temeli sadece kod yazmak değil, veriyi ",
    introDescStrong1: "nasıl organize ettiğimiz",
    introDescPart2: " ve problemleri ",
    introDescStrong2: "ne kadar verimli",
    introDescPart3: " çözdüğümüzdür.",
    introCta: "Başlayalım",
    introCard1Title: "Performans Analizi",
    introCard1Desc:
      "Kodunuzun hızı veri boyutu arttıkça nasıl değişiyor? Big O notasyonunu keşfedin.",
    introCard2Title: "Veri Organizasyonu",
    introCard2Desc:
      "Veriyi hafızada nasıl tutmalı? Stack (Yığın) ve Queue (Kuyruk) yapılarını inceleyin.",
    introCard3Title: "Arama Stratejileri",
    introCard3Desc:
      "Samanlıkta iğne aramak: Linear Search vs Binary Search yarışı.",

    // ── Complexity Section ──
    complexityHeading: "Zaman Karmaşıklığı (Time Complexity)",
    complexityDescPart1: `Bir algoritmanın verimliliğini ölçerken "saniye" değil, "işlem sayısı" konuşulur. Aşağıdaki simülasyonda veri boyutunu (n) artırarak `,
    complexityDescStrong1: "Sabit Zaman O(1)",
    complexityDescPart2: " ile ",
    complexityDescStrong2: "Doğrusal Zaman O(n)",
    complexityDescPart3: " arasındaki uçurumu görebilirsiniz.",
    complexityInputLabel: "Girdi Boyutu (n):",
    complexityO1Title: "O(1) - Sabit Zaman",
    complexityO1Desc:
      "Veri ne kadar artarsa artsın, işlem sayısı değişmez. (Örn: Dizinin 1. elemanına bakmak).",
    complexityO1Ops: "1 İşlem",
    complexityOnTitle: "O(n) - Doğrusal Zaman",
    complexityOnDesc:
      "Veri miktarı ile işlem sayısı birebir artar. (Örn: Tüm listeyi okumak).",
    complexityOnOps: (n: number) => `${n} İşlem`,
    complexityReminderStrong: "Hatırlatma:",
    complexityReminderText:
      " O(n²) (iç içe döngüler) burada gösterilmemiştir ancak n=100 olduğunda 10,000 işlem gerektirirdi. Bu yüzden Big Data'da tercih edilmez.",
    // Chart labels
    chartYAxis: "İşlem Sayısı",
    chartXAxis: "Girdi Boyutu (n)",
    chartSeriesO1: "O(1) - Sabit",
    chartSeriesOn: "O(n) - Doğrusal",
    chartCaption:
      "Grafik, girdi boyutu (X ekseni) ile işlem sayısı (Y ekseni) arasındaki ilişkiyi gösterir.",

    // ── Data Structures Section ──
    // Cards
    dsArraysTitle: "Diziler (Arrays)",
    dsArraysDesc: "Bellekte yan yana duran veri bloklarıdır.",
    dsAccessLabel: "Erişim:",
    dsFastLabel: "O(1) Hızlı",
    dsSlowLabel: "O(n) Yavaş",
    dsInsertionLabel: "Ekleme:",
    dsLinkedListsTitle: "Bağlı Listeler",
    dsLinkedListsDesc:
      "Tren vagonları gibi, her eleman bir sonrakini işaret eder.",
    dsHashTablesTitle: "Hash Tabloları",
    dsHashTablesDesc:
      "Anahtar-Değer eşleşmesi. Veri aramanın en hızlı yoludur.",
    dsSearchLabel: "Arama:",
    dsHashExample: "Örn: Kullanıcı ID → Profil",
    dsTreesTitle: "Ağaçlar & Grafikler",
    dsTreesDesc:
      "Hiyerarşik (Klasör yapısı) veya ilişkisel (Sosyal ağlar) veriler.",
    dsBstNote: "BST: Sol taraf küçük, sağ taraf büyük.",

    // Stack & Queue simulator
    dsSimHeading: "Veri Yapıları: Hafıza Organizasyonu",
    dsSimDesc:
      "Verilerin nasıl saklandığı, onlara nasıl erişeceğimizi belirler. Stack ve Queue en temel iki disiplindir.",
    dsStackTitle: "Stack (Yığın)",
    dsStackLifo: "LIFO: Son Giren İlk Çıkar",
    dsStackDescPart1: `"Tarayıcıdaki `,
    dsStackDescStrong: "Geri",
    dsStackDescPart2: ` butonu veya üst üste dizilen tabaklar gibidir."`,
    dsStackPush: "Ekle (Push)",
    dsStackPop: "Çıkar (Pop)",
    dsQueueTitle: "Queue (Kuyruk)",
    dsQueueFifo: "FIFO: İlk Giren İlk Çıkar",
    dsQueueDesc: `"Market kasasındaki sıra veya yazıcıya gönderilen belgeler gibidir."`,
    dsQueueEnqueue: "Ekle (Enqueue)",
    dsQueueDequeue: "Çıkar (Dequeue)",

    // ── Algorithms (Search) Section ──
    searchHeading: "Arama Algoritmaları Yarışı",
    searchDescPart1: "Sıralı bir dizide ",
    searchDescStrong1: "Binary Search",
    searchDescPart2: " (Parçala ve Fethet) yönteminin, ",
    searchDescStrong2: "Linear Search",
    searchDescPart3:
      " (Tek Tek Bakma) yöntemine göre ne kadar hızlı olduğunu test edin.",
    searchDataSetLabel: "Veri Seti (Sıralı 1-20)",
    searchTargetPlaceholder: "Hedef",
    searchSearching: "Aranıyor...",
    searchStartBtn: "Aramayı Başlat",
    searchIndexStart: "Index: 0",
    searchIndexEnd: "Index: 19",
    searchLinearLabel: "Linear Search (Doğrusal)",
    searchLinearComplexity: "Karmaşıklık: O(n)",
    searchBinaryLabel: "Binary Search (İkili)",
    searchBinaryComplexity: "Karmaşıklık: O(log n)",
    searchStepsLabel: (n: number) => `${n} Adım`,
    // Status messages
    statusReady: "Hazır...",
    statusWaiting: "Bekliyor...",
    statusRunning: "Çalışıyor...",
    statusLinearFound: (i: number) => `Bulundu! Index: ${i}`,
    statusBinaryFound: "Bulundu! Böldük, böldük ve bulduk.",
    statusBinaryGreater: (guess: number) =>
      `${guess} büyük. Sağ tarafı atıyoruz.`,
    statusBinarySmaller: (guess: number) =>
      `${guess} küçük. Sol tarafı atıyoruz.`,
    searchExplanationHeading: "Neden Binary Search Daha Hızlı?",
    searchExplanationPart1: "Binary search her adımda arama alanını ",
    searchExplanationStrong1: "yarıya indirir",
    searchExplanationPart2:
      ". 1 milyon kayıtlı bir veritabanında Linear Search en kötü durumda 1 milyon işlem yaparken, Binary Search sadece yaklaşık ",
    searchExplanationStrong2: "20 adımda",
    searchExplanationPart3: " sonucu bulur. Şartı: Veri ",
    searchExplanationStrong3: "sıralı",
    searchExplanationPart4: " olmalıdır.",

    // ── Review Section ──
    reviewHeading: "Bilgi Kontrolü ve Özet",
    reviewDesc:
      "Çalışma rehberindeki anahtar soruları gözden geçirin. Cevabı görmek için karta tıklayın.",
    reviewQ1: "1. 1 milyon kayıtlı veritabanında ID ile arama (O(1)) mı, İsim ile arama (O(n)) mı?",
    reviewA1:
      "ID ile arama (O(1)) çok daha verimlidir. O(n) tüm listeyi taramayı gerektirirken, O(1) veri boyutundan bağımsız olarak anında sonuç verir.",
    reviewQ2: `2. Tarayıcıdaki "Geri" butonu neden bir Stack yapısıdır?`,
    reviewA2:
      "Çünkü LIFO (Last In First Out) prensibiyle çalışır. En son ziyaret ettiğiniz sayfa (yığının en üstü), geri tuşuna bastığınızda ilk karşınıza gelen sayfadır.",
    reviewQ3: "3. Market kasasındaki sıra neden bir Queue yapısıdır?",
    reviewA3:
      "Çünkü FIFO (First In First Out) prensibi geçerlidir. Sıraya ilk giren müşteri, kasadan ilk işlem gören ve ayrılan kişidir.",
    reviewQ4: "4. Binary Search kullanmak için temel şart nedir?",
    reviewA4:
      `Veri setinin SIRALI (Sorted) olması gerekir. Karışık bir listede "hedef sayı bu ortadaki sayıdan büyük mü küçük mü" diye karar verip eleme yapamazsınız.`,
    reviewQ5: "5. O(n²) algoritmalar neden Big Data'da istenmez?",
    reviewA5:
      "İşlem sayısı girdinin karesiyle artar. 1 milyon veri için 10^12 (trilyon) işlem gerekir ki bu modern bilgisayarları bile kilitler.",
  },

  en: {
    // ── Tab Navigation ──
    tabIntro: "Introduction",
    tabComplexity: "Complexity (Big O)",
    tabStructures: "Data Structures",
    tabAlgorithms: "Algorithms",
    tabReview: "Summary & Questions",

    // ── Intro Section ──
    introHeading: "Algorithms and Data Structures",
    introDescPart1:
      "The foundation of software isn't just writing code, but ",
    introDescStrong1: "how we organize data",
    introDescPart2: " and ",
    introDescStrong2: "how efficiently",
    introDescPart3: " we solve problems.",
    introCta: "Let's Begin",
    introCard1Title: "Performance Analysis",
    introCard1Desc:
      "How does your code's speed change as data size increases? Discover Big O notation.",
    introCard2Title: "Data Organization",
    introCard2Desc:
      "How should you store data in memory? Explore Stack and Queue structures.",
    introCard3Title: "Search Strategies",
    introCard3Desc:
      "Finding a needle in a haystack: Linear Search vs Binary Search race.",

    // ── Complexity Section ──
    complexityHeading: "Time Complexity",
    complexityDescPart1: `When measuring an algorithm's efficiency, we talk about "number of operations," not "seconds." In the simulation below, increase the data size (n) to see the gap between `,
    complexityDescStrong1: "Constant Time O(1)",
    complexityDescPart2: " and ",
    complexityDescStrong2: "Linear Time O(n)",
    complexityDescPart3: ".",
    complexityInputLabel: "Input Size (n):",
    complexityO1Title: "O(1) - Constant Time",
    complexityO1Desc:
      "No matter how much data increases, the number of operations stays the same. (Ex: Looking at the 1st element of an array).",
    complexityO1Ops: "1 Operation",
    complexityOnTitle: "O(n) - Linear Time",
    complexityOnDesc:
      "The number of operations increases proportionally with data size. (Ex: Reading the entire list).",
    complexityOnOps: (n: number) => `${n} Operations`,
    complexityReminderStrong: "Reminder:",
    complexityReminderText:
      " O(n²) (nested loops) is not shown here but would require 10,000 operations when n=100. That's why it's not preferred for Big Data.",
    // Chart labels
    chartYAxis: "Number of Operations",
    chartXAxis: "Input Size (n)",
    chartSeriesO1: "O(1) - Constant",
    chartSeriesOn: "O(n) - Linear",
    chartCaption:
      "The graph shows the relationship between input size (X axis) and number of operations (Y axis).",

    // ── Data Structures Section ──
    // Cards
    dsArraysTitle: "Arrays",
    dsArraysDesc: "Data blocks stored contiguously in memory.",
    dsAccessLabel: "Access:",
    dsFastLabel: "O(1) Fast",
    dsSlowLabel: "O(n) Slow",
    dsInsertionLabel: "Insertion:",
    dsLinkedListsTitle: "Linked Lists",
    dsLinkedListsDesc:
      "Like train cars, each element points to the next one.",
    dsHashTablesTitle: "Hash Tables",
    dsHashTablesDesc:
      "Key-Value mapping. The fastest way to search for data.",
    dsSearchLabel: "Search:",
    dsHashExample: "Ex: User ID → Profile",
    dsTreesTitle: "Trees & Graphs",
    dsTreesDesc:
      "Hierarchical (folder structure) or relational (social networks) data.",
    dsBstNote: "BST: Left side smaller, right side larger.",

    // Stack & Queue simulator
    dsSimHeading: "Data Structures: Memory Organization",
    dsSimDesc:
      "How data is stored determines how we access it. Stack and Queue are the two most fundamental disciplines.",
    dsStackTitle: "Stack",
    dsStackLifo: "LIFO: Last In First Out",
    dsStackDescPart1: `"Like the `,
    dsStackDescStrong: "Back",
    dsStackDescPart2: ` button in a browser or plates stacked on top of each other."`,
    dsStackPush: "Add (Push)",
    dsStackPop: "Remove (Pop)",
    dsQueueTitle: "Queue",
    dsQueueFifo: "FIFO: First In First Out",
    dsQueueDesc: `"Like a checkout line at a store or documents sent to a printer."`,
    dsQueueEnqueue: "Add (Enqueue)",
    dsQueueDequeue: "Remove (Dequeue)",

    // ── Algorithms (Search) Section ──
    searchHeading: "Search Algorithm Race",
    searchDescPart1: "Test how much faster ",
    searchDescStrong1: "Binary Search",
    searchDescPart2: " (Divide and Conquer) is compared to ",
    searchDescStrong2: "Linear Search",
    searchDescPart3: " (One-by-One Lookup) on a sorted array.",
    searchDataSetLabel: "Data Set (Sorted 1-20)",
    searchTargetPlaceholder: "Target",
    searchSearching: "Searching...",
    searchStartBtn: "Start Search",
    searchIndexStart: "Index: 0",
    searchIndexEnd: "Index: 19",
    searchLinearLabel: "Linear Search",
    searchLinearComplexity: "Complexity: O(n)",
    searchBinaryLabel: "Binary Search",
    searchBinaryComplexity: "Complexity: O(log n)",
    searchStepsLabel: (n: number) => `${n} Steps`,
    // Status messages
    statusReady: "Ready...",
    statusWaiting: "Waiting...",
    statusRunning: "Running...",
    statusLinearFound: (i: number) => `Found! Index: ${i}`,
    statusBinaryFound: "Found! We divided and conquered.",
    statusBinaryGreater: (guess: number) =>
      `${guess} is greater. Discarding the right side.`,
    statusBinarySmaller: (guess: number) =>
      `${guess} is smaller. Discarding the left side.`,
    searchExplanationHeading: "Why Is Binary Search Faster?",
    searchExplanationPart1: "Binary search ",
    searchExplanationStrong1: "halves",
    searchExplanationPart2:
      " the search area at each step. In a database with 1 million records, Linear Search would take up to 1 million operations in the worst case, while Binary Search finds the result in only about ",
    searchExplanationStrong2: "20 steps",
    searchExplanationPart3: ". Requirement: Data must be ",
    searchExplanationStrong3: "sorted",
    searchExplanationPart4: ".",

    // ── Review Section ──
    reviewHeading: "Knowledge Check and Summary",
    reviewDesc:
      "Review the key questions from the study guide. Click a card to see the answer.",
    reviewQ1:
      "1. In a database with 1 million records, is searching by ID (O(1)) or by Name (O(n)) faster?",
    reviewA1:
      "Searching by ID (O(1)) is much more efficient. O(n) requires scanning the entire list, while O(1) returns the result instantly, regardless of data size.",
    reviewQ2: `2. Why is the browser's "Back" button a Stack structure?`,
    reviewA2:
      "Because it works on the LIFO (Last In First Out) principle. The most recently visited page (top of the stack) is the first one you see when you press the back button.",
    reviewQ3: "3. Why is a checkout line at a store a Queue structure?",
    reviewA3:
      "Because the FIFO (First In First Out) principle applies. The first customer to join the line is the first one to complete their transaction and leave.",
    reviewQ4: "4. What is the fundamental requirement for using Binary Search?",
    reviewA4:
      `The data set must be SORTED. In an unsorted list, you cannot decide "is the target greater or smaller than this middle element" and eliminate half of the data.`,
    reviewQ5: "5. Why are O(n²) algorithms undesirable for Big Data?",
    reviewA5:
      "The number of operations increases with the square of the input. For 1 million records, you would need 10^12 (one trillion) operations, which would lock up even modern computers.",
  },
} as const;

// Shared type for component props: widens string literals to `string` while keeping function signatures
export type AlgoDict = {
  [K in keyof typeof algoDict.tr]: (typeof algoDict.tr)[K] extends (...args: infer A) => infer R
    ? (...args: A) => R
    : string;
};
