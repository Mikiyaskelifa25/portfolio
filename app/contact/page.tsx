import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { contact, site } from "@/data/portfolio";
import { isConfigured } from "@/lib/utils";
import { ContactForm } from "@/components/contact-form";
import { EthiopiaFlag, GithubIcon, LinkedinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mikiyas Kelifa — full-stack developer and AI engineer. Send a message and it lands straight in my inbox.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: "Have a project, role or idea? Send me a message.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="relative pt-28 pb-24 sm:pt-32 sm:pb-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="print:hidden">
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
        </div>

        <header className="mt-12 border-b border-line pb-10 sm:mt-16">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.3em] text-lime">
              Contact
            </span>
            <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.25rem)] leading-[1.02] tracking-[-0.03em] text-fg">
            {contact.heading}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-strong sm:text-lg">
            {contact.supporting}
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-line bg-surface/50 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
                  Reach me directly
                </p>
                <ul className="mt-5 space-y-3">
                  {isConfigured(site.email) ? (
                    <li>
                      <ContactRow
                        icon={<Mail className="h-4 w-4" aria-hidden="true" />}
                        label="Email"
                        value={site.email}
                        href={`mailto:${site.email}`}
                      />
                    </li>
                  ) : null}

                  {isConfigured(site.github) ? (
                    <li>
                      <ContactRow
                        icon={<GithubIcon className="h-4 w-4" />}
                        label="GitHub"
                        value={site.github.replace(/^https?:\/\//, "")}
                        href={site.github}
                        external
                      />
                    </li>
                  ) : null}

                  {isConfigured(site.phone) ? (
                    <li>
                      <ContactRow
                        icon={<Phone className="h-4 w-4" aria-hidden="true" />}
                        label="Phone"
                        value={site.phone}
                        href={`tel:${site.phone}`}
                      />
                    </li>
                  ) : null}

                  {isConfigured(site.linkedin) ? (
                    <li>
                      <ContactRow
                        icon={<LinkedinIcon className="h-4 w-4" />}
                        label="LinkedIn"
                        value={site.linkedin.replace(/^https?:\/\//, "")}
                        href={site.linkedin}
                        external
                      />
                    </li>
                  ) : null}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-lime" aria-hidden="true" />
                    {contact.location}
                    <EthiopiaFlag className="h-3 w-[18px]" />
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-xs">
                    <Clock className="h-4 w-4 text-lime" aria-hidden="true" />
                    {contact.timezone}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-lime/25 bg-lime/5 p-7">
                <p className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-lime uppercase">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  What happens next
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-strong">
                  Your message is delivered straight to my phone, so I usually
                  reply within a day. Prefer email? Use the link above.
                </p>
                {site.availability.enabled ? (
                  <p className="mt-4 text-sm text-lime">
                    {site.availability.detail}
                  </p>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="inline-flex items-center gap-3 text-fg">
        <span className="text-lime">{icon}</span>
        <span className="flex flex-col">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
            {label}
          </span>
          <span className="text-sm">{value}</span>
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="rounded-xl border border-line bg-ink/40 px-4 py-3">
        {inner}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block rounded-xl border border-line bg-ink/40 px-4 py-3 transition-colors hover:border-lime/50"
    >
      {inner}
    </a>
  );
}
