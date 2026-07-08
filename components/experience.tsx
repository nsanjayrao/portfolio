"use client";

import { Briefcase } from "lucide-react";
import { Section, Reveal } from "./section";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked."
      lede="Two years inside a Google GenAI evaluation pipeline — the rare vantage point of seeing thousands of LLM outputs succeed and fail every week."
    >
      <div className="space-y-6">
        {experience.map((job, i) => (
          <Reveal key={job.role} delay={i * 0.1}>
            <article className="glass spotlight group relative rounded-2xl p-6 transition-all hover:border-accent/40 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Briefcase
                      className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:scale-110"
                      aria-hidden
                    />
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-ink-faint">{job.company}</p>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {job.period}
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Related skills">
                {job.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
