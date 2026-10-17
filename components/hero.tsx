"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { hero, site, socials } from "@/data/portfolio";
import { cn, isConfigured } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, EthiopiaFlag } from "@/components/icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const FLOATING = [
  { label: "Next.js", className: "left-[-6%] top-[14%]" },
  { label: "TypeScript", className: "right-[-4%] top-[30%]" },
  { label: "PostgreSQL", className: "left-[-2%] bottom-[22%]" },
  { label: "AI Agents", className: "right-[2%] bottom-[10%]" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32 pb-16 sm:pt-36"
    >
      <motion.div
        style={reduceMotion ? undefined : { opacity: fadeOut }}
        className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={reduceMotion ? undefined : { y: contentY }}
          className="lg:col-span-7"
        >
          <motion.div
            variants={item}
            className="mb-8 flex flex-wrap items-center gap-3"
          >
            {site.availability.enabled ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3.5 py-1.5 text-xs font-medium text-lime">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
                </span>
                {site.availability.label}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-muted">
              {hero.eyebrow}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,8.6vw,6.6rem)] leading-[0.94] tracking-[-0.045em]">
            {hero.headline.map((line, index) => (
              <motion.span
                key={line}
                variants={item}
                className={cn(
                  "block text-fg",
                  index === 1 && "text-muted-strong",
                )}
              >
                {index === 2 ? (
                  <span className="text-gradient">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {hero.supporting}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              {hero.primaryCta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-300 hover:border-lime/60 hover:text-lime"
            >
              {hero.secondaryCta.label}
              <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {site.location}
              <EthiopiaFlag className="h-2.5 w-[15px]" />
            </span>
            {socials
              .filter((social) => isConfigured(social.href))
              .map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.id === "email" ? undefined : "_blank"}
                  rel={social.id === "email" ? undefined : "noopener noreferrer"}
                  className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-lime"
                >
                  {social.id === "github" ? (
                    <GithubIcon className="h-3.5 w-3.5" />
                  ) : social.id === "linkedin" ? (
                    <LinkedinIcon className="h-3.5 w-3.5" />
                  ) : (
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {social.label}
                </a>
              ))}
          </motion.div>
        </motion.div>

        <motion.div
          style={reduceMotion ? undefined : { y: visualY }}
          className="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:col-span-5 lg:max-w-[26rem]"
        >
          <div className="relative aspect-square">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_120deg,rgba(198,242,77,0.22),transparent_35%,rgba(124,108,255,0.28),transparent_75%)] blur-3xl" />
            <div className="absolute inset-[8%] rounded-full border border-line" />
            <div className="absolute inset-[20%] rounded-full border border-dashed border-line-strong animate-spin-slow" />
            <div className="absolute inset-[30%] rounded-full border border-line" />

            <div className="absolute inset-[24%] overflow-hidden rounded-full border border-line bg-surface/70 backdrop-blur-xl">
              <Image
                src={site.avatar}
                alt={`Portrait of ${site.name}`}
                fill
                sizes="(max-width: 1024px) 40vw, 22vw"
                priority
                className="object-cover object-center"
              />
            </div>

            {FLOATING.map((chip, index) => (
              <motion.span
                key={chip.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.12, duration: 0.7 }}
                style={
                  reduceMotion
                    ? undefined
                    : { animationDelay: `${index * 1.8}s` }
                }
                className={cn(
                  "absolute rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-[11px] text-muted-strong backdrop-blur-md",
                  !reduceMotion && "animate-float-slow",
                  chip.className,
                )}
              >
                {chip.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="mx-auto mt-16 w-full max-w-[1240px] px-5 sm:px-8">
        <a
          href="#about"
          className="group inline-flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-muted uppercase transition-colors hover:text-fg"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors group-hover:border-lime/60">
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
          Scroll to explore
        </a>
      </div>

      <div className="relative mt-14 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className={cn(
            "flex w-max items-center gap-10 whitespace-nowrap",
            !reduceMotion && "animate-marquee",
          )}
        >
          {[...hero.marquee, ...hero.marquee].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="flex items-center gap-10 font-mono text-sm tracking-wide text-muted"
            >
              {word}
              <span className="h-1 w-1 rounded-full bg-lime/60" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
