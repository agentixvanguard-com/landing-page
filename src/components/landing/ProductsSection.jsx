import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight, Package } from "lucide-react";

const PRODUCTS = [
  {
    id: "smart-frontdesk",
    nameKey: "products.items.smartFrontDesk.name",
    descriptionKey: "products.items.smartFrontDesk.description",
    priceKey: "products.items.smartFrontDesk.price",
    ctaKey: "products.items.smartFrontDesk.cta",
    href: "https://smartfrontdesk.agentixvanguard.com",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function ProductsSection() {
  const { t } = useTranslation();

  return (
    <section id="productos" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#07101f] to-[#050a18]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 mb-5 text-cyan-400">
            <Package className="w-4 h-4" aria-hidden />
            <span className="text-xs font-medium tracking-widest uppercase">
              {t("products.badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {t("products.title")}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {t("products.titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {t("products.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PRODUCTS.map((product) => (
            <motion.a
              key={product.id}
              variants={cardVariants}
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-2xl border border-slate-700/60 bg-slate-900/40 p-7 sm:p-8 transition-colors duration-300 hover:border-cyan-500/40 hover:bg-slate-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {t(product.nameKey)}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-8">
                {t(product.descriptionKey)}
              </p>

              <div className="mt-auto space-y-4">
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {t(product.priceKey)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  {t(product.ctaKey)}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <p className="text-xs text-slate-600 break-all">
                  {product.href.replace(/^https?:\/\//, "")}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
