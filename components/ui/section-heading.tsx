import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.3em] text-lime">
            {index}
          </span>
          <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
            {label}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="max-w-4xl font-display text-[clamp(2rem,5.4vw,4rem)] leading-[1.02] tracking-[-0.035em] text-fg text-balance">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
