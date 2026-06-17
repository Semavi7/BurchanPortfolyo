"use client"

import { personalDataTr, personalDataEn } from "@/lib/data"
import { useLanguage } from "@/i18n/LanguageContext"
import { ui } from "@/i18n/ui"

export const Footer = () => {
    const { lang } = useLanguage()
    const data = lang === "tr" ? personalDataTr : personalDataEn

    return (
        <footer className="py-12 border-t border-border bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="font-mono text-[10px] text-muted uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} {data.name} // {ui.builtWith[lang]}
                    </div>

                    <div className="flex gap-8">
                        <div className="text-center md:text-left">
                            <div className="text-[10px] font-mono text-muted uppercase mb-1">{ui.location[lang]}</div>
                            <div className="text-xs font-bold uppercase">{data.contact.location.split(',')[0]}</div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-[10px] font-mono text-muted uppercase mb-1">{ui.emailLabel[lang]}</div>
                            <div className="text-xs font-bold uppercase">{data.contact.email}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="font-mono text-[10px] text-primary uppercase">{ui.systemStatusOptimal[lang]}</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
