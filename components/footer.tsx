import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/data";
import { LocalClock } from "./clock";

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-edge">
      {/* Giant dot-matrix wordmark bleeding off the baseline */}
      <div className="mx-auto max-w-6xl px-6 pt-14" aria-hidden>
        <p className="select-none whitespace-nowrap font-display uppercase leading-none text-ink/10 dark:text-ink/15 text-[clamp(4rem,14.5vw,13rem)]">
          Sanjay Rao
        </p>
      </div>

      <div className="border-t border-edge">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-4 px-6 py-6 sm:grid-cols-4">
          <div>
            <p className="meta mb-1">© {new Date().getFullYear()}</p>
            <p className="font-mono text-xs text-ink-muted">{site.name}</p>
          </div>
          <div>
            <p className="meta mb-1">Stack</p>
            <p className="font-mono text-xs text-ink-muted">Next.js / Tailwind / Motion</p>
          </div>
          <div>
            <p className="meta mb-1">Local time</p>
            <p className="font-mono text-xs text-ink-muted">
              <LocalClock />
            </p>
          </div>
          <div className="flex items-center gap-4 sm:justify-end">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-ink-faint transition-colors hover:text-ink"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-ink-faint transition-colors hover:text-ink"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="text-ink-faint transition-colors hover:text-ink"
            >
              <Mail className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
