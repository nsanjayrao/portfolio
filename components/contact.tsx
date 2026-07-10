"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from "lucide-react";
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
      className="ml-2 inline-flex h-6 w-6 items-center justify-center text-ink-faint transition-all hover:text-accent active:scale-90"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-accent" aria-hidden />
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
      index="06"
      eyebrow="Contact"
      title="Let's build something."
      lede="I'm actively looking for AI / GenAI engineering roles — document Q&A, knowledge-base assistants, LLM evaluation pipelines, internal automation. If that's what you're building, I'd love to talk."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <ul className="border-t border-edge">
            {channels.map((c) => (
              <li
                key={c.label}
                className="grid grid-cols-[120px_1fr] items-center gap-4 border-b border-edge py-4"
              >
                <p className="meta flex items-center gap-2.5">
                  <c.icon className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {c.label}
                </p>
                {c.href ? (
                  <span className="flex items-center">
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="link-slide text-sm font-medium"
                    >
                      {c.value}
                    </a>
                    {c.label === "Email" && <CopyEmail />}
                  </span>
                ) : (
                  <p className="text-sm font-medium">{c.value}</p>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="panel p-6 sm:p-8">
            <label htmlFor="contact-name" className="meta mb-1 block">
              Your name
            </label>
            <input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Recruiter"
              className="field mb-6"
            />
            <label htmlFor="contact-message" className="meta mb-1 block">
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Hi Sanjay — we're hiring for…"
              className="field mb-8 resize-none"
            />
            <button type="submit" className="btn-primary group w-full">
              Compose email
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </button>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              Opens your email client — no data is stored by this site.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
