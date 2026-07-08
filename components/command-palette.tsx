"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Download,
  FolderGit2,
  Github,
  Home,
  Linkedin,
  Mail,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import { site } from "@/lib/data";
import { OPEN_PALETTE_EVENT } from "@/lib/command-events";

type Command = {
  label: string;
  hint: string;
  icon: React.ElementType;
  action: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = useCallback((hash: string) => {
    setOpen(false);
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const commands: Command[] = [
    { label: "Home", hint: "Go to top", icon: Home, action: () => go("#hero") },
    { label: "About", hint: "Timeline & story", icon: User, action: () => go("#about") },
    { label: "Skills", hint: "What I work with", icon: Sparkles, action: () => go("#skills") },
    { label: "Experience", hint: "Where I've worked", icon: Briefcase, action: () => go("#experience") },
    { label: "Projects", hint: "Things I've built", icon: FolderGit2, action: () => go("#projects") },
    { label: "Contact", hint: "Get in touch", icon: Mail, action: () => go("#contact") },
    {
      label: "Download resume",
      hint: "PDF, one page",
      icon: Download,
      action: () => {
        setOpen(false);
        window.open(site.resumeHref, "_blank");
      },
    },
    {
      label: "GitHub",
      hint: "github.com/nsanjayrao",
      icon: Github,
      action: () => {
        setOpen(false);
        window.open(site.github, "_blank");
      },
    },
    {
      label: "LinkedIn",
      hint: "Connect with me",
      icon: Linkedin,
      action: () => {
        setOpen(false);
        window.open(site.linkedin, "_blank");
      },
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      filtered[active]?.action();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
              <Search className="h-4 w-4 text-ink-faint" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-edge px-1.5 py-0.5 text-[10px] text-ink-faint">
                ESC
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-ink-faint">
                  No matching commands.
                </li>
              )}
              {filtered.map((c, i) => (
                <li key={c.label} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onClick={c.action}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active ? "bg-accent/10 text-ink" : "text-ink-muted"
                    }`}
                  >
                    <c.icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span className="font-medium">{c.label}</span>
                    <span className="ml-auto text-xs text-ink-faint">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
