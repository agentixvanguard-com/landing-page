import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { AlertTriangle, Bot, Unplug, Users, Radar, Radio, Brain, Scale, Zap, ArrowDown } from "lucide-react";
import { SectionHeader, SpotlightCard, staggerContainer, fadeUp } from "@/components/landing/motion";

const icons = [Bot, Unplug, Users, Radar];

const deployNodes = [
  { key: "event", icon: Radio, ring: "border-rose-400/40 bg-rose-500/10", text: "text-rose-300", dot: "bg-rose-400" },
  { key: "analyst", icon: Brain, ring: "border-cyan-400/40 bg-cyan-500/10", text: "text-cyan-300", dot: "bg-cyan-400" },
  { key: "decider", icon: Scale, ring: "border-violet-400/40 bg-violet-500/10", text: "text-violet-300", dot: "bg-violet-400" },
  { key: "executor", icon: Zap, ring: "border-amber-400/40 bg-amber-500/10", text: "text-amber-300", dot: "bg-amber-400" },
];

/** Scroll-linked "deployment": a beam descends and switches each agent online, bridging into AgentFlowSection. */
function AgentDeploy() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const beam = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(deployNodes.length, Math.floor(v * (deployNodes.length + 0.6))));
  });

  const done = active >= deployNodes.length;

  return (
    <div ref={ref} className="relative mt-10 mx-auto max-w-md">
      {/* Beam track + fill */}
      <div className="absolute left-1/2 top-0 bottom-10 w-px -translate-x-1/2 bg-slate-800" />
      <motion.div
        style={{ scaleY: beam }}
        className="absolute left-1/2 top-0 bottom-10 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-rose-400 via-cyan-400 to-amber-300 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
      />

      <ol className="relative space-y-6 pt-4">
        {deployNodes.map((node, i) => {
          const on = i < active;
          const Icon = node.icon;
          const left = i % 2 === 0;
          return (
            <li key={node.key} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
              <div className={left ? "flex justify-end" : ""}>
                {left && <DeployCard node={node} on={on} Icon={Icon} label={t(`agentFlow.nodes.${node.key}`)} />}
              </div>
              <span className="relative flex w-3 h-3">
                {on && <span className={`absolute inset-0 rounded-full ${node.dot} opacity-60 animate-ping`} />}
                <span className={`relative w-3 h-3 rounded-full border transition-colors duration-500 ${on ? `${node.dot} border-transparent` : "bg-[#050a18] border-slate-700"}`} />
              </span>
              <div>
                {!left && <DeployCard node={node} on={on} Icon={Icon} label={t(`agentFlow.nodes.${node.key}`)} />}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Status line + hand-off to the live demo */}
      <div className="relative mt-8 flex flex-col items-center gap-3">
        <p className="font-mono text-xs text-slate-500">
          <span className={done ? "text-emerald-400" : "text-cyan-400"}>{done ? "●" : "○"}</span>{" "}
          {done
            ? t("problem.deployed")
            : t("problem.deploying", { count: active, total: deployNodes.length })}
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-500 ${done ? "border-emerald-500/40 bg-emerald-500/10" : "border-cyan-500/30 bg-cyan-500/5"}`}
        >
          <ArrowDown className={`w-4 h-4 ${done ? "text-emerald-400" : "text-cyan-400"}`} />
        </motion.div>
      </div>
    </div>
  );
}

function DeployCard({ node, on, Icon, label }) {
  return (
    <motion.div
      initial={false}
      animate={on ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0.25, scale: 0.92, filter: "blur(1px)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 backdrop-blur-sm ${on ? node.ring : "border-slate-800 bg-slate-900/40"}`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${on ? node.text : "text-slate-600"}`} />
      <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${on ? "text-white" : "text-slate-500"}`}>{label}</span>
    </motion.div>
  );
}

export default function ProblemSection() {
  const { t } = useTranslation();
  const items = t("problem.items", { returnObjects: true });

  return (
    <section id="problema" className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden bg-[#050a18]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,63,94,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeader
          icon={AlertTriangle}
          tone="rose"
          badge={t("problem.badge")}
          title={t("problem.title")}
          highlight={t("problem.titleHighlight")}
          subtitle={t("problem.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {Array.isArray(items) && items.map((item, i) => {
            const Icon = icons[i] ?? Bot;
            return (
              <motion.div key={i} variants={fadeUp}>
                <SpotlightCard
                  glow="rgba(244,63,94,0.12)"
                  className="h-full rounded-2xl border border-rose-500/10 bg-slate-900/40 backdrop-blur-sm p-6 hover:border-rose-500/30 transition-colors duration-300"
                >
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-5 group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-rose-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bridge to the solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            {t("problem.transition")}
          </p>
        </motion.div>
        <AgentDeploy />
      </div>
    </section>
  );
}
