"use client";

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Menu, 
  X, 
  Play, 
  Terminal, 
  Award,
  Cpu 
} from 'lucide-react';

// --- Müfredat Verisi ---
const curriculum = [
  {
    id: "giris",
    title: "1. Go'ya Giriş ve Kurulum",
    content: "Go (Golang), Google tarafından geliştirilen, açık kaynaklı, statik tipli ve derlenen bir programlama dilidir. Basitliği, güvenilirliği ve verimliliği ile bilinir. Kurulum için go.dev adresinden sisteminize uygun sürümü indirip kurmanız yeterlidir.",
    code: `package main

import "fmt"

func main() {
    fmt.Println("Merhaba, Go Dünyası!")
}`,
    quiz: {
      question: "Go dilinin temel özelliklerinden biri hangisidir?",
      options: ["Yorumlanan (Interpreted) bir dildir", "Google tarafından geliştirilmiştir", "Dinamik tiplidir", "Sadece web için kullanılır"],
      correct: 1
    }
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
    quiz: {
      question: "Go'da kısa değişken tanımlama operatörü hangisidir?",
      options: ["=", ":=", "==", "<-"],
      correct: 1
    }
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
    quiz: {
      question: "Hangisi Go'da bir bileşik veri tipidir?",
      options: ["int", "string", "Slice", "bool"],
      correct: 2
    }
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
    quiz: {
      question: "Go dilindeki tek döngü anahtar kelimesi nedir?",
      options: ["while", "do-while", "loop", "for"],
      correct: 3
    }
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
    quiz: {
      question: "Go'da fonksiyonlar kaç değer döndürebilir?",
      options: ["Sadece 1", "Hiç döndürmez", "Birden fazla döndürebilir", "Sadece pointer döndürür"],
      correct: 2
    }
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
    quiz: {
      question: "Bir değişkenin bellek adresini almak için hangi operatör kullanılır?",
      options: ["*", "&", "%", "$"],
      correct: 1
    }
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
    quiz: {
      question: "Go dilinde Class yapısının karşılığı olarak ne kullanılır?",
      options: ["Object", "Class", "Interface", "Struct"],
      correct: 3
    }
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
    quiz: {
      question: "Go'da bir interface'i implement etmek için ne yapılmalıdır?",
      options: ["implements anahtar kelimesi kullanılır", "Metotları tanımlamak yeterlidir", "Inheritance kullanılır", "Mümkün değildir"],
      correct: 1
    }
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
    quiz: {
      question: "Bir fonksiyonu asenkron (eşzamanlı) başlatmak için hangi komut kullanılır?",
      options: ["async", "await", "start", "go"],
      correct: 3
    }
  }
];

export default function GoLearningPage() {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const activeLesson = curriculum[activeLessonIndex];

  useEffect(() => {
    setQuizAnswer(null);
    setShowFeedback(false);
    setCodeOutput("");
  }, [activeLessonIndex]);

  // Sidebar responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleQuizSubmit = (optionIndex: number) => {
    setQuizAnswer(optionIndex);
    setShowFeedback(true);
    if (optionIndex === activeLesson.quiz.correct) {
      if (!completedLessons.includes(activeLessonIndex)) {
        setCompletedLessons([...completedLessons, activeLessonIndex]);
      }
    }
  };

  const runCode = () => {
    let output = "";
    switch(activeLesson.id) {
      case "giris": output = "Merhaba, Go Dünyası!"; break;
      case "degiskenler": output = "İsim: Gopher, Yaş: 10"; break;
      case "veri-tipleri": output = "[1 2 3] map[elma:apple]"; break;
      case "kontrol": output = "0\n1\n2\nBüyük"; break;
      case "fonksiyonlar": output = "6 8"; break;
      case "pointers": output = "Adres: 0xc000012088\nDeğer: 10\n20"; break;
      case "struct": output = "Merhaba ben Ahmet"; break;
      case "interface": output = "25"; break;
      case "goroutine": output = "Selam Goroutine!"; break;
      default: output = "Program başarıyla çalıştı.";
    }
    setCodeOutput(output);
  };

  const nextLesson = () => {
    if (activeLessonIndex < curriculum.length - 1) {
      setActiveLessonIndex(prev => prev + 1);
    }
  };

  const prevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(prev => prev - 1);
    }
  };

  return (
    // min-h-screen ve pt-20 (80px), üstteki sabit Navbar için boşluk bırakır.
    <div className="flex bg-black text-slate-100 font-sans overflow-hidden">
      
      {/* Mobile Menu Button */}
      {!isSidebarOpen && (
        <button 
          className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-blue-600 rounded-full shadow-xl shadow-blue-900/40 text-white animate-bounce"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar Navigation */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900/95 backdrop-blur border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:top-0
        ${isSidebarOpen ? 'translate-x-0 top-20' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
            <div className="p-6 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg shadow-blue-900/20">
                    <Cpu className="text-white h-6 w-6" />
                </div>
                <h1 className="font-bold text-lg text-white">Go Bootcamp</h1>
                </div>
                <button 
                className="md:hidden text-slate-400 hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
                >
                <X size={20} />
                </button>
            </div>
            <p className="text-xs text-slate-400 pl-1">İnteraktif Öğrenme Modülü</p>
            
            <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>İlerleme</span>
                <span>% {Math.round((completedLessons.length / curriculum.length) * 100)}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                    className="bg-green-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                    style={{ width: `${(completedLessons.length / curriculum.length) * 100}%` }}
                ></div>
                </div>
            </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            {curriculum.map((lesson, index) => (
                <button
                key={lesson.id}
                onClick={() => {
                    setActiveLessonIndex(index);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-center justify-between group border ${
                    index === activeLessonIndex 
                    ? 'bg-blue-600/10 border-blue-600/50 text-blue-100 shadow-md' 
                    : 'border-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                >
                <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors ${
                    completedLessons.includes(index) 
                        ? 'bg-green-500/20 border-green-500 text-green-400' 
                        : index === activeLessonIndex ? 'border-blue-400 text-blue-400' : 'border-slate-600 text-slate-600'
                    }`}>
                    {completedLessons.includes(index) ? <CheckCircle size={14} /> : index + 1}
                    </div>
                    <span className="truncate w-36">{lesson.title.split('. ')[1]}</span>
                </div>
                {index === activeLessonIndex && <ChevronRight size={16} className="text-blue-400" />}
                </button>
            ))}
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-black/50">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-black/20 backdrop-blur flex items-center justify-between px-6 md:px-8 shrink-0">
          <div className="flex flex-col">
            <span className="text-xs text-blue-400 font-mono mb-0.5">DERS {activeLessonIndex + 1}</span>
            <h2 className="text-xl font-bold text-white">{activeLesson.title.split('. ')[1]}</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevLesson} 
              disabled={activeLessonIndex === 0}
              className="p-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextLesson} 
              disabled={activeLessonIndex === curriculum.length - 1}
              className="p-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-6xl mx-auto custom-scrollbar">
          
          {/* Explanation Section */}
          <section className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <BookOpen size={20} />
              <h3 className="font-semibold uppercase tracking-wider text-sm">Konu Anlatımı</h3>
            </div>
            <p className="text-lg leading-relaxed text-slate-300 bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-sm">
              {activeLesson.content}
            </p>
          </section>

          {/* Coding Playground Section */}
          <section className="mb-8 grid xl:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="flex flex-col h-full min-h-[300px]">
              <div className="flex items-center justify-between mb-2 text-green-400">
                <div className="flex items-center gap-2">
                  <Code size={20} />
                  <h3 className="font-semibold uppercase tracking-wider text-sm">Kod Örneği</h3>
                </div>
                <button 
                  onClick={runCode}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-xs font-bold transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/40 active:translate-y-0.5"
                >
                  <Play size={12} fill="currentColor" />
                  ÇALIŞTIR
                </button>
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-xl border border-slate-800 font-mono text-sm overflow-x-auto shadow-inner relative group flex-1">
                <pre className="text-slate-300">
                  <code>{activeLesson.code}</code>
                </pre>
                <div className="absolute top-2 right-2 px-2 py-1 bg-white/10 rounded text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  main.go
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="flex flex-col h-full min-h-[300px]">
              <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Terminal size={20} />
                <h3 className="font-semibold uppercase tracking-wider text-sm">Terminal Çıktısı</h3>
              </div>
              <div className="bg-black p-4 rounded-xl border border-slate-800 font-mono text-sm flex-1 shadow-inner text-green-500 relative overflow-hidden">
                 {codeOutput ? (
                   <div className="animate-in fade-in duration-300 relative z-10">
                     <span className="text-slate-600 select-none text-xs block mb-2">$ go run main.go</span>
                     <pre className="whitespace-pre-wrap">{codeOutput}</pre>
                   </div>
                 ) : (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800 pointer-events-none">
                     <Terminal size={48} strokeWidth={1} className="mb-2 opacity-50" />
                     <span className="italic">Çıktı bekleniyor...</span>
                   </div>
                 )}
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12 pb-10">
              <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Award size={20} />
              <h3 className="font-semibold uppercase tracking-wider text-sm">Pekiştirme Testi</h3>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
              <h4 className="text-xl font-medium mb-6 text-white">{activeLesson.quiz.question}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeLesson.quiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizSubmit(idx)}
                    disabled={showFeedback}
                    className={`p-4 rounded-lg text-left border transition-all relative overflow-hidden ${
                      showFeedback 
                        ? idx === activeLesson.quiz.correct 
                          ? 'bg-green-500/10 border-green-500/50 text-green-100' 
                          : idx === quizAnswer 
                            ? 'bg-red-500/10 border-red-500/50 text-red-100'
                            : 'bg-slate-800/50 border-slate-700 opacity-50'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && idx === activeLesson.quiz.correct && <CheckCircle size={20} className="text-green-500" />}
                    </div>
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className={`mt-6 p-4 rounded-lg text-sm flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 ${
                  quizAnswer === activeLesson.quiz.correct 
                    ? 'bg-green-900/20 text-green-300 border border-green-900/50' 
                    : 'bg-red-900/20 text-red-300 border border-red-900/50'
                }`}>
                  {quizAnswer === activeLesson.quiz.correct ? (
                    <>
                      <div className="p-2 bg-green-500/20 rounded-full"><CheckCircle size={20} /></div>
                      <div>
                        <strong className="block text-green-400">Tebrikler! Doğru cevap.</strong>
                        <p className="mt-0.5 opacity-80">Konuyu kavradın. Diğer derse geçebilirsin.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-red-500/20 rounded-full"><X size={20} /></div>
                        <div>
                        <strong className="block text-red-400">Yanlış cevap.</strong>
                        <p className="mt-0.5 opacity-80">Tekrar deneyebilir veya konu anlatımını inceleyebilirsin.</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}