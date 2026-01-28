"use client"

import { motion } from "framer-motion"
import { personalData } from "@/lib/data"
import { Award, ChevronRight } from "lucide-react"

export const Certifications = () => {
    return (
        <section id="certifications" className="py-24 bg-card/30 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Award className="mx-auto mb-4 text-accent" size={40} />
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Sertifikalar & Eğitimler</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {personalData.certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 border border-border bg-background flex items-center justify-between group hover:border-accent/50 transition-colors"
                        >
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-tight mb-1 group-hover:text-accent transition-colors">{cert.title}</h4>
                                <div className="flex gap-2 text-[10px] font-mono text-muted uppercase">
                                    <span>{cert.issuer}</span>
                                    <span>•</span>
                                    <span>{cert.date}</span>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-muted group-hover:text-accent transition-all translate-x-0 group-hover:translate-x-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
