"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Ambient background: a fixed stack of soft light, a faint grid and a slowly
 * drifting aurora. Layers move at different rates as the page scrolls — the
 * cheapest possible way to add depth without touching layout.
 */
export function SiteBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const driftA = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const driftB = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.7, 0.45]);

  return (
    <motion.div
      aria-hidden="true"
      style={reduceMotion ? undefined : { opacity: fade }}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink print:hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(124,108,255,0.16),transparent_60%),radial-gradient(80%_60%_at_85%_15%,rgba(198,242,77,0.10),transparent_55%)]" />

      <motion.div
        style={reduceMotion ? undefined : { y: driftA }}
        className="absolute -top-40 -left-32 h-[46rem] w-[46rem] rounded-full bg-lime/10 blur-[140px] animate-aurora"
      />
      <motion.div
        style={reduceMotion ? undefined : { y: driftB }}
        className="absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-violet/15 blur-[150px]"
      />
      <div className="absolute bottom-[-12rem] left-1/4 h-[34rem] w-[34rem] rounded-full bg-blue/10 blur-[150px]" />

      <div className="absolute inset-0 ambient-grid opacity-60 [mask-image:radial-gradient(110%_75%_at_50%_20%,black,transparent_75%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
    </motion.div>
  );
}
