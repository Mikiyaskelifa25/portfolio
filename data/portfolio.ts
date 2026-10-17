/**
 * =============================================================================
 *  PORTFOLIO DATA — single source of truth
 * =============================================================================
 *  Everything a visitor reads and every link they can click lives in this file.
 *
 *  HOW TO PERSONALISE
 *  ------------------
 *  1. Fill in the fields marked `// TODO:` inside `site` below.
 *     Values left as "" are treated as "not configured yet" — the UI hides or
 *     softly disables the related button instead of shipping a dead link.
 *  2. Add projects to the `projects` array. Any project with `enabled: false`
 *     is kept in the code but is NOT rendered on the page.
 *  3. Nothing here is invented: only add facts, links and numbers that are true.
 * =============================================================================
 */

export type ProjectStatus = "live" | "in-progress" | "concept";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  /** Stable id, also used for on-page anchors. */
  id: string;
  title: string;
  /** Short label shown on the card. */
  tagline: string;
  /** 1–3 sentence overview. Keep it factual. */
  description: string;
  /** e.g. "Web App", "AI Tool", "Mobile App", "Developer Tool". */
  category: string;
  status: ProjectStatus;
  year?: string;
  /** Live website / product URL. Leave "" until it exists. */
  url?: string;
  /** Source repository URL. Leave "" until it exists. */
  repo?: string;
  /**
   * Preview image inside /public. `isRealScreenshot` documents whether this is
   * an actual capture of the live product (true) or an illustrative visual.
   */
  image?: ProjectImage;
  isRealScreenshot?: boolean;
  /** Technologies verified by inspecting the live project or its source. */
  tech: string[];
  /** Short, factual notes. Never business results or metrics. */
  highlights?: string[];
  /** Accent colour used for the card's ambient lighting. */
  accent: string;
  featured: boolean;
  /** Flip to `true` to publish the project on the site. */
  enabled: boolean;
  /** Shown on the card when a project is not live yet. */
  note?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  location: string;
  /** Portrait used in the hero circle and the resume header. */
  avatar: string;
  /** Contact phone number in international format, shown as a `tel:` link. */
  phone: string;
  /** TODO: your real email, e.g. "you@domain.com". */
  email: string;
  /** TODO: full GitHub profile URL. */
  github: string;
  /** TODO: full LinkedIn profile URL. */
  linkedin: string;
  /** TODO: e.g. "/mikiyas-kelifa-resume.pdf" once the file is in /public. */
  resumeUrl: string;
  /** TODO: production domain, e.g. "https://mikiyaskelifa.com". Used for canonical + sitemap. */
  url: string;
  availability: {
    /** Set to `true` only when you really are available. */
    enabled: boolean;
    label: string;
    detail: string;
  };
}

export const site: SiteConfig = {
  name: "Mikiyas Kelifa",
  title: "Full-Stack Developer & AI Engineer",
  location: "Ethiopia, East Africa",
  avatar: "/images/mikiyas.jpg",
  phone: "+251918843836",

  email: "", // TODO
  github: "https://github.com/Mikiyaskelifa25",
  linkedin: "https://www.linkedin.com/in/mikiyas-kelifa-560b45209",
  resumeUrl: "", // TODO
  url: "", // TODO

  availability: {
    enabled: false, // TODO: set to true when you are open to new work
    label: "Open to remote opportunities",
    detail: "Available for full-time roles and freelance projects",
  },
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "Portfolio — 2026",
  wordmark: "MK.",
  headline: ["Full-Stack", "Developer &", "AI Engineer"],
  supporting:
    "I build useful web applications, AI-powered tools, SaaS products and modern user experiences — from the interface down to the database and the deployment.",
  primaryCta: { label: "View my work", href: "#projects" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  marquee: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Docker",
    "AI Agents",
    "MCP Servers",
    "n8n",
    "React Native",
    "Supabase",
  ],
};

export const about = {
  heading: "A developer who cares about the whole product.",
  lead: "I'm Mikiyas Kelifa, a full-stack developer and AI engineer based in Ethiopia, East Africa.",
  paragraphs: [
    "I work across the stack: React and Next.js interfaces on the front, Node.js and TypeScript on the back, and databases like PostgreSQL, MongoDB, MySQL and Supabase underneath. I use Prisma and Mongoose for data access and Clerk for authentication.",
    "Alongside product work I build with AI — agents, MCP servers and n8n workflows — and I like shipping tools that are genuinely useful rather than just technically interesting.",
    "I also handle the operational side: Docker, Ubuntu and Linux servers, self-hosted applications and deployment. That means I can take an idea from a blank repository to something real and running in production.",
  ],
  facts: [
    { label: "Based in", value: "Ethiopia, East Africa" },
    { label: "Working with", value: "Remote teams & founders" },
    { label: "Focus", value: "Web apps · AI tools · SaaS" },
  ],
};

export const process = [
  {
    id: "01",
    title: "Understand the problem",
    description:
      "I start by clarifying what actually needs to be solved, who it's for, and what success looks like before writing any code.",
  },
  {
    id: "02",
    title: "Design the experience",
    description:
      "Structure, flows and interface decisions come before implementation, so the product feels deliberate rather than improvised.",
  },
  {
    id: "03",
    title: "Build and integrate",
    description:
      "Frontend, backend, data and third-party services are built and wired together in small, reviewable steps.",
  },
  {
    id: "04",
    title: "Test, deploy and improve",
    description:
      "I ship, watch how it behaves in the real world, fix what breaks and keep improving it after launch.",
  },
];

export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Interfaces that stay fast, accessible and pleasant to use.",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Responsive UI development",
      "Animation & interactive interfaces",
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Server-side logic and APIs built to be maintained.",
    skills: ["Node.js", "TypeScript", "Authentication with Clerk"],
  },
  {
    id: "data",
    title: "Databases & Authentication",
    description: "Modelling, querying and securing application data.",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Mongoose",
      "MySQL",
      "Supabase",
      "Prisma",
      "Clerk",
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    description: "AI-powered features and workflow automation.",
    skills: [
      "AI engineering",
      "AI agents",
      "MCP servers",
      "n8n workflows",
      "AI-powered application development",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Cross-platform apps from a single codebase.",
    skills: ["React Native", "Expo"],
  },
  {
    id: "devops",
    title: "DevOps & Deployment",
    description: "Getting software running reliably outside my machine.",
    skills: [
      "Docker",
      "Ubuntu / Linux",
      "Application deployment",
      "Server management",
      "Self-hosted applications",
    ],
  },
] as const;

export const projects: Project[] = [
  {
    id: "adventure-in-ethiopia",
    title: "Adventure in Ethiopia",
    tagline: "Travel & adventure experiences across Ethiopia.",
    description:
      "A web project focused on adventure and travel experiences in Ethiopia — presenting destinations and experiences through a modern, content-led interface.",
    category: "Web App",
    status: "live",
    url: "https://adventureinnethiopia.com",
    repo: "",
    image: {
      src: "/images/adventure-in-ethiopia.png",
      alt: "Screenshot of the Adventure in Ethiopia travel website homepage",
      width: 1440,
      height: 1800,
    },
    isRealScreenshot: true,
    tech: ["Next.js", "React", "Tailwind CSS"],
    highlights: [
      "Server-rendered marketing pages built with the Next.js App Router",
      "Responsive layout that works from small phones to large desktops",
    ],
    accent: "#c6f24d",
    featured: true,
    enabled: true,
  },
  {
    id: "imagebox-tool",
    title: "ImageBox Tool",
    tagline: "Resize, convert and create GIFs in the browser.",
    description:
      "A browser-based image toolkit for resizing, converting and generating GIFs — built around a focused, tool-first interface.",
    category: "Developer & creator tool",
    status: "live",
    year: "2025",
    url: "https://imageboxtool.vercel.app",
    repo: "",
    image: {
      src: "/images/imagebox-tool.png",
      alt: "Screenshot of the ImageBox Tool image utility web app",
      width: 1440,
      height: 1800,
    },
    isRealScreenshot: true,
    tech: ["Next.js", "React", "Tailwind CSS"],
    highlights: [
      "Image utilities grouped into a single, distraction-free workspace",
      "Deployed on Vercel",
    ],
    accent: "#7c6cff",
    featured: true,
    enabled: true,
  },
  {
    id: "icu-calculator",
    title: "ICU Calculator",
    tagline: "Clinical calculation tooling for intensive care workflows.",
    description:
      "An ICU calculator project I have worked on. This entry is intentionally unpublished until the live URL and confirmed feature list are added.",
    category: "Web App",
    status: "in-progress",
    url: "", // TODO: add the real URL
    repo: "", // TODO: add the repo URL if public
    tech: [], // TODO: list only the technologies actually used
    accent: "#4d7cff",
    featured: false,
    enabled: false, // TODO: set to true once the URL + features are confirmed
    note: "Pending URL and feature confirmation — not published yet.",
  },
] satisfies Project[];

/** Only these are rendered on the page. */
export const enabledProjects = projects.filter((project) => project.enabled);

export const contact = {
  heading: "Have an idea worth building?",
  supporting:
    "I'm interested in connecting with people building useful products, exploring AI, and solving meaningful problems with software.",
  ctaLabel: "Start a conversation",
  location: "Ethiopia, East Africa",
  timezone: "EAT · UTC+3",
};

export const socials = [
  { id: "github", label: "GitHub", href: site.github },
  { id: "linkedin", label: "LinkedIn", href: site.linkedin },
  { id: "email", label: "Email", href: site.email ? `mailto:${site.email}` : "" },
] as const;

/* ------------------------------------------------------------------ *
 *  RESUME — powers the /resume page
 * ------------------------------------------------------------------ */

export interface ResumeRole {
  role: string;
  company: string;
  location?: string;
  /** Human-readable, e.g. "2024 — Present" or "Jan 2023 – Aug 2024". */
  period: string;
  summary?: string;
  highlights?: string[];
}

export interface ResumeStudy {
  program: string;
  institution: string;
  location?: string;
  period: string;
  detail?: string;
}

export interface ResumeConfig {
  /** Small label above the name. */
  label: string;
  heading: string;
  /** Two–three sentence professional summary. Keep it factual. */
  intro: string;
  /** TODO: add only real roles you have actually held. */
  experience: ResumeRole[];
  /** TODO: add only real study you have actually completed. */
  education: ResumeStudy[];
  /** Honest note shown while the lists above are empty. */
  note: string;
}

export const resume: ResumeConfig = {
  label: "Resume / CV",
  heading: "Mikiyas Kelifa",
  intro:
    "Full-stack developer and AI engineer based in Ethiopia, East Africa. I build web applications, AI-powered tools and SaaS products — from the interface down to the database and the deployment. I like shipping tools that are genuinely useful rather than just technically interesting.",
  experience: [], // TODO: add real roles, newest first
  education: [], // TODO: add real education entries
  note: "Experience and education are added in data/portfolio.ts — only after they are confirmed, so nothing here is invented.",
};

