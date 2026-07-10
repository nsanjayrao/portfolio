"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/data";
import { openPalette } from "@/lib/command-events";
import { scrollToHash } from "@/lib/scroll";

const links = [
  { href: "#about", label: "About", index: "01" },
  { href: "#skills", label: "Skills", index: "02" },
  { href: "#experience", label: "Experience", index: "03" },
  { href: "#projects", label: "Projects", index: "04" },
  { href: "#certifications", label: "Certs", index: "05" },
  { href: "#contact", label: "Contact", index: "06" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [pastHero, setPastHero] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  // Once the hero status line scrolls away, echo it in the nav.
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view for the active marker.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Full-screen menu open: lock body scroll behind it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function go(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    scrollToHash(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Main navigation"
        className="border-b border-edge bg-surface/90 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              onClick={(e) => go(e, "#hero")}
              className="font-display text-base uppercase tracking-wide transition-colors hover:text-accent"
            >
              {site.name}
              <span className="text-accent">.</span>
            </a>
            <AnimatePresence>
              {pastHero && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint lg:flex"
                >
                  <span className="relative flex h-1.5 w-1.5" aria-hidden>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Open to work
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className={`group font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-ink ${
                    activeHash === l.href ? "text-ink" : "text-ink-faint"
                  }`}
                >
                  <span
                    className={`mr-1.5 transition-colors ${
                      activeHash === l.href ? "text-accent" : "text-ink-faint/60 group-hover:text-accent"
                    }`}
                    aria-hidden
                  >
                    {l.index}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette (Ctrl+K)"
              className="hidden h-9 items-center gap-2 border border-edge bg-surface-raised px-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted transition-colors hover:border-ink hover:text-ink sm:flex"
            >
              <Command className="h-3 w-3" aria-hidden />
              <kbd>Ctrl K</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center border border-edge bg-surface-raised transition-colors hover:border-ink md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <X className="h-4 w-4" aria-hidden />
              ) : (
                <Menu className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Scroll progress — a single red hairline under the nav */}
      <motion.div
        className="h-px origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />

      {/* Full-screen mobile menu with oversized numbered links */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[57px] z-30 bg-surface md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                  className="border-b border-edge"
                >
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="font-mono text-xs text-accent" aria-hidden>
                      {l.index}
                    </span>
                    <span className="font-display text-4xl uppercase">{l.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
