import {
  Bot,
  Container,
  Database,
  Layers,
  Server,
  Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const ICONS: Record<string, LucideIcon> = {
  frontend: Layers,
  backend: Server,
  data: Database,
  ai: Bot,
  mobile: Smartphone,
  devops: Container,
};

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index="03"
          label="Skills & technology"
          title="The tools I reach for."
          description="No percentage bars — just the stack I actually work with, grouped by where it fits in a product."
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = ICONS[group.id] ?? Layers;
            return (
              <Reveal
                key={group.id}
                delay={index * 0.05}
                className="bg-ink-soft/80"
              >
                <div className="group relative h-full p-7 transition-colors duration-500 hover:bg-surface/80">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-ink/70 text-lime transition-colors duration-500 group-hover:border-lime/40">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg tracking-[-0.02em] text-fg">
                      {group.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {group.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs text-muted-strong transition-colors duration-300 hover:border-lime/40 hover:text-fg"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
