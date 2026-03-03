# CLAUDE.md — Bruma Studio Project Instructions

## Project Overview

Bruma Studio (brumastudio.dev) is a bilingual (EN/ES) digital studio website. Dark mystical/arcane grimoire aesthetic. Built with Next.js 14+ App Router, TypeScript, Tailwind CSS, Sanity CMS, deployed on Vercel.

## Reference Documents

Read these files before making any design, copy, or architectural decisions:

- **`docs/BRUMA.md`** — Design system & brand spec. All color tokens, typography, component patterns, brand vocabulary, voice/tone rules. This is the single source of truth for how things look, read, and feel.
- **`docs/BRUMA-SITE-PLAN.md`** — Phase 1 MVP build plan. Page structure, section-by-section copy, concept project briefs, Sanity schemas, SEO meta, and the weekend sprint build order.
- **`docs/BRUMA-SITE-PLAN-PHASES-2-3.md`** — Future phases. Do NOT build these yet. Reference only for architectural decisions that should be forward-compatible.

## Current Phase: MVP (Phase 1)

We are building the lean MVP. Only these pages:

1. Global layout (nav + footer + dark background + font setup)
2. Home page (5 sections: hero, services preview, grimoire preview, credibility strip, CTA)
3. Services page — `/arts`
4. Contact page — `/summon`
5. 404 page

Do NOT build blog, about page, pricing, i18n, or any Phase 2/3 features yet. But DO structure the codebase so these can be added cleanly later.

## Build Order

Follow this exact sequence. Complete each step before moving to the next.

### Step 1: Project Scaffold
- `npx create-next-app@latest brumastudio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
- Configure `tailwind.config.ts` with grimoire color tokens from BRUMA.md
- Set up `next/font/google` with Cinzel, Crimson Text, Inter, JetBrains Mono (see BRUMA.md for exact config)
- Apply font CSS variables to `<html>` element
- Set `<body>` to `bg-grimoire-bg text-grimoire-text`
- Add Tailwind `fontFamily` extend for `display`, `body`, `ui`, `mono`

### Step 2: Global Layout
- Build `app/layout.tsx` with fonts, metadata, and global structure
- Build `components/nav.tsx` — sticky, backdrop-blur, responsive with mobile hamburger menu
- Build `components/footer.tsx` — centered, gold divider, social links
- Build `components/gold-divider.tsx` — reusable horizontal rule with diamond

### Step 3: Home Page
Build each section as a separate component in `components/home/`:
- `hero.tsx` — full viewport, centered content, two CTAs
- `services-preview.tsx` — 3-column card grid with icons
- `grimoire-preview.tsx` — 2-3 project cards (placeholder content for now)
- `credibility-strip.tsx` — centered text block with tech stack
- `cta-strip.tsx` — full-width band with contact CTA

### Step 4: Services Page (`/arts`)
- `app/arts/page.tsx`
- Hero + 3 service sections with anchor IDs + process timeline + CTA
- Service sections use anchor IDs: `#web-development`, `#cms`, `#design`

### Step 5: Contact Page (`/summon`)
- `app/summon/page.tsx`
- Two-column layout: form (left) + contact info (right)
- Form fields: name, email, project type (select), budget range (select), message
- Form action: API route at `app/api/contact/route.ts`
- Use Resend or Formspree for email delivery
- Success/error states

### Step 6: 404 Page
- `app/not-found.tsx`
- "Lost in the Mist" themed 404

### Step 7: Polish
- Meta tags and OG images on all pages
- Responsive QA
- Lighthouse audit (target 95+ performance, 100 accessibility)

## Tech Decisions

| Choice | Use | Rationale |
|--------|-----|-----------|
| App Router | Always | No Pages Router |
| Server Components | Default | Client components only when needed (interactivity, hooks) |
| Tailwind | All styling | No CSS modules, no styled-components |
| Lucide React | Icons | Consistent, tree-shakeable |
| Framer Motion | Animations | Page transitions, scroll reveals (keep subtle) |
| shadcn/ui | Base components | Accordion, dialog, sheet (mobile menu) if needed |
| Radix UI | Primitives | Via shadcn/ui, not directly |

## Code Style

- Use `"use client"` directive only on components that need browser APIs or hooks
- Prefer composition over large monolithic components
- Component files: PascalCase (`GoldDivider.tsx`)
- Utility files: camelCase (`formatDate.ts`)
- All text content lives in components for MVP (moves to Sanity in Phase 2)
- Use semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- All images use `next/image` with explicit `width`/`height` or `fill`
- Tailwind classes: use the grimoire tokens, never raw hex values
- Accessibility: all interactive elements keyboard-navigable, proper ARIA labels, `prefers-reduced-motion` respected

## File Structure

```
brumastudio/
├── docs/
│   ├── BRUMA.md                      # Design system
│   ├── BRUMA-SITE-PLAN.md            # Phase 1 plan
│   └── BRUMA-SITE-PLAN-PHASES-2-3.md # Future phases
├── CLAUDE.md                          # This file
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (fonts, nav, footer)
│   │   ├── page.tsx                   # Home page
│   │   ├── not-found.tsx              # 404 page
│   │   ├── arts/
│   │   │   └── page.tsx               # Services page
│   │   ├── summon/
│   │   │   └── page.tsx               # Contact page
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts           # Contact form handler
│   ├── components/
│   │   ├── nav.tsx
│   │   ├── footer.tsx
│   │   ├── gold-divider.tsx
│   │   ├── section-header.tsx
│   │   ├── button.tsx                 # Primary + secondary variants
│   │   └── home/
│   │       ├── hero.tsx
│   │       ├── services-preview.tsx
│   │       ├── grimoire-preview.tsx
│   │       ├── credibility-strip.tsx
│   │       └── cta-strip.tsx
│   └── lib/
│       └── utils.ts                   # cn() helper, constants
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── noise.svg                      # Grain texture overlay (optional)
├── tailwind.config.ts
├── next.config.ts
└── package.json
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

There is NO Figma file for Phase 1. Build directly from the design tokens and component patterns in `docs/BRUMA.md`. Iterate visually in the browser. The Figma design system will be created after MVP launch by documenting the built components — not before.

When making layout decisions without a mockup, follow these principles:
- **Generous whitespace.** When in doubt, add more space, not less.
- **Centered content hierarchy.** Hero sections centered, content sections left-aligned with `max-w-6xl` container.
- **Mobile-first.** Build the mobile layout first, then enhance for desktop.
- **Atmospheric restraint.** Get the layout and typography right before adding any effects. A well-spaced page with good type is already 90% of the design.

## What NOT to Do

- Don't install a CSS framework besides Tailwind
- Don't use Pages Router
- Don't add i18n yet (Phase 2)
- Don't set up Sanity yet (hardcode content for MVP, migrate in Phase 2)
- Don't add heavy atmospheric effects (particles, GSAP) on first pass — get the layout right first, effects are polish
- Don't use wizard hats, wands, pentagrams, or cartoon magic imagery
- Don't write fantasy prose in service descriptions
