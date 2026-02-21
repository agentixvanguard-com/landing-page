import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinkKeys = [
  { labelKey: "nav.services", href: "#servicios" },
  { labelKey: "nav.tech", href: "#tecnologias" },
  { labelKey: "nav.protocol", href: "#protocolo" },
  { labelKey: "nav.stack", href: "#stack" },
  { labelKey: "nav.security", href: "#seguridad" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentLng = i18n.language?.startsWith('es') ? 'es' : 'en';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[#050a18]/90 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/20"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col items-center justify-center shrink-0" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileOpen(false); }}>
            <img src="/logo.png" alt="" className="h-12 sm:h-14 w-auto object-contain flex-shrink-0 mb-1.5" aria-hidden />
            <div className="flex flex-col items-center justify-center leading-none">
              <span className="text-white font-bold text-lg sm:text-2xl tracking-[0.1em] uppercase">Agentix</span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-8 sm:w-10 h-[2px] flex-shrink-0 bg-gradient-to-r from-transparent to-cyan-500 rounded-full" aria-hidden />
                <span className="text-white font-semibold text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase">Vanguard</span>
                <span className="w-8 sm:w-10 h-[2px] flex-shrink-0 bg-gradient-to-l from-transparent to-purple-500 rounded-full" aria-hidden />
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinkKeys.map((link) => (
              <button
                key={link.labelKey}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                {t(link.labelKey)}
              </button>
            ))}
            {/* Language switcher */}
            <div className="flex items-center gap-1 border border-slate-700/50 rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => i18n.changeLanguage('es')}
                aria-label="Cambiar idioma a español"
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${currentLng === 'es' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => i18n.changeLanguage('en')}
                aria-label="Change language to english"
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${currentLng === 'en' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Button
              size="sm"
              onClick={() => window.open("https://calendly.com/agentixvanguard/architecture-audit", "_blank")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold px-5 rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.2)]"
            >
              {t('nav.contact')}
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden text-slate-400 hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 pt-24 bg-[#050a18]/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-6 pt-12">
              {navLinkKeys.map((link) => (
                <button
                  key={link.labelKey}
                  onClick={() => scrollTo(link.href)}
                  className="text-lg text-slate-300 hover:text-white transition-colors"
                >
                  {t(link.labelKey)}
                </button>
              ))}
              <div className="flex items-center gap-1 border border-slate-700/50 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => i18n.changeLanguage('es')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${currentLng === 'es' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${currentLng === 'en' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  EN
                </button>
              </div>
              <Button
                onClick={() => window.open("https://calendly.com/agentixvanguard/architecture-audit", "_blank")}
                className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-6 text-base rounded-xl"
              >
                {t('nav.contact')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}