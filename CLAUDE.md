# CLAUDE.md — Bruma Studio Project Instructions

## Project Overview

Bruma Studio (brumastudio.dev) is a bilingual (EN/ES) digital studio website. Dark mystical/arcane grimoire aesthetic. Built with Next.js 14+ App Router, TypeScript, Tailwind CSS, Sanity CMS, deployed on Vercel.

## Reference Documents

Read these files before making any design, copy, or architectural decisions:

- **`docs/BRUMA.md`** — Design system & brand spec. All color tokens, typography, component patterns, brand vocabulary, voice/tone rules. Single source of truth for how things look, read, and feel.
- **`docs/BRUMA-SITE-PLAN.md`** — Phase 1 MVP plan (completed).
- **`docs/BRUMA-SITE-PLAN-PHASES-2-3.md`** — Phase 2 (completed). Phase 3 is the ACTIVE build plan — but with modifications noted below.

## Current Phase: Phase 3 — Revenue Features & Growth

Phases 1, 2, and Refinement are complete and deployed. The site is bilingual, content-managed via Sanity, visually polished, and live at brumastudio.dev.

Phase 3 adds revenue-focused pages and features:

1. Pricing page — `/offerings`
2. Process page — `/the-ritual`
3. Calendly integration on contact page
4. Blog series/collections
5. OG image auto-generation for blog posts

Digital products (Gumroad starter kits) and testimonials are deferred until after first client projects.

## Build Order

### Step 1: Pricing Page (`/offerings`)

IMPORTANT: NO prices on this page. We serve both US and Latin American markets where price expectations differ significantly. The page shows scope and deliverables only — pricing happens in the proposal after a discovery call.

- `app/[locale]/offerings/page.tsx` (bilingual)
- Hero:
  - Section label: "THE OFFERINGS" / "LAS OFRENDAS"
  - Heading: "What We Offer" / "Lo Que Ofrecemos"
  - Body: "Transparent scope for quality craft. Every project includes direct communication with the people actually building it."

- Three tier cards (2-column + 1 on desktop, stacked on mobile, middle card featured):

  **Tier 1: The Parchment / El Pergamino**
  - Subtitle: "Launch fast, launch right" / "Lanza rápido, lanza bien"
  - Scope:
    - Landing page or single-page site
    - Custom Next.js development
    - Responsive design (mobile-first)
    - Basic Sanity CMS setup
    - Vercel deployment
    - 1 round of revisions
    - 30-day post-launch support
  - Timeline: 2–3 weeks
  - CTA: "Request a Parchment" → /summon

  **Tier 2: The Tome / El Tomo (Featured)**
  - Badge: "Most Popular" / "Más Popular"
  - Subtitle: "The complete build" / "La obra completa"
  - Scope:
    - Multi-page site (up to 8 pages)
    - Custom Next.js + Sanity CMS development
    - UI/UX design in Figma
    - Content modeling & migration
    - Full responsive + accessibility audit
    - 2 rounds of revisions
    - Team training on CMS
    - 60-day post-launch support
    - Monthly maintenance available
  - Timeline: 4–6 weeks
  - CTA: "Commission a Tome" → /summon

  **Tier 3: The Codex / El Códice**
  - Subtitle: "For complex, ambitious projects" / "Para proyectos complejos y ambiciosos"
  - Scope:
    - Everything in The Tome, plus:
    - Design system documentation
    - Bilingual (EN/ES) implementation
    - Advanced integrations (APIs, e-commerce, dashboards)
    - Custom component library
    - Performance optimization (Lighthouse 95+)
    - Ongoing support retainer included (3 months)
    - Priority communication
  - Timeline: 6–10 weeks
  - CTA: "Commission a Codex" → /summon

- Below tiers — "How It Works" brief:
  "We price by project scope, not by hour. After an initial conversation, we provide a detailed proposal with a fixed price — no surprises, no scope creep. Every project includes source code ownership, staging environment for review, and post-launch support."

- FAQ section (accordion, use shadcn/ui or Radix):
  - "What if my project doesn't fit these tiers?"
  - "Do you require a deposit?"
  - "Can I start with The Parchment and upgrade later?"
  - "Do you work with international clients?"
  - "What's your tech stack?"
  - "Do you do WordPress sites?"
  See docs/BRUMA-SITE-PLAN-PHASES-2-3.md § Pricing for full FAQ answers.

- Add schema.org FAQPage structured data for SEO
- CTA strip at bottom: "Ready to discuss your project?" → /summon
- Add "/offerings" to nav between "The Order" and "Summon"
- Spanish version at /es/ofrendas

### Step 2: Process Page (`/the-ritual`)

- `app/[locale]/the-ritual/page.tsx` (bilingual)
- Hero:
  - Section label: "THE RITUAL" / "EL RITUAL"
  - Heading: "How We Work" / "Cómo Trabajamos"
  - Body: "Every project follows a proven process — structured enough to keep things on track, flexible enough to adapt to your needs."

- Four phases displayed as a vertical timeline with gold connecting line:

  **Phase 01 — Discovery / Descubrimiento (3–5 days)**
  - Description: listening, understanding goals/audience/constraints
  - Deliverables: project brief, sitemap, technical requirements, timeline, fixed-price proposal

  **Phase 02 — Design / Diseño (1–2 weeks)**
  - Description: Figma wireframes → high-fidelity mockups → interactive prototype
  - Deliverables: wireframes, mockups (desktop + mobile), prototype, design system, 2 revision rounds

  **Phase 03 — Development / Desarrollo (2–4 weeks)**
  - Description: clean hand-crafted code, regular check-ins, staging previews
  - Deliverables: Next.js application, Sanity CMS, staging environment, responsive + accessible, Lighthouse 90+

  **Phase 04 — Delivery / Entrega (3–5 days + ongoing)**
  - Description: launch, training, documentation, ongoing support
  - Deliverables: production deployment, domain setup, CMS training (recorded), documentation, post-launch support

- Implementation:
  - Phase numbers in Cinzel, text-6xl, grimoire-gold, opacity-20 as background watermark
  - Phase title in Inter uppercase, body in Crimson Text
  - Deliverables as subtle list with checkmark icons
  - Thin vertical gold line connecting phases
  - Optional: animate phases revealing on scroll with Framer Motion whileInView
  - CTA at bottom: "Ready to begin?" → /summon
  - Add "/the-ritual" link in footer or as a link from the services page process section
  - Spanish version at /es/el-ritual

### Step 3: Calendly Integration

- Add a scheduling option to the contact page (/summon)
- Layout: tabs or section below the form
  - Tab/Section 1: existing contact form
  - Tab/Section 2: "Book a Call" with Calendly embed
- Copy: "Prefer to talk it through? Book a free 30-minute discovery call."
- Use react-calendly for inline embed
- Style the container to match grimoire aesthetic
- Set Calendly event type to "Discovery Call — 30 minutes"
- Bilingual: same Calendly link works for both locales, just translate the surrounding copy

### Step 4: Blog Series/Collections

- Add `series` field to Sanity post schema (reference → series document)
- Create series schema: title, slug, description, coverImage
- On blog post page: show "Part X of [Series Name]" with prev/next navigation within the series
- Series index page at /scrolls/series/[slug]
- Initial series to create (empty for now, populate as posts are written):
  - "Building Bruma" — behind-the-scenes build log
  - "Headless CMS Deep Dives" — comparisons and tutorials
  - "Bilingual Web" — i18n tutorials and localization tips

### Step 5: OG Image Generation

- Auto-generate OG images (1200×630) for blog posts
- Dark background (grimoire-bg), sigil mark watermark, post title in Cinzel gold, category tag
- Use @vercel/og or satori for edge-runtime image generation
- API route: app/api/og/route.tsx
- Default OG image for non-blog pages: dark bg + BRUMA STUDIO wordmark + tagline
- Ensure all pages reference the correct OG image in metadata

### Step 6: Navigation & Polish

- Add "Offerings" to main navigation (between "The Order" and "Summon")
- Update Spanish nav: "Ofrendas"
- Link from services page process section to /the-ritual for expanded details
- Link from services page to /offerings for scope details
- Full QA pass on new pages: both languages, all breakpoints
- Lighthouse audit on new pages

## Tech Decisions

Same as previous phases, plus:

| Choice | Use | Rationale |
|--------|-----|-----------|
| react-calendly | Booking embed | Inline Calendly integration |
| @vercel/og or satori | OG images | Edge-runtime image generation |
| Radix Accordion | FAQ section | Accessible, styleable via shadcn/ui |

## Design Rules

Same as refinement phase. New pages must match the established visual language:
- Same section header pattern (section label + Cinzel heading + gold divider)
- Same card style for pricing tiers (grimoire-surface, border, gold glow on hover/featured)
- Same spacing rhythm (py-24 md:py-32 between sections)
- Timeline component for process page: vertical gold line, phase numbers as watermarks
- FAQ accordion: clean, no background on items, gold left-border or underline on active item

## What NOT to Do

- Don't show prices on the offerings page — scope only, pricing happens in proposals
- Don't add Gumroad integration yet — starter kits are deferred until after first client projects
- Don't add testimonials section yet — wait for real client quotes
- Don't over-design the process page — it should be clear and scannable, not decorative
- Don't install heavy libraries for OG generation — @vercel/og or satori handles it at the edge
- Don't forget bilingual versions of every new page
