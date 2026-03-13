import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Cloud, Cpu, Zap, ArrowRight, Shield, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductTiersSection() {
  const { t } = useTranslation();
  const [activeTier, setActiveTier] = useState("cloud");
  const tiers = t("productTiers.tiers", { returnObjects: true });
  const tableRows = t("productTiers.tableRows", { returnObjects: true });
  const openclaw = t("productTiers.openclaw", { returnObjects: true });

  return (
    <section
      id="soluciones"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#080e20] to-[#050a18]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">
              {t("productTiers.badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {t("productTiers.title")}{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {t("productTiers.titleHighlight")}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg">
            {t("productTiers.subtitle")}
          </p>
        </motion.div>

        {/* Tab buttons - only change the LEFT card content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          {["cloud", "edge"].map((key) => (
            <motion.button
              key={key}
              variants={itemVariants}
              onClick={() => setActiveTier(key)}
              className={`relative px-8 py-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                activeTier === key
                  ? key === "cloud"
                    ? "border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_40px_rgba(0,229,255,0.15)]"
                    : "border-purple-500/50 bg-purple-500/10 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                  : "border-slate-700/50 bg-slate-900/50 hover:border-slate-600"
              }`}
            >
              {key === "cloud" ? (
                <Cloud className={`w-6 h-6 ${activeTier === key ? "text-cyan-400" : "text-slate-400"}`} />
              ) : (
                <Cpu className={`w-6 h-6 ${activeTier === key ? "text-purple-400" : "text-slate-400"}`} />
              )}
              <div className="text-left">
                <div className={`font-bold ${activeTier === key ? "text-white" : "text-slate-300"}`}>
                  {t(`productTiers.tiers.${key}.name`)}
                </div>
                <div className="text-xs text-slate-500">
                  {t(`productTiers.tiers.${key}.tagline`)}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Content: LEFT card changes with tab, RIGHT + Table are static */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* LEFT: Tier description - changes when tab is clicked */}
            <div
              className={`rounded-2xl border backdrop-blur-sm p-8 transition-colors duration-300 ${
                activeTier === "cloud"
                  ? "border-cyan-500/20 bg-cyan-500/5"
                  : "border-purple-500/20 bg-purple-500/5"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {activeTier === "cloud" ? (
                  <Cloud className="w-6 h-6 text-cyan-400" />
                ) : (
                  <Cpu className="w-6 h-6 text-purple-400" />
                )}
                <h3 className="text-xl font-bold text-white">
                  {tiers[activeTier]?.name}
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                {tiers[activeTier]?.description}
              </p>
              <ul className="space-y-3">
                {Array.isArray(tiers[activeTier]?.features) &&
                  tiers[activeTier].features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <Zap
                        className={`w-4 h-4 flex-shrink-0 ${activeTier === "cloud" ? "text-cyan-400" : "text-purple-400"}`}
                      />
                      {f}
                    </li>
                  ))}
              </ul>
            </div>
            {/* RIGHT: OpenCLAW - static, never changes */}
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">{openclaw.title}</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {openclaw.description}
              </p>
              <div className="space-y-3">
                <div className="flex gap-2 text-sm">
                  <span className="text-cyan-400 font-medium shrink-0">{t("productTiers.openclawLabels.cloud")}:</span>
                  <span className="text-slate-400">{openclaw.cloudUse}</span>
                </div>
                <div className="flex gap-2 text-sm">
                  <span className="text-purple-400 font-medium shrink-0">{t("productTiers.openclawLabels.edge")}:</span>
                  <span className="text-slate-400">{openclaw.edgeUse}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison table - static, never changes */}
          <div className="overflow-x-auto rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">
                      {t("productTiers.tableHeader.feature")}
                    </th>
                    <th className="text-left py-4 px-6 text-cyan-400 font-medium">
                      {t("productTiers.tableHeader.cloud")}
                    </th>
                    <th className="text-left py-4 px-6 text-purple-400 font-medium">
                      {t("productTiers.tableHeader.edge")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(tableRows) &&
                    tableRows.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/20 transition-colors"
                      >
                        <td className="py-4 px-6 text-slate-300 font-medium">
                          {row.feature}
                        </td>
                        <td className="py-4 px-6 text-slate-400">{row.cloud}</td>
                        <td className="py-4 px-6 text-slate-400">{row.edge}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
        </motion.div>

        {/* CTA Upsell */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-400 mb-6">{t("productTiers.ctaText")}</p>
          <Button
            size="lg"
            onClick={() =>
              window.open("https://calendly.com/agentixvanguard/architecture-audit", "_blank")
            }
            className="group px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-[0_0_40px_rgba(0,229,255,0.2)] transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              {t("productTiers.ctaButton")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
