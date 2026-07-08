"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink, Github, Lock, Search, Star } from "lucide-react";
import { Section } from "./section";
import { projectFilters, projects, type Project } from "@/lib/data";

/**
 * Demo clip that only plays while scrolled into view; reduced-motion
 * users get the poster frame instead of a moving video.
 */
function DemoVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView, reduce]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={`Demo recording of ${title}`}
      className="mb-5 aspect-video w-full rounded-xl border border-edge object-cover"
    >
      {!reduce && <source src={src} type="video/mp4" />}
    </video>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 3D tilt on hover
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });
  const transform = useTransform(
    [srx, sry],
    ([a, b]) => `perspective(900px) rotateX(${a}deg) rotateY(${b}deg)`
  );

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Spotlight follows the cursor even under reduced motion (it's static
    // positioning, not animation); only the tilt is motion.
    ref.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    if (reduce) return;
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 6);
    rx.set(((e.clientY - rect.top) / rect.height - 0.5) * -6);
  }

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35 }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ transform: reduce ? undefined : transform }}
      className="glass spotlight group relative flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-accent/50"
    >
      {project.flagship && (
        <span className="absolute -top-2.5 right-5 inline-flex items-center gap-1 rounded-full bg-ink px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-surface shadow-md">
          <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
          Flagship
        </span>
      )}

      {project.video && (
        <DemoVideo
          src={project.video.src}
          poster={project.video.poster}
          title={project.title}
        />
      )}
      {!project.video && project.image && (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={800}
          height={450}
          loading="lazy"
          className="mb-5 aspect-video w-full rounded-xl border border-edge object-cover object-top"
        />
      )}

      <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.summary}</p>

      <ul className="mt-4 flex-1 space-y-1.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-xs leading-relaxed text-ink-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
            {h}
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
        {project.tech.map((t) => (
          <li
            key={t}
            className="rounded-md border border-edge bg-surface px-2 py-0.5 font-mono text-[10px] text-ink-faint"
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-3 border-t border-edge pt-4">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink"
            aria-label={`Source of ${project.title} on GitHub`}
          >
            <Github className="h-3.5 w-3.5" aria-hidden />
            Source
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint"
            title="Source is a private repository"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Private repo
          </span>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:underline"
            aria-label={`${project.title} live demo`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            Live Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = projects.filter((p) => {
    const matchesFilter = filter === "All" || p.tags.includes(filter);
    const q = query.toLowerCase();
    const matchesQuery =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));
    return matchesFilter && matchesQuery;
  });

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built."
      lede="Most of these are public and runnable on free tiers — click through to the source and see for yourself. A couple are private client / work projects, shown here for context."
    >
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
          <Search className="h-4 w-4 text-ink-faint" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            aria-label="Search projects"
            className="w-36 bg-transparent text-sm outline-none placeholder:text-ink-faint sm:w-48"
          />
        </div>
        {/* Toggle buttons, not tabs: aria-pressed is correct and needs no
            roving-focus keyboard machinery */}
        <ul className="flex flex-wrap gap-2" aria-label="Filter projects by tag">
          {projectFilters.map((f) => (
            <li key={f}>
              <button
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-ink text-surface shadow-md"
                    : "glass text-ink-muted hover:text-ink"
                }`}
              >
                {f}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-12 text-center text-sm text-ink-faint">
          No projects match — try a different search or filter.
        </p>
      )}
    </Section>
  );
}
