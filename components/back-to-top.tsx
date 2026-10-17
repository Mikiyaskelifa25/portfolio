"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  variant?: "pill" | "link";
  label?: string;
  className?: string;
}

export function BackToTop({
  variant = "pill",
  label = "Back to top",
  className,
}: BackToTopProps) {
  function handleClick() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "text-sm text-muted transition-colors hover:text-lime",
          className,
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-muted transition-colors hover:border-lime/50 hover:text-lime",
        className,
      )}
    >
      {label}
      <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
