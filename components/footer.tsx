import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm text-ink-faint">
          © {new Date().getFullYear()} {site.name} · Built with Next.js, Tailwind &
          Framer Motion
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-ink-faint transition-colors hover:text-ink"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
          </li>
          <li>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-ink-faint transition-colors hover:text-ink"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="text-ink-faint transition-colors hover:text-ink"
            >
              <Mail className="h-4 w-4" aria-hidden />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
