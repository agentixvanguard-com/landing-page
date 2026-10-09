import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Building2, Radar, PlayCircle, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openCalendly } from "@/components/landing/motion";
import { SITE } from "@/config/site";

const navLinkKeys = [
  { labelKey: "nav.solutions", href: "#servicios", mega: true },
  { labelKey: "nav.products", href: "#productos" },
  { labelKey: "nav.how", href: "#como-funciona" },
  { labelKey: "nav.cases", href: "#casos" },
  { labelKey: "nav.plans", href: "#planes" },
  { labelKey: "nav.platform", route: "/plataforma" },
];

const industries = [
  { key: "enterprise", icon: Building2, count: 5, accent: "from-cyan-400 to-blue-500" },
  { key: "iot", icon: Radar, count: 5, accent: "from-violet-400 to-purple-500" },
];

/** Returns the href of the nav section currently in the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = navLinkKeys
      .filter((l) => l.href)
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Logo({ compact, onClick }) {
  return (
    <a href="#" onClick={onClick} className="group flex items-center gap-3 shrink-0" aria-label="Agentix Vanguard">
      <motion.img
        src="/logo.png"
        alt=""
        aria-hidden
        animate={{ height: compact ? 36 : 44 }}
        transition={{ duration: 0.3 }}
        whileHover={{ rotate: -6, scale: 1.06 }}
        className="w-auto object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]"
      />
      <div className="flex flex-col leading-none">
        <span className="text-white font-bold text-lg tracking-[0.14em] uppercase">Agentix</span>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-transparent to-cyan-400" aria-hidden />
          <span className="text-[10px] font-semibold tracking-[0.32em] uppercase text-slate-300 group-hover:text-cyan-300 transition-colors">Vanguard</span>
          <span className="w-4 h-[2px] rounded-full bg-gradient-to-l from-transparent to-purple-500" aria-hidden />
        </div>
      </div>
    </a>
  );
}

function LanguageSwitch({ size = "sm" }) {
  const { t, i18n } = useTranslation();
  const current = i18n.language?.startsWith("es") ? "es" : "en";
  const pad = size === "lg" ? "px-4 py-2 text-sm" : "px-2.5 py-1 text-xs";
  return (
    <div role="group" aria-label={t("nav.menu.language")} className="flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-900/40 p-0.5">
      <Globe className={`text-slate-500 ml-1.5 ${size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5"}`} aria-hidden />
      {["es", "en"].map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          className={`relative ${pad} font-medium rounded-md transition-colors ${current === lng ? "text-cyan-300" : "text-slate-400 hover:text-slate-200"}`}
        >
          {current === lng && (
            <motion.span
              layoutId={`lang-pill-${size}`}
              className="absolute inset-0 rounded-md bg-cyan-500/15 border border-cyan-500/25"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative uppercase">{lng}</span>
        </button>
      ))}
    </div>
  );
}

function SolutionsMenu({ onSelect, onDemo }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[640px]"
    >
      <div className="grid grid-cols-5 gap-2 rounded-2xl border border-slate-700/60 bg-[#0a1628]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/50">
        <div className="col-span-3 flex flex-col gap-1">
          {industries.map(({ key, icon: Icon, count, accent }, i) => (
            <motion.button
              key={key}
              type="button"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i }}
              onClick={() => onSelect(key)}
              className="group flex items-start gap-3 rounded-xl p-3 text-left hover:bg-white/[0.04] transition-colors"
            >
              <span className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${accent} p-[1px]`}>
                <span className="w-full h-full rounded-lg bg-[#0a1628] flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                </span>
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-semibold text-white">
                  {t(`services.tabs.${key}`)}
                  <span className="text-[10px] font-medium text-slate-500">{count} {t("nav.menu.services")}</span>
                </span>
                <span className="block text-xs text-slate-400 mt-0.5 leading-snug">{t(`nav.menu.${key}`)}</span>
              </span>
            </motion.button>
          ))}
        </div>

        <button
          type="button"
          onClick={onDemo}
          className="group col-span-2 relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/15 p-4 text-left flex flex-col"
        >
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-purple-500/20 blur-2xl group-hover:scale-125 transition-transform duration-500" />
          {/* Mini agent pipeline */}
          <div className="relative flex items-center gap-1.5 mb-auto">
            {["bg-rose-400", "bg-cyan-400", "bg-violet-400", "bg-amber-300", "bg-emerald-400"].map((c, i) => (
              <React.Fragment key={c}>
                <motion.span
                  className={`w-2.5 h-2.5 rounded-full ${c}`}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25 }}
                />
                {i < 4 && <span className="flex-1 h-px bg-slate-600" />}
              </React.Fragment>
            ))}
          </div>
          <div className="relative mt-8">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <PlayCircle className="w-4 h-4 text-cyan-300" />
              {t("nav.menu.demoTitle")}
            </span>
            <span className="block text-xs text-slate-400 mt-1 leading-snug">{t("nav.menu.demoDesc")}</span>
            <ArrowRight className="w-4 h-4 text-cyan-300 mt-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef(null);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll while the mobile menu is open; Escape closes any open menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMegaOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // Section links live on the home page; from any other page, go home first (Home scrolls to the hash)
  const scrollTo = (id) => {
    setMobileOpen(false);
    setMegaOpen(false);
    const el = pathname === "/" && document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate(`/${id}`);
  };

  const followLink = (link) => {
    if (!link.route) return scrollTo(link.href);
    setMobileOpen(false);
    setMegaOpen(false);
    navigate(link.route);
  };

  const selectIndustry = (key) => {
    window.dispatchEvent(new CustomEvent("services:tab", { detail: key }));
    scrollTo("#servicios");
  };

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const goTop = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const island = scrolled && !mobileOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-500 ${island ? "px-3 sm:px-6 pt-3" : "px-0 pt-0"}`}
      >
        <nav
          className={`relative mx-auto flex items-center justify-between gap-6 transition-all duration-500 ${island
            ? "max-w-6xl rounded-2xl border border-slate-700/50 bg-[#050a18]/75 backdrop-blur-xl px-4 sm:px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
            : "max-w-6xl border border-transparent px-6 py-4"
            }`}
        >
          {/* Glow line under the floating island */}
          {island && (
            <span className="pointer-events-none absolute inset-x-10 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          )}

          <Logo compact={island} onClick={goTop} />

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinkKeys.map((link) => {
              const isActive = link.route ? pathname === link.route : activeSection === link.href;
              const content = (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{t(link.labelKey)}</span>
                  {link.mega && (
                    <ChevronDown className={`relative w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180 text-cyan-300" : ""}`} />
                  )}
                </>
              );
              const cls = `relative flex items-center gap-1 px-3.5 py-2 text-sm rounded-lg transition-colors duration-200 ${isActive || (link.mega && megaOpen) ? "text-white" : "text-slate-400 hover:text-white"}`;

              if (!link.mega) {
                return (
                  <button key={link.labelKey} type="button" onClick={() => followLink(link)} className={cls}>
                    {content}
                  </button>
                );
              }
              return (
                <div key={link.labelKey} className="relative" onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((o) => !o)}
                    className={cls}
                  >
                    {content}
                  </button>
                  <AnimatePresence>
                    {megaOpen && <SolutionsMenu onSelect={selectIndustry} onDemo={() => scrollTo("#en-accion")} />}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitch />
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="sm"
                onClick={openCalendly}
                className="group relative overflow-hidden btn-shine h-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold px-5 rounded-xl shadow-[0_0_24px_rgba(0,229,255,0.25)]"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {t("nav.contact")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile toggle: animated burger ↔ X */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("nav.menu.close") : t("nav.menu.open")}
            className="lg:hidden relative w-11 h-11 rounded-xl border border-slate-700/60 bg-slate-900/50 flex items-center justify-center"
          >
            <span className="relative w-5 h-3.5">
              <motion.span
                className="absolute left-0 right-0 h-0.5 rounded-full bg-white"
                animate={mobileOpen ? { top: "50%", rotate: 45, y: "-50%" } : { top: 0, rotate: 0, y: 0 }}
              />
              <motion.span
                className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full bg-white"
                animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
              />
              <motion.span
                className="absolute left-0 right-0 h-0.5 rounded-full bg-white"
                animate={mobileOpen ? { bottom: "50%", rotate: -45, y: "50%" } : { bottom: 0, rotate: 0, y: 0 }}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#050a18]/97 backdrop-blur-xl overflow-y-auto"
          >
            <div className="absolute top-1/4 -right-20 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative min-h-full flex flex-col px-6 pt-28 pb-8">
              <nav className="flex flex-col">
                {navLinkKeys.map((link, i) => (
                  <motion.div
                    key={link.labelKey}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="border-b border-slate-800/80"
                  >
                    <button
                      type="button"
                      onClick={() => followLink(link)}
                      className="group w-full flex items-center gap-4 py-4 text-left"
                    >
                      <span className="text-xs font-mono text-cyan-400/70">0{i + 1}</span>
                      <span className="flex-1 text-2xl font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {t(link.labelKey)}
                      </span>
                      <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </button>
                    {link.mega && (
                      <div className="flex flex-wrap gap-2 pb-4 pl-8">
                        {industries.map(({ key, icon: Icon }) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => selectIndustry(key)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/70 bg-slate-900/60 text-xs text-slate-300"
                          >
                            <Icon className="w-3.5 h-3.5 text-cyan-400" />
                            {t(`services.tabs.${key}`)}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-auto pt-10 flex flex-col gap-5"
              >
                <Button
                  onClick={openCalendly}
                  className="relative overflow-hidden btn-shine w-full py-6 text-base font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("nav.contact")}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <div className="flex items-center justify-between gap-4">
                  <LanguageSwitch size="lg" />
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 truncate">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="truncate">{SITE.email}</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
