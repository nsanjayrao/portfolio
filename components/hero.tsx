"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { site, typingRoles } from "@/lib/data";
import { useMagnetic } from "@/lib/use-magnetic";
import { scrollToHash } from "@/lib/scroll";
import { LocalClock } from "./clock";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/** Roles flip upward through a text mask, with a [0X/0N] counter. */
function RoleRotator({ roles, enabled }: { roles: string[]; enabled: boolean }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length, enabled]);

  return (
    <p className="flex items-baseline gap-4 font-mono text-sm uppercase tracking-[0.18em] text-ink-muted sm:text-base">
      <span className="tabular-nums text-accent" aria-hidden>
        [{String(idx + 1).padStart(2, "0")}/{String(roles.length).padStart(2, "0")}]
      </span>
      {/* Screen readers get the full static list; the rotator is decorative */}
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="relative block h-[1.6em] flex-1 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={roles[idx]}
            initial={enabled ? { y: "110%" } : false}
            animate={{ y: 0 }}
            exit={enabled ? { y: "-110%" } : undefined}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-x-0 top-0 block whitespace-nowrap"
          >
            {roles[idx]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

function MagneticButton({
  children,
  href,
  primary,
  download,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  download?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
}) {
  const magnetic = useMagnetic<HTMLAnchorElement>();

  return (
    <motion.a
      ref={magnetic.ref}
      href={href}
      download={download}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      style={{ x: magnetic.x, y: magnetic.y }}
      className={`group ${primary ? "btn-primary" : "btn-secondary"}`}
    >
      {children}
    </motion.a>
  );
}

/** Icon-only magnetic link for tertiary actions. */
function MagneticIcon({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const magnetic = useMagnetic<HTMLAnchorElement>();

  return (
    <motion.a
      ref={magnetic.ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      style={{ x: magnetic.x, y: magnetic.y }}
      className="btn-icon group"
    >
      {children}
    </motion.a>
  );
}

/** One display line revealed through an overflow mask — award-site staple. */
function MaskedLine({
  children,
  delay,
  reduce,
}: {
  children: React.ReactNode;
  delay: number;
  reduce: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const entrance = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden pt-24"
    >
      <div className="bg-dots absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Status line */}
        <motion.p {...entrance(0.05)} className="meta mb-8 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open to AI / GenAI engineering roles — {site.location}
        </motion.p>

        {/* Name — dot-matrix display type at full editorial scale */}
        <h1 className="text-display uppercase">
          <MaskedLine delay={0.1} reduce={!!reduce}>
            N Sanjay
          </MaskedLine>
          <MaskedLine delay={0.22} reduce={!!reduce}>
            Rao<span className="text-accent">.</span>
          </MaskedLine>
        </h1>

        <motion.div {...entrance(0.45)} className="mt-8 max-w-xl">
          <RoleRotator roles={typingRoles} enabled={!reduce} />
          <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
            By day I quality-assure a Google GenAI evaluation workflow — 150+ LLM
            outputs judged against policy, every day. By night I build the systems
            I&apos;d want to evaluate: RAG pipelines, multi-agent workflows, and
            full-stack apps that run on free tiers.
          </p>
        </motion.div>

        {/* CTA hierarchy: one primary, one secondary, tertiary as icons */}
        <motion.div
          {...entrance(0.6)}
          className="mt-10 flex flex-wrap items-center gap-3 pb-14"
        >
          <MagneticButton
            href="#projects"
            primary
            onClick={(e) => {
              e.preventDefault();
              scrollToHash("#projects");
            }}
          >
            View Projects
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </MagneticButton>
          <MagneticButton href={site.resumeHref} download ariaLabel="Download resume PDF">
            <Download
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden
            />
            Resume
          </MagneticButton>
          <div className="flex items-center gap-2 pl-1">
            <MagneticIcon href={site.github} ariaLabel="GitHub profile">
              <Github className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden />
            </MagneticIcon>
            <MagneticIcon href={site.linkedin} ariaLabel="LinkedIn profile">
              <Linkedin className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden />
            </MagneticIcon>
            <MagneticIcon href={`mailto:${site.email}`} ariaLabel="Email me">
              <Mail className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" aria-hidden />
            </MagneticIcon>
          </div>
        </motion.div>
      </div>

      {/* Spec-sheet metadata strip pinned to the fold */}
      <motion.div {...entrance(0.8)} className="relative z-10 border-t border-edge">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-4 px-6 py-5 sm:grid-cols-4">
          <div>
            <p className="meta mb-1">Location</p>
            <p className="font-mono text-xs text-ink-muted">17.38°N / 78.48°E</p>
          </div>
          <div>
            <p className="meta mb-1">Local time</p>
            <p className="font-mono text-xs text-ink-muted">
              <LocalClock />
            </p>
          </div>
          <div>
            <p className="meta mb-1">Focus</p>
            <p className="font-mono text-xs text-ink-muted">RAG / Agents / Evals</p>
          </div>
          <div className="flex items-end justify-start sm:justify-end">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#about");
              }}
              aria-label="Scroll to about section"
              className="meta flex items-center gap-2 transition-colors hover:text-ink"
            >
              Scroll
              <motion.span
                aria-hidden
                animate={reduce ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </motion.span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
