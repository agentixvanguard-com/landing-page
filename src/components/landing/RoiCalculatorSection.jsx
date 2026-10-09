import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calculator, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader, AnimatedNumber, openCalendly } from "@/components/landing/motion";

const sliders = [
  { key: "conversations", min: 100, max: 20000, step: 100, initial: 2000 },
  { key: "minutes", min: 1, max: 30, step: 1, initial: 6 },
  { key: "hourlyCost", min: 2, max: 40, step: 1, initial: 6, prefix: "$" },
  { key: "automation", min: 10, max: 90, step: 5, initial: 60, suffix: "%" },
];

export default function RoiCalculatorSection() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.startsWith("es") ? "es-CO" : "en-US";
  const formatNumber = useCallback((v) => Math.round(v).toLocaleString(locale, { useGrouping: "always" }), [locale]);
  const formatUsd = useCallback((v) => `$${formatNumber(v)}`, [formatNumber]);
  const [values, setValues] = useState(() =>
    Object.fromEntries(sliders.map((s) => [s.key, s.initial]))
  );

  const { hours, money } = useMemo(() => {
    const h = (values.conversations * values.minutes * (values.automation / 100)) / 60;
    return { hours: h, money: h * values.hourlyCost };
  }, [values]);

  return (
    <section id="calculadora" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionHeader
          icon={Calculator}
          tone="emerald"
          badge={t("roi.badge")}
          title={t("roi.title")}
          highlight={t("roi.titleHighlight")}
          subtitle={t("roi.subtitle")}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-5 gap-6 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-6 sm:p-10"
        >
          {/* Inputs */}
          <div className="lg:col-span-3 space-y-8">
            {sliders.map((s) => (
              <div key={s.key}>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <label htmlFor={`roi-${s.key}`} className="text-sm text-slate-300">
                    {t(`roi.${s.key}`)}
                  </label>
                  <motion.span
                    key={values[s.key]}
                    initial={{ scale: 1.2, color: "#22d3ee" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    className="text-sm font-bold tabular-nums"
                  >
                    {s.prefix}{formatNumber(values[s.key])}{s.suffix}
                  </motion.span>
                </div>
                <input
                  id={`roi-${s.key}`}
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={values[s.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [s.key]: Number(e.target.value) }))}
                  className="range-neon"
                  style={{
                    background: `linear-gradient(90deg, #22d3ee 0%, #a855f7 ${((values[s.key] - s.min) / (s.max - s.min)) * 100}%, #1e293b ${((values[s.key] - s.min) / (s.max - s.min)) * 100}%)`,
                  }}
                />
              </div>
            ))}
            <p className="text-xs text-slate-600">{t("roi.note")}</p>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
              <div className="flex items-center gap-2 text-sm text-cyan-300 mb-2">
                <Clock className="w-4 h-4" />
                {t("roi.hoursSaved")}
              </div>
              <div className="text-4xl font-bold text-white tabular-nums">
                <AnimatedNumber value={hours} format={formatNumber} />
              </div>
            </div>

            <div className="relative rounded-2xl border-animated p-6 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl animate-pulse-glow" />
              <div className="relative">
                <div className="flex items-center gap-2 text-sm text-emerald-300 mb-2">
                  <DollarSign className="w-4 h-4" />
                  {t("roi.moneySaved")}
                </div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent tabular-nums">
                  <AnimatedNumber value={money} format={formatUsd} />
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  {t("roi.yearly", { value: formatUsd(money * 12) })}
                </p>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-auto">
              <Button
                size="lg"
                onClick={openCalendly}
                className="relative overflow-hidden btn-shine group w-full py-6 text-base font-semibold bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.25)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("roi.cta")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
