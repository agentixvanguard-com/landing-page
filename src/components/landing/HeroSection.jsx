import React, { useEffect, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function NeuralCanvas() {
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
      const count = Math.min(80, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 8000));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? "rgba(0,229,255," : "rgba(168,85,247,",
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,229,255,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color + "0.6)";
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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function HeroSection() {
  const { t } = useTranslation();
  const stats = [
    { value: "99.9%", labelKey: "hero.stats.uptime" },
    { value: "<50ms", labelKey: "hero.stats.latency" },
    { value: "0", labelKey: "hero.stats.errors" },
  ];
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#0a1628] to-[#050a18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_60%)] blur-3xl" />

      <NeuralCanvas />

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm mb-8"
        >
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-medium text-cyan-300 tracking-widest uppercase">
            {t('hero.badge')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          <span className="text-white">{t('hero.title')}</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            {t('hero.titleHighlight')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-10"
        >
          <Trans
            i18nKey="hero.subtitle"
            components={{
              1: <span className="text-cyan-300 font-medium" />,
              2: <span className="text-purple-400 font-semibold" />,
            }}
          />
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => window.open("https://calendly.com/agentixvanguard/architecture-audit", "_blank")}
            className="relative group px-8 py-6 text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:shadow-[0_0_60px_rgba(0,229,255,0.5)] transition-all duration-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.ctaAudit')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="px-8 py-6 text-base text-slate-300 hover:text-white border border-slate-700/50 hover:border-cyan-500/30 hover:bg-cyan-500/5 rounded-xl transition-all duration-300"
          >
            <Zap className="w-4 h-4 mr-2 text-purple-400" />
            {t('hero.ctaDemo')}
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">{t(stat.labelKey)}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a18] to-transparent" />
    </section>
  );
}