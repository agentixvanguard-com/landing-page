import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Radio, Brain, Scale, Zap, CheckCircle2, Network, Terminal } from "lucide-react";
import { SectionHeader } from "@/components/landing/motion";

const nodes = [
  { key: "event", icon: Radio, color: "from-rose-400 to-orange-400", text: "text-rose-300" },
  { key: "analyst", icon: Brain, color: "from-cyan-400 to-blue-500", text: "text-cyan-300" },
  { key: "decider", icon: Scale, color: "from-violet-400 to-purple-500", text: "text-violet-300" },
  { key: "executor", icon: Zap, color: "from-amber-300 to-orange-500", text: "text-amber-300" },
  { key: "result", icon: CheckCircle2, color: "from-emerald-400 to-teal-500", text: "text-emerald-300" },
];

const STEP_MS = 1700;
const PAUSE_MS = 3200;

export default function AgentFlowSection() {
  const { t } = useTranslation();
  const scenarios = t("agentFlow.scenarios", { returnObjects: true });
  const count = Array.isArray(scenarios) ? scenarios.length : 0;
  const [scenario, setScenario] = useState(0);
  const [step, setStep] = useState(0); // number of completed steps (0..5)
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-120px" });

  // Advance one step at a time; after the last one pause, then move to the next scenario.
  useEffect(() => {
    if (!inView || !count) return;
    const done = step >= nodes.length;
    const id = setTimeout(() => {
      if (done) {
        setScenario((s) => (s + 1) % count);
        setStep(0);
      } else {
        setStep((s) => s + 1);
      }
    }, done ? PAUSE_MS : step === 0 ? 500 : STEP_MS);
    return () => clearTimeout(id);
  }, [inView, step, count]);

  const selectScenario = (i) => {
    setScenario(i);
    setStep(0);
  };

  const current = count ? scenarios[scenario] : null;

  return (
    <section id="en-accion" ref={ref} className="relative pt-12 sm:pt-16 pb-24 sm:pb-32 overflow-hidden bg-[#050a18]">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: "radial-gradient(rgba(34,211,238,0.6) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeader
          icon={Network}
          badge={t("agentFlow.badge")}
          title={t("agentFlow.title")}
          highlight={t("agentFlow.titleHighlight")}
          subtitle={t("agentFlow.subtitle")}
          className="mb-10"
        />

        {/* Scenario selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Array.isArray(scenarios) && scenarios.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => selectScenario(i)}
              className={`relative px-4 py-2 rounded-full text-sm transition-colors ${scenario === i ? "text-white" : "text-slate-400 hover:text-white"}`}
            >
              {scenario === i && (
                <motion.span
                  layoutId="agent-flow-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{s.name}</span>
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-5 gap-6"
        >
          {/* Pipeline */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm p-6 sm:p-8">
            <ol className="relative space-y-5">
              {nodes.map((node, i) => {
                const Icon = node.icon;
                const isDone = step > i;
                const isActive = step === i + 1;
                return (
                  <li key={node.key} className="relative flex items-center gap-4">
                    {/* Connector to the next node */}
                    {i < nodes.length - 1 && (
                      <div className="absolute left-6 top-12 h-5 w-[2px] bg-slate-800 overflow-hidden">
                        <motion.div
                          className="w-full bg-gradient-to-b from-cyan-400 to-purple-500"
                          initial={false}
                          animate={{ height: step > i + 1 ? "100%" : "0%" }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}
                    <motion.div
                      animate={{ scale: isActive ? 1.12 : 1, opacity: isDone ? 1 : 0.35 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className={`relative shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${node.color} p-[1px]`}
                    >
                      {isActive && (
                        <span className={`absolute inset-0 rounded-xl bg-gradient-to-br ${node.color} animate-ping-slow opacity-60`} />
                      )}
                      <div className="relative w-full h-full rounded-xl bg-[#0a1628] flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${isDone ? node.text : "text-slate-500"}`} />
                      </div>
                    </motion.div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold transition-colors ${isDone ? "text-white" : "text-slate-500"}`}>
                        {t(`agentFlow.nodes.${node.key}`)}
                      </p>
                      <div className="h-1 mt-2 w-28 rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${node.color}`}
                          initial={false}
                          animate={{ width: isDone ? "100%" : "0%" }}
                          transition={{ duration: isActive ? STEP_MS / 1000 - 0.3 : 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Console */}
          <div className="lg:col-span-3 rounded-3xl border border-slate-800 bg-[#030712]/80 backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <Terminal className="w-3.5 h-3.5" />
                  {t("agentFlow.consoleTitle")}
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t("agentFlow.live")}
              </span>
            </div>

            <div className="flex-1 p-5 sm:p-6 font-mono text-[13px] leading-relaxed min-h-[340px] space-y-3">
              <AnimatePresence mode="popLayout">
                {current && current.steps.slice(0, step).map((line, i) => {
                  const node = nodes[i];
                  return (
                    <motion.div
                      key={`${scenario}-${i}`}
                      layout
                      initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.4 }}
                      className={`flex gap-3 ${i === nodes.length - 1 ? "mt-4 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5" : ""}`}
                    >
                      <span className={`shrink-0 font-semibold ${node.text}`}>
                        [{t(`agentFlow.nodes.${node.key}`)}]
                      </span>
                      <span className={i === nodes.length - 1 ? "text-emerald-200" : "text-slate-300"}>{line}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {step < nodes.length && (
                <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse align-middle" aria-hidden="true" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
