import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ChevronDown, Loader2, CheckCircle2, Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/landing/motion";
import { submitLead } from "@/lib/leads";
import { SITE } from "@/config/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Collapsible wrapper for the technical sections. Children stay mounted
 * (only visually collapsed) so their content remains indexable by search engines.
 */
export default function TechDeepDive({ children }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      await submitLead({
        source: "tech_deep_dive",
        email,
        name,
        message: message || t("techDeepDive.defaultMessage"),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="tecnico" className="relative bg-[#050a18]">
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
        <SectionHeader
          icon={Code2}
          badge={t("techDeepDive.badge")}
          title={t("techDeepDive.title")}
          highlight={t("techDeepDive.titleHighlight")}
          subtitle={t("techDeepDive.subtitle")}
          className="mb-10"
        />

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
          <motion.button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="tech-deep-dive-content"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300"
          >
            <Code2 className="w-4 h-4" />
            <span className="text-sm font-medium">{open ? t("techDeepDive.close") : t("techDeepDive.open")}</span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-200 hover:border-cyan-500/40 hover:text-white transition-all duration-300"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">{t("techDeepDive.contactCta")}</span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="overflow-hidden"
            >
              <div className="max-w-xl mx-auto mb-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
                <p className="text-sm text-slate-400 mb-5">{t("techDeepDive.contactSubtitle")}</p>

                {status === "done" ? (
                  <p className="flex items-center gap-2 text-emerald-300 font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                    {t("techDeepDive.success")}
                  </p>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-3" noValidate>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("techDeepDive.namePlaceholder")}
                        autoComplete="name"
                        className="rounded-xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (status !== "idle") setStatus("idle"); }}
                        placeholder={t("techDeepDive.emailPlaceholder")}
                        required
                        autoComplete="email"
                        className={`rounded-xl border bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-cyan-400/20 ${status === "invalid" ? "border-rose-500/60" : "border-slate-700/70 focus:border-cyan-400/60"}`}
                      />
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t("techDeepDive.messagePlaceholder")}
                      rows={3}
                      className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                    />
                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-6 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {status === "sending" ? t("techDeepDive.sending") : t("techDeepDive.send")}
                      </span>
                    </Button>
                    {status === "invalid" && (
                      <p className="text-xs text-rose-400">{t("techDeepDive.invalid")}</p>
                    )}
                    {status === "error" && (
                      <p className="text-xs text-rose-400">
                        {t("techDeepDive.error")}{" "}
                        <a className="underline text-cyan-400" href={`mailto:${SITE.email}`}>{SITE.email}</a>
                      </p>
                    )}
                    <p className="text-xs text-slate-600 text-center">
                      {t("techDeepDive.privacy")} {SITE.email}
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        id="tech-deep-dive-content"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
        aria-hidden={!open}
        inert={open ? undefined : ""}
      >
        {children}
      </motion.div>
    </section>
  );
}
