"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, Cpu, TrendingUp, ToggleRight, Users, Divide, Percent, 
  GitFork, Trees, Zap, Group, Minimize, Brain, Image as ImageIcon, 
  Activity, Sparkles, ShieldAlert, LayoutGrid, SearchX, CheckCircle2, 
  XCircle, Lightbulb 
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { mlDict } from "@/i18n/ml";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Yardımcı Fonksiyonlar ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Stil Haritası ---
const colorMap: Record<string, { border: string; text: string; bg: string; shadow: string; glowBorder: string }> = {
  blue: { border: "border-blue-500", text: "text-blue-400", bg: "bg-blue-500/10", shadow: "shadow-blue-500/15", glowBorder: "border-l-blue-500" },
  green: { border: "border-green-500", text: "text-green-400", bg: "bg-green-500/10", shadow: "shadow-green-500/15", glowBorder: "border-l-green-500" },
  indigo: { border: "border-indigo-500", text: "text-indigo-400", bg: "bg-indigo-500/10", shadow: "shadow-blue-500/15", glowBorder: "border-l-blue-500" }, 
  rose: { border: "border-rose-500", text: "text-rose-400", bg: "bg-rose-500/10", shadow: "shadow-pink-500/15", glowBorder: "border-l-pink-500" },
  yellow: { border: "border-yellow-500", text: "text-yellow-400", bg: "bg-yellow-500/10", shadow: "shadow-orange-500/15", glowBorder: "border-l-orange-500" },
  emerald: { border: "border-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10", shadow: "shadow-green-500/15", glowBorder: "border-l-green-500" },
  teal: { border: "border-teal-500", text: "text-teal-400", bg: "bg-teal-500/10", shadow: "shadow-green-500/15", glowBorder: "border-l-green-500" },
  orange: { border: "border-orange-500", text: "text-orange-400", bg: "bg-orange-500/10", shadow: "shadow-orange-500/15", glowBorder: "border-l-orange-500" },
  purple: { border: "border-purple-500", text: "text-purple-400", bg: "bg-purple-500/10", shadow: "shadow-purple-500/15", glowBorder: "border-l-purple-500" },
  gray: { border: "border-slate-500", text: "text-slate-400", bg: "bg-slate-500/10", shadow: "shadow-slate-500/15", glowBorder: "border-l-slate-500" },
  pink: { border: "border-pink-500", text: "text-pink-400", bg: "bg-pink-500/10", shadow: "shadow-pink-500/15", glowBorder: "border-l-pink-500" },
  cyan: { border: "border-cyan-500", text: "text-cyan-400", bg: "bg-cyan-500/10", shadow: "shadow-blue-500/15", glowBorder: "border-l-blue-500" },
  sky: { border: "border-sky-500", text: "text-sky-400", bg: "bg-sky-500/10", shadow: "shadow-blue-500/15", glowBorder: "border-l-blue-500" },
  fuchsia: { border: "border-fuchsia-500", text: "text-fuchsia-400", bg: "bg-fuchsia-500/10", shadow: "shadow-purple-500/15", glowBorder: "border-l-purple-500" },
  red: { border: "border-red-500", text: "text-red-400", bg: "bg-red-500/10", shadow: "shadow-pink-500/15", glowBorder: "border-l-pink-500" },
  amber: { border: "border-amber-500", text: "text-amber-400", bg: "bg-amber-500/10", shadow: "shadow-orange-500/15", glowBorder: "border-l-orange-500" },
};

export default function MachineLearningGuide() {
  const [searchQuery, setSearchQuery] = useState("");
  const { lang } = useLanguage();
  const dict = mlDict[lang];

  // Arama filtreleme mantığı
  const filteredData = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return dict.algorithms.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.usage.toLowerCase().includes(lowerQuery) ||
        item.example.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, dict]);

  return (
    <div className="min-h-screen text-slate-100 font-sans p-2 md:p-8"
      style={{
        backgroundColor: "#020617",
        backgroundImage: "radial-gradient(circle at 50% 0%, #1e293b 0%, #020617 70%)"
      }}
    >
      <div className="max-w-400 mx-auto space-y-8">
        
        {/* --- Header --- */}
        <div className="sticky top-4 z-50 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl backdrop-blur-md bg-[#0f172a]/60">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
              <Cpu className="text-blue-400 w-8 h-8" />
              {dict.pageTitle}
            </h1>
            <p className="text-slate-400 mt-1 text-sm font-light tracking-wide">
              {dict.pageSubtitle}
            </p>
          </div>

          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-slate-500 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder={dict.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* --- Masaüstü Tablo Görünümü --- */}
        <div className={cn(
            "hidden xl:block bg-[#0f172a] rounded-2xl overflow-hidden border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]",
            filteredData.length === 0 && "hidden"
        )}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#020617] text-slate-400 uppercase tracking-wider text-xs border-b border-slate-800">
                  <th className="p-5 font-bold w-[18%]">{dict.tableHeaders[0]}</th>
                  <th className="p-5 font-bold w-[10%]">{dict.tableHeaders[1]}</th>
                  <th className="p-5 font-bold w-[15%]">{dict.tableHeaders[2]}</th>
                  <th className="p-5 font-bold w-[15%]">{dict.tableHeaders[3]}</th>
                  <th className="p-5 font-bold w-[15%]">{dict.tableHeaders[4]}</th>
                  <th className="p-5 font-bold w-[15%]">{dict.tableHeaders[5]}</th>
                  <th className="p-5 font-bold w-[12%]">{dict.tableHeaders[6]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {filteredData.map((item) => {
                  const theme = colorMap[item.color] || colorMap.blue;
                  
                  return (
                    <tr 
                      key={item.id} 
                      className={cn(
                        "group transition-all duration-200 bg-slate-900/40 mb-2 border-b border-slate-800/50 hover:bg-white/3",
                        theme.shadow && `hover:shadow-[0_0_15px_rgba(var(--shadow-color))]`, 
                        theme.glowBorder && `border-l-[3px] ${theme.glowBorder}`
                      )}
                    >
                      <td className="p-5 font-medium text-slate-100">
                        <div className="flex items-center gap-3">
                          <div className={cn("p-2.5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors", theme.bg)}>
                            <item.icon className={cn("w-5 h-5", theme.text)} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-base font-semibold tracking-tight">{item.name}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{item.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border bg-opacity-10 border-opacity-20",
                          theme.bg, theme.border, theme.text
                        )}>
                          {item.type}
                        </span>
                      </td>
                      <td className="p-5 text-slate-300 text-sm leading-relaxed">{item.usage}</td>
                      <td className="p-5">
                        <code className="px-2 py-1 rounded bg-[#020617] border border-slate-800 text-xs font-mono text-slate-400 block w-fit truncate max-w-35" title={item.formula}>
                          {item.formula}
                        </code>
                      </td>
                      <td className="p-5">
                        <div className="space-y-1.5">
                          {item.pros.map((p, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="space-y-1.5">
                          {item.cons.map((c, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                              <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-sm text-slate-300 italic">
                          <Lightbulb className="w-4 h-4 text-yellow-500/70 shrink-0" />
                          <span>{item.example}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Mobil Kart Görünümü --- */}
        <div className={cn(
            "xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4",
            filteredData.length === 0 && "hidden"
        )}>
          {filteredData.map((item) => {
            const theme = colorMap[item.color] || colorMap.blue;
            
            return (
              <div 
                key={item.id}
                className={cn(
                  "bg-[#0f172a] rounded-xl p-5 border border-slate-800 shadow-lg flex flex-col gap-4",
                  theme.shadow && `shadow-[0_0_15px_rgba(0,0,0,0)] hover:${theme.shadow} transition-shadow`,
                  theme.glowBorder && `border-l-[3px] ${theme.glowBorder}`
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg border border-white/5", theme.bg)}>
                      <item.icon className={cn("w-5 h-5", theme.text)} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100">{item.name}</h3>
                      <span className="text-xs text-slate-500 uppercase font-bold">{item.category}</span>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] px-2 py-1 rounded border bg-slate-900 border-opacity-30",
                    theme.border, theme.text
                  )}>
                    {item.type.split(' ')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="col-span-2 bg-slate-900/50 p-2 rounded border border-slate-800">
                    <span className="text-slate-500 block mb-1">{dict.mobileLabels.usage}</span>
                    <span className="text-slate-300">{item.usage}</span>
                  </div>
                  <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                    <span className="text-slate-500 block mb-1">{dict.mobileLabels.logic}</span>
                    <code className="text-slate-400 font-mono text-[10px]">{item.formula}</code>
                  </div>
                  <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                    <span className="text-slate-500 block mb-1">{dict.mobileLabels.example}</span>
                    <span className="text-slate-300 italic">{item.example}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1 block">{dict.mobileLabels.pros}</span>
                    <ul className="space-y-1">
                      {item.pros.map((p, idx) => (
                        <li key={idx} className="text-[10px] text-slate-400 flex items-start gap-1">
                          <span className="text-emerald-500">+</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1 block">{dict.mobileLabels.cons}</span>
                    <ul className="space-y-1">
                      {item.cons.map((c, idx) => (
                        <li key={idx} className="text-[10px] text-slate-400 flex items-start gap-1">
                          <span className="text-rose-500">-</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Sonuç Bulunamadı --- */}
        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500 bg-[#0f172a] rounded-2xl border border-slate-800 border-dashed">
            <SearchX className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-lg">{dict.noResults}</p>
          </div>
        )}

      </div>
    </div>
  );
}