"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search, Sparkles, X } from "lucide-react";
import { createRetriever, exampleQuestions, type Hit } from "@/lib/retrieval";

/**
 * "Ask this site" — the portfolio's signature interaction.
 * A recruiter types a question; BM25 retrieval (the same ranking family
 * used in my RAG chatbot's hybrid retriever) finds the most relevant
 * content chunks and answers with numbered citations that scroll to
 * their source sections. Runs fully client-side: no API, no tracking.
 */
export function AskSite() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [hits, setHits] = useState<Hit[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const search = useMemo(() => createRetriever(), []);

  function ask(q: string) {
    const question = q.trim();
    if (!question) return;
    setAsked(question);
    setHits(search(question));
  }

  function goTo(anchor: string) {
    setOpen(false);
    document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Launcher — bottom-left, mirroring scroll-to-top on the right */}
      <motion.button
        type="button"
        onClick={() => {
          setOpen(true);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        aria-label="Ask this site a question"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="glass fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full py-2.5 pl-3 pr-4 text-sm font-medium shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <Sparkles className="h-4 w-4 text-accent" aria-hidden />
        Ask this site
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-6 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Ask this site"
              className="glass w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-edge px-5 py-3.5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-accent" aria-hidden />
                  Ask this site
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-md p-1 text-ink-faint transition-colors hover:text-ink"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(query);
                }}
                className="flex items-center gap-3 border-b border-edge px-5 py-3"
              >
                <Search className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. does he know Python?"
                  aria-label="Your question"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint"
                />
                <button
                  type="submit"
                  aria-label="Ask"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform hover:scale-110 active:scale-90"
                >
                  <CornerDownLeft className="h-3.5 w-3.5" aria-hidden />
                </button>
              </form>

              <div className="max-h-[50vh] overflow-y-auto p-5">
                {!asked && (
                  <>
                    <p className="mb-3 text-xs uppercase tracking-widest text-ink-faint">
                      Try asking
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {exampleQuestions.map((q) => (
                        <li key={q}>
                          <button
                            type="button"
                            onClick={() => {
                              setQuery(q);
                              ask(q);
                            }}
                            className="rounded-full border border-edge px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-accent/60 hover:text-ink"
                          >
                            {q}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {asked && hits.length === 0 && (
                  <p className="text-sm text-ink-muted">
                    Nothing retrieved for that — try asking about projects,
                    skills, experience, or contact details.
                  </p>
                )}

                {asked && hits.length > 0 && (
                  <div aria-live="polite">
                    <p className="mb-4 text-sm leading-relaxed">
                      {hits[0].chunk.text}{" "}
                      <sup className="font-mono text-accent">[1]</sup>
                    </p>
                    <p className="mb-2 text-xs uppercase tracking-widest text-ink-faint">
                      Sources
                    </p>
                    <ol className="space-y-1.5">
                      {hits.map((h, i) => (
                        <li key={h.chunk.id}>
                          <button
                            type="button"
                            onClick={() => goTo(h.chunk.anchor)}
                            className="group flex w-full items-baseline gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors hover:bg-accent/10"
                          >
                            <span className="font-mono text-accent">[{i + 1}]</span>
                            <span className="font-medium text-ink group-hover:text-accent">
                              {h.chunk.source}
                            </span>
                            <span className="ml-auto shrink-0 font-mono text-[10px] text-ink-faint">
                              score {h.score.toFixed(2)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              <p className="border-t border-edge px-5 py-2.5 text-[11px] leading-snug text-ink-faint">
                Real BM25 retrieval with citations, running in your browser — the
                same ranking family behind the hybrid retriever in my{" "}
                <a
                  href="https://github.com/nsanjayrao/free-rag-chatbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:underline"
                >
                  RAG chatbot
                </a>
                . No API. No tracking.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
