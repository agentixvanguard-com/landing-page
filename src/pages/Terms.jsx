import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";

export default function Terms() {
  const { t } = useTranslation();
  const sections = t("legal.terms.sections", { returnObjects: true });

  return (
    <div className="min-h-screen bg-[#050a18]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#080e20] to-[#050a18]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("legal.backToHome")}
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {t("legal.terms.title")}
              </h1>
              <p className="text-sm text-slate-500">{t("legal.terms.lastUpdated")}</p>
            </div>
          </div>

          <div className="prose prose-invert prose-slate max-w-none space-y-10">
            {Array.isArray(sections) &&
              sections.map((section, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-6 sm:p-8"
                >
                  <h2 className="text-lg font-bold text-white mb-4">{section.title}</h2>
                  <div className="text-slate-400 text-sm leading-relaxed space-y-4">
                    {Array.isArray(section.paragraphs) ? (
                      section.paragraphs.map((p, j) => <p key={j}>{p}</p>)
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </div>
                </div>
              ))}
          </div>

          <p className="mt-12 text-xs text-slate-600">
            {t("legal.terms.contact")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
