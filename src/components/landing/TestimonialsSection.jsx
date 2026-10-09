import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Briefcase, XCircle, CheckCircle2, ArrowDown } from "lucide-react";
import { SectionHeader, SpotlightCard, staggerContainer, fadeUp } from "@/components/landing/motion";

const accents = [
    { gradient: "from-cyan-400 to-blue-500", glow: "rgba(34,211,238,0.14)", chip: "border-cyan-500/30 text-cyan-300 bg-cyan-500/10" },
    { gradient: "from-violet-400 to-purple-500", glow: "rgba(168,85,247,0.14)", chip: "border-violet-500/30 text-violet-300 bg-violet-500/10" },
    { gradient: "from-emerald-400 to-teal-500", glow: "rgba(16,185,129,0.14)", chip: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10" },
];

export default function TestimonialsSection() {
    const { t } = useTranslation();
    const items = t("testimonials.items", { returnObjects: true });

    return (
        <section id="casos" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <SectionHeader
                    icon={Briefcase}
                    badge={t("testimonials.badge")}
                    title={t("testimonials.title")}
                    highlight={t("testimonials.titleHighlight")}
                    subtitle={t("testimonials.subtitle")}
                />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2, margin: "-50px" }}
                    className="grid gap-6 md:grid-cols-3"
                >
                    {Array.isArray(items) &&
                        items.map((item, i) => {
                            const a = accents[i % accents.length];
                            return (
                                <motion.div key={i} variants={fadeUp}>
                                    <SpotlightCard
                                        glow={a.glow}
                                        className="h-full flex flex-col p-7 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:border-slate-700 transition-colors duration-300"
                                    >
                                        <div className="relative flex flex-col flex-1">
                                            {/* Sector + service */}
                                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                                <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${a.chip}`}>
                                                    {item.sector}
                                                </span>
                                                <span className="text-xs text-slate-500">{item.service}</span>
                                            </div>

                                            {/* Metric */}
                                            <div className={`text-5xl font-bold bg-gradient-to-r ${a.gradient} bg-clip-text text-transparent mb-1 group-hover:scale-105 origin-left transition-transform duration-300`}>
                                                {item.metric}
                                            </div>
                                            <p className="text-sm text-slate-400 mb-6">{item.metricLabel}</p>

                                            {/* Before → After */}
                                            <div className="mt-auto space-y-2">
                                                <div className="rounded-xl border border-rose-500/10 bg-rose-500/[0.04] p-4">
                                                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-rose-300/80 mb-1.5">
                                                        <XCircle className="w-3.5 h-3.5" />
                                                        {t("testimonials.beforeLabel")}
                                                    </div>
                                                    <p className="text-sm text-slate-400 leading-relaxed">{item.before}</p>
                                                </div>
                                                <div className="flex justify-center">
                                                    <ArrowDown className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-all" />
                                                </div>
                                                <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.05] p-4">
                                                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300/90 mb-1.5">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        {t("testimonials.afterLabel")}
                                                    </div>
                                                    <p className="text-sm text-slate-200 leading-relaxed">{item.after}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            );
                        })}
                </motion.div>

                <p className="text-center text-slate-600 text-xs mt-8">
                    {t("testimonials.disclaimer")}
                </p>
            </div>
        </section>
    );
}
