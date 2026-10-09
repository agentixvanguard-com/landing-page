import React, { useEffect } from "react";
import { MotionConfig, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Cpu } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import TrustSection from "@/components/landing/TrustSection";
import ProductTiersSection from "@/components/landing/ProductTiersSection";
import ArchAISection from "@/components/landing/ArchAISection";
import AITechSection from "@/components/landing/AITechSection";
import OuroborosSection from "@/components/landing/OuroborosSection";
import TechStackSection from "@/components/landing/TechStackSection";
import TeamSection from "@/components/landing/TeamSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import { ScrollProgress } from "@/components/landing/motion";

/** Technical deep dive: architecture, stack, security and team — kept off the sales page. */
export default function Platform() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-[#050a18] min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <Navbar />

        <header className="relative pt-40 pb-16 sm:pt-48 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.12)_0%,transparent_60%)] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 mb-6">
                <Cpu className="w-3.5 h-3.5" />
                <span className="text-xs font-medium tracking-widest uppercase">{t("platformPage.badge")}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                {t("platformPage.title")}{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-gradient-animate">
                  {t("platformPage.titleHighlight")}
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t("platformPage.subtitle")}</p>
            </motion.div>
          </div>
        </header>

        <div id="seguridad"><TrustSection /></div>
        <ProductTiersSection />
        <ArchAISection />
        <AITechSection />
        <div id="protocolo"><OuroborosSection /></div>
        <div id="stack"><TechStackSection /></div>
        <TeamSection />
        <CTASection />
        <Footer />
      </div>
    </MotionConfig>
  );
}
