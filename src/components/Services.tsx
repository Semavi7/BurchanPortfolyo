"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { paymentUi } from "@/i18n/payment";
import { services } from "@/lib/payment-config";
import { motion } from "framer-motion";
import { ArrowRight, CircleDollarSign } from "lucide-react";
import { useState } from "react";
import ServiceCheckout from "./ServiceCheckout";

const Services = () => {
  const { lang } = useLanguage();
  const t = paymentUi[lang];
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-normal mb-2">
              {t.servicesTitle}
            </h2>
            <p className="text-muted font-mono text-sm max-w-md">
              {t.servicesSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="w-12 h-px bg-border" />
            <span>{t.servicesIndex}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const name = lang === "tr" ? service.nameTr : service.nameEn;
            const description =
              lang === "tr" ? service.descriptionTr : service.descriptionEn;
            const isOpen = openServiceId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border border-border bg-background hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-card border border-border group-hover:bg-primary/5 transition-colors">
                      <CircleDollarSign size={24} className="text-primary" />
                    </div>
                    <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {name}
                  </h3>

                  <p className="text-muted text-sm mb-6 leading-relaxed">
                    {description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-3xl font-black">
                      {service.priceUsdt}
                    </span>
                    <span className="font-mono text-xs font-bold text-muted uppercase">
                      USDT
                    </span>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <button
                      onClick={() =>
                        setOpenServiceId(isOpen ? null : service.id)
                      }
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                    >
                      {t.selectService}
                      <ArrowRight
                        size={14}
                        className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-border">
                    <ServiceCheckout
                      serviceName={name}
                      amountUsdt={service.priceUsdt}
                      depositPercent={service.depositPercent}
                      onClose={() => setOpenServiceId(null)}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
