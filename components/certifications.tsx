"use client";

import { Award, ExternalLink } from "lucide-react";
import { Section, Reveal } from "./section";
import { certifications } from "@/lib/data";

export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Verified learning."
      lede="Formal courses that back up the hands-on work."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.08}>
            <div className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent/40">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Award className="h-5 w-5 text-accent" aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-semibold">{cert.name}</h3>
                {cert.issuer && <p className="text-xs text-ink-faint">{cert.issuer}</p>}
                {cert.href && (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" aria-hidden />
                    View credential
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
