"use client";

import { motion } from "framer-motion";
import { Section, Reveal } from "./section";
import { learning, skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="What I work with."
      lede="Depth in retrieval and LLM evaluation, breadth across the Python data stack — and an honest list of what I'm closing next."
    >
      {/* Spec-sheet rows: mono group label left, tag field right */}
      <div className="border-t border-edge">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title}>
            <div className="grid gap-4 border-b border-edge py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <h3 className="meta flex items-start gap-2.5 pt-1.5">
                <span className="text-ink-faint/60" aria-hidden>
                  {String(gi + 1).padStart(2, "0")}
                </span>
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: si * 0.03, duration: 0.3 }}
                  >
                    <span className="chip cursor-default transition-colors hover:border-ink hover:text-ink">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        {/* Honesty as a feature: what I'm actively closing right now */}
        <Reveal>
          <div className="grid gap-4 border-b border-edge py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
            <div className="pt-1.5">
              <h3 className="meta flex items-start gap-2.5 !text-accent">
                <span aria-hidden>+</span>
                Currently learning
              </h3>
              <p className="mt-2 font-mono text-[10px] leading-relaxed text-ink-faint">
                Actively closing these — ask me about my progress.
              </p>
            </div>
            <ul className="flex flex-wrap content-start gap-2">
              {learning.map((skill) => (
                <li key={skill}>
                  <span className="chip border-dashed !border-accent/60 !text-accent">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
