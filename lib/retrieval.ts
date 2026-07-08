// ---------------------------------------------------------------------------
// "Ask this site" — BM25 retrieval over the portfolio's own content.
// The same core mechanic as my RAG chatbot (rank chunks, cite sources),
// minus the LLM: a static site has no server to hold an API key, and
// honest retrieval-with-citations beats a fake chatbot.
// ---------------------------------------------------------------------------

import {
  certifications,
  experience,
  learning,
  projects,
  site,
  skillGroups,
  timeline,
} from "./data";

export type Chunk = {
  id: string;
  /** Section anchor the citation scrolls to. */
  anchor: string;
  /** Human label shown on the citation chip. */
  source: string;
  text: string;
};

/** Flatten the site's content into retrievable chunks. */
function buildCorpus(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "about",
    anchor: "#about",
    source: "About",
    text:
      `${site.name}, ${site.role} in ${site.location}. ${site.tagline} ` +
      `Two years evaluating LLM outputs on a Google GenAI workflow at Cognizant ` +
      `while building RAG pipelines, multi-agent workflows, and full-stack apps.`,
  });

  for (const t of timeline) {
    chunks.push({
      id: `timeline-${t.period}`,
      anchor: "#about",
      source: `Timeline · ${t.period}`,
      text: `${t.title} at ${t.place}. ${t.description}`,
    });
  }

  for (const g of skillGroups) {
    chunks.push({
      id: `skills-${g.title}`,
      anchor: "#skills",
      source: `Skills · ${g.title}`,
      text: `${g.title} skills: ${g.skills.join(", ")}.`,
    });
  }
  chunks.push({
    id: "skills-learning",
    anchor: "#skills",
    source: "Skills · Currently learning",
    text: `Currently learning (in progress, honestly disclosed): ${learning.join(", ")}.`,
  });

  for (const job of experience) {
    chunks.push({
      id: `exp-${job.company}`,
      anchor: "#experience",
      source: `Experience · ${job.company.split("·")[0].trim()}`,
      text: `${job.role}, ${job.company}, ${job.period}. ${job.bullets.join(" ")} Areas: ${job.tags.join(", ")}.`,
    });
  }

  for (const p of projects) {
    chunks.push({
      id: `project-${p.slug}`,
      anchor: "#projects",
      source: `Project · ${p.title}`,
      text: `${p.title}: ${p.summary} ${p.highlights.join(" ")} Built with ${p.tech.join(", ")}.`,
    });
  }

  for (const c of certifications) {
    chunks.push({
      id: `cert-${c.name}`,
      anchor: "#certifications",
      source: "Certifications",
      text: `Certification: ${c.name}${c.issuer ? `, issued by ${c.issuer}` : ""}.`,
    });
  }

  chunks.push({
    id: "contact",
    anchor: "#contact",
    source: "Contact",
    text:
      `Contact ${site.name} by email at ${site.email}, on GitHub at ${site.github}, ` +
      `or on LinkedIn. Based in ${site.location}. Open to AI and GenAI engineering roles: ` +
      `document Q&A, knowledge-base assistants, LLM evaluation pipelines, internal automation.`,
  });

  return chunks;
}

const STOPWORDS = new Set(
  "a an the and or but of in on at to for with is are was were be been do does did he she it they i you we his her its their this that what which who how tell me about does know can".split(
    " "
  )
);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

export type Hit = { chunk: Chunk; score: number };

const K1 = 1.5;
const B = 0.75;

/** Classic BM25 over the corpus. Small corpus — built once per session. */
export function createRetriever() {
  const corpus = buildCorpus();
  const docs = corpus.map((c) => tokenize(c.text));
  const avgLen = docs.reduce((s, d) => s + d.length, 0) / docs.length;

  // document frequency per term
  const df = new Map<string, number>();
  for (const doc of docs) {
    for (const term of Array.from(new Set(doc))) {
      df.set(term, (df.get(term) ?? 0) + 1);
    }
  }
  const N = docs.length;

  function idf(term: string): number {
    const n = df.get(term) ?? 0;
    return Math.log(1 + (N - n + 0.5) / (n + 0.5));
  }

  return function search(query: string, topK = 3): Hit[] {
    const qTerms = tokenize(query);
    if (qTerms.length === 0) return [];

    const hits: Hit[] = corpus.map((chunk, i) => {
      const doc = docs[i];
      let score = 0;
      for (const term of qTerms) {
        const tf = doc.filter((t) => t === term || t.startsWith(term)).length;
        if (tf === 0) continue;
        score +=
          idf(term) *
          ((tf * (K1 + 1)) / (tf + K1 * (1 - B + B * (doc.length / avgLen))));
      }
      return { chunk, score };
    });

    return hits
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  };
}

export const exampleQuestions = [
  "Does he know Python?",
  "Tell me about the RAG chatbot",
  "What is Goloka?",
  "What's his experience with LLM evaluation?",
  "Does he have certifications?",
  "How do I contact him?",
];
