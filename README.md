# Mikiyas Kelifa — Developer Portfolio

A dark, cinematic personal portfolio for **Mikiyas Kelifa, Full-Stack Developer & AI Engineer**.
Built with the Next.js App Router, React, TypeScript, Tailwind CSS v4, Motion for React and Lucide icons.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

```bash
pnpm lint       # ESLint
pnpm typecheck  # TypeScript, no emit
pnpm build      # production build
pnpm start      # serve the production build
```

## Personalise it — everything lives in one file

Almost every word and link on the site comes from **`data/portfolio.ts`**. Open it and fill in the
values marked `// TODO`. Empty strings are treated as "not configured yet", so the UI hides or softly
disables the related button instead of shipping a dead link.

| Field | What it does | Where it shows |
| --- | --- | --- |
| `site.email` | Your real email address | Contact card, footer, hero |
| `site.github` | Full GitHub profile URL | Hero, contact, footer |
| `site.linkedin` | Full LinkedIn profile URL | Hero, contact, footer |
| `site.resumeUrl` | Path to a PDF in `/public`, e.g. `/mikiyas-kelifa-resume.pdf` | Navigation Resume button + `/resume` page PDF button |
| `site.avatar` | Portrait image path, e.g. `/images/mikiyas.jpg` | Home hero circle + resume header |
| `site.phone` | Phone number, e.g. `+251918843836` (rendered as a `tel:` link) | Home Contact section, `/contact`, resume, JSON-LD |
| `site.url` | Production domain, e.g. `https://mikiyaskelifa.com` | Canonical URL, sitemap, OG image URLs |
| `site.availability.enabled` | Set to `true` to show the "open to opportunities" badge | Hero, contact, resume |

### The `/resume` page

The Resume button opens **`/resume`** in a new tab — a modern, print-friendly summary of the portfolio.
It reads from `data/portfolio.ts` too:

- `resume.heading` / `resume.intro` — the name and profile paragraph.
- `resume.experience[]` and `resume.education` roles — **empty by default**; each renders an honest
  "pending" note until you add confirmed entries, so nothing is invented.
- Selected work, skills and contact are pulled from the live `projects` and `skillGroups` data.

When `site.availability.enabled` is `false`, no availability claim is shown — the page never invents
availability. The **Print / Save as PDF** button uses `window.print()`; print styles (in `app/globals.css`)
flip the palette to a light, ink-friendly theme and hide the nav, footer and ambient background.

### The `/contact` page

A dedicated contact page at **`/contact`** (linked from the home Contact section). The form sends
name / email / subject / message straight to a **Telegram bot** — no database, no third-party service.

Set these in `.env.local` (copy `.env.example`; the file is git-ignored):

```bash
TELEGRAM_BOT_TOKEN="123456:ABC…"   # from @BotFather
TELEGRAM_CHAT_ID="123456789"       # your numeric chat id
```

To find your chat id: message your bot once, then open
`https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `"chat":{"id":…}`. If that returns an empty
`result`, another process is polling the bot (stop it) or you messaged a different bot. The form shows a
graceful error and falls back to the email link when the variables are missing.

### Adding a project

Add an object to the `projects` array in `data/portfolio.ts`:

```ts
{
  id: "my-new-tool",
  title: "My New Tool",
  tagline: "One line that explains it.",
  description: "A short, factual overview.",
  category: "AI Tool",
  status: "live",           // "live" | "in-progress" | "concept"
  url: "https://example.com",
  repo: "",                 // leave "" until a public repo exists
  image: { src: "/images/my-new-tool.png", alt: "…", width: 1440, height: 1800 },
  isRealScreenshot: true,
  tech: ["Next.js"],        // only technologies actually used
  accent: "#c6f24f",
  featured: true,
  enabled: true,            // false keeps it in the code but off the page
}
```

Drop the preview image into `public/images/`. If you don't have a real screenshot yet, omit `image` and a
clearly illustrative placeholder is rendered instead — never a faked screenshot.

The **ICU Calculator** entry ships with `enabled: false`. Add its real URL, confirm its features, then set
`enabled: true` to publish it.

## Design system

- Colour, spacing and motion tokens: CSS variables in `app/globals.css` (`@theme` block).
- Fonts: `Geist` (sans), `Geist Mono`, `Instrument Serif` (display accents) via `next/font`.
- Ambient background, film grain and parallax live in `components/site-background.tsx` and `components/motion-provider.tsx`.
- Motion respects `prefers-reduced-motion` and transform/opacity only.

## Structure

```
app/
  layout.tsx              fonts, metadata, OG, skip link
  page.tsx                section composition + JSON-LD
  resume/page.tsx         printable resume page (/resume)
  contact/page.tsx        contact page (/contact)
  contact/actions.ts      server action → Telegram bot
  globals.css             design tokens + utilities
  icon.svg                MK favicon
  opengraph-image.tsx     build-time OG image
  twitter-image.tsx
  robots.ts / sitemap.ts
components/
  navigation.tsx  hero.tsx  about.tsx  project-showcase.tsx  project-card.tsx
  skills.tsx  process.tsx  contact.tsx  contact-form.tsx  footer.tsx  back-to-top.tsx
  site-background.tsx  motion-provider.tsx  icons.tsx  print-button.tsx
  ui/  (reveal, section-heading, container)
data/portfolio.ts         single source of truth
lib/  (utils.ts, year.ts, telegram.ts, og-image.tsx)
public/images/            real screenshots of the live projects
public/images/            real screenshots of the live projects
```

## Honesty rules baked in

No fabricated links, metrics, testimonials, clients or medical claims. Empty configuration values render
as clearly-labelled placeholders, and the ICU Calculator stays unpublished until its URL and features are
confirmed.
