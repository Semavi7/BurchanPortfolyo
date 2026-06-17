export const rustDict = {
  tr: {
    ui: {
      title: "Rust Bootcamp",
      subtitle: "Güvenli, Hızlı, Eşzamanlı",
      progress: "İlerleme",
      topicSummary: "Konu Özeti",
      terminal: "Terminal",
      terminalPlaceholder: "Kodu derlemek için butona basın...",
      quizTitle: "Bilgi Kontrolü",
      correctTitle: "Mükemmel! Doğru cevap.",
      correctDetail: "Bu kavram Rust'ın temelleri için çok önemli.",
      wrongTitle: "Yanlış cevap.",
      wrongDetail: "Endişelenme, konu anlatımını tekrar inceleyebilirsin.",
      lessonPrefix: "DERS",
      cargoRun: "CARGO RUN",
      defaultOutput: "Derleme Başarılı.\nProgram başarıyla çalıştı.",
      compilingSpinner: "   Compiling",
      finishedSpinner: "    Finished",
      runningSpinner: "     Running",
      playgroundLabel: "playground v0.1.0 (/playground)",
      targetLabel: "`target/debug/playground`",
      devLabel: "dev [unoptimized + debuginfo] target(s) in 0.42s",
    },
    curriculum: [
      {
        id: "giris",
        title: "1. Rust'a Giriş ve Kurulum",
        content: "Rust, performans ve güvenliğe odaklanan sistem programlama dilidir. Garbage Collector (Çöp Toplayıcı) olmadan bellek güvenliğini sağlar. 'cargo' komutu hem paket yöneticisi hem de derleme aracıdır.",
        code: `fn main() {
    println!("Merhaba, Rust Dünyası!");
}`,
        quiz: {
          question: "Rust dilinin en belirgin özelliği nedir?",
          options: ["Çöp Toplayıcı (GC) kullanması", "Yorumlanan bir dil olması", "Bellek güvenliğini GC olmadan sağlaması", "Sadece web için olması"],
          correct: 2
        },
        output: "Merhaba, Rust Dünyası!"
      },
      {
        id: "degiskenler",
        title: "2. Değişkenler ve Mutability",
        content: "Rust'ta değişkenler varsayılan olarak değiştirilemezdir (immutable). Bir değişkeni değiştirmek istiyorsanız 'mut' anahtar kelimesini kullanmalısınız. Bu, hataları önlemek için bilinçli bir seçimdir.",
        code: `fn main() {
    let x = 5;
    println!("x'in değeri: {}", x);

    // x = 6; // HATA! x immutable'dır.

    let mut y = 10;
    println!("y'nin değeri: {}", y);
    y = 20;
    println!("y'nin yeni değeri: {}", y);
}`,
        quiz: {
          question: "Rust'ta bir değişkeni değiştirilebilir yapmak için hangi anahtar kelime kullanılır?",
          options: ["var", "dynamic", "mut", "change"],
          correct: 2
        },
        output: "x'in değeri: 5\ny'nin değeri: 10\ny'nin yeni değeri: 20"
      },
      {
        id: "veri-tipleri",
        title: "3. Veri Tipleri (Scalar ve Compound)",
        content: "Rust statik tipli bir dildir. Scalar tipler (integer, float, bool, char) tek bir değer tutar. Compound tipler (Tuple, Array) ise birden çok değeri gruplar.",
        code: `fn main() {
    // Scalar
    let tamsayi: i32 = -5;
    let ondalik: f64 = 2.5;
    let karakter: char = 'Z';

    // Compound (Tuple)
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (x, y, z) = tup; // Destructuring

    println!("y'nin değeri: {}", y);
}`,
        quiz: {
          question: "Farklı tiplerdeki verileri bir arada tutmak için hangi veri yapısı kullanılır?",
          options: ["Array", "Tuple", "Vector", "String"],
          correct: 1
        },
        output: "y'nin değeri: 6.4"
      },
      {
        id: "fonksiyonlar",
        title: "4. Fonksiyonlar ve İfadeler",
        content: "Fonksiyonlar 'fn' ile tanımlanır. Rust 'expression-based' (ifade tabanlı) bir dildir. Bir bloğun son satırında noktalı virgül yoksa, o değer geri döndürülür (return yazmaya gerek yoktur).",
        code: `fn main() {
    let sonuc = topla(5, 10);
    println!("Toplam: {}", sonuc);
}

fn topla(a: i32, b: i32) -> i32 {
    a + b  // Noktalı virgül yok, return demektir
}`,
        quiz: {
          question: "Rust fonksiyonlarında bir değeri return etmek için kısa yol nedir?",
          options: ["return anahtar kelimesi zorunludur", "Son satıra noktalı virgül koymamak", "yield kullanmak", "out parametresi kullanmak"],
          correct: 1
        },
        output: "Toplam: 15"
      },
      {
        id: "kontrol",
        title: "5. Kontrol Akışı (if, loop, while, for)",
        content: "Rust'ta 'if' bir ifadedir (expression), yani bir değişkene değer olarak atanabilir. Döngüler için 'loop' (sonsuz), 'while' ve 'for' kullanılır. 'for' döngüsü koleksiyonlar üzerinde gezinmek için en güvenli yoldur.",
        code: `fn main() {
    let sayi = 3;

    // if bir expression'dır
    let durum = if sayi > 0 { "Pozitif" } else { "Negatif" };
    println!("Durum: {}", durum);

    // For döngüsü
    for i in 1..4 {
        println!("Sayı: {}", i);
    }
}`,
        quiz: {
          question: "Rust'ta sonsuz döngü oluşturmak için en idiomatic (dile uygun) anahtar kelime hangisidir?",
          options: ["while(true)", "for(;;)", "loop", "forever"],
          correct: 2
        },
        output: "Durum: Pozitif\nSayı: 1\nSayı: 2\nSayı: 3"
      },
      {
        id: "ownership",
        title: "6. Ownership (Sahiplik) Sistemi",
        content: "Rust'ın en önemli kuralı: Her değerin bir sahibi (owner) vardır. Sahip scope dışına çıkınca değer silinir. Bir değer başka bir değişkene atandığında sahiplik taşınır (move) ve eski değişken geçersiz olur.",
        code: `fn main() {
    let s1 = String::from("Merhaba");
    let s2 = s1; // Sahiplik s2'ye geçti (Move)

    // println!("{}", s1); // HATA! s1 artık geçersiz.
    println!("{}", s2); // Çalışır
}`,
        quiz: {
          question: "Ownership sisteminde bir değer başka bir değişkene atandığında ne olur?",
          options: ["Kopyalanır (Copy)", "Sahiplik taşınır (Move)", "Referans oluşturulur", "İkisi de aynı yere işaret eder"],
          correct: 1
        },
        output: "Merhaba"
      },
      {
        id: "borrowing",
        title: "7. References ve Borrowing",
        content: "Sahipliği devretmeden veriyi kullanmak için referanslar (&) kullanılır. Buna 'Borrowing' denir. Kural: Ya istediğiniz kadar immutable referans (&T) alabilirsiniz, ya da sadece BİR tane mutable referans (&mut T) alabilirsiniz.",
        code: `fn main() {
    let mut s = String::from("Rust");

    degistir(&mut s);
    println!("Sonuç: {}", s);
}

fn degistir(metin: &mut String) {
    metin.push_str(" Eğlencelidir");
}`,
        quiz: {
          question: "Aynı anda kaç tane mutable referansa (&mut) izin verilir?",
          options: ["Sınırsız", "Sadece 1 tane", "Okuma sayısına bağlı", "2 tane"],
          correct: 1
        },
        output: "Sonuç: Rust Eğlencelidir"
      },
      {
        id: "structs",
        title: "8. Struct ve Implementation",
        content: "Structlar verileri gruplar. 'impl' blokları ise structlar üzerinde çalışacak metodları tanımlar. Nesne yönelimli programlamadaki sınıflara benzerler.",
        code: `struct Dikdortgen {
    en: u32,
    boy: u32,
}

impl Dikdortgen {
    fn alan(&self) -> u32 {
        self.en * self.boy
    }
}

fn main() {
    let d = Dikdortgen { en: 10, boy: 20 };
    println!("Alan: {}", d.alan());
}`,
        quiz: {
          question: "Bir struct'a metot eklemek için hangi blok kullanılır?",
          options: ["method", "function", "class", "impl"],
          correct: 3
        },
        output: "Alan: 200"
      },
      {
        id: "enums",
        title: "9. Enum ve Pattern Matching",
        content: "Enum'lar bir değerin olası varyasyonlarını tanımlar. 'match' ifadesi ise bu varyasyonları kontrol eder ve Rust'ın en güçlü kontrol akış yapısıdır.",
        code: `enum Yon {
    Ileri,
    Geri,
    Sol,
    Sag,
}

fn hareket(y: Yon) {
    match y {
        Yon::Ileri => println!("İleri gidiliyor"),
        Yon::Geri => println!("Geri gidiliyor"),
        _ => println!("Dönüş yapılıyor"),
    }
}

fn main() {
    hareket(Yon::Ileri);
}`,
        quiz: {
          question: "Match ifadesinde tüm olası durumları kapsamazsanız ne olur?",
          options: ["Derleme hatası verir", "Çalışma zamanında hata verir", "Hiçbir şey olmaz", "Otomatik varsayılan atanır"],
          correct: 0
        },
        output: "İleri gidiliyor"
      },
      {
        id: "error",
        title: "10. Error Handling (Result & Option)",
        content: "Rust'ta 'null' yoktur. Değer olabilir veya olmayabilir durumu için 'Option<T>', işlem başarılı veya hatalı durumu için 'Result<T, E>' enumları kullanılır.",
        code: `fn bolme(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Err(String::from("Sıfıra bölünemez"));
    }
    Ok(a / b)
}

fn main() {
    match bolme(10.0, 0.0) {
        Ok(sonuc) => println!("Sonuç: {}", sonuc),
        Err(hata) => println!("Hata: {}", hata),
    }
}`,
        quiz: {
          question: "Rust'ta bir işlemin başarılı olup olmadığını belirten Enum hangisidir?",
          options: ["Option", "Result", "Error", "Try"],
          correct: 1
        },
        output: "Hata: Sıfıra bölünemez"
      },
      {
        id: "concurrency",
        title: "11. Threads ve Message Passing",
        content: "Rust, 'Fearless Concurrency' (Korkusuz Eşzamanlılık) sunar. Thread'ler arası veri paylaşımı 'channel'lar (kanallar) üzerinden mesaj göndererek yapılır.",
        code: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send("Selam Thread!").unwrap();
    });

    let alinan = rx.recv().unwrap();
    println!("Alındı: {}", alinan);
}`,
        quiz: {
          question: "Rust'ta threadler arası iletişim kanalı oluşturmak için hangi modül kullanılır?",
          options: ["std::comm", "std::sync::mpsc", "std::channel", "std::thread::pipe"],
          correct: 1
        },
        output: "Alındı: Selam Thread!"
      }
    ]
  },
  en: {
    ui: {
      title: "Rust Bootcamp",
      subtitle: "Safe, Fast, Concurrent",
      progress: "Progress",
      topicSummary: "Topic Summary",
      terminal: "Terminal",
      terminalPlaceholder: "Press the button to compile the code...",
      quizTitle: "Knowledge Check",
      correctTitle: "Excellent! Correct answer.",
      correctDetail: "This concept is crucial for Rust fundamentals.",
      wrongTitle: "Wrong answer.",
      wrongDetail: "Don't worry, you can review the lesson content again.",
      lessonPrefix: "LESSON",
      cargoRun: "CARGO RUN",
      defaultOutput: "Compilation Successful.\nProgram ran successfully.",
      compilingSpinner: "   Compiling",
      finishedSpinner: "    Finished",
      runningSpinner: "     Running",
      playgroundLabel: "playground v0.1.0 (/playground)",
      targetLabel: "`target/debug/playground`",
      devLabel: "dev [unoptimized + debuginfo] target(s) in 0.42s",
    },
    curriculum: [
      {
        id: "giris",
        title: "1. Introduction to Rust and Setup",
        content: "Rust is a systems programming language focused on performance and safety. It ensures memory safety without a Garbage Collector. The 'cargo' command is both a package manager and a build tool.",
        code: `fn main() {
    println!("Merhaba, Rust Dünyası!");
}`,
        quiz: {
          question: "What is the most distinctive feature of the Rust language?",
          options: ["It uses a Garbage Collector (GC)", "It is an interpreted language", "It provides memory safety without a GC", "It is only for web development"],
          correct: 2
        },
        output: "Merhaba, Rust Dünyası!"
      },
      {
        id: "degiskenler",
        title: "2. Variables and Mutability",
        content: "In Rust, variables are immutable by default. If you want to mutate a variable, you must use the 'mut' keyword. This is a deliberate choice to prevent bugs.",
        code: `fn main() {
    let x = 5;
    println!("x'in değeri: {}", x);

    // x = 6; // HATA! x immutable'dır.

    let mut y = 10;
    println!("y'nin değeri: {}", y);
    y = 20;
    println!("y'nin yeni değeri: {}", y);
}`,
        quiz: {
          question: "Which keyword is used to make a variable mutable in Rust?",
          options: ["var", "dynamic", "mut", "change"],
          correct: 2
        },
        output: "x'in değeri: 5\ny'nin değeri: 10\ny'nin yeni değeri: 20"
      },
      {
        id: "veri-tipleri",
        title: "3. Data Types (Scalar and Compound)",
        content: "Rust is a statically typed language. Scalar types (integer, float, bool, char) hold a single value. Compound types (Tuple, Array) group multiple values together.",
        code: `fn main() {
    // Scalar
    let tamsayi: i32 = -5;
    let ondalik: f64 = 2.5;
    let karakter: char = 'Z';

    // Compound (Tuple)
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (x, y, z) = tup; // Destructuring

    println!("y'nin değeri: {}", y);
}`,
        quiz: {
          question: "Which data structure is used to hold values of different types together?",
          options: ["Array", "Tuple", "Vector", "String"],
          correct: 1
        },
        output: "y'nin değeri: 6.4"
      },
      {
        id: "fonksiyonlar",
        title: "4. Functions and Expressions",
        content: "Functions are defined with 'fn'. Rust is an expression-based language. If the last line of a block has no semicolon, that value is returned (no need to write 'return').",
        code: `fn main() {
    let sonuc = topla(5, 10);
    println!("Toplam: {}", sonuc);
}

fn topla(a: i32, b: i32) -> i32 {
    a + b  // Noktalı virgül yok, return demektir
}`,
        quiz: {
          question: "What is the shorthand way to return a value from a Rust function?",
          options: ["The return keyword is mandatory", "Omitting the semicolon on the last line", "Using yield", "Using an out parameter"],
          correct: 1
        },
        output: "Toplam: 15"
      },
      {
        id: "kontrol",
        title: "5. Control Flow (if, loop, while, for)",
        content: "In Rust, 'if' is an expression, meaning it can be assigned to a variable. Loops use 'loop' (infinite), 'while', and 'for'. The 'for' loop is the safest way to iterate over collections.",
        code: `fn main() {
    let sayi = 3;

    // if bir expression'dır
    let durum = if sayi > 0 { "Pozitif" } else { "Negatif" };
    println!("Durum: {}", durum);

    // For döngüsü
    for i in 1..4 {
        println!("Sayı: {}", i);
    }
}`,
        quiz: {
          question: "What is the most idiomatic keyword for creating an infinite loop in Rust?",
          options: ["while(true)", "for(;;)", "loop", "forever"],
          correct: 2
        },
        output: "Durum: Pozitif\nSayı: 1\nSayı: 2\nSayı: 3"
      },
      {
        id: "ownership",
        title: "6. Ownership System",
        content: "Rust's most important rule: Every value has an owner. When the owner goes out of scope, the value is dropped. When a value is assigned to another variable, ownership is moved and the old variable becomes invalid.",
        code: `fn main() {
    let s1 = String::from("Merhaba");
    let s2 = s1; // Sahiplik s2'ye geçti (Move)

    // println!("{}", s1); // HATA! s1 artık geçersiz.
    println!("{}", s2); // Çalışır
}`,
        quiz: {
          question: "What happens when a value is assigned to another variable in the Ownership system?",
          options: ["It is copied (Copy)", "Ownership is moved (Move)", "A reference is created", "Both point to the same location"],
          correct: 1
        },
        output: "Merhaba"
      },
      {
        id: "borrowing",
        title: "7. References and Borrowing",
        content: "To use data without transferring ownership, references (&) are used. This is called 'Borrowing'. Rule: You can have either as many immutable references (&T) as you want, or exactly ONE mutable reference (&mut T).",
        code: `fn main() {
    let mut s = String::from("Rust");

    degistir(&mut s);
    println!("Sonuç: {}", s);
}

fn degistir(metin: &mut String) {
    metin.push_str(" Eğlencelidir");
}`,
        quiz: {
          question: "How many mutable references (&mut) are allowed at the same time?",
          options: ["Unlimited", "Only 1", "Depends on read count", "2"],
          correct: 1
        },
        output: "Sonuç: Rust Eğlencelidir"
      },
      {
        id: "structs",
        title: "8. Structs and Implementation",
        content: "Structs group data together. 'impl' blocks define methods that operate on structs. They are similar to classes in object-oriented programming.",
        code: `struct Dikdortgen {
    en: u32,
    boy: u32,
}

impl Dikdortgen {
    fn alan(&self) -> u32 {
        self.en * self.boy
    }
}

fn main() {
    let d = Dikdortgen { en: 10, boy: 20 };
    println!("Alan: {}", d.alan());
}`,
        quiz: {
          question: "Which block is used to add methods to a struct?",
          options: ["method", "function", "class", "impl"],
          correct: 3
        },
        output: "Alan: 200"
      },
      {
        id: "enums",
        title: "9. Enums and Pattern Matching",
        content: "Enums define possible variants of a value. The 'match' expression checks these variants and is Rust's most powerful control flow construct.",
        code: `enum Yon {
    Ileri,
    Geri,
    Sol,
    Sag,
}

fn hareket(y: Yon) {
    match y {
        Yon::Ileri => println!("İleri gidiliyor"),
        Yon::Geri => println!("Geri gidiliyor"),
        _ => println!("Dönüş yapılıyor"),
    }
}

fn main() {
    hareket(Yon::Ileri);
}`,
        quiz: {
          question: "What happens if a match expression does not cover all possible cases?",
          options: ["It gives a compilation error", "It gives a runtime error", "Nothing happens", "A default is automatically assigned"],
          correct: 0
        },
        output: "İleri gidiliyor"
      },
      {
        id: "error",
        title: "10. Error Handling (Result & Option)",
        content: "Rust has no 'null'. Use 'Option<T>' for values that may or may not exist, and 'Result<T, E>' for operations that may succeed or fail.",
        code: `fn bolme(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Err(String::from("Sıfıra bölünemez"));
    }
    Ok(a / b)
}

fn main() {
    match bolme(10.0, 0.0) {
        Ok(sonuc) => println!("Sonuç: {}", sonuc),
        Err(hata) => println!("Hata: {}", hata),
    }
}`,
        quiz: {
          question: "Which Enum indicates whether an operation was successful in Rust?",
          options: ["Option", "Result", "Error", "Try"],
          correct: 1
        },
        output: "Hata: Sıfıra bölünemez"
      },
      {
        id: "concurrency",
        title: "11. Threads and Message Passing",
        content: "Rust offers 'Fearless Concurrency'. Data sharing between threads is done by sending messages through channels.",
        code: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send("Selam Thread!").unwrap();
    });

    let alinan = rx.recv().unwrap();
    println!("Alındı: {}", alinan);
}`,
        quiz: {
          question: "Which module is used to create a communication channel between threads in Rust?",
          options: ["std::comm", "std::sync::mpsc", "std::channel", "std::thread::pipe"],
          correct: 1
        },
        output: "Alındı: Selam Thread!"
      }
    ]
  }
} as const;
