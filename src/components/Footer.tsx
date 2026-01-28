import { personalData } from "@/lib/data"

export const Footer = () => {
    return (
        <footer className="py-12 border-t border-border bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="font-mono text-[10px] text-muted uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} {personalData.name} // BUILT_WITH_NEXT_JS_V15
                    </div>

                    <div className="flex gap-8">
                        <div className="text-center md:text-left">
                            <div className="text-[10px] font-mono text-muted uppercase mb-1">Lokasyon</div>
                            <div className="text-xs font-bold uppercase">{personalData.contact.location.split(',')[0]}</div>
                        </div>
                        <div className="text-center md:text-left">
                            <div className="text-[10px] font-mono text-muted uppercase mb-1">E-Posta</div>
                            <div className="text-xs font-bold uppercase">{personalData.contact.email}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="font-mono text-[10px] text-primary uppercase">System Status: Optimal</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
