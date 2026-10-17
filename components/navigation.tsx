"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import { navigation, site } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const SECTION_IDS = [...navigation.map((item) => item.href.replace("#", ""))];

export function Navigation() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const resumeHref = "/resume";
  const sectionHref = (href: string) => (onHome ? href : `/${href}`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 print:hidden",
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/60"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:h-20 sm:px-8"
      >
        <a
          href={onHome ? "#top" : "/"}
          className="group flex items-center gap-2 rounded-full py-2 pr-3 text-lg font-semibold tracking-tight text-fg transition-colors hover:text-lime"
          aria-label={`${site.name} — back to top`}
        >
          <span className="font-display text-2xl leading-none">MK</span>
          <span
            className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lime transition-transform duration-300 group-hover:scale-150"
            aria-hidden="true"
          />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const isActive = active === item.href.replace("#", "");
            return (
              <li key={item.href}>
                <a
                  href={sectionHref(item.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "text-fg"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface/70"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : null}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm text-fg transition-colors hover:border-lime/50 hover:text-lime md:inline-flex"
          >
            Resume
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-fg transition-colors hover:border-line-strong md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-[1240px] flex-col px-5 py-4 sm:px-8">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={sectionHref(item.href)}
                    onClick={close}
                    className="block rounded-xl px-2 py-3 text-base text-fg transition-colors hover:text-lime"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-5">
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex items-center justify-center gap-2 rounded-full bg-lime px-4 py-3 text-sm font-semibold text-ink"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  View resume
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
