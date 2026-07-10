"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Lock, Search } from "lucide-react";
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
      className="aspect-video w-full border-b border-edge object-cover transition-transform duration-500 group-hover:scale-[1.02]"
    >
      {!reduce && <source src={src} type="video/mp4" />}
    </video>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      className="panel group relative flex h-full flex-col transition-colors hover:border-ink"
    >
      {/* Media sits flush against the card frame */}
      {project.video && (
        <div className="overflow-hidden">
          <DemoVideo
            src={project.video.src}
            poster={project.video.poster}
            title={project.title}
          />
        </div>
      )}
      {!project.video && project.image && (
        <div className="overflow-hidden">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={800}
            height={450}
            loading="lazy"
            className="aspect-video w-full border-b border-edge object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[11px] tabular-nums tracking-widest text-ink-faint transition-colors group-hover:text-accent">
            {String(index + 1).padStart(3, "0")}
          </span>
          {project.flagship && (
            <span className="meta flex items-center gap-1.5 !text-accent">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
              Flagship
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.summary}</p>

        <ul className="mt-4 flex-1 space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-xs leading-relaxed text-ink-muted">
              <span className="mt-[0.45rem] h-1 w-1 shrink-0 bg-accent/70" aria-hidden />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t} className="chip !px-2 !py-0.5">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-4 border-t border-edge pt-4">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted transition-colors hover:text-ink"
              aria-label={`Source of ${project.title} on GitHub`}
            >
              <Github className="h-3.5 w-3.5" aria-hidden />
              Source
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint"
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
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent transition-colors hover:underline"
              aria-label={`${project.title} live demo`}
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

const featured = projects
  .filter((p) => !p.archive)
  .map((project, index) => ({ project, index }));
const archived = projects.filter((p) => p.archive);

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = featured.filter(({ project: p }) => {
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
      index="04"
      eyebrow="Projects"
      title="Things I've built."
      lede="Most of these are public and runnable on free tiers — click through to the source and see for yourself. A couple are private client / work projects, shown here for context."
    >
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 border border-edge bg-surface-raised px-4 py-2">
          <Search className="h-4 w-4 text-ink-faint" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            aria-label="Search projects"
            className="w-36 bg-transparent font-mono text-xs outline-none placeholder:text-ink-faint sm:w-48"
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
                className={`border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all ${
                  filter === f
                    ? "border-ink bg-ink text-surface"
                    : "border-edge bg-surface-raised text-ink-muted hover:border-ink hover:text-ink"
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
          {visible.map(({ project: p, index }) => (
            <ProjectCard key={p.slug} project={p} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="meta py-12 text-center">
          No projects match — try a different search or filter.
        </p>
      )}

      {/* Earlier / learning-era work: kept for breadth, out of the spotlight */}
      {archived.length > 0 && (
        <div className="mt-16">
          <p className="meta mb-2 flex items-center gap-2.5">
            <span className="inline-block h-1.5 w-1.5 bg-ink-faint" aria-hidden />
            Archive — earlier work
          </p>
          <ul className="border-t border-edge">
            {archived.map((p) => (
              <li key={p.slug} className="border-b border-edge">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-1 py-4 sm:grid-cols-[220px_1fr_auto] sm:items-baseline sm:gap-8"
                  aria-label={`${p.title} on GitHub`}
                >
                  <span className="text-sm font-medium transition-colors group-hover:text-accent">
                    {p.title}
                  </span>
                  <span className="text-xs text-ink-muted">{p.summary}</span>
                  <span className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint transition-colors group-hover:text-ink sm:inline-flex">
                    <Github className="h-3.5 w-3.5" aria-hidden />
                    Source
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
