"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section, Reveal } from "./section";
import { learning, skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with."
      lede="Depth in retrieval and LLM evaluation, breadth across the Python data stack — and an honest list of what I'm closing next."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.07}>
            <div className="glass h-full rounded-2xl p-6 transition-colors hover:border-accent/40">
              <h3 className="mb-4 font-semibold">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.05 + si * 0.03, duration: 0.3 }}
                  >
                    <span className="inline-block cursor-default rounded-full border border-edge bg-surface px-3 py-1 text-xs font-medium text-ink-muted transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-ink">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        {/* Honesty as a feature: what I'm actively closing right now */}
        <Reveal delay={skillGroups.length * 0.07}>
          <div className="glass h-full rounded-2xl border-dashed p-6">
            <h3 className="mb-1 flex items-center gap-2 font-semibold">
              <GraduationCap className="h-4 w-4 text-accent" aria-hidden />
              Currently learning
            </h3>
            <p className="mb-4 text-xs text-ink-faint">
              Actively closing these — ask me about my progress.
            </p>
            <ul className="flex flex-wrap gap-2">
              {learning.map((skill) => (
                <li key={skill}>
                  <span className="inline-block rounded-full border border-dashed border-accent/50 px-3 py-1 text-xs font-medium text-accent">
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
