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
import { useLanguage } from "@/i18n/LanguageContext";
import { goDict } from "@/i18n/go";

export default function GoLearningPage() {
  const { lang } = useLanguage();
  const dict = goDict[lang];
  const curriculum = dict.curriculum;

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
    setCodeOutput(activeLesson.output);
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
                <div className="p-2 bg-linear-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg shadow-blue-900/20">
                    <Cpu className="text-white h-6 w-6" />
                </div>
                <h1 className="font-bold text-lg text-white">{dict.bootcampTitle}</h1>
                </div>
                <button
                className="md:hidden text-slate-400 hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
                >
                <X size={20} />
                </button>
            </div>
            <p className="text-xs text-slate-400 pl-1">{dict.moduleSubtitle}</p>

            <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{dict.progress}</span>
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
            <span className="text-xs text-blue-400 font-mono mb-0.5">{dict.lessonPrefix} {activeLessonIndex + 1}</span>
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
              <h3 className="font-semibold uppercase tracking-wider text-sm">{dict.topicSection}</h3>
            </div>
            <p className="text-lg leading-relaxed text-slate-300 bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-sm">
              {activeLesson.content}
            </p>
          </section>

          {/* Coding Playground Section */}
          <section className="mb-8 grid xl:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="flex flex-col h-full min-h-75">
              <div className="flex items-center justify-between mb-2 text-green-400">
                <div className="flex items-center gap-2">
                  <Code size={20} />
                  <h3 className="font-semibold uppercase tracking-wider text-sm">{dict.codeExample}</h3>
                </div>
                <button
                  onClick={runCode}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-xs font-bold transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/40 active:translate-y-0.5"
                >
                  <Play size={12} fill="currentColor" />
                  {dict.runButton}
                </button>
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-xl border border-slate-800 font-mono text-sm overflow-x-auto shadow-inner relative group flex-1">
                <pre className="text-slate-300">
                  <code>{activeLesson.code}</code>
                </pre>
                <div className="absolute top-2 right-2 px-2 py-1 bg-white/10 rounded text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {dict.fileName}
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="flex flex-col h-full min-h-75">
              <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Terminal size={20} />
                <h3 className="font-semibold uppercase tracking-wider text-sm">{dict.terminalOutput}</h3>
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
                     <span className="italic">{dict.waitingOutput}</span>
                   </div>
                 )}
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12 pb-10">
              <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Award size={20} />
              <h3 className="font-semibold uppercase tracking-wider text-sm">{dict.quizSection}</h3>
            </div>

            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
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
                        <strong className="block text-green-400">{dict.congratulations}</strong>
                        <p className="mt-0.5 opacity-80">{dict.correctDetail}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-red-500/20 rounded-full"><X size={20} /></div>
                        <div>
                        <strong className="block text-red-400">{dict.wrongAnswer}</strong>
                        <p className="mt-0.5 opacity-80">{dict.wrongDetail}</p>
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
