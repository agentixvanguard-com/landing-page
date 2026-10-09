import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, animate } from "framer-motion";
import { track } from "@/lib/analytics";

export const CALENDLY_URL = "https://calendly.com/agentixvanguard/architecture-audit";
export const openCalendly = () => {
  track("schedule_click");
  window.open(CALENDLY_URL, "_blank");
};

const toneStyles = {
  cyan: { badge: "border-cyan-500/20 bg-cyan-500/5 text-cyan-300", icon: "text-cyan-400", gradient: "from-cyan-400 via-blue-400 to-purple-400" },
  purple: { badge: "border-purple-500/20 bg-purple-500/5 text-purple-300", icon: "text-purple-400", gradient: "from-purple-400 via-pink-400 to-cyan-400" },
  rose: { badge: "border-rose-500/20 bg-rose-500/5 text-rose-300", icon: "text-rose-400", gradient: "from-rose-400 via-orange-400 to-amber-300" },
  emerald: { badge: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300", icon: "text-emerald-400", gradient: "from-emerald-400 via-cyan-400 to-blue-400" },
};

/** Badge + title (with animated gradient highlight) + subtitle, revealed on scroll. */
export function SectionHeader({ icon: Icon, badge, title, highlight, subtitle, tone = "cyan", align = "center", className = "mb-16" }) {
  const s = toneStyles[tone] ?? toneStyles.cyan;
  const left = align === "left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${left ? "text-left" : "text-center"} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 ${s.badge}`}
      >
        {Icon && <Icon className={`w-3.5 h-3.5 ${s.icon}`} />}
        <span className="text-xs font-medium tracking-widest uppercase">{badge}</span>
      </motion.div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {title}{" "}
        <span className={`bg-gradient-to-r ${s.gradient} text-gradient-animate`}>{highlight}</span>
      </h2>
      {subtitle && <p className={`text-slate-400 text-lg max-w-2xl ${left ? "" : "mx-auto"}`}>{subtitle}</p>}
    </motion.div>
  );
}

/** Card with a radial glow that follows the cursor and a subtle lift on hover. */
export function SpotlightCard({ children, className = "", glow = "rgba(34,211,238,0.15)", ...rest }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative overflow-hidden ${className}`}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: pos.active ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${glow}, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

/** Number that counts up from 0 when it scrolls into view. */
export function CountUp({ to, prefix = "", suffix = "", duration = 1.6, decimals = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40px" });
  const [value, setValue] = useState(0);

  // Count again every time the number re-enters the viewport
  useEffect(() => {
    if (!inView) {
      setValue(0);
      return;
    }
    const controls = animate(0, to, { duration, ease: "easeOut", onUpdate: setValue });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/** Value that springs smoothly to each new target (used for live calculator results). */
export function AnimatedNumber({ value, format = (v) => Math.round(v).toLocaleString() }) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 120, damping: 20 });
  const [display, setDisplay] = useState(format(value));

  useEffect(() => { mv.set(value); }, [mv, value]);
  useEffect(() => spring.on("change", (v) => setDisplay(format(v))), [spring, format]);

  return <span>{display}</span>;
}

/** Thin gradient bar at the top of the viewport showing scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
    />
  );
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
