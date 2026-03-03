# CLAUDE.md — Bruma Studio Project Instructions

## Project Overview

Bruma Studio (brumastudio.dev) is a bilingual (EN/ES) digital studio website. Dark mystical/arcane grimoire aesthetic. Built with Next.js 14+ App Router, TypeScript, Tailwind CSS, Sanity CMS, deployed on Vercel.

## Reference Documents

Read these files before making any design, copy, or architectural decisions:

- **`docs/BRUMA.md`** — Design system & brand spec. All color tokens, typography, component patterns, brand vocabulary, voice/tone rules. Single source of truth for how things look, read, and feel.
- **`docs/BRUMA-SITE-PLAN.md`** — Phase 1 MVP plan (completed). Reference for existing page structure, copy, and component patterns already built.
- **`docs/BRUMA-SITE-PLAN-PHASES-2-3.md`** — Phase 2 is the ACTIVE build plan. Phase 3 is reference only — do NOT build Phase 3 features yet.

## Current Phase: Phase 2 — Content Engine & Expansion

Phase 1 (MVP) is complete and deployed. The site has: Home, Services (/arts), Contact (/summon), and 404.

Phase 2 turns the site from a static brochure into a content-managed, content-rich platform. We are adding:

1. Sanity CMS integration (migrate all hardcoded content)
2. Full portfolio page — `/grimoire`
3. Individual project pages — `/grimoire/[slug]`
4. Blog index — `/scrolls`
5. Individual blog posts — `/scrolls/[slug]`
6. About / team page — `/the-order`
7. Newsletter signup component (The Signal)
8. Enhanced homepage (dynamic content from Sanity)

Bilingual i18n is part of Phase 2 but should be the LAST thing built. Get all English pages and Sanity schemas done first, then layer in next-intl.

## Build Order

Follow this sequence. Complete each step before moving to the next.

### Step 1: Sanity CMS Setup
- Initialize Sanity Studio in the project (embedded or separate `/studio` route)
- Create schemas:
  - `project` — portfolio items (title, slug, description, body as Portable Text, coverImage, tags, techStack, client, timeline, liveUrl, featured, order)
  - `service` — service offerings (title, slug, subtitle, body, icon, features array, order)
  - `post` — blog posts (title, slug, excerpt, body as Portable Text, coverImage, category, tags, author reference, publishedAt, relatedPosts, featured)
  - `author` — team members (name, slug, role, bio, photo, socialLinks object, order)
  - `siteSettings` — singleton (studioName, tagline, description, socialLinks, newsletterCTA, contactEmail)
- Set up Sanity client in `lib/sanity.ts`
- Create GROQ queries in `lib/queries.ts`
- Migrate all hardcoded content from Phase 1 pages into Sanity documents

### Step 2: Migrate Existing Pages to Sanity
- Refactor Home page to pull services preview and project highlights from Sanity
- Refactor Services page (/arts) to pull service content from Sanity
- Refactor Contact page to pull contact info from siteSettings
- Verify everything still works with CMS-driven content
- Keep the same design and layout — only the data source changes

### Step 3: Full Portfolio Page (`/grimoire`)
- `app/grimoire/page.tsx`
- Hero with section label, heading, subheading
- Tag-based filter bar (All, Web Development, CMS, Design, Bilingual)
- Filterable project card grid (2-column desktop, single mobile)
- Cards: screenshot, title, one-line description, tech tags
- Filter uses URL params (`/grimoire?tag=cms`) for shareability
- All content from Sanity `project` schema
- See docs/BRUMA-SITE-PLAN-PHASES-2-3.md § Portfolio Index for full copy and specs

### Step 4: Individual Project Pages (`/grimoire/[slug]`)
- `app/grimoire/[slug]/page.tsx`
- Dynamic route pulling from Sanity
- Structure: hero (title + description + tags + screenshot), overview sidebar (client, timeline, role, tech stack), The Challenge, The Approach (with screenshots), The Result (metrics), "Next Project" link
- Portable Text rendering with custom components for images, code blocks, callouts
- See docs/BRUMA-SITE-PLAN.md § Project Page Template for structure

### Step 5: Blog Index (`/scrolls`)
- `app/scrolls/page.tsx`
- Hero with section label and heading ("The Scrolls" / "Codex")
- Single-column post list, max-w-3xl centered
- Each card: date, reading time, title, excerpt, category tags
- Text-focused design — no images on index cards
- Gold left-border accent on hover
- Reading time calculated from word count (200 wpm average)
- RSS feed generation at `/scrolls/feed.xml`
- All content from Sanity `post` schema
- See docs/BRUMA-SITE-PLAN-PHASES-2-3.md § Blog Index for full specs

### Step 6: Individual Blog Posts (`/scrolls/[slug]`)
- `app/scrolls/[slug]/page.tsx`
- Reading-focused layout, max-w-3xl, generous line height
- Structure: meta (category, date, reading time), title, subtitle, body, author attribution, related posts, newsletter CTA
- Portable Text with custom serializers:
  - Code blocks: syntax highlighting with Shiki or Prism (JetBrains Mono on grimoire-surface)
  - Inline code: bg-grimoire-surface, rounded, font-mono
  - Blockquotes: left border grimoire-gold, italic
  - Images: full-width, rounded-lg, optional caption
  - Links: grimoire-rune, underline on hover
- See docs/BRUMA-SITE-PLAN-PHASES-2-3.md § Blog Post for typography specs

### Step 7: About / Team Page (`/the-order`)
- `app/the-order/page.tsx`
- Hero with section label and heading
- Studio story section ("Origins" — centered text, max-w-2xl)
- Team member cards from Sanity `author` schema (photo/avatar, name, role, bio, social links)
- Optional values/principles section (2x2 grid)
- See docs/BRUMA-SITE-PLAN-PHASES-2-3.md § About / Team for full copy

### Step 8: Newsletter Component (The Signal)
- Reusable `components/newsletter-signup.tsx`
- Email input + subscribe button
- Place in: blog post footer, site footer (optional)
- API route at `app/api/subscribe/route.ts`
- Use Resend for subscriber management or integrate ConvertKit
- Copy: "THE SIGNAL — Technical insights, project stories, and the occasional arcane discovery."

### Step 9: Navigation & Homepage Updates
- Update nav to include "Scrolls" and "The Order" links
- Update homepage Grimoire preview section to pull featured projects from Sanity dynamically
- Update footer to include newsletter signup
- Ensure all internal links work

### Step 10: Bilingual i18n (do LAST)
- Install and configure `next-intl`
- Set up middleware for locale detection and routing
- Create JSON translation files for all UI strings (nav, buttons, labels, form fields, footer)
- Add locale fields to Sanity schemas OR create separate documents per language for blog posts
- Language switcher in nav ("EN / ES" toggle)
- Translate all pages to Spanish (see docs/BRUMA-SITE-PLAN-PHASES-2-3.md § Bilingual Implementation for full routing, vocabulary mapping, and content priority)
- Add hreflang tags to all pages
- Spanish URL slugs: /es/artes, /es/grimorio, /es/pergaminos, /es/la-orden, /es/invocar

## Tech Decisions

| Choice | Use | Rationale |
|--------|-----|-----------|
| App Router | Always | No Pages Router |
| Server Components | Default | Client components only when needed (interactivity, hooks) |
| Tailwind | All styling | No CSS modules, no styled-components |
| Lucide React | Icons | Consistent, tree-shakeable |
| Framer Motion | Animations | Page transitions, scroll reveals (keep subtle) |
| shadcn/ui | Base components | Accordion, dialog, sheet if needed |
| Sanity CMS | All content | Portable Text for rich content, GROQ for queries |
| next-intl | i18n | Locale routing, translation files, middleware |
| Shiki or Prism | Code highlighting | For blog post code blocks |
| Resend | Email | Contact form + newsletter subscriptions |

## Code Style

- Use `"use client"` directive only on components that need browser APIs or hooks
- Prefer composition over large monolithic components
- Component files: PascalCase (`GoldDivider.tsx`)
- Utility files: camelCase (`formatDate.ts`)
- Sanity queries: centralized in `lib/queries.ts` using GROQ
- Sanity client: configured in `lib/sanity.ts` with preview mode support
- Use semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- All images use `next/image` with explicit `width`/`height` or `fill`
- Tailwind classes: use the grimoire tokens, never raw hex values
- Accessibility: all interactive elements keyboard-navigable, proper ARIA labels, `prefers-reduced-motion` respected

## File Structure (Phase 2)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                       # Home (now pulls from Sanity)
│   ├── not-found.tsx
│   ├── arts/page.tsx                  # Services (now pulls from Sanity)
│   ├── summon/page.tsx                # Contact
│   ├── grimoire/
│   │   ├── page.tsx                   # Portfolio index (NEW)
│   │   └── [slug]/page.tsx            # Project detail (NEW)
│   ├── scrolls/
│   │   ├── page.tsx                   # Blog index (NEW)
│   │   ├── [slug]/page.tsx            # Blog post (NEW)
│   │   └── feed.xml/route.ts         # RSS feed (NEW)
│   ├── the-order/page.tsx             # About/team (NEW)
│   ├── studio/
│   │   └── [[...index]]/page.tsx      # Sanity Studio (NEW)
│   └── api/
│       ├── contact/route.ts
│       ├── subscribe/route.ts         # Newsletter (NEW)
│       ├── draft/route.ts             # Sanity preview (NEW)
│       └── revalidate/route.ts        # On-demand ISR (NEW)
├── components/
│   ├── nav.tsx                        # Updated with new links
│   ├── footer.tsx                     # Updated with newsletter
│   ├── gold-divider.tsx
│   ├── section-header.tsx
│   ├── button.tsx
│   ├── newsletter-signup.tsx          # NEW
│   ├── portable-text.tsx              # NEW — custom Portable Text renderer
│   ├── project-card.tsx               # NEW
│   ├── post-card.tsx                  # NEW
│   ├── team-card.tsx                  # NEW
│   ├── filter-bar.tsx                 # NEW — tag filter for portfolio
│   └── home/
│       ├── hero.tsx
│       ├── services-preview.tsx
│       ├── grimoire-preview.tsx       # Now dynamic from Sanity
│       ├── credibility-strip.tsx
│       └── cta-strip.tsx
├── lib/
│   ├── utils.ts
│   ├── sanity.ts                      # NEW — Sanity client config
│   └── queries.ts                     # NEW — GROQ queries
└── sanity/
    ├── schema.ts                      # NEW — schema index
    └── schemas/
        ├── project.ts                 # NEW
        ├── service.ts                 # NEW
        ├── post.ts                    # NEW
        ├── author.ts                  # NEW
        └── siteSettings.ts            # NEW
```

## Design Rules (Quick Reference)

- **Background:** `bg-grimoire-bg` (#0D0D12) — never pure black
- **Text:** `text-grimoire-text` (#E8E2D6) — never pure white
- **Headings:** Cinzel, uppercase, `text-grimoire-gold`, tracked wide
- **Body:** Crimson Text, `text-grimoire-text`, relaxed line height
- **UI/Nav/Buttons:** Inter
- **Accent:** `grimoire-gold` (#C9A669) — use sparingly, precious not overwhelming
- **Cards:** `bg-grimoire-surface border-grimoire-border` with gold glow on hover
- **Buttons primary:** `bg-grimoire-gold text-grimoire-bg` uppercase tracked
- **Buttons secondary:** `border-grimoire-gold text-grimoire-gold` outline
- **Blog typography:** Crimson Text 18px body, Cinzel gold headings, JetBrains Mono code blocks on grimoire-surface, blockquotes with gold left border
- **Spacing:** Generous. `py-24 md:py-32` between sections. Don't crowd.
- **Animations:** Subtle. Under 300ms for micro-interactions. Always respect `prefers-reduced-motion`.

## Copy Rules (Quick Reference)

- 80% clear professional language, 20% arcane vocabulary
- Arcane terms ONLY in nav labels, section headers, CTAs
- Service descriptions are always clear and direct
- One themed phrase per section maximum (usually the closing line)
- Voice: quiet confidence, knowledgeable, atmospheric but never pretentious
- See BRUMA.md § Brand Vocabulary for the full term mapping

## Design Workflow

There is still no Figma file. Continue building from design tokens and component patterns in `docs/BRUMA.md`. Match new components (project cards, post cards, team cards, filter bar) to the existing visual language established in Phase 1.

When making layout decisions without a mockup, follow these principles:
- **Generous whitespace.** When in doubt, add more space, not less.
- **Centered content hierarchy.** Hero sections centered, content sections left-aligned with `max-w-6xl` container.
- **Mobile-first.** Build the mobile layout first, then enhance for desktop.
- **Atmospheric restraint.** Get the layout and typography right before adding any effects.
- **Consistency with Phase 1.** New pages should feel like they belong with the existing site. Same section header pattern, same card style, same spacing rhythm.

## What NOT to Do

- Don't install a CSS framework besides Tailwind
- Don't use Pages Router
- Don't build Phase 3 features (pricing, Gumroad, Calendly, testimonials)
- Don't add i18n until Steps 1–9 are complete — it's Step 10 for a reason
- Don't create a separate Sanity Studio app — embed it in the Next.js project
- Don't add heavy atmospheric effects — focus on content and functionality
- Don't use wizard hats, wands, pentagrams, or cartoon magic imagery
- Don't write fantasy prose in service descriptions
