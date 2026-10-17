import { enabledProjects, projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowUpRight } from "lucide-react";

export function ProjectShowcase() {
  const hiddenCount = projects.length - enabledProjects.length;

  return (
    <section
      id="projects"
      className="relative border-t border-line py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="Selected work"
          title="Projects I've designed, built and shipped."
          description="A small, honest selection of things I have worked on. Each entry lists only the technologies I have actually used, and links only to pages that really exist."
        />

        <div className="mt-20 flex flex-col gap-24 sm:gap-32">
          {enabledProjects.length ? (
            enabledProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <Reveal>
              <p className="rounded-2xl border border-line bg-surface/60 p-8 text-muted">
                No projects are published yet. Set{" "}
                <code className="font-mono text-lime">enabled: true</code> on a
                project in{" "}
                <code className="font-mono text-lime">data/portfolio.ts</code>.
              </p>
            </Reveal>
          )}
        </div>

        {hiddenCount > 0 ? (
          <Reveal delay={0.1}>
            <div className="mt-20 flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface/40 p-8 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-xl tracking-[-0.02em] text-fg">
                  More work on the way
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  Additional projects — AI tools, SaaS products and mobile apps —
                  are being prepared for this page. Entries stay unpublished until
                  their live links and features are confirmed.
                </p>
              </div>
              <a
                href="#contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-fg transition-colors hover:border-lime/60 hover:text-lime"
              >
                Ask me about them
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
