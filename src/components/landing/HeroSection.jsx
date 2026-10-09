import React, { useEffect, useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp, openCalendly } from "@/components/landing/motion";

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
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const createNodes = () => {
      nodes = [];
      const max = canvas.offsetWidth < 768 ? 35 : 80;
      const count = Math.min(max, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 8000));
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

    const onResize = () => {
      resize();
      createNodes();
    };

    onResize();
    draw();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
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

function RotatingWord({ words }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words.length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-grid align-bottom overflow-hidden">
      {/* Invisible copies reserve the width of the longest word */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1">{w}</span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1 text-left text-cyan-300"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function HeroSection() {
  const { t } = useTranslation();
  const words = t("hero.rotatingWords", { returnObjects: true });
  const stats = [
    { node: <><CountUp to={24} duration={1.2} />/7</>, labelKey: "hero.stats.response" },
    { node: <CountUp to={50} prefix="<" suffix="ms" />, labelKey: "hero.stats.cost" },
    { node: <CountUp to={0} duration={1.2} />, labelKey: "hero.stats.errors" },
  ];
  const fadeIn = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" },
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a18] via-[#0a1628] to-[#050a18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_60%)] blur-3xl animate-pulse-glow" />
      <div className="absolute top-[20%] left-[8%] w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl animate-float" />
      <div className="absolute bottom-[18%] right-[10%] w-56 h-56 rounded-full bg-purple-500/10 blur-3xl animate-float [animation-delay:2s]" />

      <NeuralCanvas />

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          {...fadeIn(0)}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping-slow" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] sm:text-xs font-medium text-cyan-300 tracking-wider sm:tracking-widest uppercase">
            {t('hero.badge')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeIn(0.15)}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          <span className="sr-only">{t('hero.titleSr')}</span>
          <span aria-hidden="true">
            <span className="text-white">{t('hero.title')}</span>{" "}
            {Array.isArray(words) && <RotatingWord words={words} />}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-gradient-animate">
              {t('hero.titleHighlight')}
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeIn(0.3)}
          className="max-w-2xl mx-auto text-base sm:text-xl text-slate-400 leading-relaxed mb-10"
        >
          <Trans
            i18nKey="hero.subtitle"
            components={{
              1: <span className="text-cyan-300 font-semibold" />,
              2: <span className="text-purple-300 font-semibold" />,
            }}
          />
        </motion.p>

        {/* CTA */}
        <motion.div
          {...fadeIn(0.45)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              onClick={openCalendly}
              className="relative overflow-hidden btn-shine group px-8 py-6 text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:shadow-[0_0_60px_rgba(0,229,255,0.5)] transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.ctaAudit')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => document.querySelector("#como-funciona")?.scrollIntoView({ behavior: "smooth" })}
              className="group px-8 py-6 text-base text-slate-300 hover:text-white border border-slate-700/50 hover:border-cyan-500/30 hover:bg-cyan-500/5 rounded-xl transition-all duration-300"
            >
              <PlayCircle className="w-5 h-5 mr-2 text-purple-400 group-hover:scale-110 transition-transform" />
              {t('hero.ctaDemo')}
            </Button>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {t('hero.reassurance')}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="text-center rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm px-2 py-4 sm:p-5 hover:border-cyan-500/30 transition-colors"
            >
              <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tabular-nums">
                {stat.node}
              </div>
              <div className="text-[11px] sm:text-sm text-slate-500 mt-1">{t(stat.labelKey)}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        aria-label="Scroll"
        onClick={() => document.querySelector("#problema")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-slate-500 hover:text-cyan-400 transition-colors hidden sm:block"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a18] to-transparent pointer-events-none" />
    </section>
  );
}
