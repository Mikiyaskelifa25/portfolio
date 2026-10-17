"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { process as processSteps } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="04"
                label="How I build"
                title="A simple process, followed properly."
                description="The same four steps whether it's a landing page, a SaaS dashboard or an AI tool."
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <ol ref={listRef} className="relative space-y-12 pl-10 sm:pl-14">
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[7px] w-px bg-line"
              >
                <motion.span
                  style={reduceMotion ? { height: "100%" } : { height: fill }}
                  className="absolute inset-x-0 top-0 block w-px bg-gradient-to-b from-lime to-lime/20"
                />
              </span>

              {processSteps.map((stage, index) => (
                <li key={stage.id} className="relative">
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-1.5 -left-10 grid h-4 w-4 place-items-center rounded-full border border-line-strong bg-ink sm:-left-14"
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  </motion.span>

                  <Reveal delay={index * 0.04}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs tracking-[0.3em] text-lime">
                        {stage.id}
                      </span>
                      <h3 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-tight tracking-[-0.03em] text-fg">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                      {stage.description}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
