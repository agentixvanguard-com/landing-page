import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050a18]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">
              {t('cta.badge')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('cta.title')}{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t('cta.titleHighlight')}
            </span>
            {t('cta.titleSuffix')}
          </h2>

          <p className="max-w-xl mx-auto text-slate-400 text-lg mb-10">
            {t('cta.paragraph')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => window.open("https://calendly.com/agentixvanguard/architecture-audit", "_blank")}
              className="relative group px-10 py-7 text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-[0_0_50px_rgba(0,229,255,0.3)] hover:shadow-[0_0_80px_rgba(0,229,255,0.5)] transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('cta.button')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <p className="text-xs text-slate-600">{t('cta.disclaimer')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}