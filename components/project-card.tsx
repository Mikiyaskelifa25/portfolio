"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Check, Lock } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn, isConfigured, normalizeUrl } from "@/lib/utils";
import { GithubIcon } from "@/components/icons";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  concept: "Concept",
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const reversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const frameY = useTransform(scrollYProgress, [0, 1], [26, -26]);

  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      id={`project-${project.id}`}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      <motion.div
        ref={frameRef}
        style={reduceMotion ? undefined : { y: frameY }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={cn("lg:col-span-7", reversed && "lg:order-2")}
      >
        <div className="group relative">
          <div
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40 sm:-inset-6"
            style={{ backgroundColor: project.accent }}
            aria-hidden="true"
          />

          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] transition-colors duration-500 group-hover:border-line-strong">
            <div className="flex items-center gap-3 border-b border-line bg-ink-soft/80 px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </span>
              <span className="ml-1 truncate rounded-md border border-line bg-ink/60 px-2.5 py-1 font-mono text-[11px] text-muted">
                {project.url
                  ? normalizeUrl(project.url).replace(/^https?:\/\//, "")
                  : project.title.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <div
                className="ambient-grid absolute inset-0 opacity-40"
                aria-hidden="true"
              />
              {project.image ? (
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority={index === 0}
                  className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <PlaceholderVisual project={project} />
              )}
              <div
                className="pointer-events-none absolute inset-0 shadow-[inset_0_0_70px_rgba(0,0,0,0.5)]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className={cn("lg:col-span-5", reversed && "lg:order-1")}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.3em] text-lime">
              {number}
            </span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
              {project.category}
            </span>
            <span
              className={cn(
                "ml-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase",
                project.status === "live"
                  ? "border-lime/30 bg-lime/10 text-lime"
                  : "border-line bg-surface/60 text-muted",
              )}
            >
              {project.status === "live" ? (
                <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
              ) : (
                <Lock className="h-3 w-3" aria-hidden="true" />
              )}
              {STATUS_LABEL[project.status]}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.03em] text-fg">
            {project.title}
          </h3>
          <p className="mt-3 text-sm font-medium text-lime/90">
            {project.tagline}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {project.description}
          </p>

          {project.highlights?.length ? (
            <ul className="mt-6 space-y-2.5">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-sm text-muted-strong"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-lime"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}

          {project.tech.length ? (
            <ul className="mt-7 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-[11px] text-muted-strong"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {isConfigured(project.url) ? (
              <a
                href={normalizeUrl(project.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Visit live project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-muted">
                <Lock className="h-4 w-4" aria-hidden="true" />
                {project.note ?? "Link coming soon"}
              </span>
            )}

            {isConfigured(project.repo) ? (
              <a
                href={normalizeUrl(project.repo)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-fg transition-colors duration-300 hover:border-lime/60 hover:text-lime"
              >
                <GithubIcon className="h-4 w-4" />
                Source
              </a>
            ) : null}
          </div>
        </motion.div>
      </div>
    </article>
  );
}

/** Illustrative composition used when a project has no real screenshot yet. */
function PlaceholderVisual({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(60% 60% at 30% 20%, ${project.accent}, transparent 65%)`,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 ambient-grid opacity-70" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-ink/70 text-muted">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="max-w-xs px-6 font-mono text-[11px] tracking-wide text-muted uppercase">
          Preview coming soon
        </p>
      </div>
    </div>
  );
}
