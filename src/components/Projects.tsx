"use client"

import { motion } from "framer-motion"
import { personalData } from "@/lib/data"
import { ExternalLink, Github, Layers, Server, ShoppingBag } from "lucide-react"

export const Projects = () => {
    return (
        <section id="projects" className="py-24 bg-card/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Seçili Projeler</h2>
                        <p className="text-muted font-mono text-sm max-w-md">Modern mimari ve teknolojilerle inşa edilmiş çözüm odaklı uygulamalar.</p>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs text-muted">
                        <span className="w-12 h-px bg-border" />
                        <span>PROJECT_INDEX_04</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {personalData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group border border-border bg-background hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-card border border-border group-hover:bg-primary/5 transition-colors">
                                        {project.title.includes('Multi') ? <Server size={24} className="text-primary" /> : <ShoppingBag size={24} className="text-secondary" />}
                                    </div>
                                    <span className="font-mono text-[10px] text-muted">{project.period}</span>
                                </div>

                                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-muted text-sm mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="px-2 py-1 text-[10px] font-mono border border-border bg-card">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-xs text-muted/80 font-mono italic flex items-start gap-2">
                                        <Layers size={12} className="mt-0.5 shrink-0" />
                                        <span>{project.details}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border flex gap-4">
                                    <a href={project.repository} target="_blank" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary hover:opacity-80 transition-opacity">
                                        <Github size={14} /> Repository
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
