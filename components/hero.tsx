"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download, FolderGit2, Github, Linkedin, Mail } from "lucide-react";
import { site, typingRoles } from "@/lib/data";
import { useMagnetic } from "@/lib/use-magnetic";

/** Cycles through role strings with a typewriter effect. */
function useTypewriter(words: string[], enabled: boolean) {
  const [text, setText] = useState(enabled ? "" : words[0]);
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = words[wordIdx % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";

    const delay = done ? 1800 : deleting ? 35 : 70;
    const timer = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setWordIdx((i) => i + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, wordIdx, words, enabled]);

  return text;
}

function MagneticButton({
  children,
  href,
  primary,
  download,
  external,
  ariaLabel,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  download?: boolean;
  external?: boolean;
  ariaLabel?: string;
}) {
  const magnetic = useMagnetic<HTMLAnchorElement>();

  return (
    <motion.a
      ref={magnetic.ref}
      href={href}
      download={download}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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

export function Hero() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(typingRoles, !reduce);

  // Mouse parallax on the aurora blobs.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });
  const blob1x = useTransform(smx, (v) => v * 30);
  const blob1y = useTransform(smy, (v) => v * 30);
  const blob2x = useTransform(smx, (v) => v * -45);
  const blob2y = useTransform(smy, (v) => v * -45);

  function onMouseMove(e: React.MouseEvent) {
    if (reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  const entrance = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
        };

  return (
    <section
      id="hero"
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 sm:pt-24"
    >
      {/* Background layers */}
      <div className="bg-grid absolute inset-0" aria-hidden />
      <motion.div
        aria-hidden
        style={{ x: blob1x, y: blob1y }}
        className="aurora-blob animate-aurora left-[8%] top-[12%] h-[24rem] w-[24rem] bg-indigo-500/20 dark:bg-indigo-500/20"
      />
      <motion.div
        aria-hidden
        style={{ x: blob2x, y: blob2y }}
        className="aurora-blob animate-aurora-slow bottom-[10%] right-[6%] h-[28rem] w-[28rem] bg-fuchsia-500/15 dark:bg-fuchsia-500/15"
      />
      <div
        aria-hidden
        className="aurora-blob animate-aurora left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 dark:bg-purple-500/10"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Portrait: gradient ring ties into the signature gradient on the name */}
        <motion.div
          {...entrance(0)}
          className="mx-auto mb-7 w-fit rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-xl shadow-indigo-500/20"
        >
          <Image
            src="/avatar.webp"
            alt="Portrait of N Sanjay Rao"
            width={128}
            height={128}
            priority
            className="h-24 w-24 rounded-full sm:h-32 sm:w-32"
          />
        </motion.div>

        <motion.p
          {...entrance(0.05)}
          className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-ink-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to AI / GenAI engineering roles · {site.location}
        </motion.p>

        <motion.h1 {...entrance(0.1)} className="text-display text-balance">
          Hi, I&apos;m <span className="gradient-text">{site.shortName}</span>.
        </motion.h1>

        <motion.p
          {...entrance(0.2)}
          className="mx-auto mt-6 min-h-[2.25rem] text-xl font-medium tracking-tight text-ink-muted sm:text-2xl"
        >
          {/* Screen readers get the full static list; the typed text is decorative */}
          <span className="sr-only">{typingRoles.join(", ")}</span>
          <span aria-hidden>{typed}</span>
          {!reduce && (
            <span aria-hidden className="ml-0.5 inline-block w-[2px] animate-blink bg-accent align-middle" style={{ height: "1.2em" }} />
          )}
        </motion.p>

        <motion.p
          {...entrance(0.3)}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
        >
          {site.tagline} Two years quality-assuring LLM outputs on a Google GenAI
          workflow — and shipping retrieval, agent, and full-stack projects on the side.
        </motion.p>

        {/* CTA hierarchy: one primary, one secondary, tertiary as icons */}
        <motion.div
          {...entrance(0.4)}
          className="mt-11 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="#projects" primary>
            <FolderGit2
              className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
              aria-hidden
            />
            View Projects
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

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 text-ink-faint transition-colors hover:text-ink"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.span
          className="block"
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
