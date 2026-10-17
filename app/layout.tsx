import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SiteBackground } from "@/components/site-background";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { site } from "@/data/portfolio";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const description = `${site.name} is a ${site.title} based in ${site.location}, building modern web applications, AI-powered tools and SaaS products with React, Next.js, TypeScript and Node.js.`;

export const metadata: Metadata = {
  // TODO: set `site.url` in data/portfolio.ts to your production domain.
  // Until then the localhost fallback keeps OG image URLs absolute during build.
  metadataBase: site.url
    ? new URL(site.url)
    : new URL("http://localhost:3000"),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Mikiyas Kelifa",
    "Full-Stack Developer",
    "AI Engineer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Ethiopia developer",
    "remote software engineer",
    "AI agents",
    "MCP servers",
  ],
  alternates: site.url ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${site.name} — ${site.title}`,
    description:
      "Full-stack developer and AI engineer building web applications, AI tools and SaaS products.",
    siteName: site.name,
    url: site.url || undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description:
      "Full-stack developer and AI engineer building web applications, AI tools and SaaS products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} antialiased`}
    >
      <body className="min-h-svh bg-ink font-sans text-fg">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteBackground />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
        <div className="noise-overlay print:hidden" aria-hidden="true" />
      </body>
    </html>
  );
}
