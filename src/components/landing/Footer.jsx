import React from "react";
import { useTranslation } from "react-i18next";

const footerLinkKeys = ["footer.services", "footer.protocol", "footer.stack", "footer.security", "footer.contact"];

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative py-12 border-t border-slate-800/50 bg-[#050a18]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center gap-1.5 shrink-0">
            <img src="/logo.png" alt="" className="h-12 w-auto object-contain flex-shrink-0" aria-hidden />
            <div className="flex flex-col items-center justify-center leading-none">
              <span className="text-white font-bold text-xl tracking-[0.1em] uppercase">Agentix</span>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-10 h-[2px] flex-shrink-0 bg-gradient-to-r from-transparent to-cyan-500 rounded-full" aria-hidden />
                <span className="text-white font-semibold text-xs tracking-[0.25em] uppercase">Vanguard</span>
                <span className="w-10 h-[2px] flex-shrink-0 bg-gradient-to-l from-transparent to-purple-500 rounded-full" aria-hidden />
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {footerLinkKeys.map((key) => (
              <button key={key} className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                {t(key)}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-600">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}