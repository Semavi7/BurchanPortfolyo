"use client"

import { motion } from "framer-motion"
import { personalDataTr, personalDataEn } from "@/lib/data"
import { Terminal, Cpu, Database } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import { ui } from "@/i18n/ui"
import ChatInterface from "./ChatInterface"

export const Hero = () => {
    const { lang } = useLanguage()
    const data = lang === "tr" ? personalDataTr : personalDataEn

    return (
        <section className="relative py-12 lg:py-20 overflow-hidden border-b border-border">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* --- SOL TARAF (METIN) --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-primary/20 bg-primary/5 text-primary mb-6">
                            <Terminal size={14} className="animate-pulse" />
                            <span className="font-mono text-xs uppercase tracking-widest">{ui.initializationComplete[lang]}</span>
                        </div>

                        {/* DUZELTME 1: Font boyutlari mobile gore ayarlandi (text-4xl -> lg:text-8xl) */}
                        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight lg:leading-none uppercase tracking-normal">
                            {data.name.split(' ').map((word, i) => (
                                <span key={i} className={i === 2 ? "text-primary" : ""}>
                                    {word}
                                    {/* Mobilde yan yana, masaustunde alt alta */}
                                    <br className="hidden lg:block" />{" "}
                                </span>
                            ))}
                        </h1>

                        <p className="text-lg lg:text-xl text-muted max-w-xl mb-8 lg:mb-10 leading-relaxed">
                            {data.summary}
                        </p>

                        <div className="grid grid-cols-3 gap-3 lg:gap-4 font-mono">
                            <div className="p-3 lg:p-4 border border-border bg-card">
                                <Cpu size={20} className="mb-2 text-primary" />
                                <div className="text-[10px] uppercase text-muted mb-1">{ui.architecture[lang]}</div>
                                <div className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">ASP.NET / React</div>
                            </div>
                            <div className="p-3 lg:p-4 border border-border bg-card">
                                <Database size={20} className="mb-2 text-secondary" />
                                <div className="text-[10px] uppercase text-muted mb-1">{ui.database[lang]}</div>
                                <div className="text-xs font-bold">SQL / NoSQL</div>
                            </div>
                            <div className="p-3 lg:p-4 border border-border bg-card">
                                <Terminal size={20} className="mb-2 text-accent" />
                                <div className="text-[10px] uppercase text-muted mb-1">{ui.language[lang]}</div>
                                <div className="text-xs font-bold">C# / JS / Go</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- SAG TARAF (CHAT) --- */}
                    {/* DUZELTME 2: 'hidden' kaldirildi, mobilde de gorunecek */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative w-full max-w-100 lg:max-w-none mx-auto mt-8 lg:mt-0"
                    >
                        {/* Kutu */}
                        <div className="h-170 lg:h-182.5 w-full bg-card border-2 border-border p-4 lg:p-8 relative overflow-hidden group flex flex-col">

                            {/* Arka plan efekti */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

                            {/* Animasyonlu Cizgiler */}
                            <div className="relative h-full flex flex-col justify-between font-mono z-0">
                                <div className="text-[10px] text-primary/50 mb-2">SYSTEM_MANIFEST_V1.0</div>
                                <div className="space-y-4 grow flex flex-col justify-center">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="h-px w-full bg-border relative overflow-hidden">
                                            <motion.div
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                                                className="absolute inset-0 bg-primary/30 w-1/2"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* CHAT ARAYUZU */}
                                <div className="absolute inset-0 z-10 p-4 lg:p-8 flex items-center justify-center pointer-events-none">
                                    <div className="w-full h-full pointer-events-auto rounded-xl overflow-hidden backdrop-blur-xs border border-white/5 shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                                        <div className="h-full w-full">
                                            <ChatInterface />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right text-[10px] text-secondary/50 mt-2">BUILD_STATE: SUCCESS</div>
                            </div>



                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
