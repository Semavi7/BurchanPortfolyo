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
  Zap, 
  Shield, 
  Settings,
  Cpu
} from 'lucide-react';

// --- Müfredat Verisi ---
const curriculum = [
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  }
];

export default function RustLearningPage() {
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
      case "giris": output = "Merhaba, Rust Dünyası!"; break;
      case "degiskenler": output = "x'in değeri: 5\ny'nin değeri: 10\ny'nin yeni değeri: 20"; break;
      case "veri-tipleri": output = "y'nin değeri: 6.4"; break;
      case "fonksiyonlar": output = "Toplam: 15"; break;
      case "kontrol": output = "Durum: Pozitif\nSayı: 1\nSayı: 2\nSayı: 3"; break;
      case "ownership": output = "Merhaba"; break;
      case "borrowing": output = "Sonuç: Rust Eğlencelidir"; break;
      case "structs": output = "Alan: 200"; break;
      case "enums": output = "İleri gidiliyor"; break;
      case "error": output = "Hata: Sıfıra bölünemez"; break;
      case "concurrency": output = "Alındı: Selam Thread!"; break;
      default: output = "Derleme Başarılı.\nProgram başarıyla çalıştı.";
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
    // h-screen ve overflow-hidden ile tam sayfa (boşluksuz) görünüm
    <div className="flex h-screen bg-black text-slate-100 font-sans overflow-hidden">
      
      {/* Mobile Menu Button */}
      {!isSidebarOpen && (
        <button 
          className="md:hidden fixed bottom-6 right-6 z-50 p-3 bg-orange-600 rounded-full shadow-xl shadow-orange-900/40 text-white animate-bounce"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar Navigation */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-zinc-900/95 backdrop-blur border-r border-zinc-800 
        transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:top-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-900/20">
                  <Settings className="text-white h-6 w-6 animate-spin-slow" />
                </div>
                <h1 className="font-bold text-lg text-white">Rust Bootcamp</h1>
              </div>
              <button 
                className="md:hidden text-slate-400 hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-slate-400 pl-1">Güvenli, Hızlı, Eşzamanlı</p>
            
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>İlerleme</span>
                <span>% {Math.round((completedLessons.length / curriculum.length) * 100)}</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-orange-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
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
                    ? 'bg-orange-600/10 border-orange-600/50 text-orange-100 shadow-md' 
                    : 'border-transparent hover:bg-zinc-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors ${
                    completedLessons.includes(index) 
                      ? 'bg-green-500/20 border-green-500 text-green-400' 
                      : index === activeLessonIndex ? 'border-orange-400 text-orange-400' : 'border-zinc-600 text-zinc-600'
                  }`}>
                    {completedLessons.includes(index) ? <CheckCircle size={14} /> : index + 1}
                  </div>
                  <span className="truncate w-36">{lesson.title.split('. ')[1]}</span>
                </div>
                {index === activeLessonIndex && <ChevronRight size={16} className="text-orange-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-black/50">
        
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 bg-black/20 backdrop-blur flex items-center justify-between px-6 md:px-8 shrink-0">
          <div className="flex items-center gap-3">
             <Shield className="text-orange-500 h-5 w-5 hidden md:block" />
             <div className="flex flex-col">
                <span className="text-xs text-orange-400 font-mono mb-0.5">DERS {activeLessonIndex + 1}</span>
                <h2 className="text-xl font-bold text-white">{activeLesson.title.split('. ')[1]}</h2>
             </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={prevLesson} 
              disabled={activeLessonIndex === 0}
              className="p-2 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextLesson} 
              disabled={activeLessonIndex === curriculum.length - 1}
              className="p-2 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full max-w-6xl mx-auto custom-scrollbar">
          
          {/* Explanation Section */}
          <section className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4 text-orange-400">
              <BookOpen size={20} />
              <h3 className="font-semibold uppercase tracking-wider text-sm">Konu Özeti</h3>
            </div>
            <div className="text-lg leading-relaxed text-slate-300 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 shadow-sm">
              {activeLesson.content}
            </div>
          </section>

          {/* Coding Playground Section */}
          <section className="mb-8 grid xl:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="flex flex-col h-full min-h-[300px]">
              <div className="flex items-center justify-between mb-2 text-yellow-500">
                <div className="flex items-center gap-2">
                  <Code size={20} />
                  <h3 className="font-semibold uppercase tracking-wider text-sm">src/main.rs</h3>
                </div>
                <button 
                  onClick={runCode}
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-md text-xs font-bold transition-all shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 active:translate-y-0.5"
                >
                  <Play size={12} fill="currentColor" />
                  CARGO RUN
                </button>
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-xl border border-zinc-800 font-mono text-sm overflow-x-auto shadow-inner relative group flex-1">
                <pre className="text-slate-300">
                  <code>{activeLesson.code}</code>
                </pre>
              </div>
            </div>

            {/* Output */}
            <div className="flex flex-col h-full min-h-[300px]">
              <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Terminal size={20} />
                <h3 className="font-semibold uppercase tracking-wider text-sm">Terminal</h3>
              </div>
              <div className="bg-black p-4 rounded-xl border border-zinc-800 font-mono text-sm flex-1 shadow-inner text-gray-300 flex flex-col relative overflow-hidden">
                 {codeOutput ? (
                   <div className="animate-in fade-in duration-300 relative z-10">
                     <div className="text-slate-500 select-none mb-2 text-xs border-b border-zinc-800 pb-2">
                        $ cargo run
                        <br/>
                        <span className="text-green-500">   Compiling</span> playground v0.1.0 (/playground)
                        <br/>
                        <span className="text-green-500">    Finished</span> dev [unoptimized + debuginfo] target(s) in 0.42s
                        <br/>
                        <span className="text-green-500">     Running</span> `target/debug/playground`
                      </div>
                     <pre className="whitespace-pre-wrap text-white">{codeOutput}</pre>
                   </div>
                 ) : (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 pointer-events-none gap-3">
                     <Zap size={32} className="opacity-20" />
                     <span className="italic">Kodu derlemek için butona basın...</span>
                   </div>
                 )}
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
              <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Award size={20} />
              <h3 className="font-semibold uppercase tracking-wider text-sm">Bilgi Kontrolü</h3>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-xl">
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
                            : 'bg-zinc-800/50 border-zinc-700 opacity-50'
                        : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 hover:border-zinc-500 text-slate-300'
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
                        <strong className="block text-green-400">Mükemmel! Doğru cevap.</strong>
                        <p className="mt-0.5 opacity-80">Bu kavram Rust'ın temelleri için çok önemli.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-red-500/20 rounded-full"><X size={20} /></div>
                        <div>
                        <strong className="block text-red-400">Yanlış cevap.</strong>
                        <p className="mt-0.5 opacity-80">Endişelenme, konu anlatımını tekrar inceleyebilirsin.</p>
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