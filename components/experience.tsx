"use client";

import { Section, Reveal } from "./section";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Where I've worked."
      lede="Two years inside a Google GenAI evaluation pipeline — the rare vantage point of seeing thousands of LLM outputs succeed and fail every week."
    >
      <div className="border-t border-edge">
        {experience.map((job, i) => (
          <Reveal key={job.role} delay={i * 0.1}>
            <article className="group grid gap-4 border-b border-edge py-8 lg:grid-cols-[220px_1fr] lg:gap-8">
              <div>
                <p className="meta text-accent">{job.period}</p>
                <p className="mt-2 font-mono text-xs leading-relaxed text-ink-faint">
                  {job.company}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                  {job.role}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Related skills">
                  {job.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
