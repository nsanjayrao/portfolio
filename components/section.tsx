"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Shared section wrapper: generous vertical rhythm + a heading group
 * (eyebrow / display title / muted lede) revealed on scroll.
 */
export function Section({ id, eyebrow, title, lede, children, className }: SectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      className={cn("mx-auto w-full max-w-6xl px-6 py-20 sm:py-28 lg:py-36", className)}
    >
      <motion.header
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-14 max-w-3xl sm:mb-16"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
        <h2 className="text-heading text-balance">{title}</h2>
        {lede && (
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            {lede}
          </p>
        )}
      </motion.header>
      {children}
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
