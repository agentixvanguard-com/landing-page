import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Newspaper, Calendar, ArrowRight } from "lucide-react";

const blogSlugs = [
    "ai-agent-roi-measuring-autonomy",
    "swarms-vs-chatbots-multi-agent-era",
    "ouroboros-protocol-adversarial-ai-security",
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BlogSection() {
    const { t } = useTranslation();
    const items = t("blog.items", { returnObjects: true });

    return (
        <section id="insights" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.05)_0%,transparent_50%)]" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
                >
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-6">
                            <Newspaper className="w-3.5 h-3.5 text-purple-400" />
                            <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">
                                {t("blog.badge")}
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                            {t("blog.title")}{" "}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {t("blog.titleHighlight")}
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg mt-4 font-light">
                            {t("blog.subtitle")}
                        </p>
                    </div>
                </motion.div>

                {/* Blog Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-8 md:grid-cols-3"
                >
                    {Array.isArray(items) &&
                        items.map((post, i) => (
                            <motion.article
                                key={i}
                                variants={cardVariants}
                                className="group relative flex flex-col p-6 rounded-3xl border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 hover:border-slate-700 transition-all duration-300"
                            >
                                {/* Meta */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                                        {post.tag}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                                    {post.description}
                                </p>

                                {/* Action */}
                                <Link
                                    to={`/blog/${blogSlugs[i] || `post-${i + 1}`}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all"
                                >
                                    {t("blog.readMore")}
                                    <ArrowRight className="w-4 h-4 text-purple-500" />
                                </Link>
                            </motion.article>
                        ))}
                </motion.div>
            </div>
        </section>
    );
}
