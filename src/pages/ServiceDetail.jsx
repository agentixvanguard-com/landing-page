import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildServiceCatalog } from "@/data/serviceCatalog";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const services = buildServiceCatalog(t, i18n.language);
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#050a18] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">Service not found</h1>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">Back to landing</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen py-20 overflow-hidden bg-[#050a18]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#0a1628] to-[#050a18]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">{t("services.badge")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{service.title}</h1>
          <p className="text-cyan-300 font-medium mb-6">{service.subtitle}</p>
          <p className="text-slate-300 leading-relaxed mb-8">{service.description}</p>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 mb-10">
            <h2 className="text-lg font-semibold text-white mb-4">Capabilities</h2>
            <ul className="space-y-2">
              {(service.features || []).map((feature, index) => (
                <li key={index} className="text-slate-300 text-sm">• {feature}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 mb-10">
            <h3 className="text-white font-semibold mb-2">Business impact</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {i18n.language?.startsWith("es")
                ? "Diseno orientado a reduccion de costos operativos, continuidad de servicio y mejor experiencia para residentes y operaciones."
                : "Designed for lower operating costs, stronger service continuity, and a better experience for residents and operations teams."}
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => window.open("https://calendly.com/agentixvanguard/architecture-audit", "_blank")}
            className="group px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl"
          >
            <span className="flex items-center gap-2">
              {t("cta.button")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
