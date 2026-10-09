import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, CalendarCheck, Mail } from "lucide-react";
import { openCalendly } from "@/components/landing/motion";
import { SITE } from "@/config/site";

export default function FAQSection() {
    const { t, i18n } = useTranslation();
    const items = t("faq.items", { returnObjects: true });
    const [openIndex, setOpenIndex] = useState(null);

    // FAQPage structured data so Google can show these as rich results
    useEffect(() => {
        if (!Array.isArray(items)) return;
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "faq-schema";
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
        });
        document.getElementById("faq-schema")?.remove();
        document.head.appendChild(script);
        return () => script.remove();
        // items is a fresh array on every render; the language is what actually changes it
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    return (
        <section id="faq" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16">
                {/* Left: header + direct contact (sticky on desktop) */}
                <div className="lg:sticky lg:top-32 lg:self-start">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
                        <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">
                            {t("faq.badge")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        {t("faq.title")}{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {t("faq.titleHighlight")}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg">
                        {t("faq.subtitle")}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-slate-900/40 to-cyan-500/5 p-6"
                >
                    <h3 className="text-white font-semibold mb-2">{t("faq.moreTitle")}</h3>
                    <p className="text-sm text-slate-400 mb-5">{t("faq.moreText")}</p>
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                        <button
                            type="button"
                            onClick={openCalendly}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-colors"
                        >
                            <CalendarCheck className="w-4 h-4" />
                            {t("faq.moreCta")}
                        </button>
                        <a
                            href={`mailto:${SITE.email}`}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm text-slate-300 border border-slate-700 hover:border-cyan-500/40 hover:text-white transition-colors"
                        >
                            <Mail className="w-4 h-4 text-cyan-400" />
                            {SITE.email}
                        </a>
                    </div>
                </motion.div>
                </div>

                {/* Right: accordion */}
                <div className="space-y-3">
                    {Array.isArray(items) &&
                        items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 p-6 text-left group"
                                >
                                    <span className="text-white font-medium text-base group-hover:text-cyan-300 transition-colors">
                                        {item.question}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-cyan-400" : ""
                                            }`}
                                    />
                                </button>

                                <AnimatePresence initial={false}>
                                    {openIndex === i && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                </div>
            </div>
        </section>
    );
}
