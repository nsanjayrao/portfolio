"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { Section, Reveal } from "./section";
import { site } from "@/lib/data";

/** Click-to-copy for the email row with a brief "copied" confirmation. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(site.email).then(() => setCopied(true));
      }}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-md text-ink-faint transition-all hover:bg-accent/10 hover:text-accent active:scale-90"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden />
      )}
    </button>
  );
}

/**
 * No-backend contact form: composes a mailto draft in the visitor's
 * email client. Free-tier honest — no fake "message sent" states.
 */
export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name || "a visitor"}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const channels = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Github, label: "GitHub", value: "nsanjayrao", href: site.github },
    { icon: Linkedin, label: "LinkedIn", value: "n-sanjay-rao", href: site.linkedin },
    { icon: MapPin, label: "Location", value: site.location },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something."
      lede="I'm actively looking for AI / GenAI engineering roles — document Q&A, knowledge-base assistants, LLM evaluation pipelines, internal automation. If that's what you're building, I'd love to talk."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <ul className="space-y-4">
            {channels.map((c) => (
              <li key={c.label} className="flex items-center gap-4">
                <span className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <c.icon className="h-4 w-4 text-accent" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-faint">{c.label}</p>
                  {c.href ? (
                    <span className="flex items-center">
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium transition-colors hover:text-accent"
                      >
                        {c.value}
                      </a>
                      {c.label === "Email" && <CopyEmail />}
                    </span>
                  ) : (
                    <p className="text-sm font-medium">{c.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="glass rounded-2xl p-6 sm:p-8">
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
              Your name
            </label>
            <input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Recruiter"
              className="mb-5 w-full rounded-xl border border-edge bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            />
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Hi Sanjay — we're hiring for…"
              className="mb-6 w-full resize-none rounded-xl border border-edge bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
            />
            <button
              type="submit"
              className="btn-primary w-full !rounded-xl"
            >
              <Send className="h-4 w-4" aria-hidden />
              Compose email
            </button>
            <p className="mt-3 text-center text-xs text-ink-faint">
              Opens your email client — no data is stored by this site.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
