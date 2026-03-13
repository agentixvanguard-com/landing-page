import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Cloud, Cpu, ArrowRight, Zap, Network, Database } from "lucide-react";

function HybridCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let nodes = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createNodes = () => {
      nodes = [];
      const count = Math.min(60, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 10000));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.4 + 0.6,
          alpha: 0.3 + Math.random() * 0.4,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.09 * Math.min(nodes[i].alpha, nodes[j].alpha);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${node.alpha * 0.6})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    resize();
    createNodes();
    draw();
    window.addEventListener("resize", () => {
      resize();
      createNodes();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" style={{ pointerEvents: "none" }} />;
}

const flowSteps = [
  { icon: Zap, labelKey: "archAI.flow.intent", color: "text-cyan-400" },
  { icon: Database, labelKey: "archAI.flow.hybridRag", color: "text-blue-400" },
  { icon: Cloud, labelKey: "archAI.flow.cloud", color: "text-indigo-400" },
  { icon: ArrowRight, labelKey: "archAI.flow.mqtt", color: "text-slate-400" },
  { icon: Cpu, labelKey: "archAI.flow.edge", color: "text-purple-400" },
];

export default function ArchAISection() {
  const { t } = useTranslation();

  return (
    <section id="intelligence-architecture" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#050a18]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <HybridCanvas />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <Network className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">{t("archAI.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t("archAI.title")}{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t("archAI.titleHighlight")}
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg">{t("archAI.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm p-8">
            <h3 className="text-xl font-bold text-white mb-3">{t("archAI.hybridTitle")}</h3>
            <p className="text-slate-400 leading-relaxed">{t("archAI.hybridDescription")}</p>
          </div>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm p-8">
            <h3 className="text-xl font-bold text-white mb-3">{t("archAI.skillsTitle")}</h3>
            <p className="text-slate-400 leading-relaxed">{t("archAI.skillsDescription")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-lg font-semibold text-white mb-6 text-center">{t("archAI.patternTitle")}</h3>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            {flowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={i}>
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm ${step.color}`}>
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{t(step.labelKey)}</span>
                  </div>
                  {i < flowSteps.length - 1 && <ArrowRight className="w-5 h-5 text-slate-600 hidden sm:block flex-shrink-0" />}
                </React.Fragment>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-sm p-8 sm:p-10"
        >
          <h3 className="text-xl font-bold text-white mb-4">{t("archAI.infrastructureTitle")}</h3>
          <p className="text-slate-400 leading-relaxed mb-6">{t("archAI.infrastructureDescription")}</p>
          <ul className="space-y-2 text-sm text-slate-300">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                {t(`archAI.infrastructurePoints.${i}`)}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
