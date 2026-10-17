import { Mail } from "lucide-react";
import { navigation, site, socials } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { BackToTop } from "@/components/back-to-top";
import { isConfigured, normalizeUrl } from "@/lib/utils";
import { getCopyrightYear } from "@/lib/year";

const ICON_BY_ID = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
} as const;

export async function Footer() {
  const year = await getCopyrightYear();
  const configuredSocials = socials.filter((social) => isConfigured(social.href));

  return (
    <footer className="relative border-t border-line print:hidden">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl leading-none text-fg">MK</span>
              <span
                className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lime"
                aria-hidden="true"
              />
            </div>
            <p className="mt-4 text-base text-fg">{site.name}</p>
            <p className="text-sm text-muted">{site.title}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Building useful web applications, AI tools and SaaS products from{" "}
              {site.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
              Navigate
            </p>
            <ul className="mt-5 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={`/${item.href}`}
                    className="text-sm text-muted transition-colors hover:text-lime"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume"
                  className="text-sm text-muted transition-colors hover:text-lime"
                >
                  Resume
                </a>
              </li>
              <li>
                <BackToTop variant="link" />
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
              Elsewhere
            </p>
            {configuredSocials.length ? (
              <ul className="mt-5 space-y-3">
                {configuredSocials.map((social) => {
                  const Icon = ICON_BY_ID[social.id];
                  return (
                    <li key={social.id}>
                      <a
                        href={normalizeUrl(social.href)}
                        target={social.id === "email" ? undefined : "_blank"}
                        rel={
                          social.id === "email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-lime"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-5 font-mono text-xs leading-relaxed text-muted">
                Social links are not configured yet — add them in{" "}
                <span className="text-lime">data/portfolio.ts</span>.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
