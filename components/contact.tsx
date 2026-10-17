import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { contact, site, socials } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact-form";
import { EthiopiaFlag, GithubIcon, LinkedinIcon } from "@/components/icons";
import { isConfigured, normalizeUrl } from "@/lib/utils";

const ICON_BY_ID = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
} as const;

export function Contact() {
  const configuredSocials = socials.filter(
    (social) => social.id !== "email" && isConfigured(social.href),
  );

  return (
    <section id="contact" className="relative border-t border-line py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <SectionHeading
          index="05"
          label="Contact"
          title={contact.heading}
          description={contact.supporting}
        />

        <div className="mt-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.3em] text-lime uppercase">
                Send a message
              </span>
              <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
            </div>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-2xl border border-line bg-surface/50 p-7">
                <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
                  Elsewhere
                </p>
                <ul className="mt-5 space-y-3">
                  {configuredSocials.length ? (
                    configuredSocials.map((social) => {
                      const Icon = ICON_BY_ID[social.id];
                      return (
                        <li key={social.id}>
                          <a
                            href={normalizeUrl(social.href)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between rounded-xl border border-line bg-ink/40 px-4 py-3 text-sm text-fg transition-colors hover:border-lime/50 hover:text-lime"
                          >
                            <span className="inline-flex items-center gap-3">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                              {social.label}
                            </span>
                            <span className="font-mono text-[11px] text-muted">
                              {social.href.replace(/^mailto:|^https?:\/\//, "")}
                            </span>
                          </a>
                        </li>
                      );
                    })
                  ) : (
                    <li className="rounded-xl border border-dashed border-line-strong bg-ink/40 px-4 py-3 font-mono text-xs text-muted">
                      Add your GitHub / LinkedIn URLs in{" "}
                      <span className="text-lime">data/portfolio.ts</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-surface/50 p-7">
                {isConfigured(site.phone) ? (
                  <a
                    href={`tel:${site.phone}`}
                    className="group mb-5 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-lime"
                  >
                    <Phone className="h-4 w-4 text-lime" aria-hidden="true" />
                    <span className="font-mono">{site.phone}</span>
                  </a>
                ) : null}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-lime" aria-hidden="true" />
                    {contact.location}
                    <EthiopiaFlag className="h-3 w-[18px]" />
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-xs">
                    {contact.timezone}
                  </span>
                </div>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-strong">
                  <Sparkles className="h-4 w-4 text-lime" aria-hidden="true" />
                  {site.availability.enabled
                    ? site.availability.detail
                    : "Currently not advertising availability — get in touch to ask."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
