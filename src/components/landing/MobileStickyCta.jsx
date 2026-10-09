import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { openCalendly } from "@/components/landing/motion";
import { SITE, whatsappUrl } from "@/config/site";

/** Bottom action bar on mobile: appears after the hero, hides once the contact section is visible. */
export default function MobileStickyCta() {
  const { t } = useTranslation();
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const wa = whatsappUrl();

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contact = document.getElementById("contacto");
    const observer = contact
      ? new IntersectionObserver(([entry]) => setAtContact(entry.isIntersecting), { threshold: 0.1 })
      : null;
    if (contact) observer.observe(contact);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const show = pastHero && !atContact;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#050a18]/90 backdrop-blur-xl border-t border-slate-800"
        >
          <div className="flex gap-3">
            <button
              type="button"
              onClick={openCalendly}
              className="relative overflow-hidden btn-shine flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-[0_0_24px_rgba(0,229,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("mobileCta.button")}
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <a
              href={wa ?? "#contacto"}
              target={wa ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={t("mobileCta.contact")}
              className="w-12 flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-cyan-300"
            >
              {wa ? <MessageCircle className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
