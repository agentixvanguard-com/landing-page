import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Cloud, Database, Cpu, Smartphone, Server, Layers } from "lucide-react";

const techStyles = [
  { icon: Cloud, color: "text-cyan-400", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/20" },
  { icon: Cpu, color: "text-amber-400", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/20" },
  { icon: Database, color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/20" },
  { icon: Smartphone, color: "text-sky-400", bgColor: "bg-sky-500/10", borderColor: "border-sky-500/20" },
  { icon: Server, color: "text-green-400", bgColor: "bg-green-500/10", borderColor: "border-green-500/20" },
  { icon: Layers, color: "text-purple-400", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/20" },
];

export default function TechStackSection() {
  const { t } = useTranslation();
  const items = t('techStack.items', { returnObjects: true });
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">
              {t('techStack.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('techStack.title')}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t('techStack.titleHighlight')}
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400">
            {t('techStack.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(items) && items.map((tech, i) => {
            const style = techStyles[i] ?? techStyles[0];
            const TechIcon = style.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group relative p-6 rounded-xl border ${style.borderColor} bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-lg ${style.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <TechIcon className={`w-5 h-5 ${style.color}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{tech.name}</h3>
                    <p className={`text-xs ${style.color} font-medium mb-2`}>{tech.subtitle}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}