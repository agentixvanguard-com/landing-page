import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Linkedin, Twitter, ExternalLink } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative py-20 border-t border-slate-800/50 bg-[#050a18] overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-1.5 shrink-0">
              <img src="/logo.png" alt="" className="h-10 w-auto object-contain flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-white font-bold text-lg tracking-[0.1em] uppercase">Agentix</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cyan-500 rounded-full" aria-hidden="true" />
                  <span className="text-white font-semibold text-[10px] tracking-[0.25em] uppercase">Vanguard</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              {t('footer.columns.resources.title')}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/docs" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                  {t('footer.columns.resources.docs')}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/status" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                  {t('footer.columns.resources.status')}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/support" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                  {t('footer.columns.resources.support')}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              {t('footer.columns.legal.title')}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                  {t('footer.columns.legal.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                  {t('footer.columns.legal.terms')}
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">
                  {t('footer.columns.legal.cookies')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              {t('footer.columns.social.title')}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/agentixvanguard"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.columns.social.linkedin')}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/agentixvanguard"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.columns.social.twitter')}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-600">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}