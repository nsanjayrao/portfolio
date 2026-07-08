"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/data";
import { openPalette } from "@/lib/command-events";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  // Track which section is in view for the active underline.
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

  function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <motion.div
        className="h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />
      <nav
        aria-label="Main navigation"
        className="glass mx-auto mt-3 flex w-[min(100%-1.5rem,72rem)] items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6"
      >
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, "#hero")}
          className="group text-sm font-bold tracking-tight"
        >
          <span className="gradient-text inline-block transition-transform duration-200 group-hover:scale-110">
            SR
          </span>
          <span className="ml-2 hidden text-ink-muted transition-colors group-hover:text-ink sm:inline">
            {site.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors hover:text-ink ${
                  activeHash === l.href ? "text-ink" : "text-ink-muted"
                }`}
              >
                {l.label}
              </a>
              {activeHash === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette (Ctrl+K)"
            className="glass hidden h-9 items-center gap-2 rounded-full px-3 text-xs text-ink-muted transition-transform hover:scale-105 sm:flex"
          >
            <Command className="h-3.5 w-3.5" aria-hidden />
            <kbd className="font-mono">Ctrl K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="glass flex h-9 w-9 items-center justify-center rounded-full md:hidden"
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
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-auto mt-2 w-[min(100%-1.5rem,72rem)] rounded-2xl p-2 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-accent/10 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
