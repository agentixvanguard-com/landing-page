import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Gem, Layers, ShieldAlert, Brain, RefreshCw } from "lucide-react";

const stepStyles = [
  { icon: Gem, number: "01", color: "text-cyan-400", borderColor: "border-cyan-500/30", bgGlow: "bg-cyan-500/10" },
  { icon: Layers, number: "02", color: "text-blue-400", borderColor: "border-blue-500/30", bgGlow: "bg-blue-500/10" },
  { icon: ShieldAlert, number: "03", color: "text-purple-400", borderColor: "border-purple-500/30", bgGlow: "bg-purple-500/10" },
  { icon: Brain, number: "04", color: "text-violet-400", borderColor: "border-violet-500/30", bgGlow: "bg-violet-500/10" },
];

export default function OuroborosSection() {
  const { t } = useTranslation();
  const steps = t('ouroboros.steps', { returnObjects: true });
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#080e20] to-[#050a18]" />
      
      {/* Decorative circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-purple-500/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-cyan-500/5" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
            <RefreshCw className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">
              {t('ouroboros.badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('ouroboros.title')}{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {t('ouroboros.titleHighlight')}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400">
            {t('ouroboros.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-violet-500/30 hidden sm:block" />

          <div className="space-y-8 sm:space-y-12">
            {Array.isArray(steps) && steps.map((step, i) => {
              const stepStyle = stepStyles[i] ?? stepStyles[0];
              const StepIcon = stepStyle.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-6 ${
                    i % 2 !== 0 ? "sm:flex-row-reverse sm:text-right" : ""
                  }`}
                >
                  {/* Number node */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center">
                    <div className={`w-10 h-10 rounded-full ${stepStyle.bgGlow} border ${stepStyle.borderColor} flex items-center justify-center backdrop-blur-sm`}>
                      <span className={`text-xs font-bold ${stepStyle.color}`}>{stepStyle.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`sm:w-[calc(50%-2rem)] ${i % 2 !== 0 ? "sm:ml-auto" : "sm:mr-auto"}`}>
                    <div className={`group p-6 rounded-2xl border ${stepStyle.borderColor} bg-slate-900/50 backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-300`}>
                      <div className={`flex items-center gap-3 mb-3 ${i % 2 !== 0 ? "sm:flex-row-reverse" : ""}`}>
                        <div className={`w-9 h-9 rounded-lg ${stepStyle.bgGlow} flex items-center justify-center`}>
                          <StepIcon className={`w-4.5 h-4.5 ${stepStyle.color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{step.title}</h3>
                        </div>
                      </div>
                      <p className={`text-xs font-medium ${stepStyle.color} mb-2 uppercase tracking-wider`}>
                        {step.subtitle}
                      </p>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Loop indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-500/20 bg-purple-500/5">
              <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: "4s" }} />
              <span className="text-sm text-purple-300 font-medium">{t('ouroboros.cycleLabel')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}