import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/components/landing/motion";
import { SITE, whatsappUrl } from "@/config/site";

const programs = ["NVIDIA Inception", "Google for Startups", "AWS Activate", "Microsoft for Startups"];

export default function CTASection() {
  const { t } = useTranslation();
  const wa = whatsappUrl();
  const channels = [
    { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
    wa && { icon: MessageCircle, label: t("footer.columns.contact.whatsapp"), href: wa },
    SITE.phone && { icon: Phone, label: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  ].filter(Boolean);

  return (
    <section id="contacto" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050a18]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-glow [animation-delay:2s]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">
              {t('cta.badge')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('cta.title')}{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-gradient-animate">
              {t('cta.titleHighlight')}
            </span>
            {t('cta.titleSuffix')}
          </h2>

          <p className="max-w-xl mx-auto text-slate-400 text-lg mb-10">
            {t('cta.paragraph')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={openCalendly}
                className="relative overflow-hidden btn-shine group px-10 py-7 text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-[0_0_50px_rgba(0,229,255,0.3)] hover:shadow-[0_0_80px_rgba(0,229,255,0.5)] transition-all duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('cta.button')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </div>
          <p className="text-xs text-slate-500 mt-4">{t('cta.disclaimer')}</p>

          {/* Direct channels */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {channels.map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-800 bg-slate-900/50 text-sm text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <Icon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                {label}
              </a>
            ))}
          </div>

          {/* Startup programs */}
          <div className="mt-10">
            <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3">{t("contact.programs")}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {programs.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="px-3 py-1.5 rounded-lg border border-slate-700/60 bg-slate-900/60 text-xs font-medium text-slate-300"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
