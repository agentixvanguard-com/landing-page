import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const avatarColors = [
    "from-cyan-500 to-blue-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TestimonialsSection() {
    const { t } = useTranslation();
    const items = t("testimonials.items", { returnObjects: true });

    return (
        <section className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/3 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6">
                        <Quote className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">
                            {t("testimonials.badge")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        {t("testimonials.title")}{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {t("testimonials.titleHighlight")}
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t("testimonials.subtitle")}
                    </p>
                </motion.div>

                {/* Testimonial Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-6 md:grid-cols-3"
                >
                    {Array.isArray(items) &&
                        items.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                className="relative flex flex-col justify-between p-8 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300"
                            >
                                {/* Quote icon */}
                                <div className="text-slate-700 mb-4">
                                    <Quote className="w-8 h-8" />
                                </div>

                                {/* Testimonial text */}
                                <p className="text-slate-300 text-sm leading-relaxed italic flex-1 mb-8">
                                    "{item.quote}"
                                </p>

                                {/* Metric highlight */}
                                <div className="mb-6 px-4 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 inline-block self-start">
                                    <span className={`text-xl font-bold bg-gradient-to-r ${avatarColors[i]} bg-clip-text text-transparent`}>
                                        {item.metric}
                                    </span>
                                    <p className="text-slate-400 text-xs mt-0.5">{item.metricLabel}</p>
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br ${avatarColors[i]} text-white font-bold text-sm flex-shrink-0`}>
                                        {item.initials}
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold">{item.name}</p>
                                        <p className="text-slate-500 text-xs">{item.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </motion.div>

                {/* Disclaimer for mock data */}
                <p className="text-center text-slate-600 text-xs mt-8">
                    {t("testimonials.disclaimer")}
                </p>
            </div>
        </section>
    );
}
