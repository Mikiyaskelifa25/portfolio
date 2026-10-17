import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { ProjectShowcase } from "@/components/project-showcase";
import { Skills } from "@/components/skills";
import { site } from "@/data/portfolio";
import { isConfigured } from "@/lib/utils";

export default function Home() {
  const sameAs = [site.github, site.linkedin].filter(isConfigured);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    description:
      "Full-stack developer and AI engineer building web applications, AI tools and SaaS products.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Ethiopia",
    },
    knowsAbout: [
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
    ],
    ...(isConfigured(site.phone) ? { telephone: site.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <ProjectShowcase />
      <Skills />
      <Process />
      <Contact />
    </>
  );
}
