import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { UsersRound, Linkedin } from "lucide-react";
import { SectionHeader, SpotlightCard, staggerContainer, fadeUp } from "@/components/landing/motion";
import { SITE } from "@/config/site";

const initials = (name) => name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/** Founders/team grid. Renders nothing until SITE.team has entries. */
export default function TeamSection() {
  const { t } = useTranslation();
  if (!SITE.team.length) return null;

  return (
    <section id="equipo" className="relative py-24 sm:py-32 overflow-hidden bg-[#050a18]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeader
          icon={UsersRound}
          badge={t("team.badge")}
          title={t("team.title")}
          highlight={t("team.titleHighlight")}
          subtitle={t("team.subtitle")}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-60px" }}
          className="flex flex-wrap justify-center gap-6"
        >
          {SITE.team.map((member) => (
            <motion.div key={member.name} variants={fadeUp} className="w-full sm:w-64">
              <SpotlightCard className="h-full rounded-3xl border border-slate-800 bg-slate-900/40 p-6 text-center hover:border-cyan-500/30 transition-colors">
                <div className="relative">
                  <div className="mx-auto mb-5 w-28 h-28 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 to-purple-500 group-hover:scale-105 transition-transform duration-300">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full rounded-full object-cover bg-slate-900" loading="lazy" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#0a1628] flex items-center justify-center text-2xl font-bold text-white">
                        {initials(member.name)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-sm text-cyan-300/80 mb-4">{member.role}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn — ${member.name}`}
                      className="inline-flex w-9 h-9 rounded-lg border border-slate-700 items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
