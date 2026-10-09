import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, Check, Download, Loader2, CheckCircle2, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitLead } from "@/lib/leads";
import { SITE } from "@/config/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadMagnetSection() {
  const { t, i18n } = useTranslation();
  const bullets = t("leadMagnet.bullets", { returnObjects: true });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | invalid | error

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      await submitLead({
        source: "lead_magnet_guide",
        email,
        name,
        message: t("leadMagnet.leadMessage"),
      });
      const { downloadGuide } = await import("@/lib/guidePdf");
      await downloadGuide(i18n.language);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="guia" className="relative py-24 sm:py-28 overflow-hidden bg-[#050a18]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative grid lg:grid-cols-5 gap-10 items-center rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-900/80 via-[#0a1628] to-purple-950/30 p-8 sm:p-12 overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="lg:col-span-2 flex justify-center">
            <motion.div
              whileHover={{ rotateY: -12, rotateX: 4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              style={{ transformPerspective: 900 }}
              className="relative w-52 sm:w-60 aspect-[3/4] rounded-r-2xl rounded-l-md bg-gradient-to-br from-[#0e1a33] to-[#050a18] border border-cyan-500/30 shadow-[20px_20px_60px_rgba(0,0,0,0.5),0_0_50px_rgba(34,211,238,0.15)] p-6 flex flex-col animate-float"
            >
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-l-md" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 mb-4">AGENTIX VANGUARD</span>
              <FileText className="w-8 h-8 text-purple-300 mb-4" />
              <p className="text-white font-bold text-lg leading-tight">{t("leadMagnet.title")}</p>
              <p className="text-cyan-300 font-bold text-lg leading-tight">{t("leadMagnet.titleHighlight")}</p>
              <div className="mt-auto space-y-1.5">
                <div className="h-1.5 w-full rounded bg-slate-700/60" />
                <div className="h-1.5 w-4/5 rounded bg-slate-700/60" />
                <div className="h-1.5 w-3/5 rounded bg-slate-700/60" />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-5">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-medium text-purple-300 tracking-widest uppercase">{t("leadMagnet.badge")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {t("leadMagnet.title")}{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-gradient-animate">
                {t("leadMagnet.titleHighlight")}
              </span>
            </h2>
            <p className="text-slate-400 mb-6">{t("leadMagnet.subtitle")}</p>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
              {Array.isArray(bullets) && bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-2 text-sm text-slate-300"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  {b}
                </motion.li>
              ))}
            </ul>

            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"
              >
                <p className="flex items-center gap-2 text-emerald-300 font-medium mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  {t("leadMagnet.success")}
                </p>
                <p className="text-sm text-slate-400">{t("leadMagnet.successFollowUp")}</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3" noValidate>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("leadMagnet.namePlaceholder")}
                    autoComplete="name"
                    className="rounded-xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === "invalid" || status === "error") setStatus("idle"); }}
                    placeholder={t("leadMagnet.emailPlaceholder")}
                    aria-label={t("leadMagnet.emailPlaceholder")}
                    aria-invalid={status === "invalid"}
                    autoComplete="email"
                    required
                    className={`rounded-xl border bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:ring-2 focus:ring-purple-400/20 ${status === "invalid" ? "border-rose-500/60" : "border-slate-700/70 focus:border-purple-400/60"}`}
                  />
                </div>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="relative overflow-hidden btn-shine w-full px-6 py-6 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      {status === "sending" ? t("leadMagnet.sending") : t("leadMagnet.button")}
                    </span>
                  </Button>
                </motion.div>
                {status === "invalid" && (
                  <p className="text-xs text-rose-400">{t("leadMagnet.invalid")}</p>
                )}
                {status === "error" && (
                  <p className="text-xs text-rose-400">
                    {t("leadMagnet.error")}{" "}
                    <a className="underline text-cyan-400" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </p>
                )}
              </form>
            )}

            <p className="flex items-start gap-2 text-xs text-slate-500 mt-4 leading-relaxed">
              <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-600" />
              <span>
                {t("leadMagnet.privacy")}{" "}
                <a href={`mailto:${SITE.email}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
                  {SITE.email}
                </a>
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
