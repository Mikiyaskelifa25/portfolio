import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Check, Clock, Download, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PrintButton } from "@/components/print-button";
import { EthiopiaFlag, GithubIcon, LinkedinIcon } from "@/components/icons";
import { enabledProjects, resume, site, skillGroups } from "@/data/portfolio";
import { isConfigured } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, ${site.title} based in ${site.location}. Skills, selected work and contact details.`,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "profile",
    title: `Resume - ${site.name}`,
    description: `${site.title} based in ${site.location}.`,
    url: "/resume",
  },
};

export default function ResumePage() {
  const emailConfigured = isConfigured(site.email);

  return (
    <div className="relative pt-28 pb-24 sm:pt-32 sm:pb-32 print:pt-0 print:pb-0">
      <Container className="print:px-0">
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-fg transition-colors hover:border-lime/50 hover:text-lime"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            Back to portfolio
          </Link>

          <div className="flex items-center gap-2">
            {site.resumeUrl ? (
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-fg transition-colors hover:border-lime/50 hover:text-lime"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                PDF
              </a>
            ) : null}
            <PrintButton className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5" />
          </div>
        </div>

        <header className="mt-12 border-b border-line pb-10 sm:mt-16 print:mt-0 print:pb-6">
          <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] tracking-[0.3em] text-lime">
                  {resume.label}
                </span>
                <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
              </div>

              <h1 className="font-serif-display mt-6 text-[clamp(2.6rem,7vw,5rem)] leading-[0.98] tracking-[-0.02em] text-fg print:mt-3 print:text-4xl print:leading-tight">
                {resume.heading}
              </h1>

              <p className="mt-4 text-lg text-muted-strong sm:text-xl">
                {site.title}
              </p>

              <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                <li className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-lime" aria-hidden="true" />
                  {site.location}
                  <EthiopiaFlag className="h-3 w-[18px]" />
                </li>
                <li className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-lime" aria-hidden="true" />
                  EAT · UTC+3 · remote-friendly
                </li>
                {site.availability.enabled ? (
                  <li className="inline-flex items-center gap-2 text-lime">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-lime"
                      aria-hidden="true"
                    />
                    {site.availability.label}
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-line bg-surface/70 backdrop-blur-xl sm:h-32 sm:w-32 print:h-20 print:w-20">
              <Image
                src={site.avatar}
                alt={`Portrait of ${site.name}`}
                fill
                sizes="128px"
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 print:mt-8 print:grid-cols-12 print:gap-10">
          <div className="space-y-14 lg:col-span-8 print:col-span-8 print:space-y-8">
            <section aria-labelledby="resume-profile">
              <SectionLabel id="resume-profile" index="01">
                Profile
              </SectionLabel>
              <p className="mt-6 text-base leading-relaxed text-muted-strong sm:text-lg">
                {resume.intro}
              </p>
            </section>

            <section aria-labelledby="resume-experience">
              <SectionLabel id="resume-experience" index="02">
                Experience
              </SectionLabel>
              {resume.experience.length ? (
                <ol className="mt-6 space-y-6">
                  {resume.experience.map((role) => (
                    <li
                      key={`${role.role}-${role.company}`}
                      className="print-avoid-break rounded-2xl border border-line bg-surface/40 p-6 print:rounded-lg print:p-4"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-semibold text-fg">
                          {role.role}
                        </h3>
                        <span className="font-mono text-xs text-lime">
                          {role.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-strong">
                        {role.company}
                        {role.location ? ` · ${role.location}` : ""}
                      </p>
                      {role.summary ? (
                        <p className="mt-4 text-sm leading-relaxed text-muted">
                          {role.summary}
                        </p>
                      ) : null}
                      {role.highlights?.length ? (
                        <ul className="mt-4 space-y-2">
                          {role.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-sm text-muted"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-lime"
                                aria-hidden="true"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : (
                <EmptyState>{resume.note}</EmptyState>
              )}
            </section>

            <section aria-labelledby="resume-education">
              <SectionLabel id="resume-education" index="03">
                Education
              </SectionLabel>
              {resume.education.length ? (
                <ol className="mt-6 space-y-6">
                  {resume.education.map((study) => (
                    <li
                      key={`${study.program}-${study.institution}`}
                      className="print-avoid-break rounded-2xl border border-line bg-surface/40 p-6 print:rounded-lg print:p-4"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-semibold text-fg">
                          {study.program}
                        </h3>
                        <span className="font-mono text-xs text-lime">
                          {study.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-strong">
                        {study.institution}
                        {study.location ? ` · ${study.location}` : ""}
                      </p>
                      {study.detail ? (
                        <p className="mt-4 text-sm leading-relaxed text-muted">
                          {study.detail}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : (
                <EmptyState>{resume.note}</EmptyState>
              )}
            </section>

            <section aria-labelledby="resume-work">
              <SectionLabel id="resume-work" index="04">
                Selected work
              </SectionLabel>
              <ol className="mt-6 space-y-5">
                {enabledProjects.map((project) => {
                  const href = project.url || project.repo;
                  return (
                    <li
                      key={project.id}
                      className="print-avoid-break rounded-2xl border border-line bg-surface/40 p-6 print:rounded-lg print:p-4"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg font-semibold text-fg">
                          {project.title}
                        </h3>
                        <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
                          {project.category}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-strong">
                        {project.tagline}
                      </p>
                      {project.tech.length ? (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-full border border-line bg-ink/40 px-3 py-1 font-mono text-[11px] text-muted"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="print-url mt-4 inline-flex items-center gap-1.5 text-sm text-lime transition-colors hover:text-lime-deep"
                        >
                          {project.url ? "Visit project" : "View source"}
                          <ArrowUpRight
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </a>
                      ) : null}
                      </li>
                  );
                })}
              </ol>
            </section>
          </div>

          <aside className="lg:col-span-4 print:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-28 print:space-y-6">
              <section
                aria-labelledby="resume-contact"
                className="rounded-2xl border border-line bg-surface/40 p-6 print:rounded-lg print:p-4"
              >
                <h2
                  id="resume-contact"
                  className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase"
                >
                  Contact
                </h2>
                <ul className="mt-5 space-y-3.5 text-sm">
                  {site.email ? (
                    <li>
                      <ContactLink icon={<Mail className="h-4 w-4" />} href={`mailto:${site.email}`}>
                        {site.email}
                      </ContactLink>
                    </li>
                  ) : null}
                  {site.phone ? (
                    <li>
                      <ContactLink
                        icon={<Phone className="h-4 w-4" />}
                        href={`tel:${site.phone}`}
                      >
                        {site.phone}
                      </ContactLink>
                    </li>
                  ) : null}
                  <li>
                    <ContactLink
                      icon={<GithubIcon className="h-4 w-4" />}
                      href={site.github}
                      external
                    >
                      {site.github.replace(/^https?:\/\//, "")}
                    </ContactLink>
                  </li>
                  {site.linkedin ? (
                    <li>
                      <ContactLink
                        icon={<LinkedinIcon className="h-4 w-4" />}
                        href={site.linkedin}
                        external
                      >
                        {site.linkedin.replace(/^https?:\/\//, "")}
                      </ContactLink>
                    </li>
                  ) : null}
                  <li>
                    <ContactLink icon={<MapPin className="h-4 w-4" />}>
                      {site.location}
                    </ContactLink>
                  </li>
                </ul>
                {!emailConfigured || !site.linkedin ? (
                  <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-muted/80 print:hidden">
                    Missing details? Add them in{" "}
                    <span className="text-lime">data/portfolio.ts</span>.
                  </p>
                ) : null}
              </section>

              <section
                aria-labelledby="resume-skills"
                className="rounded-2xl border border-line bg-surface/40 p-6 print:rounded-lg print:p-4"
              >
                <h2
                  id="resume-skills"
                  className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase"
                >
                  Skills
                </h2>
                <div className="mt-5 space-y-5">
                  {skillGroups.map((group) => (
                    <div key={group.id}>
                      <p className="text-sm font-medium text-fg">
                        {group.title}
                      </p>
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-full border border-line bg-ink/40 px-3 py-1 font-mono text-[11px] text-muted"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-lime/25 bg-lime/5 p-6 print:rounded-lg print:p-4">
                <h2 className="font-mono text-[11px] tracking-[0.3em] text-lime uppercase">
                  Highlights
                </h2>
                <ul className="mt-5 space-y-3 text-sm text-muted-strong">
                  {[
                    "End-to-end delivery: interface, API, data and deployment",
                    "AI-powered tools, agents and MCP servers",
                    "Comfortable across PostgreSQL, MongoDB and Supabase",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-lime"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                {site.availability.enabled ? (
                  <p className="mt-5 font-mono text-[10px] leading-relaxed text-muted">
                    {site.availability.detail}
                  </p>
                ) : null}
              </section>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

function SectionLabel({
  id,
  index,
  children,
}: {
  id: string;
  index: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[11px] tracking-[0.3em] text-lime">
        {index}
      </span>
      <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
      <h2
        id={id}
        className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase"
      >
        {children}
      </h2>
    </div>
  );
}

function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface/30 p-6 text-sm leading-relaxed text-muted">
      {children}
    </p>
  );
}

function ContactLink({
  icon,
  href,
  external,
  children,
}: {
  icon: ReactNode;
  href?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const content = (
    <>
      <span className="text-lime" aria-hidden="true">
        {icon}
      </span>
      <span className="truncate">{children}</span>
    </>
  );

  if (!href) {
    return (
      <span className="inline-flex items-center gap-2.5 text-muted-strong">
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex max-w-full items-center gap-2.5 text-muted-strong transition-colors hover:text-lime"
    >
      {content}
    </a>
  );
}
