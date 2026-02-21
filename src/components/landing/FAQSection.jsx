import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQSection() {
    const { t } = useTranslation();
    const items = t("faq.items", { returnObjects: true });
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
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
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        {t("faq.subtitle")}
                    </p>
                </motion.div>

                {/* Accordion Items */}
                <div className="space-y-3">
                    {Array.isArray(items) &&
                        items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
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
