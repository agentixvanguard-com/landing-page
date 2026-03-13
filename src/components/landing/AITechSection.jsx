import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// React component to render the exact logos
const TechLogo = ({ name }) => {
    switch (name) {
        case "Anthropic Claude":
            return (
                <div className="flex justify-center items-center h-16 mb-6" title="Anthropic Claude Logo">
                    <span className="font-serif text-[52px] font-medium tracking-tighter text-white leading-none">AI</span>
                </div>
            );
        case "OpenAI (GPT-4o)":
            return (
                <div className="flex justify-center items-center h-16 mb-6">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="OpenAI Logo">
                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829V6.0505a.0804.0804 0 0 1 .0332-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66v5.5826a.7664.7664 0 0 1-.3879.6765l-5.3138 3.0646v-5.4347zM8.598 4.5453a4.485 4.485 0 0 1 5.9224.232l-.142-.0804-4.783-2.7535a.7712.7712 0 0 0-.7806 0L3.0003 5.3119a.0804.0804 0 0 1-.038-.052V5.21c0-2.4826 2.015-4.4944 4.4992-4.4944h.0049zm.601 2.152l3.417-1.9728 3.417 1.9728v3.955l-3.417 1.9728-3.417-1.9728V6.6973z" />
                    </svg>
                </div>
            );
        case "Google Gemini":
            return (
                <div className="flex justify-center items-center h-16 mb-6">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-sm" role="img" aria-label="Google Gemini Logo">
                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
                        </svg>
                        <span className="font-ProductSans text-xl font-medium text-slate-800 tracking-tight">Gemini</span>
                    </div>
                </div>
            );
        case "Microsoft Copilot Studio":
            return (
                <div className="flex justify-center items-center h-16 mb-6">
                    <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Microsoft Copilot Logo">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4.5C16.14 4.5 19.5 7.86 19.5 12C19.5 16.14 16.14 19.5 12 19.5C7.86 19.5 4.5 16.14 4.5 12C4.5 7.86 7.86 4.5 12 4.5Z" fill="url(#paint0_linear)" />
                        <path d="M12 7.5C9.51 7.5 7.5 9.51 7.5 12C7.5 14.49 9.51 16.5 12 16.5C14.49 16.5 16.5 14.49 16.5 12C16.5 9.51 14.49 7.5 12 7.5Z" fill="url(#paint1_linear)" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#3b82f6" />
                                <stop offset="1" stopColor="#8b5cf6" />
                            </linearGradient>
                            <linearGradient id="paint1_linear" x1="7.5" y1="12" x2="16.5" y2="12" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#emerald-400" />
                                <stop offset="1" stopColor="#10b981" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            );
        case "Microsoft AutoGen":
            return (
                <div className="flex justify-center items-center h-16 mb-6">
                    <div className="bg-slate-200 text-slate-900 font-bold text-3xl px-3 py-1.5 rounded-sm tracking-tighter" role="img" aria-label="Microsoft AutoGen Logo">
                        AG
                    </div>
                </div>
            );
        case "Agentic Skills Framework & Hybrid RAG (Vector + Neo4j)":
            return (
                <div className="flex justify-center items-center h-16 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm tracking-tight" role="img" aria-label="Agentic Skills Framework Logo">
                        AS
                    </div>
                </div>
            );
        default:
            return null;
    }
};

export default function AITechSection() {
    const { t } = useTranslation();
    const items = t('aiTech.items', { returnObjects: true });

    return (
        <section id="tecnologias" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Minimalist Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6 tracking-tight">
                        {t('aiTech.title')}{" "}
                        <span className="text-white">
                            {t('aiTech.titleHighlight')}
                        </span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-slate-400 text-lg font-light">
                        {t('aiTech.subtitle')}
                    </p>
                </motion.div>

                {/* Clean, borderless grid layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid gap-x-12 gap-y-20 md:grid-cols-2 lg:grid-cols-3"
                >
                    {Array.isArray(items) && items.map((tech, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            className="flex flex-col text-left"
                        >
                            {/* Centered Logo block relative to the column */}
                            <TechLogo name={tech.name} />

                            {/* Text content */}
                            <h3 className="text-lg font-medium text-white mb-3">
                                {tech.name}
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-sm font-light">
                                {tech.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
