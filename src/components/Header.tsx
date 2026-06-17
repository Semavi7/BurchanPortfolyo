"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { personalDataTr, personalDataEn } from "@/lib/data"
import { useLanguage } from "@/i18n/LanguageContext"
import { LanguageToggle } from "./LanguageToggle"

export const Header = () => {
    const { lang } = useLanguage()
    const personalData = lang === "tr" ? personalDataTr : personalDataEn

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                    <div className="w-8 h-8 bg-primary rounded-none flex items-center justify-center font-bold text-background text-xl">
                        M
                    </div>
                    <span className="font-mono text-sm tracking-tighter uppercase hidden sm:inline-block">
                        {personalData.name} // {personalData.title}
                    </span>
                </motion.div>

                <nav className="flex items-center gap-4 sm:gap-6">
                    <a href={`tel:${personalData.contact.phone}`} className="text-muted hover:text-primary transition-colors">
                        <Phone size={18} />
                    </a>
                    <a href={`mailto:${personalData.contact.email}`} className="text-muted hover:text-primary transition-colors">
                        <Mail size={18} />
                    </a>
                    <a href={`https://linkedin.com/in/${personalData.contact.linkedin}`} target="_blank" className="text-muted hover:text-primary transition-colors">
                        <Linkedin size={18} />
                    </a>
                    <a href={`https://github.com/${personalData.contact.github}`} target="_blank" className="text-muted hover:text-primary transition-colors">
                        <Github size={18} />
                    </a>
                    <div className="h-4 w-px bg-border mx-2" />
                    <LanguageToggle />
                    <div className="h-4 w-px bg-border mx-2" />
                    <span className="font-mono text-xs text-primary animate-pulse">SYSTEM_ONLINE</span>
                </nav>
            </div>
        </header>
    )
}
