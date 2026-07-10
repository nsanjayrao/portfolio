"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Section, Reveal } from "./section";
import { stats, timeline } from "@/lib/data";

/** Counts from 0 to `target` when scrolled into view. */
function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reduce]);

  return (
    <span ref={ref} className="font-display text-4xl tabular-nums text-ink sm:text-5xl">
      {value}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="From evaluating AI to building it.">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <Reveal>
            <div className="mb-8 flex items-start gap-6">
              {/* Portrait: monochrome at rest, color on hover — hardware-matte framing */}
              <div className="group relative shrink-0 border border-edge p-1.5">
                <Image
                  src="/avatar.webp"
                  alt="Portrait of N Sanjay Rao"
                  width={128}
                  height={128}
                  className="h-24 w-24 object-cover grayscale transition-all duration-500 group-hover:grayscale-0 sm:h-28 sm:w-28"
                />
                <span
                  className="absolute -bottom-1 -right-1 h-2.5 w-2.5 bg-accent"
                  aria-hidden
                />
              </div>
              <p className="text-lg leading-relaxed text-ink-muted">
                I spend my days inside a{" "}
                <strong className="font-semibold text-ink">Google GenAI evaluation workflow</strong>{" "}
                — judging LLM outputs against evolving policy at 99%+ accuracy — and my
                nights building the systems that produce them.
              </p>
            </div>
            <p className="text-lg leading-relaxed text-ink-muted">
              RAG pipelines with hybrid retrieval and reranking, multi-agent workflows,
              and full-stack apps that run entirely on free tiers. That combination is
              my edge: I don&apos;t just make LLM systems work, I know how to measure{" "}
              <em>whether</em> they work — chunking trade-offs, retrieval quality,
              hallucination detection, and the evaluation rubrics that separate a demo
              from a product.
            </p>
          </Reveal>

          {/* Spec-sheet stats: hairline-ruled 2×2 grid, dot-matrix numerals */}
          <div className="mt-12 grid grid-cols-2 border-l border-t border-edge sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="border-b border-r border-edge">
                <div className="p-5">
                  <CountUp target={s.value} suffix={s.suffix} />
                  <p className="meta mt-3 !tracking-[0.12em] leading-snug normal-case">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <ol className="relative border-l border-edge pl-8" aria-label="Career timeline">
          {timeline.map((item, i) => (
            <motion.li
              key={item.title}
              className="relative pb-8 last:pb-0"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span
                className="absolute -left-[2.22rem] top-1.5 flex h-3 w-3 items-center justify-center"
                aria-hidden
              >
                {/* Current chapter (top item) gets a living pulse */}
                {i === 0 && (
                  <span className="absolute inline-flex h-full w-full animate-ping bg-accent opacity-30" />
                )}
                <span className={`h-2 w-2 ${i === 0 ? "bg-accent" : "bg-ink-faint"}`} />
              </span>
              <p className="meta text-accent">{item.period}</p>
              <h3 className="mt-1.5 font-semibold">{item.title}</h3>
              <p className="font-mono text-xs text-ink-faint">{item.place}</p>
              {item.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
