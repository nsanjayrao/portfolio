# N Sanjay Rao — Portfolio

Personal portfolio for [nsanjayrao](https://github.com/nsanjayrao) — AI / GenAI
Engineer in Hyderabad. Built with Next.js (App Router), TypeScript, TailwindCSS,
and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All text, projects, skills, and links live in **`lib/data.ts`** — edit that one
file to update the site. Components never hard-code content.

The resume served at `/resume.pdf` is `public/resume.pdf` — replace that file
to update the download.

## Deploying (free)

**Vercel (recommended):** push this repo to GitHub, import it at
[vercel.com/new](https://vercel.com/new), accept the defaults. Done.

After deploying, set `site.url` in `lib/data.ts` to the production URL so
OpenGraph/sitemap/JSON-LD point at the right domain.

Also works on Netlify and Cloudflare Pages with their default Next.js presets.

## Features

- Dark / light theme (system-aware, persisted, no flash)
- Command palette (Ctrl+K / ⌘K)
- Scroll progress bar, active-section nav underline, mobile menu
- Typing hero, aurora background, mouse parallax, magnetic buttons, 3D card tilt
- Project search + tag filtering
- Count-up stats, scroll-reveal sections
- `prefers-reduced-motion` respected throughout
- SEO: metadata, OpenGraph, Twitter cards, JSON-LD person schema, robots.txt, sitemap.xml
- Accessible: semantic landmarks, ARIA labels, keyboard navigable, visible focus rings
