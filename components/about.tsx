import { MapPin, Sparkles } from "lucide-react";
import { about, site } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index="01"
          label="About"
          title={about.heading}
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-display text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.35] tracking-[-0.02em] text-fg">
                {about.lead}
              </p>
            </Reveal>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.05 * (index + 1)}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-8 backdrop-blur-sm">
                <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-lime/10 blur-3xl" />

                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink-soft font-display text-lg text-lime">
                    MK
                  </span>
                  <div>
                    <p className="text-sm font-medium text-fg">{site.name}</p>
                    <p className="font-mono text-[11px] tracking-wide text-muted">
                      {site.title}
                    </p>
                  </div>
                </div>

                <dl className="mt-8 space-y-5">
                  {about.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-6 border-b border-line pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                        {fact.label}
                      </dt>
                      <dd className="text-right text-sm text-fg">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-ink-soft/60 p-4">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted-strong">
                    Currently exploring AI agents, MCP servers and automation that
                    make everyday software genuinely more useful.
                  </p>
                </div>

                <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {site.location}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
