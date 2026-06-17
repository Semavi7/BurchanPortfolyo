"use client";

import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useLanguage } from "@/i18n/LanguageContext";
import { algoDict, type AlgoDict } from "@/i18n/algorithms";

// --- YARDIMCI FONKSİYONLAR ---
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AlgorithmsPage() {
    const [activeSection, setActiveSection] = useState<"intro" | "complexity" | "structures" | "algorithms" | "review">("intro");
    const { lang } = useLanguage();
    const dict = algoDict[lang];

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/30">
            <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* NAVIGASYON */}
                <nav className="mb-12 border-b border-white/10 pb-4 overflow-x-auto">
                    <div className="flex space-x-2 min-w-max">
                        {[
                            { id: "intro", label: dict.tabIntro },
                            { id: "complexity", label: dict.tabComplexity },
                            { id: "structures", label: dict.tabStructures },
                            { id: "algorithms", label: dict.tabAlgorithms },
                            { id: "review", label: dict.tabReview },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveSection(tab.id as any)}
                                className={`px-4 py-2 text-sm font-mono tracking-wider transition-all duration-300 border-b-2 ${activeSection === tab.id
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted hover:text-foreground hover:border-white/20"
                                    }`}
                            >
                                {tab.label.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* İÇERİK ALANI */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeSection === "intro" && <IntroSection changeSection={setActiveSection} dict={dict} />}
                    {activeSection === "complexity" && <ComplexitySection dict={dict} />}
                    {activeSection === "structures" && <DataStructuresSection dict={dict} />}
                    {activeSection === "algorithms" && <AlgorithmsSection dict={dict} />}
                    {activeSection === "review" && <ReviewSection dict={dict} />}
                </div>
            </main>
        </div>
    );
}

// --- BÖLÜM 1: GİRİŞ ---
function IntroSection({ changeSection, dict }: { changeSection: (s: any) => void; dict: AlgoDict }) {
    return (
        <div className="space-y-8">
            <div className="text-center py-16 bg-white/5 border border-white/10 backdrop-blur-sm p-8 relative overflow-hidden">
                {/* Dekoratif Arka Plan */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                        {dict.introHeading}
                    </span>
                </h1>
                <p className="text-xl text-muted max-w-2xl mx-auto mb-8 font-light">
                    {dict.introDescPart1}
                    <strong className="text-foreground">{dict.introDescStrong1}</strong>
                    {dict.introDescPart2}
                    <strong className="text-foreground">{dict.introDescStrong2}</strong>
                    {dict.introDescPart3}
                </p>
                <button
                    onClick={() => changeSection("complexity")}
                    className="px-8 py-3 bg-primary text-background font-bold text-lg hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                    {dict.introCta} &rarr;
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: dict.introCard1Title,
                        desc: dict.introCard1Desc,
                        color: "border-secondary"
                    },
                    {
                        title: dict.introCard2Title,
                        desc: dict.introCard2Desc,
                        color: "border-primary"
                    },
                    {
                        title: dict.introCard3Title,
                        desc: dict.introCard3Desc,
                        color: "border-accent"
                    },
                ].map((item, i) => (
                    <div key={i} className={`bg-card p-6 border-l-2 ${item.color} border-y border-r border-white/10 hover:bg-white/5 transition duration-300`}>
                        <h3 className="text-lg font-bold text-foreground mb-2 font-mono">{item.title}</h3>
                        <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- BÖLÜM 2: COMPLEXITY (BIG O) ---
function ComplexitySection({ dict }: { dict: AlgoDict }) {
    const [n, setN] = useState(10);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = [];
        const dataO1 = [];
        const dataOn = [];

        for (let i = 0; i <= 100; i += 10) {
            labels.push(i);
            dataO1.push(1);
            dataOn.push(i);
        }

        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
            chartInstance.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: dict.chartSeriesO1,
                            data: dataO1,
                            borderColor: "#3b82f6",
                            borderWidth: 2,
                            pointRadius: 0,
                            tension: 0.4,
                        },
                        {
                            label: dict.chartSeriesOn,
                            data: dataOn,
                            borderColor: "#ef4444",
                            borderWidth: 2,
                            pointRadius: 0,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { labels: { color: "#a3a3a3", font: { family: 'JetBrains Mono' } } },
                    },
                    scales: {
                        y: {
                            grid: { color: "#333" },
                            ticks: { color: "#737373" },
                            title: { display: true, text: dict.chartYAxis, color: "#a3a3a3" },
                        },
                        x: {
                            grid: { color: "#333" },
                            ticks: { color: "#737373" },
                            title: { display: true, text: dict.chartXAxis, color: "#a3a3a3" },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [dict]);

    return (
        <div className="space-y-8">
            <div className="bg-card border border-white/10 p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-white/10 pb-2">{dict.complexityHeading}</h2>
                <p className="text-muted mb-6 leading-relaxed">
                    {dict.complexityDescPart1}
                    <strong className="text-blue-400"> {dict.complexityDescStrong1}</strong>
                    {dict.complexityDescPart2}
                    <strong className="text-red-400"> {dict.complexityDescStrong2}</strong>
                    {dict.complexityDescPart3}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="bg-white/5 p-6 border border-white/10 space-y-6">
                        <div>
                            <label className="block text-sm font-mono text-muted mb-2">
                                {dict.complexityInputLabel} <span className="text-primary font-bold">{n}</span>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="100"
                                step="10"
                                value={n}
                                onChange={(e) => setN(parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-blue-500/10 border border-blue-500/20">
                                <h4 className="font-bold text-blue-400 text-sm mb-1 font-mono">{dict.complexityO1Title}</h4>
                                <p className="text-xs text-muted mb-2">{dict.complexityO1Desc}</p>
                                <div className="text-xl font-mono font-bold text-blue-500">{dict.complexityO1Ops}</div>
                            </div>
                            <div className="p-4 bg-red-500/10 border border-red-500/20">
                                <h4 className="font-bold text-red-400 text-sm mb-1 font-mono">{dict.complexityOnTitle}</h4>
                                <p className="text-xs text-muted mb-2">{dict.complexityOnDesc}</p>
                                <div className="text-xl font-mono font-bold text-red-500">{dict.complexityOnOps(n)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 h-100 bg-card border border-white/10 p-4 flex flex-col items-center">
                        <canvas ref={chartRef} />
                        <p className="text-xs text-muted mt-2 text-center">{dict.chartCaption}</p>
                    </div>
                </div>
            </div>

            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4">
                <div className="flex">
                    <div className="shrink-0">
                        <span className="text-2xl">💡</span>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-amber-200/80">
                            <strong>{dict.complexityReminderStrong}</strong>{dict.complexityReminderText}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- BÖLÜM 3: VERİ YAPILARI (STACK/QUEUE) ---
function DataStructuresSection({ dict }: { dict: AlgoDict }) {
  const [stack, setStack] = useState<number[]>([]);
  const [queue, setQueue] = useState<number[]>([]);
  const nextId = useRef(1);

  const pushStack = () => {
    if (stack.length > 7) return;
    setStack((prev) => [...prev, nextId.current++]);
  };

  const popStack = () => {
    setStack((prev) => prev.slice(0, -1));
  };

  const enqueue = () => {
    if (queue.length > 7) return;
    setQueue((prev) => [...prev, nextId.current++]);
  };

  const dequeue = () => {
    setQueue((prev) => prev.slice(1));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* YENİ EKLENEN KARTLAR: TEMEL VERİ YAPILARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Arrays */}
        <div className="bg-card p-6 border-l-2 border-y border-r border-white/10 border-l-primary hover:bg-white/5 transition-all duration-300 group">
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🔢</div>
          <h3 className="text-lg font-bold text-foreground font-mono">{dict.dsArraysTitle}</h3>
          <p className="text-sm text-muted mt-2 mb-4">{dict.dsArraysDesc}</p>
          <ul className="text-sm space-y-2 mb-4 font-mono">
            <li className="flex justify-between items-center"><span className="text-primary font-bold">{dict.dsAccessLabel}</span> <span className="text-xs bg-primary/10 text-primary px-2 py-1">{dict.dsFastLabel}</span></li>
            <li className="flex justify-between items-center"><span className="text-red-400 font-bold">{dict.dsInsertionLabel}</span> <span className="text-xs bg-red-400/10 text-red-400 px-2 py-1">{dict.dsSlowLabel}</span></li>
          </ul>
        </div>

        {/* Linked Lists */}
        <div className="bg-card p-6 border-l-2 border-y border-r border-white/10 border-l-secondary hover:bg-white/5 transition-all duration-300 group">
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🔗</div>
          <h3 className="text-lg font-bold text-foreground font-mono">{dict.dsLinkedListsTitle}</h3>
          <p className="text-sm text-muted mt-2 mb-4">{dict.dsLinkedListsDesc}</p>
          <ul className="text-sm space-y-2 mb-4 font-mono">
            <li className="flex justify-between items-center"><span className="text-red-400 font-bold">{dict.dsAccessLabel}</span> <span className="text-xs bg-red-400/10 text-red-400 px-2 py-1">{dict.dsSlowLabel}</span></li>
            <li className="flex justify-between items-center"><span className="text-primary font-bold">{dict.dsInsertionLabel}</span> <span className="text-xs bg-primary/10 text-primary px-2 py-1">{dict.dsFastLabel}</span></li>
          </ul>
        </div>

        {/* Hash Maps */}
        <div className="bg-card p-6 border-l-2 border-y border-r border-white/10 border-l-amber-500 hover:bg-white/5 transition-all duration-300 group">
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🔑</div>
          <h3 className="text-lg font-bold text-foreground font-mono">{dict.dsHashTablesTitle}</h3>
          <p className="text-sm text-muted mt-2 mb-4">{dict.dsHashTablesDesc}</p>
          <ul className="text-sm space-y-2 mb-4 font-mono">
            <li className="flex justify-between items-center"><span className="text-primary font-bold">{dict.dsSearchLabel}</span> <span className="text-xs bg-primary/10 text-primary px-2 py-1">{dict.dsFastLabel}</span></li>
            <li className="text-xs text-muted mt-1 italic opacity-70">{dict.dsHashExample}</li>
          </ul>
        </div>

        {/* Trees & Graphs */}
        <div className="bg-card p-6 border-l-2 border-y border-r border-white/10 border-l-purple-500 hover:bg-white/5 transition-all duration-300 group">
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🌳</div>
          <h3 className="text-lg font-bold text-foreground font-mono">{dict.dsTreesTitle}</h3>
          <p className="text-sm text-muted mt-2 mb-4">{dict.dsTreesDesc}</p>
          <div className="text-xs bg-white/5 border border-white/10 p-2 text-muted font-mono">
            <strong className="text-purple-400">{dict.dsBstNote}</strong>
          </div>
        </div>

      </div>

      {/* MEVCUT SİMÜLASYON ALANI (Stack & Queue) */}
      <div className="bg-card border border-white/10 p-6 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2 border-b border-white/10 pb-2">{dict.dsSimHeading}</h2>
          <p className="text-muted">{dict.dsSimDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* STACK */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-primary font-mono">{dict.dsStackTitle}</h3>
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold font-mono">{dict.dsStackLifo}</span>
            </div>
            <div className="bg-primary/10 p-4 mb-4 text-sm text-primary/80 min-h-15 border border-primary/20">
              {dict.dsStackDescPart1}<strong>{dict.dsStackDescStrong}</strong>{dict.dsStackDescPart2}
            </div>

            {/* Görsel Alan */}
            <div className="grow flex flex-col-reverse items-center bg-white/5 border border-white/10 h-64 p-4 relative overflow-hidden mb-4 shadow-inner">
              <div className="absolute bottom-0 w-full border-b-4 border-primary/50"></div>
              {stack.map((item) => (
                <div key={item} className="w-3/4 h-10 mb-1 bg-primary text-background flex items-center justify-center font-bold shadow-lg animate-in slide-in-from-top-4 duration-300">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex gap-2 justify-center">
              <button onClick={pushStack} className="flex-1 bg-primary hover:bg-emerald-600 text-background font-bold py-2 transition hover:scale-105 active:scale-95">{dict.dsStackPush}</button>
              <button onClick={popStack} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 transition hover:scale-105 active:scale-95">{dict.dsStackPop}</button>
            </div>
          </div>

          {/* QUEUE */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-secondary font-mono">{dict.dsQueueTitle}</h3>
              <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs font-bold font-mono">{dict.dsQueueFifo}</span>
            </div>
            <div className="bg-secondary/10 p-4 mb-4 text-sm text-secondary/80 min-h-15 border border-secondary/20">
              {dict.dsQueueDesc}
            </div>

            {/* Görsel Alan */}
            <div className="grow flex items-center bg-white/5 border border-white/10 h-64 p-4 relative overflow-hidden mb-4 overflow-x-auto shadow-inner">
              <div className="absolute left-0 h-full border-l-4 border-secondary/50"></div>
              {queue.map((item) => (
                <div key={item} className="h-3/4 min-w-12 w-12 mr-1 bg-secondary text-white flex items-center justify-center font-bold shadow-lg animate-in slide-in-from-right-4 duration-300">
                  {item}
                </div>
              ))}
            </div>

            <div className="flex gap-2 justify-center">
              <button onClick={enqueue} className="flex-1 bg-secondary hover:bg-blue-600 text-white font-bold py-2 transition hover:scale-105 active:scale-95">{dict.dsQueueEnqueue}</button>
              <button onClick={dequeue} className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 transition hover:scale-105 active:scale-95">{dict.dsQueueDequeue}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- BÖLÜM 4: ALGORİTMALAR (SEARCH) ---
type BoxStatus = 'default' | 'check' | 'found' | 'eliminated';

function AlgorithmsSection({ dict }: { dict: AlgoDict }) {
    const dataSet = Array.from({ length: 20 }, (_, i) => i + 1);
    const [target, setTarget] = useState(17);
    const [boxStatuses, setBoxStatuses] = useState<BoxStatus[]>(Array(20).fill('default'));

    const [linearStats, setLinearStats] = useState({ steps: 0, status: dict.statusReady });
    const [binaryStats, setBinaryStats] = useState({ steps: 0, status: dict.statusReady });
    const [isSearching, setIsSearching] = useState(false);

    const reset = () => {
        setBoxStatuses(Array(20).fill('default'));
    };

    const updateBox = (index: number, status: BoxStatus) => {
        setBoxStatuses(prev => {
            const newArr = [...prev];
            newArr[index] = status;
            return newArr;
        });
    };

    const updateRange = (start: number, end: number, status: BoxStatus) => {
        setBoxStatuses(prev => {
            const newArr = [...prev];
            for (let i = start; i <= end; i++) newArr[i] = status;
            return newArr;
        });
    };

    const startSearch = async () => {
        if (isSearching) return;
        setIsSearching(true);
        reset();
        setLinearStats({ steps: 0, status: dict.statusReady });
        setBinaryStats({ steps: 0, status: dict.statusWaiting });

        // Linear Search
        setLinearStats(prev => ({ ...prev, status: dict.statusRunning }));
        for (let i = 0; i < dataSet.length; i++) {
            setLinearStats(prev => ({ ...prev, steps: i + 1 }));
            updateBox(i, 'check');
            await sleep(150);

            if (dataSet[i] === target) {
                updateBox(i, 'found');
                setLinearStats(prev => ({ ...prev, status: dict.statusLinearFound(i) }));
                break;
            } else {
                updateBox(i, 'default');
            }
        }

        await sleep(1000);

        // Binary Search
        reset();
        setBinaryStats(prev => ({ ...prev, status: dict.statusRunning }));

        let low = 0;
        let high = dataSet.length - 1;
        let steps = 0;

        while (low <= high) {
            steps++;
            setBinaryStats(prev => ({ steps: steps, status: dict.statusRunning }));

            let mid = Math.floor((low + high) / 2);
            let guess = dataSet[mid];

            updateBox(mid, 'check');
            await sleep(800);

            if (guess === target) {
                updateBox(mid, 'found');
                setBinaryStats(prev => ({ ...prev, status: dict.statusBinaryFound }));
                break;
            }

            if (guess > target) {
                setBinaryStats(prev => ({ ...prev, status: dict.statusBinaryGreater(guess) }));
                updateRange(mid, high, 'eliminated');
                high = mid - 1;
            } else {
                setBinaryStats(prev => ({ ...prev, status: dict.statusBinarySmaller(guess) }));
                updateRange(low, mid, 'eliminated');
                low = mid + 1;
            }
            updateBox(mid, 'default'); // Remove check highlight for next step
        }
        setIsSearching(false);
    };

    return (
        <div className="bg-card border border-white/10 p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-white/10 pb-2">{dict.searchHeading}</h2>
            <p className="text-muted mb-6 leading-relaxed">
                {dict.searchDescPart1}
                <strong>{dict.searchDescStrong1}</strong>
                {dict.searchDescPart2}
                <strong>{dict.searchDescStrong2}</strong>
                {dict.searchDescPart3}
            </p>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-white/5 p-4 border border-white/10 rounded">
                <div className="flex items-end gap-4">
                    <span className="text-sm font-medium text-muted mb-2">{dict.searchDataSetLabel}</span>
                    <div className="space-x-2">
                        <input
                            type="number"
                            min="1" max="20"
                            value={target}
                            onChange={(e) => setTarget(parseInt(e.target.value))}
                            className="border border-white/20 bg-black text-white px-2 py-1 w-20 text-center rounded focus:border-primary outline-none"
                            placeholder={dict.searchTargetPlaceholder}
                        />
                        <button
                            onClick={startSearch}
                            disabled={isSearching}
                            className="bg-foreground text-background px-4 py-1 rounded hover:bg-gray-300 transition shadow font-bold disabled:opacity-50"
                        >
                            {isSearching ? dict.searchSearching : dict.searchStartBtn}
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-2">
                {dataSet.map((num, i) => {
                    let bgClass = 'bg-white text-gray-700'; // Default styling as per original design intention but adapted for dark mode visibility
                    let extraClass = '';

                    if (boxStatuses[i] === 'default') {
                        bgClass = 'bg-white text-gray-700';
                    } else if (boxStatuses[i] === 'check') {
                        bgClass = 'bg-accent text-black scale-110 z-10'; // Yellow check
                        extraClass = 'border-2 border-yellow-600';
                    } else if (boxStatuses[i] === 'found') {
                        bgClass = 'bg-primary text-black font-bold'; // Green found
                    } else if (boxStatuses[i] === 'eliminated') {
                        bgClass = 'bg-gray-800 text-gray-500 opacity-30'; // Gray eliminated
                    }

                    return (
                        <div key={num} className={`h-10 w-full border border-gray-300 rounded flex items-center justify-center font-bold text-sm transition duration-300 ${bgClass} ${extraClass}`}>
                            {num}
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between text-xs text-muted px-1">
                <span>{dict.searchIndexStart}</span>
                <span>{dict.searchIndexEnd}</span>
            </div>

            {/* Comparison Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Linear */}
                <div className="border border-white/10 rounded-lg p-4 bg-white/5 relative overflow-hidden">
                    <h4 className="font-bold text-muted mb-2 border-b border-white/10 pb-1">{dict.searchLinearLabel}</h4>
                    <div className="text-sm text-muted min-h-10 font-mono">{linearStats.status}</div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted">{dict.searchLinearComplexity}</span>
                        <span className="text-xl font-bold text-foreground">{dict.searchStepsLabel(linearStats.steps)}</span>
                    </div>
                    <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-muted transition-all duration-300" style={{ width: `${(linearStats.steps / 20) * 100}%` }}></div>
                    </div>
                </div>

                {/* Binary */}
                <div className="border border-blue-500/30 rounded-lg p-4 bg-blue-900/10 relative overflow-hidden">
                    <h4 className="font-bold text-blue-400 mb-2 border-b border-blue-500/30 pb-1">{dict.searchBinaryLabel}</h4>
                    <div className="text-sm text-blue-300 min-h-10 font-mono">{binaryStats.status}</div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-blue-400/70">{dict.searchBinaryComplexity}</span>
                        <span className="text-xl font-bold text-blue-400">{dict.searchStepsLabel(binaryStats.steps)}</span>
                    </div>
                    <div className="mt-2 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(binaryStats.steps / 5) * 100}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 mt-4 rounded">
                <h3 className="font-bold text-lg mb-2 text-foreground">{dict.searchExplanationHeading}</h3>
                <p className="text-sm text-muted">
                    {dict.searchExplanationPart1}
                    <strong>{dict.searchExplanationStrong1}</strong>
                    {dict.searchExplanationPart2}
                    <strong>{dict.searchExplanationStrong2}</strong>
                    {dict.searchExplanationPart3}
                    <strong>{dict.searchExplanationStrong3}</strong>
                    {dict.searchExplanationPart4}
                </p>
            </div>
        </div>
    );
}

// --- BÖLÜM 5: REVIEW (ÖZET & SORULAR) ---
function ReviewSection({ dict }: { dict: AlgoDict }) {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => setOpenId(openId === id ? null : id);

    const questions = [
        {
            id: 'q1',
            q: dict.reviewQ1,
            a: dict.reviewA1
        },
        {
            id: 'q2',
            q: dict.reviewQ2,
            a: dict.reviewA2
        },
        {
            id: 'q3',
            q: dict.reviewQ3,
            a: dict.reviewA3
        },
        {
            id: 'q4',
            q: dict.reviewQ4,
            a: dict.reviewA4
        },
        {
            id: 'q5',
            q: dict.reviewQ5,
            a: dict.reviewA5
        },
    ];

    return (
        <div className="bg-card border border-white/10 p-8 rounded-xl max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">{dict.reviewHeading}</h2>
            <p className="text-muted mb-8">{dict.reviewDesc}</p>

            <div className="space-y-4">
                {questions.map((item) => (
                    <div key={item.id} className="border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:bg-white/5 transition" onClick={() => toggle(item.id)}>
                        <div className="bg-white/5 p-4 font-medium text-foreground flex justify-between items-center">
                            <span>{item.q}</span>
                            <span className="text-muted text-xl">{openId === item.id ? '−' : '+'}</span>
                        </div>
                        {openId === item.id && (
                            <div className="bg-black/30 p-4 text-muted border-t border-white/10 animate-in slide-in-from-top-2">
                                {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
