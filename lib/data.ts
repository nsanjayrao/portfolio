// ---------------------------------------------------------------------------
// All portfolio content lives here. Edit this file — not the components —
// to update text, projects, skills, and links.
// ---------------------------------------------------------------------------

export const site = {
  name: "N Sanjay Rao",
  shortName: "Sanjay",
  role: "AI / GenAI Engineer",
  tagline:
    "I build retrieval-augmented LLM systems and evaluate GenAI output quality at Google scale.",
  location: "Hyderabad, India",
  email: "nandisanjay.ns@gmail.com",
  github: "https://github.com/nsanjayrao",
  linkedin: "https://www.linkedin.com/in/n-sanjay-rao-9a2142131/",
  resumeHref: "/resume.pdf",
  url: "https://n-sanjay-rao.vercel.app",
};

export const typingRoles = [
  "AI / GenAI Engineer",
  "RAG & LLM Systems Builder",
  "Prompt Engineer",
  "LLM Quality Evaluator",
  "Data Analyst",
];

export const stats = [
  { value: 2, suffix: "+", label: "Years working with GenAI" },
  { value: 150, suffix: "+", label: "LLM cases evaluated daily" },
  { value: 99, suffix: "%+", label: "Evaluation accuracy" },
  { value: 6, suffix: "", label: "Public projects shipped" },
];

export type TimelineItem = {
  period: string;
  title: string;
  place: string;
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    period: "2026",
    title: "Prompt Factory — advanced prompt engineering track",
    place: "Cognizant · Google GenAI programme",
    description:
      "Selected into the programme's most technical prompt-engineering workflow after progressing through eight evaluation tracks.",
  },
  {
    period: "2025 — 2026",
    title: "Shipped Goloka & multi-agent projects",
    place: "Personal projects",
    description:
      "Built a full-stack streaming index (Next.js + Supabase + Python worker) and a CrewAI multi-agent research pipeline.",
  },
  {
    period: "June 2024",
    title: "GenAI Content Evaluation (L2)",
    place: "Cognizant, Hyderabad",
    description:
      "Joined a Google GenAI content-evaluation workflow — quality-assuring LLM outputs against evolving policy guidelines.",
  },
  {
    period: "Feb 2024",
    title: "Inventory Management Trainee",
    place: "Genesis Poweronics India",
    description:
      "Rebuilt stock reporting into Power BI dashboards, cutting reporting time by 30%.",
  },
  {
    period: "2023",
    title: "B.Tech, Electronics & Communication",
    place: "Vignan's Institute of Information Technology, AP",
    description: "",
  },
];

export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "GenAI & LLM Systems",
    skills: [
      "RAG Pipelines",
      "FAISS Vector Search",
      "Hybrid Retrieval (BM25)",
      "Cross-Encoder Reranking",
      "Prompt Engineering",
      "LLM Output Evaluation",
      "Gemini API",
      "Groq API",
      "Streamlit",
    ],
  },
  {
    title: "Agentic AI",
    skills: [
      "CrewAI",
      "Multi-Agent Orchestration",
      "LLM-Based Classification",
      "Tool-Using Agents",
    ],
  },
  {
    title: "Programming & Data",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "NLTK",
      "SQL",
      "Git",
      "GitHub Actions",
    ],
  },
  {
    title: "Analytics & Visualization",
    skills: ["Power BI", "Matplotlib", "Excel + VBA", "EWOQ"],
  },
  {
    title: "Web & Infrastructure",
    skills: ["Next.js", "Supabase (Postgres)", "Vercel", "REST APIs"],
  },
];

// Honesty is a feature: shown as "Currently learning" on the site.
export const learning = ["Docker", "LangChain", "Cloud Deployment (AWS / GCP)"];

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Senior Process Executive — GenAI Content Evaluation (L2)",
    company: "Cognizant · Google GenAI programme, Hyderabad",
    period: "June 2024 — Present",
    bullets: [
      "Define and track quality indicators for LLM-generated outputs on a Google GenAI content-evaluation workflow — verifying 150+ cases daily at 99%+ accuracy against evolving policy guidelines.",
      "Progressed through eight increasingly technical evaluation workflows; currently training in Prompt Factory, the programme's most technical prompt-engineering track.",
      "Mentor L1 analysts on evaluation accuracy and consistency; awarded “Cheers” recognition three consecutive months for top productivity and quality.",
    ],
    tags: ["LLM Evaluation", "Prompt Engineering", "Google GenAI", "Quality Analytics"],
  },
  {
    role: "Inventory Management Trainee",
    company: "Genesis Poweronics India Pvt Ltd, Hyderabad",
    period: "Feb 2024 — June 2024",
    bullets: [
      "Rebuilt inventory stock reporting into interactive Power BI and Excel dashboards, cutting reporting time by 30%.",
      "Coordinated parts sourcing with Ashok Leyland for genset installations.",
    ],
    tags: ["Power BI", "Data Analytics", "Reporting Automation"],
  },
];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  highlights: string[];
  tech: string[];
  tags: string[];
  /** Omitted for private repos — the card shows a "Private repo" badge instead. */
  github?: string;
  demo?: string;
  /** Source is a private repo; renders a badge in place of the Source link. */
  private?: boolean;
  flagship?: boolean;
  /** Silent looping demo clip (mp4 in /public) with a poster frame. */
  video?: { src: string; poster: string };
  /** Static preview screenshot (in /public) for projects without a clip. */
  image?: { src: string; alt: string };
  /** Earlier / learning-era work: shown as a compact archive row, not a card. */
  archive?: boolean;
};

export const projects: Project[] = [
  {
    slug: "free-rag-chatbot",
    title: "Free RAG Chatbot",
    summary:
      "End-to-end document Q&A over PDF / DOCX / CSV with hybrid retrieval and streaming answers — runs entirely on free tiers.",
    highlights: [
      "Hybrid dense (FAISS + MiniLM) + BM25 retrieval with LLM query expansion and cross-encoder reranking",
      "Every answer carries numbered citations back to its source chunks",
      "SSE token streaming from two interchangeable LLM providers (Gemini, Groq) with zero SDK dependencies",
      "Content-hash index caching, persisted chat history, PDF transcript export",
    ],
    tech: ["Python", "Streamlit", "FAISS", "BM25", "SentenceTransformers", "Gemini", "Groq"],
    tags: ["GenAI", "RAG"],
    github: "https://github.com/nsanjayrao/free-rag-chatbot",
    flagship: true,
    video: { src: "/rag-demo.mp4", poster: "/rag-demo-poster.jpg" },
  },
  {
    slug: "goloka",
    title: "Goloka",
    summary:
      "A Netflix-style streaming index for ISKCON content — lectures, kirtans, festivals — auto-updated from official YouTube sources. Index, never a host.",
    highlights: [
      "Python sync worker on a GitHub Actions cron fetches, classifies (rules + Groq LLM), and upserts video metadata every 6 hours",
      "Supabase Postgres stores metadata only — no media files, ever",
      "Responsive Next.js PWA on Vercel with embedded YouTube playback",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Python", "GitHub Actions", "Groq"],
    tags: ["Full-Stack", "GenAI"],
    github: "https://github.com/nsanjayrao/goloka",
    demo: "https://goloka-three.vercel.app",
    flagship: true,
    image: {
      src: "/goloka-preview.webp",
      alt: "Goloka home page: a Netflix-style hero carousel of ISKCON content",
    },
  },
  {
    slug: "multi-agent-research-crew",
    title: "Multi-Agent Research Crew",
    summary:
      "An autonomous Researcher → Writer → Editor agent pipeline that researches live web sources, drafts, and publishes professional reports as PDFs.",
    highlights: [
      "Three specialized CrewAI agents in a sequential, hallucination-guarded workflow",
      "Researcher searches the live web via keyless DuckDuckGo search, with an offline fallback",
      "Editor agent enforces grounding in the researcher's facts before publication",
      "Gemini calls routed through LiteLLM with automatic retries; live Streamlit dashboard with direct PDF export",
    ],
    tech: ["Python", "CrewAI", "Streamlit", "Gemini", "LiteLLM", "fpdf2"],
    tags: ["GenAI", "Agents"],
    github: "https://github.com/nsanjayrao/multi-agent-research-crew",
    demo: "https://multi-agent-research-crew.streamlit.app",
    flagship: true,
    video: { src: "/crew-demo.mp4", poster: "/crew-demo-poster.jpg" },
  },
  {
    slug: "customer-churn-prediction",
    title: "Customer Churn Prediction",
    summary:
      "Classification models identifying the key drivers of telecom customer churn — ~85% accuracy.",
    highlights: [],
    tech: ["Python", "scikit-learn", "Pandas"],
    tags: ["Machine Learning", "Data"],
    github: "https://github.com/nsanjayrao/Blackcoffer_project_assignment",
    archive: true,
  },
  {
    slug: "hotel-reviews-analysis",
    title: "Hotel Reviews Sentiment Analysis",
    summary:
      "NLP pipeline processing 10,000+ hotel reviews to surface service-quality trends.",
    highlights: [],
    tech: ["Python", "NLTK", "Pandas"],
    tags: ["NLP", "Data"],
    github: "https://github.com/nsanjayrao/Hotel-reviews-analysis",
    archive: true,
  },
  {
    slug: "amazon-web-scraper",
    title: "Amazon Web Scraper",
    summary:
      "Product data extraction pipeline scraping listings into structured datasets.",
    highlights: [],
    tech: ["Python", "BeautifulSoup", "Pandas"],
    tags: ["Data"],
    github: "https://github.com/nsanjayrao/my_amazon_web_scrapper_project",
    archive: true,
  },
];

export const projectFilters = ["All", "GenAI", "RAG", "Agents", "Full-Stack"];

export type Certification = {
  name: string;
  issuer: string; // leave "" until verified — renders without issuer
  href?: string;
};

export const certifications: Certification[] = [
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google · Coursera — 8 courses, completed June 2023",
    href: "https://www.coursera.org/account/accomplishments/professional-cert/WFFGGUER2S8Y",
  },
];
