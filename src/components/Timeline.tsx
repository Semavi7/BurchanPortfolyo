"use client"

import { motion } from "framer-motion"
import { personalDataTr, personalDataEn } from "@/lib/data"
import { Briefcase, GraduationCap, Calendar } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import { ui } from "@/i18n/ui"

export const Timeline = () => {
    const { lang } = useLanguage()
    const data = lang === "tr" ? personalDataTr : personalDataEn

    return (
        <section id="experience" className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Experience */}
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 bg-primary/10 border border-primary/20">
                                <Briefcase className="text-primary" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-normal">{ui.workExperience[lang]}</h2>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4.75 before:w-px before:bg-border">
                            {data.experience.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-12"
                                >
                                    <div className="absolute left-0 top-1 w-10 h-10 bg-background border border-border flex items-center justify-center z-10">
                                        <div className="w-2 h-2 bg-primary" />
                                    </div>

                                    <div className="mb-1 flex items-center gap-2 text-muted font-mono text-[10px] uppercase tracking-widest">
                                        <Calendar size={12} />
                                        {exp.period}
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight">{exp.role}</h3>
                                    <div className="text-primary text-sm font-mono mb-3">{exp.company}</div>
                                    <p className="text-muted text-sm leading-relaxed">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 bg-secondary/10 border border-secondary/20">
                                <GraduationCap className="text-secondary" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-normal">{ui.education[lang]}</h2>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4.75 before:w-px before:bg-border">
                            {data.education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-12"
                                >
                                    <div className="absolute left-0 top-1 w-10 h-10 bg-background border border-border flex items-center justify-center z-10">
                                        <div className="w-2 h-2 bg-secondary" />
                                    </div>

                                    <div className="mb-1 flex items-center gap-2 text-muted font-mono text-[10px] uppercase tracking-widest">
                                        <Calendar size={12} />
                                        {edu.period}
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight">{edu.degree}</h3>
                                    <div className="text-secondary text-sm font-mono">{edu.school}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
