import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, Lock, Zap, Eye, Server, CheckCircle2 } from "lucide-react";

const trustIcons = [Lock, Eye, Server, Zap, Shield, CheckCircle2];

export default function TrustSection() {
  const { t } = useTranslation();
  const items = t('trust.items', { returnObjects: true });
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#0a0f22] to-[#050a18]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      {/* Decorative shield shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,229,255,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">
              {t('trust.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('trust.title')}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t('trust.titleHighlight')}
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400">
            {t('trust.subtitle')}
          </p>
        </motion.div>

        {/* Trust Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.isArray(items) && items.map((point, i) => {
            const IconComponent = trustIcons[i] ?? Lock;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex items-start gap-4 p-5 rounded-xl border border-slate-800/60 bg-slate-900/30 hover:border-cyan-500/20 hover:bg-slate-900/60 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{point.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl border border-cyan-500/10 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 text-center"
        >
          <p className="text-sm text-slate-400">
            {t('trust.banner')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}