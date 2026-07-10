"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  index: string; // "01" … "06" — spec-sheet section numbering
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Shared section wrapper: full-width hairline rule on top, a ghosted
 * dot-matrix index numeral, and a mono metadata eyebrow. Left-aligned
 * editorial rhythm throughout.
 */
export function Section({ id, index, eyebrow, title, lede, children, className }: SectionProps) {
  const reduce = useReducedMotion();

  return (
    <section id={id} className="border-t border-edge">
      <div className={cn("mx-auto w-full max-w-6xl px-6 py-20 sm:py-24 lg:py-32", className)}>
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-14 sm:mb-16"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="meta mb-4 flex items-center gap-2.5">
                <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden />
                {index} / {eyebrow}
              </p>
              <h2 className="text-heading text-balance">{title}</h2>
              {lede && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                  {lede}
                </p>
              )}
            </div>
            <span className="text-index hidden select-none sm:block" aria-hidden>
              {index}
            </span>
          </div>
        </motion.header>
        {children}
      </div>
    </section>
  );
}

/** Scroll-reveal wrapper for section content blocks. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
