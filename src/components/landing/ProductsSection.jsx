import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Headset,
  Package,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { track } from "@/lib/analytics";

const productIcons = {
  "smart-frontdesk": Headset,
};

const highlightIcons = [PhoneCall, Clock3, Sparkles];

export default function ProductsSection() {
  const { t } = useTranslation();
  const copy = t("products.items", { returnObjects: true });
  const products = SITE.products
    .map((product) => {
      const item = Array.isArray(copy) ? copy.find((c) => c.id === product.id) : null;
      return { ...product, ...item };
    })
    .filter((p) => p.name && p.url);

  if (!products.length) return null;

  const [featured, ...rest] = products;

  return (
    <section id="productos" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#07111f] to-[#050a18]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute -left-24 top-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute -right-16 bottom-0 w-80 h-80 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Compact header — not another full marketing block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 mb-4">
              <Package className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300">
                {t("products.badge")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
              {t("products.title")}{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                {t("products.titleHighlight")}
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-slate-400 text-base sm:text-lg">
              {t("products.subtitle")}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 sm:text-right max-w-[14rem] leading-relaxed">
            {t("products.aside")}
          </p>
        </motion.div>

        {/* Featured product — horizontal showcase */}
        <FeaturedProduct product={featured} cta={t("products.cta")} live={t("products.live")} />

        {rest.length > 0 && (
          <div className="mt-6 grid md:grid-cols-2 gap-5">
            {rest.map((product) => (
              <SecondaryProduct key={product.id} product={product} cta={t("products.cta")} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedProduct({ product, cta, live }) {
  const Icon = productIcons[product.id] ?? Package;
  const highlights = Array.isArray(product.highlights) ? product.highlights : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="group relative rounded-[1.75rem] p-[1px] bg-gradient-to-br from-cyan-400/60 via-slate-700/40 to-blue-600/50 shadow-[0_0_80px_rgba(0,229,255,0.08)]"
    >
      <div className="relative overflow-hidden rounded-[1.7rem] bg-[#070d1a]/95 backdrop-blur-xl">
        {/* Soft grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none group-hover:bg-cyan-400/25 transition-colors duration-700" />

        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-0">
          {/* Copy column */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px] shadow-[0_0_24px_rgba(0,229,255,0.25)]">
                <div className="w-full h-full rounded-2xl bg-[#0a1628] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-200" />
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-[11px] font-medium text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {live}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              {product.name}
            </h3>
            <p className="text-slate-300 text-base leading-relaxed mb-8 max-w-lg">
              {product.description}
            </p>

            {highlights.length > 0 && (
              <ul className="grid sm:grid-cols-1 gap-3 mb-8">
                {highlights.map((item, i) => {
                  const HIcon = highlightIcons[i] ?? Check;
                  return (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <span className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <HIcon className="w-3.5 h-3.5 text-cyan-300" />
                      </span>
                      <span className="pt-1.5 leading-snug">{item}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-4">
              <Button
                asChild
                className="relative overflow-hidden btn-shine group/btn h-12 px-7 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_36px_rgba(0,229,255,0.28)]"
              >
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("product_click", { product: product.id })}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {cta}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </span>
                </a>
              </Button>
              <span className="text-xs text-slate-500 font-mono tracking-wide">
                {product.host}
              </span>
            </div>
          </div>

          {/* Price / CTA panel */}
          <div className="relative border-t lg:border-t-0 lg:border-l border-white/5 bg-gradient-to-b from-cyan-500/[0.07] to-transparent p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-3">
                {product.priceLabel}
              </p>
              <p className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                {product.price}
              </p>
              {product.priceNote && (
                <p className="mt-2 text-sm text-slate-500">{product.priceNote}</p>
              )}
            </div>

            <div className="mt-10 space-y-3">
              {(product.perks || []).map((perk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-slate-300"
                >
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  {perk}
                </div>
              ))}
            </div>

            {/* Decorative fake UI chip */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Headset className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white">{product.name}</p>
                  <p className="text-[10px] text-emerald-400">{live}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-4/5 rounded-full bg-slate-700/80" />
                <div className="h-1.5 w-3/5 rounded-full bg-slate-700/50" />
                <div className="h-1.5 w-2/3 rounded-full bg-cyan-500/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SecondaryProduct({ product, cta }) {
  const Icon = productIcons[product.id] ?? Package;
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("product_click", { product: product.id })}
      className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-7 hover:border-cyan-500/30 hover:bg-slate-900/70 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <Icon className="w-4 h-4 text-cyan-300" />
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
      <p className="text-sm text-slate-400 flex-1 mb-4">{product.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-cyan-300">{product.price}</span>
        <span className="text-slate-500 group-hover:text-white transition-colors">{cta}</span>
      </div>
    </a>
  );
}
