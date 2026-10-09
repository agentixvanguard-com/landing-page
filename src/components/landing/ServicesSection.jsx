import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Headset, Megaphone, Users, ShieldAlert, Cpu, ArrowRight, Sparkles,
  DoorOpen, Car, Cctv, ClipboardList, Gavel, Package, ParkingSquare, Truck, Languages,
  Building2, Radar, Home,
} from "lucide-react";
import { buildServiceCatalog } from "@/data/serviceCatalog";
import { SectionHeader, SpotlightCard } from "@/components/landing/motion";

const palette = {
  cyan: { accent: "from-cyan-400 to-blue-500", glowColor: "rgba(0,229,255,0.15)", borderColor: "border-cyan-500/20" },
  emerald: { accent: "from-emerald-400 to-teal-600", glowColor: "rgba(52,211,153,0.15)", borderColor: "border-emerald-500/20" },
  orange: { accent: "from-orange-400 to-red-500", glowColor: "rgba(249,115,22,0.15)", borderColor: "border-orange-500/20" },
  violet: { accent: "from-violet-400 to-purple-600", glowColor: "rgba(139,92,246,0.15)", borderColor: "border-violet-500/20" },
  rose: { accent: "from-rose-400 to-pink-600", glowColor: "rgba(244,63,94,0.15)", borderColor: "border-rose-500/20" },
  blue: { accent: "from-blue-400 to-indigo-600", glowColor: "rgba(59,130,246,0.15)", borderColor: "border-blue-500/20" },
};

// Category, icon and color per service slug
const serviceMeta = {
  "omnichannel-ai-agents": { category: "enterprise", icon: MessageSquare, color: "cyan" },
  "ai-voice-telephony": { category: "enterprise", icon: Headset, color: "emerald" },
  "ai-marketing-automation": { category: "enterprise", icon: Megaphone, color: "orange" },
  "ai-hr-management": { category: "enterprise", icon: Users, color: "violet" },
  "ai-risk-compliance": { category: "enterprise", icon: ShieldAlert, color: "rose" },
  "vod-multilingual-dubbing": { category: "enterprise", icon: Languages, color: "blue" },
  "autonomous-iot-telematics": { category: "iot", icon: Truck, color: "blue" },
  "autonomous-access-lpr": { category: "iot", icon: Car, color: "cyan" },
  "perimeter-sentinel-ai": { category: "iot", icon: Cctv, color: "rose" },
  "virtual-concierge-ai": { category: "iot", icon: DoorOpen, color: "violet" },
  "coexistence-enforcement-ai": { category: "iot", icon: Gavel, color: "orange" },
  "pqrs-whatsapp-automation": { category: "enterprise", icon: ClipboardList, color: "emerald" },
  "smart-delivery-locker": { category: "residential", icon: Package, color: "cyan" },
  "visitor-parking-control": { category: "residential", icon: ParkingSquare, color: "blue" },
  "moving-audit-monitoring": { category: "residential", icon: Home, color: "rose" },
};

const tabs = [
  { key: "enterprise", icon: Building2 },
  { key: "iot", icon: Radar },
];

export default function ServicesSection() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("enterprise");
  const items = buildServiceCatalog(t, i18n.language);

  // The navbar's solutions menu selects an industry tab through this event
  useEffect(() => {
    const onSelect = (e) => setActiveTab(e.detail);
    window.addEventListener("services:tab", onSelect);
    return () => window.removeEventListener("services:tab", onSelect);
  }, []);

  const visible = Array.isArray(items)
    ? items.filter((item) => (serviceMeta[item.slug]?.category ?? "enterprise") === activeTab)
    : [];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050a18]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeader
          icon={Sparkles}
          tone="purple"
          badge={t('services.badge')}
          title={t('services.title')}
          highlight={t('services.titleHighlight')}
          subtitle={t('services.subtitle')}
          className="mb-10"
        />

        {/* Industry tabs */}
        <div role="tablist" className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;
            const total = Array.isArray(items)
              ? items.filter((item) => (serviceMeta[item.slug]?.category ?? "enterprise") === tab.key).length
              : 0;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? "text-white" : "text-slate-400 hover:text-white"}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="services-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 shadow-[0_0_24px_rgba(168,85,247,0.15)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <TabIcon className="relative w-4 h-4" />
                <span className="relative">{t(`services.tabs.${tab.key}`)}</span>
                <span className={`relative text-[11px] px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/10 text-white" : "bg-slate-800 text-slate-500"}`}>
                  {total}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => {
              const meta = serviceMeta[item.slug] ?? { icon: Cpu, color: "cyan" };
              const serviceStyle = palette[meta.color];
              const IconComponent = meta.icon;
              return (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                  className="h-full"
                >
                  <SpotlightCard
                    glow={serviceStyle.glowColor}
                    role="article"
                    aria-label={`Servicio: ${item.title}`}
                    className={`h-full rounded-2xl border ${serviceStyle.borderColor} bg-gradient-to-b from-slate-900/80 to-[#050a18] backdrop-blur-sm p-8 hover:border-slate-600 transition-colors duration-500`}
                  >
                    {/* Glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `inset 0 0 60px ${serviceStyle.glowColor}` }}
                    />

                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${serviceStyle.accent} p-[1px] mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                        <div className="w-full h-full rounded-xl bg-[#0a1628] flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-cyan-400/80 font-medium mb-4">{item.subtitle}</p>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">{item.description}</p>

                      <ul className="space-y-2 mb-6">
                        {(item.features || []).map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs text-slate-400">
                            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${serviceStyle.accent}`} aria-hidden="true" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Link
                        to={`/services/${item.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-cyan-400 transition-colors"
                      >
                        {t('services.explore')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
