import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MessageSquare, Cog, Search, ArrowRight, Shield } from "lucide-react";

const serviceStyles = [
  { icon: MessageSquare, accent: "from-cyan-400 to-blue-500", glowColor: "rgba(0,229,255,0.15)", borderColor: "border-cyan-500/20" },
  { icon: Cog, accent: "from-purple-400 to-violet-600", glowColor: "rgba(168,85,247,0.15)", borderColor: "border-purple-500/20" },
  { icon: Search, accent: "from-blue-400 to-indigo-600", glowColor: "rgba(59,130,246,0.15)", borderColor: "border-blue-500/20" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ServicesSection() {
  const { t } = useTranslation();
  const items = t('services.items', { returnObjects: true });
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050a18]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">
              {t('services.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('services.title')}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t('services.titleHighlight')}
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {Array.isArray(items) && items.map((item, i) => {
            const serviceStyle = serviceStyles[i] ?? serviceStyles[0];
            const IconComponent = serviceStyle.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className={`group relative rounded-2xl border ${serviceStyle.borderColor} bg-gradient-to-b from-slate-900/80 to-[#050a18] backdrop-blur-sm p-8 hover:border-opacity-50 transition-all duration-500`}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 60px ${serviceStyle.glowColor}` }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${serviceStyle.accent} p-[1px] mb-6`}>
                    <div className="w-full h-full rounded-xl bg-[#0a1628] flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-cyan-400/80 font-medium mb-4">{item.subtitle}</p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{item.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {(item.features || []).map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-slate-500">
                        <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${serviceStyle.accent}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className="flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-cyan-400 transition-colors">
                    {t('services.explore')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}