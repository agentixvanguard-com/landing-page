import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { Workflow, PhoneCall, Wrench, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader, openCalendly } from "@/components/landing/motion";

const stepIcons = [PhoneCall, Wrench, TrendingUp];
const stepAccents = ["from-cyan-400 to-blue-500", "from-blue-400 to-violet-500", "from-violet-400 to-purple-600"];

export default function HowItWorksSection() {
  const { t } = useTranslation();
  const steps = t("howItWorks.steps", { returnObjects: true });
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 80%", "end 50%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="como-funciona" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
        {/* Left: sticky pitch + CTA */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            icon={Workflow}
            align="left"
            badge={t("howItWorks.badge")}
            title={t("howItWorks.title")}
            highlight={t("howItWorks.titleHighlight")}
            subtitle={t("howItWorks.subtitle")}
            className="mb-10"
          />
          <motion.div className="inline-block" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              onClick={openCalendly}
              className="relative overflow-hidden btn-shine group px-8 py-6 text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-[0_0_40px_rgba(0,229,255,0.25)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("howItWorks.cta")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </div>

        {/* Right: vertical timeline that draws itself while scrolling */}
        <div ref={lineRef} className="relative">
          <div className="absolute top-2 bottom-2 left-8 w-[2px] bg-slate-800" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute top-2 bottom-2 left-8 w-[2px] origin-top bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500"
          />

          <ol className="space-y-8">
            {Array.isArray(steps) && steps.map((step, i) => {
              const Icon = stepIcons[i] ?? PhoneCall;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative flex items-start gap-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 + i * 0.15 }}
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    className={`relative z-10 shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${stepAccents[i]} p-[1px] shadow-[0_0_30px_rgba(59,130,246,0.25)]`}
                  >
                    <div className="w-full h-full rounded-2xl bg-[#0a1628] flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-[#050a18] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </motion.div>

                  <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-6 hover:border-cyan-500/30 transition-colors duration-300">
                    <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-cyan-400/80 mb-2">
                      {step.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
