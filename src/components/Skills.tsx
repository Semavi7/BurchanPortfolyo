"use client"

import { motion } from "framer-motion"
import { personalData } from "@/lib/data"
import { Code2, Landmark, Globe } from "lucide-react"

export const Skills = () => {
    return (
        <section id="skills" className="py-24 border-b border-border">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 border-l-4 border-primary pl-6">
                    Teknik Yetkinlikler
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Software Skills */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <Code2 className="text-primary" />
                            <h3 className="font-mono text-sm uppercase tracking-[0.2em] font-bold">Yazılım Geliştirme</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {personalData.skills.software.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-3 border border-border bg-card hover:bg-white/5 transition-colors group relative overflow-hidden"
                                >
                                    <span className="font-mono text-xs relative z-10">{skill}</span>
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Accounting Skills */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Landmark className="text-secondary" />
                                <h3 className="font-mono text-sm uppercase tracking-[0.2em] font-bold">Muhasebe & Finans</h3>
                            </div>
                            <div className="space-y-3">
                                {personalData.skills.accounting.map((skill) => (
                                    <div key={skill} className="flex items-center justify-between p-3 border border-border bg-card">
                                        <span className="font-mono text-xs">{skill}</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div key={i} className={`w-1.5 h-3 ${i <= 4 ? "bg-secondary" : "bg-border"}`} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Languages */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Globe className="text-accent" />
                                <h3 className="font-mono text-sm uppercase tracking-[0.2em] font-bold">Diller</h3>
                            </div>
                            <div className="space-y-4">
                                {personalData.skills.languages.map((lang) => (
                                    <div key={lang.name}>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-bold uppercase text-xs tracking-wider">{lang.name}</span>
                                            <span className="font-mono text-[10px] text-muted">{lang.level}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-border relative overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(lang.stars / 5) * 100}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className={`h-full ${lang.name === 'Türkçe' ? "bg-primary" : "bg-accent"}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
