import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, Zap, ArrowRight, Cpu } from "lucide-react";
import { SectionHeader, staggerContainer, fadeUp } from "@/components/landing/motion";

const icons = [Lock, Eye, Server, Zap];

/** Home-page summary of security & architecture; the full technical story lives on /plataforma. */
export default function PlatformTeaserSection() {
  const { t } = useTranslation();
  const items = t("trust.items", { returnObjects: true });
  const highlights = Array.isArray(items) ? items.slice(0, 4) : [];

  return (
    <section id="seguridad" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <SectionHeader
            icon={Shield}
            tone="purple"
            align="left"
            badge={t("platformTeaser.badge")}
            title={t("platformTeaser.title")}
            highlight={t("platformTeaser.titleHighlight")}
            subtitle={t("platformTeaser.subtitle")}
            className="mb-8"
          />
          <motion.div whileHover={{ x: 4 }} className="inline-block">
            <Link
              to="/plataforma"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-200 hover:border-purple-400/60 hover:text-white transition-colors"
            >
              <Cpu className="w-4 h-4" />
              <span className="text-sm font-semibold">{t("platformTeaser.cta")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-60px" }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {highlights.map((point, i) => {
            const Icon = icons[i] ?? Lock;
            return (
              <motion.li
                key={i}
                variants={fadeUp}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:border-purple-500/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-purple-300" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{point.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{point.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
