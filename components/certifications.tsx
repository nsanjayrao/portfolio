"use client";

import { ArrowUpRight } from "lucide-react";
import { Section, Reveal } from "./section";
import { certifications } from "@/lib/data";

export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section
      id="certifications"
      index="05"
      eyebrow="Certifications"
      title="Verified learning."
      lede="Formal courses that back up the hands-on work."
    >
      <div className="border-t border-edge">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.08}>
            <div className="group grid gap-2 border-b border-edge py-6 sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-8">
              <span className="font-mono text-[11px] tabular-nums tracking-widest text-ink-faint" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold transition-colors group-hover:text-accent">
                  {cert.name}
                </h3>
                {cert.issuer && (
                  <p className="mt-1 font-mono text-xs text-ink-faint">{cert.issuer}</p>
                )}
              </div>
              {cert.href && (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent hover:underline"
                >
                  View credential
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
