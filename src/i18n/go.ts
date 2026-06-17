export const goDict = {
  tr: {
    // ── Sidebar ──
    bootcampTitle: "Go Bootcamp",
    moduleSubtitle: "İnteraktif Öğrenme Modülü",
    progress: "İlerleme",

    // ── Header ──
    lessonPrefix: "DERS",

    // ── Content Sections ──
    topicSection: "Konu Anlatımı",
    codeExample: "Kod Örneği",
    runButton: "ÇALIŞTIR",
    terminalOutput: "Terminal Çıktısı",
    waitingOutput: "Çıktı bekleniyor...",
    fileName: "main.go",

    // ── Quiz Section ──
    quizSection: "Pekiştirme Testi",
    congratulations: "Tebrikler! Doğru cevap.",
    correctDetail: "Konuyu kavradın. Diğer derse geçebilirsin.",
    wrongAnswer: "Yanlış cevap.",
    wrongDetail: "Tekrar deneyebilir veya konu anlatımını inceleyebilirsin.",

    // ── Code Runner ──
    defaultOutput: "Program başarıyla çalıştı.",

    // ── Curriculum ──
    curriculum: [
      {
        id: "giris",
        title: "1. Go'ya Giriş ve Kurulum",
        content: "Go (Golang), Google tarafından geliştirilen, açık kaynaklı, statik tipli ve derlenen bir programlama dilidir. Basitliği, güvenilirliği ve verimliliği ile bilinir. Kurulum için go.dev adresinden sisteminize uygun sürümü indirip kurmanız yeterlidir.",
        code: `package main

import "fmt"

func main() {
    fmt.Println("Merhaba, Go Dünyası!")
}`,
        output: "Merhaba, Go Dünyası!",
        quiz: {
          question: "Go dilinin temel özelliklerinden biri hangisidir?",
          options: ["Yorumlanan (Interpreted) bir dildir", "Google tarafından geliştirilmiştir", "Dinamik tiplidir", "Sadece web için kullanılır"],
          correct: 1,
        },
      },
      {
        id: "degiskenler",
        title: "2. Değişkenler ve Sabitler",
        content: "Go'da değişkenler 'var' anahtar kelimesiyle veya ':=' kısa atama operatörüyle tanımlanır. Sabitler ise 'const' ile belirtilir ve çalışma zamanında değiştirilemezler.",
        code: `package main
import "fmt"

func main() {
    var isim string = "Gopher"
    yas := 10 // Kısa tanımlama
    const pi = 3.14

    fmt.Printf("İsim: %s, Yaş: %d", isim, yas)
}`,
        output: "İsim: Gopher, Yaş: 10",
        quiz: {
          question: "Go'da kısa değişken tanımlama operatörü hangisidir?",
          options: ["=", ":=", "==", "<-"],
          correct: 1,
        },
      },
      {
        id: "veri-tipleri",
        title: "3. Veri Tipleri (Temel ve Bileşik)",
        content: "Go, string, int, bool gibi temel tiplerin yanı sıra array, slice ve map gibi bileşik veri yapılarını da destekler. Go statik tipli olduğu için veri tipleri derleme zamanında bilinmelidir.",
        code: `package main
import "fmt"

func main() {
    // Temel
    var aktifMi bool = true

    // Bileşik (Slice)
    sayilar := []int{1, 2, 3}

    // Bileşik (Map)
    sozluk := map[string]string{"elma": "apple"}

    fmt.Println(sayilar, sozluk)
}`,
        output: "[1 2 3] map[elma:apple]",
        quiz: {
          question: "Hangisi Go'da bir bileşik veri tipidir?",
          options: ["int", "string", "Slice", "bool"],
          correct: 2,
        },
      },
      {
        id: "kontrol",
        title: "4. Kontrol Akışı (if, for, switch)",
        content: "Go'da döngü olarak sadece 'for' kullanılır (while yoktur). Karar yapıları için 'if' ve 'switch' kullanılır. Parantez kullanımı zorunlu değildir ancak süslü parantezler {} zorunludur.",
        code: `package main
import "fmt"

func main() {
    // For Döngüsü
    for i := 0; i < 3; i++ {
        fmt.Println(i)
    }

    // If Yapısı
    x := 10
    if x > 5 {
        fmt.Println("Büyük")
    }
}`,
        output: "0\n1\n2\nBüyük",
        quiz: {
          question: "Go dilindeki tek döngü anahtar kelimesi nedir?",
          options: ["while", "do-while", "loop", "for"],
          correct: 3,
        },
      },
      {
        id: "fonksiyonlar",
        title: "5. Fonksiyonlar ve Parametreler",
        content: "Fonksiyonlar 'func' ile tanımlanır. Go'da fonksiyonlar birden fazla değer döndürebilir, bu özellik genellikle hata yönetimi için kullanılır.",
        code: `package main
import "fmt"

// İki değer döndüren fonksiyon
func islem(a, b int) (int, int) {
    return a + b, a * b
}

func main() {
    toplam, carpim := islem(4, 2)
    fmt.Println(toplam, carpim)
}`,
        output: "6 8",
        quiz: {
          question: "Go'da fonksiyonlar kaç değer döndürebilir?",
          options: ["Sadece 1", "Hiç döndürmez", "Birden fazla döndürebilir", "Sadece pointer döndürür"],
          correct: 2,
        },
      },
      {
        id: "pointers",
        title: "6. Pointers (İşaretçiler)",
        content: "Pointerlar, bir değerin hafıza adresini tutar. '&' operatörü adresi alırken, '*' operatörü adresteki değeri okur veya değiştirir. Go'da pointer aritmetiği yoktur.",
        code: `package main
import "fmt"

func main() {
    x := 10
    var p *int = &x // x'in adresi

    fmt.Println("Adres:", p)
    fmt.Println("Değer:", *p)

    *p = 20 // Değeri değiştir
    fmt.Println(x) // 20 yazar
}`,
        output: "Adres: 0xc000012088\nDeğer: 10\n20",
        quiz: {
          question: "Bir değişkenin bellek adresini almak için hangi operatör kullanılır?",
          options: ["*", "&", "%", "$"],
          correct: 1,
        },
      },
      {
        id: "struct",
        title: "7. Struct ve Metodlar",
        content: "Go nesne yönelimli bir dil değildir (class yoktur), ancak Struct (yapı) ve bunlara bağlı metodlar ile benzer bir yapı kurulabilir. Structlar, farklı tipteki verileri bir arada tutar.",
        code: `package main
import "fmt"

type Kisi struct {
    Isim string
    Yas  int
}

// Struct'a bağlı metod
func (k Kisi) Selamla() {
    fmt.Printf("Merhaba ben %s", k.Isim)
}

func main() {
    k := Kisi{Isim: "Ahmet", Yas: 30}
    k.Selamla()
}`,
        output: "Merhaba ben Ahmet",
        quiz: {
          question: "Go dilinde Class yapısının karşılığı olarak ne kullanılır?",
          options: ["Object", "Class", "Interface", "Struct"],
          correct: 3,
        },
      },
      {
        id: "interface",
        title: "8. Interface ve Type Switch",
        content: "Interface'ler, metot imzaları kümesidir. Bir struct, interface'deki tüm metotları içeriyorsa o interface'i implement etmiş sayılır (implicit implementation).",
        code: `package main
import "fmt"

type Sekil interface {
    Alan() float64
}

type Kare struct {
    Kenar float64
}

func (k Kare) Alan() float64 {
    return k.Kenar * k.Kenar
}

func main() {
    var s Sekil = Kare{Kenar: 5}
    fmt.Println(s.Alan())
}`,
        output: "25",
        quiz: {
          question: "Go'da bir interface'i implement etmek için ne yapılmalıdır?",
          options: ["implements anahtar kelimesi kullanılır", "Metotları tanımlamak yeterlidir", "Inheritance kullanılır", "Mümkün değildir"],
          correct: 1,
        },
      },
      {
        id: "goroutine",
        title: "9. Goroutine ve Channel",
        content: "Concurrency (eşzamanlılık) Go'nun en güçlü yanıdır. 'go' anahtar kelimesi ile fonksiyonlar hafif iş parçacıkları (goroutine) olarak çalıştırılır. Channel'lar ise bu parçacıklar arasında veri iletişimini sağlar.",
        code: `package main
import "fmt"

func main() {
    ch := make(chan string)

    go func() {
        ch <- "Selam Goroutine!"
    }()

    msg := <-ch
    fmt.Println(msg)
}`,
        output: "Selam Goroutine!",
        quiz: {
          question: "Bir fonksiyonu asenkron (eşzamanlı) başlatmak için hangi komut kullanılır?",
          options: ["async", "await", "start", "go"],
          correct: 3,
        },
      },
    ],
  },

  en: {
    // ── Sidebar ──
    bootcampTitle: "Go Bootcamp",
    moduleSubtitle: "Interactive Learning Module",
    progress: "Progress",

    // ── Header ──
    lessonPrefix: "LESSON",

    // ── Content Sections ──
    topicSection: "Lesson",
    codeExample: "Code Example",
    runButton: "RUN",
    terminalOutput: "Terminal Output",
    waitingOutput: "Waiting for output...",
    fileName: "main.go",

    // ── Quiz Section ──
    quizSection: "Quiz",
    congratulations: "Congratulations! Correct answer.",
    correctDetail: "You've got it. You can move on to the next lesson.",
    wrongAnswer: "Wrong answer.",
    wrongDetail: "You can try again or review the lesson content.",

    // ── Code Runner ──
    defaultOutput: "Program ran successfully.",

    // ── Curriculum ──
    curriculum: [
      {
        id: "giris",
        title: "1. Introduction to Go and Setup",
        content: "Go (Golang) is an open-source, statically typed, compiled programming language developed by Google. It is known for its simplicity, reliability, and efficiency. To install it, simply download the appropriate version for your system from go.dev.",
        code: `package main

import "fmt"

func main() {
    fmt.Println("Merhaba, Go Dünyası!")
}`,
        output: "Merhaba, Go Dünyası!",
        quiz: {
          question: "Which is one of Go's fundamental features?",
          options: ["It is an interpreted language", "It was developed by Google", "It is dynamically typed", "It is only used for the web"],
          correct: 1,
        },
      },
      {
        id: "degiskenler",
        title: "2. Variables and Constants",
        content: "In Go, variables are declared with the 'var' keyword or the ':=' short assignment operator. Constants are specified with 'const' and cannot be changed at runtime.",
        code: `package main
import "fmt"

func main() {
    var isim string = "Gopher"
    yas := 10 // Short declaration
    const pi = 3.14

    fmt.Printf("İsim: %s, Yaş: %d", isim, yas)
}`,
        output: "İsim: Gopher, Yaş: 10",
        quiz: {
          question: "Which is the short variable declaration operator in Go?",
          options: ["=", ":=", "==", "<-"],
          correct: 1,
        },
      },
      {
        id: "veri-tipleri",
        title: "3. Data Types (Basic and Composite)",
        content: "Go supports basic types such as string, int, bool, as well as composite data structures like arrays, slices, and maps. Since Go is statically typed, data types must be known at compile time.",
        code: `package main
import "fmt"

func main() {
    // Basic
    var aktifMi bool = true

    // Composite (Slice)
    sayilar := []int{1, 2, 3}

    // Composite (Map)
    sozluk := map[string]string{"elma": "apple"}

    fmt.Println(sayilar, sozluk)
}`,
        output: "[1 2 3] map[elma:apple]",
        quiz: {
          question: "Which is a composite data type in Go?",
          options: ["int", "string", "Slice", "bool"],
          correct: 2,
        },
      },
      {
        id: "kontrol",
        title: "4. Control Flow (if, for, switch)",
        content: "Go only uses 'for' as its loop construct (there is no while). 'if' and 'switch' are used for decision structures. Parentheses are not required, but curly braces {} are mandatory.",
        code: `package main
import "fmt"

func main() {
    // For Loop
    for i := 0; i < 3; i++ {
        fmt.Println(i)
    }

    // If Statement
    x := 10
    if x > 5 {
        fmt.Println("Büyük")
    }
}`,
        output: "0\n1\n2\nBüyük",
        quiz: {
          question: "What is the only loop keyword in Go?",
          options: ["while", "do-while", "loop", "for"],
          correct: 3,
        },
      },
      {
        id: "fonksiyonlar",
        title: "5. Functions and Parameters",
        content: "Functions are defined with 'func'. In Go, functions can return multiple values; this feature is commonly used for error handling.",
        code: `package main
import "fmt"

// Function returning two values
func islem(a, b int) (int, int) {
    return a + b, a * b
}

func main() {
    toplam, carpim := islem(4, 2)
    fmt.Println(toplam, carpim)
}`,
        output: "6 8",
        quiz: {
          question: "How many values can functions return in Go?",
          options: ["Only 1", "None", "Multiple values", "Only pointers"],
          correct: 2,
        },
      },
      {
        id: "pointers",
        title: "6. Pointers",
        content: "Pointers hold the memory address of a value. The '&' operator takes the address, while the '*' operator reads or changes the value at that address. There is no pointer arithmetic in Go.",
        code: `package main
import "fmt"

func main() {
    x := 10
    var p *int = &x // Address of x

    fmt.Println("Adres:", p)
    fmt.Println("Değer:", *p)

    *p = 20 // Change the value
    fmt.Println(x) // Prints 20
}`,
        output: "Adres: 0xc000012088\nDeğer: 10\n20",
        quiz: {
          question: "Which operator is used to get the memory address of a variable?",
          options: ["*", "&", "%", "$"],
          correct: 1,
        },
      },
      {
        id: "struct",
        title: "7. Structs and Methods",
        content: "Go is not an object-oriented language (there are no classes), but Structs and methods attached to them can establish similar constructs. Structs group together data of different types.",
        code: `package main
import "fmt"

type Kisi struct {
    Isim string
    Yas  int
}

// Method attached to Struct
func (k Kisi) Selamla() {
    fmt.Printf("Merhaba ben %s", k.Isim)
}

func main() {
    k := Kisi{Isim: "Ahmet", Yas: 30}
    k.Selamla()
}`,
        output: "Merhaba ben Ahmet",
        quiz: {
          question: "What is used as the equivalent of a Class in Go?",
          options: ["Object", "Class", "Interface", "Struct"],
          correct: 3,
        },
      },
      {
        id: "interface",
        title: "8. Interfaces and Type Switch",
        content: "Interfaces are a set of method signatures. If a struct contains all the methods of an interface, it is considered to implement that interface (implicit implementation).",
        code: `package main
import "fmt"

type Sekil interface {
    Alan() float64
}

type Kare struct {
    Kenar float64
}

func (k Kare) Alan() float64 {
    return k.Kenar * k.Kenar
}

func main() {
    var s Sekil = Kare{Kenar: 5}
    fmt.Println(s.Alan())
}`,
        output: "25",
        quiz: {
          question: "What is required to implement an interface in Go?",
          options: ["The 'implements' keyword is used", "It is enough to define the methods", "Inheritance is used", "It is not possible"],
          correct: 1,
        },
      },
      {
        id: "goroutine",
        title: "9. Goroutines and Channels",
        content: "Concurrency is Go's strongest feature. The 'go' keyword launches functions as lightweight threads (goroutines). Channels provide communication between these goroutines.",
        code: `package main
import "fmt"

func main() {
    ch := make(chan string)

    go func() {
        ch <- "Selam Goroutine!"
    }()

    msg := <-ch
    fmt.Println(msg)
}`,
        output: "Selam Goroutine!",
        quiz: {
          question: "Which command is used to start a function asynchronously (concurrently)?",
          options: ["async", "await", "start", "go"],
          correct: 3,
        },
      },
    ],
  },
};
