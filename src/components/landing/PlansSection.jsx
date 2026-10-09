import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Layers, Check, Sparkles, ArrowRight, Rocket, TrendingUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader, SpotlightCard, staggerContainer, fadeUp, openCalendly } from "@/components/landing/motion";

const planIcons = [Rocket, TrendingUp, Building2];
const POPULAR_INDEX = 1;

export default function PlansSection() {
  const { t } = useTranslation();
  const plans = t("plans.items", { returnObjects: true });

  return (
    <section id="planes" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeader
          icon={Layers}
          tone="purple"
          badge={t("plans.badge")}
          title={t("plans.title")}
          highlight={t("plans.titleHighlight")}
          subtitle={t("plans.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6 items-stretch"
        >
          {Array.isArray(plans) && plans.map((plan, i) => {
            const Icon = planIcons[i] ?? Rocket;
            const popular = i === POPULAR_INDEX;
            return (
              <motion.div key={i} variants={fadeUp} className={popular ? "md:-mt-4 md:mb-[-1rem]" : ""}>
                <SpotlightCard
                  glow={popular ? "rgba(168,85,247,0.18)" : "rgba(34,211,238,0.12)"}
                  className={`h-full flex flex-col rounded-3xl p-8 ${popular
                    ? "border-animated shadow-[0_0_60px_rgba(168,85,247,0.15)]"
                    : "border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:border-slate-700"
                    }`}
                >
                  {popular && (
                    <span className="absolute top-5 right-5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-[11px] font-semibold">
                      <Sparkles className="w-3 h-3" />
                      {t("plans.popular")}
                    </span>
                  )}

                  <div className="relative flex flex-col flex-1">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                      <Icon className={`w-5 h-5 ${popular ? "text-purple-300" : "text-cyan-300"}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-sm text-slate-400 mt-1 mb-6">{plan.tagline}</p>
                    <p className="text-lg font-semibold text-white mb-6 pb-6 border-b border-slate-800">{plan.price}</p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {(plan.features || []).map((f, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false, amount: 0.2 }}
                          transition={{ delay: 0.3 + j * 0.08 }}
                          className="flex items-start gap-3 text-sm text-slate-300"
                        >
                          <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${popular ? "bg-purple-500/20" : "bg-cyan-500/15"}`}>
                            <Check className={`w-3 h-3 ${popular ? "text-purple-300" : "text-cyan-300"}`} />
                          </span>
                          {f}
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      onClick={openCalendly}
                      className={`relative overflow-hidden group w-full py-6 rounded-xl font-semibold transition-all duration-300 ${popular
                        ? "btn-shine bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                        }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {t("plans.cta")}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
