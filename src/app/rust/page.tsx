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
import { useLanguage } from "@/i18n/LanguageContext";
import { rustDict } from "@/i18n/rust";

export default function RustLearningPage() {
  const { lang } = useLanguage();
  const dict = rustDict[lang];
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
                <div className="p-2 bg-linear-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-900/20">
                  <Settings className="text-white h-6 w-6 animate-spin-slow" />
                </div>
                <h1 className="font-bold text-lg text-white">{dict.ui.title}</h1>
              </div>
              <button
                className="md:hidden text-slate-400 hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-xs text-slate-400 pl-1">{dict.ui.subtitle}</p>

            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{dict.ui.progress}</span>
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
                <span className="text-xs text-orange-400 font-mono mb-0.5">{dict.ui.lessonPrefix} {activeLessonIndex + 1}</span>
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
              <h3 className="font-semibold uppercase tracking-wider text-sm">{dict.ui.topicSummary}</h3>
            </div>
            <div className="text-lg leading-relaxed text-slate-300 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 shadow-sm">
              {activeLesson.content}
            </div>
          </section>

          {/* Coding Playground Section */}
          <section className="mb-8 grid xl:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="flex flex-col h-full min-h-75">
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
                  {dict.ui.cargoRun}
                </button>
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-xl border border-zinc-800 font-mono text-sm overflow-x-auto shadow-inner relative group flex-1">
                <pre className="text-slate-300">
                  <code>{activeLesson.code}</code>
                </pre>
              </div>
            </div>

            {/* Output */}
            <div className="flex flex-col h-full min-h-75">
              <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Terminal size={20} />
                <h3 className="font-semibold uppercase tracking-wider text-sm">{dict.ui.terminal}</h3>
              </div>
              <div className="bg-black p-4 rounded-xl border border-zinc-800 font-mono text-sm flex-1 shadow-inner text-gray-300 flex flex-col relative overflow-hidden">
                 {codeOutput ? (
                   <div className="animate-in fade-in duration-300 relative z-10">
                     <div className="text-slate-500 select-none mb-2 text-xs border-b border-zinc-800 pb-2">
                        $ cargo run
                        <br/>
                        <span className="text-green-500">{dict.ui.compilingSpinner}</span> {dict.ui.playgroundLabel}
                        <br/>
                        <span className="text-green-500">{dict.ui.finishedSpinner}</span> {dict.ui.devLabel}
                        <br/>
                        <span className="text-green-500">{dict.ui.runningSpinner}</span> {dict.ui.targetLabel}
                      </div>
                     <pre className="whitespace-pre-wrap text-white">{codeOutput}</pre>
                   </div>
                 ) : (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 pointer-events-none gap-3">
                     <Zap size={32} className="opacity-20" />
                     <span className="italic">{dict.ui.terminalPlaceholder}</span>
                   </div>
                 )}
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
              <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Award size={20} />
              <h3 className="font-semibold uppercase tracking-wider text-sm">{dict.ui.quizTitle}</h3>
            </div>

            <div className="bg-linear-to-br from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-700 shadow-xl">
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
                        <strong className="block text-green-400">{dict.ui.correctTitle}</strong>
                        <p className="mt-0.5 opacity-80">{dict.ui.correctDetail}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-red-500/20 rounded-full"><X size={20} /></div>
                        <div>
                        <strong className="block text-red-400">{dict.ui.wrongTitle}</strong>
                        <p className="mt-0.5 opacity-80">{dict.ui.wrongDetail}</p>
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
