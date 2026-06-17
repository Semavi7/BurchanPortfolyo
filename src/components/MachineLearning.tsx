"use client"

import { motion } from "framer-motion";
import { Database, Network } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { ui } from "@/i18n/ui";

export const MachineLearning = () => {
  const { lang } = useLanguage();

  return (

    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1 * 0.1 }}
        className="border border-border bg-background hover:border-primary/50 transition-all duration-300 p-8 md:p-12"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
              <Database className="w-3 h-3" />
              <span>{ui.mlBadge[lang]}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {ui.mlTitle[lang]}
            </h2>
            <p className="text-slate-400 text-lg">
              {ui.mlDesc[lang]}
            </p>
          </div>
          <Link
            href="/ml"
            className="shrink-0 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 group"
          >
            {ui.mlBtn[lang]}
            <Network className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
