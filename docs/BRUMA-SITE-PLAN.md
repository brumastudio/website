# BRUMA-SITE-PLAN.md — MVP Website Plan

> Lean MVP: Home + Services (Arts) + Contact (Summon). Ship in one focused weekend.
> English first. Spanish added post-launch. Concept projects fill the portfolio.

---

## Site Architecture

```
brumastudio.dev/
├── /                → Home (hero, services preview, project highlights, CTA)
├── /arts            → Services (detailed service offerings)
├── /summon          → Contact (form + info)
├── /grimoire/[slug] → Individual project pages (build 2–3 concept projects)
└── (global)         → Nav, Footer, 404
```

### Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + custom grimoire tokens (see BRUMA.md)
- **CMS:** Sanity Studio (content-managed from day one, even for MVP)
- **Deployment:** Vercel
- **Forms:** Resend (email API, free tier = 100 emails/day) or Formspree
- **Analytics:** Vercel Analytics (free) or Plausible (privacy-first)
- **Font loading:** next/font/google (Cinzel, Crimson Text, Inter)

### Pages to Build (in order)

1. Layout (nav + footer + global styles)
2. Home page
3. Services page
4. Contact page
5. 2–3 concept project pages
6. 404 page

---

## Global Components

### Navigation

Minimal. Don't overthink this — five links max.

```
[Sigil/Logo]   Arts    Grimoire    Summon    [CTA: "Start a project" →]
```

**Behavior:**
- Sticky on scroll with `backdrop-blur-md bg-grimoire-bg/80`
- Mobile: hamburger → full-screen overlay with centered links, sigil at top
- Active page indicated by gold underline or dot
- CTA button uses gold outline style on desktop, full-width gold at bottom of mobile menu

**Copy:**
- "Arts" (not "Services")
- "Grimoire" (not "Portfolio") — links to `/#grimoire` scroll anchor on MVP, becomes `/grimoire` when full portfolio page exists
- "Summon" (not "Contact")

### Footer

```
─────────────────────────────────────────────
BRUMA STUDIO

Dark arts of digital craft.

Arts · Grimoire · Scrolls · Summon

© 2026 Bruma Studio · brumastudio.dev

GitHub · X · LinkedIn · Instagram
─────────────────────────────────────────────
```

Keep it simple. One column centered on mobile, optional two-column on desktop. Cinzel for "BRUMA STUDIO", Inter for everything else. Gold divider line at top.

### 404 Page

**Headline:** "Lost in the Mist"
**Body:** "This page has vanished — or perhaps it never existed. The path you seek lies elsewhere."
**CTA:** "Return to the Origin" → links to home

Simple centered layout. Add a subtle particle/fog effect if time allows, skip if not.

---

## Page 1: Home

The home page does the heavy lifting. It's the pitch, the portfolio, and the first impression in one scroll. Each section should be a self-contained component.

### Section 1: Hero

**Goal:** Instant atmosphere. Communicate what Bruma is in under 5 seconds.

```
Layout: Full viewport height. Content centered vertically.
Background: grimoire-bg with subtle particle effect (optional — skip if tight on time)
```

**Copy:**

```
[Sigil mark, small, centered above headline]

BRUMA STUDIO

Dark arts of digital craft.

We build modern websites and digital experiences
with the precision of code and the intention of craft.

[CTA: "Start a Project" →]     [CTA outline: "View Our Work" ↓]
```

**Implementation notes:**
- "BRUMA STUDIO" in Cinzel, `text-5xl md:text-7xl`, grimoire-gold
- "Dark arts of digital craft." in Crimson Text italic, `text-xl`, grimoire-gold-light
- Body text in Crimson Text, `text-lg`, grimoire-text
- Primary CTA → links to `/summon`
- Secondary CTA → smooth-scrolls to #grimoire section
- Hero should feel spacious — don't crowd it. `min-h-screen` with flex centering
- Optional: Aceternity UI "spotlight" or "aurora background" effect behind text. If skipping effects, a single thin gold horizontal rule below the tagline works fine.

### Section 2: Services Preview

**Goal:** Show what you do in a scannable format. Drive clicks to the full services page.

```
Layout: Section label + heading + 3-column card grid (stacks on mobile)
```

**Section label:** `SECTION 01`
**Heading:** `The Arts`
**Subheading:** `What we practice.`

**Card 1: Web Development**
```
Icon: code bracket or terminal icon (Lucide: <Code2 /> or <Terminal />)
Title: Web Development
Body: Custom websites and web applications built with Next.js,
React, and TypeScript. Fast, accessible, and built to last.
Link: "Learn more →" → /arts#web-development
```

**Card 2: CMS & Content Systems**
```
Icon: database or layers icon (Lucide: <Database /> or <Layers />)
Title: CMS & Content Systems
Body: Content management with Sanity CMS and headless WordPress.
Edit your site without touching code.
Link: "Learn more →" → /arts#cms
```

**Card 3: Design & Strategy**
```
Icon: pen tool or compass icon (Lucide: <PenTool /> or <Compass />)
Title: Design & Strategy
Body: Brand identity, UI/UX design, and digital strategy.
From wireframe to launch, every detail considered.
Link: "Learn more →" → /arts#design
```

**Implementation notes:**
- Cards use the grimoire card pattern from BRUMA.md (surface bg, border, gold hover glow)
- Icons in grimoire-gold, `w-8 h-8`
- Card titles in Cinzel, card body in Crimson Text, link in Inter
- On mobile: stack vertically with `gap-6`

### Section 3: Project Highlights (Grimoire Preview)

**Goal:** Show 2–3 concept projects. Prove you can build what you sell.

```
Layout: Section label + heading + project grid (2-up on desktop, stack on mobile)
Anchor: id="grimoire"
```

**Section label:** `SECTION 02`
**Heading:** `The Grimoire`
**Subheading:** `Selected works and experiments.`

**Projects (see Concept Project Briefs below):**
- Show 2–3 project cards with screenshot, title, tags, and one-line description
- Each links to `/grimoire/[slug]` for the full case study
- Cards should feature a browser mockup or screenshot with hover reveal effect

**Implementation notes:**
- Project images: generate with Midjourney or build actual demos and screenshot them
- Tags as small pills: `bg-grimoire-surface border border-grimoire-border text-grimoire-muted text-xs px-2 py-1 rounded-full`
- If you don't have project screenshots ready at launch, use a "Coming Soon" card styled with the grimoire aesthetic: "New spells are being prepared. Check back soon."

### Section 4: About / Credibility Strip

**Goal:** Brief positioning statement + trust signals. Not a full about page — just enough to establish credibility.

```
Layout: Centered text block, tight width (max-w-2xl)
```

**Copy:**

```
THE ORDER

Bruma Studio is a focused digital studio led by practitioners,
not managers. We bring agency-level craft with the agility and
attention of a dedicated team.

Our stack is modern. Our standards are exacting.
Every project receives senior-level attention from start to finish.

Next.js · React · TypeScript · Sanity CMS · Tailwind CSS · Vercel
```

**Implementation notes:**
- "THE ORDER" in Cinzel, grimoire-gold, uppercase tracked
- Body in Crimson Text, grimoire-text, centered
- Tech stack listed in Inter, grimoire-muted, small, as a single line with dot separators
- No team photos needed for MVP. Add them later when you have professional shots.
- Optional: a small Midjourney-generated atmospheric illustration above the heading (woodcut style sigil or alchemical diagram)

### Section 5: CTA / Contact Strip

**Goal:** Close the page with a clear next step.

```
Layout: Full-width band with grimoire-surface background. Centered content.
```

**Copy:**

```
Ready to begin?

Every project starts with a conversation. Tell us about your vision
and we'll craft a plan to bring it to life.

[CTA: "Summon Us" →]
```

**Implementation notes:**
- "Ready to begin?" in Cinzel, `text-3xl`, grimoire-gold
- Body in Crimson Text, grimoire-text
- CTA button: primary gold style, links to `/summon`
- Subtle gold border-top on the section for separation
- This section should feel like the final page of a chapter — conclusive, warm, inviting

---

## Page 2: Services (Arts)

Full breakdown of what Bruma Studio offers. This is the page that converts visitors into leads.

### Hero

```
Layout: Left-aligned text, no image needed
```

**Section label:** `THE ARTS`
**Heading:** `What We Practice`
**Body:**
```
We specialize in a focused set of disciplines — modern web development,
content management systems, and design strategy. Every service is delivered
with the same standard: hand-crafted, performance-first, and built to evolve.
```

### Service 1: Web Development

**Anchor:** `id="web-development"`

```
Title: Web Development — The Core Discipline
```

**Body:**
```
We build fast, accessible, custom websites and web applications —
from marketing sites and landing pages to complex platforms and dashboards.

Our stack is Next.js, React, and TypeScript, deployed on Vercel for
speed and reliability. Every project is hand-crafted. We don't use
page builders or drag-and-drop tools. The result is cleaner code,
faster load times, and a site that scales with your business.
```

**What's included (show as subtle list or grid):**
```
· Custom Next.js development        · Responsive design (mobile-first)
· Performance optimization           · SEO best practices baked in
· API integrations                   · Vercel deployment & hosting
· Accessibility (WCAG 2.2 AA)       · Post-launch support available
```

### Service 2: CMS & Content Systems

**Anchor:** `id="cms"`

```
Title: CMS & Content Systems — The Living Architecture
```

**Body:**
```
A website is only as powerful as its content system. We build with
Sanity CMS and headless WordPress — modern content platforms that
give you full control over every page, post, and product without
needing a developer for every update.

Headless CMS means your content is separate from your design.
Update text, swap images, publish blog posts — all from an intuitive
editing interface. We set it up so your team can manage it independently.
```

**What's included:**
```
· Sanity Studio setup & customization   · Headless WordPress development
· Custom content schemas                 · Visual editing & live preview
· Content migration from existing sites  · Team training & documentation
· Multi-language content support         · Structured content modeling
```

### Service 3: Design & Strategy

**Anchor:** `id="design"`

```
Title: Design & Strategy — The Blueprint
```

**Body:**
```
Great development starts with great design and a clear plan. We offer
UI/UX design, brand identity, and digital strategy as standalone services
or as part of a full-build project.

Whether you need a complete visual identity, a set of Figma mockups
before development begins, or strategic guidance on your digital presence,
we approach every project with intention and restraint.
```

**What's included:**
```
· UI/UX design (Figma)              · Brand identity & visual systems
· Wireframing & prototyping          · Design system creation
· Competitive analysis               · Digital strategy & roadmapping
· Content strategy                   · Conversion optimization guidance
```

### Process Section (Brief)

**Heading:** `The Ritual — How We Work`

```
01  DISCOVERY
    We listen first. Understand your goals, audience, and constraints.
    Every project begins with clarity.

02  DESIGN
    Wireframes, mockups, and prototypes in Figma. You see the vision
    before a single line of code is written.

03  DEVELOPMENT
    Clean, hand-crafted code. Regular check-ins and staging previews
    so you're never in the dark.

04  DELIVERY
    Launch, testing, and handoff. Documentation for your team.
    Optional ongoing support to keep things running.
```

**Implementation notes:**
- Show as a vertical timeline or numbered steps
- Numbers in Cinzel, grimoire-gold, large (`text-4xl`)
- Step title in Inter uppercase, step body in Crimson Text
- Optional: thin vertical gold line connecting the steps

### CTA Strip

Same pattern as the home page CTA section:
```
Start a conversation about your project.

[CTA: "Summon Us" →]
```

---

## Page 3: Contact (Summon)

### Hero

```
Section label: SUMMON
Heading: Let's Begin
Body: Every great project starts with a conversation.
Tell us about your vision and we'll take it from there.
```

### Contact Form

Keep it short. Every extra field reduces conversion.

```
Fields:
  Name*           [text input]
  Email*          [email input]
  Project type    [select: Website / CMS / Design / Other]
  Budget range    [select: Under $3K / $3K–$5K / $5K–$10K / $10K+ / Not sure yet]
  Tell us about your project*  [textarea, 4 rows]

[CTA: "Send Message" →]
```

**Implementation notes:**
- Form inputs: `bg-grimoire-surface border border-grimoire-border rounded-md text-grimoire-text placeholder:text-grimoire-muted focus:border-grimoire-gold focus:ring-1 focus:ring-grimoire-gold/50`
- Labels in Inter, `text-sm text-grimoire-muted uppercase tracking-wider`
- Success state: replace form with "Message received. We'll be in touch within 24 hours."
- Error state: inline field validation + toast notification
- Budget field normalizes expectations before the first call
- Use Resend or Formspree for email delivery. Sends to your inbox with all form data.

### Contact Info (sidebar or below form)

```
Direct
hello@brumastudio.dev

Based in
Tijuana, MX — serving clients worldwide

Response time
Within 24 hours on business days

Social
GitHub · X · LinkedIn · Instagram
```

**Implementation notes:**
- On desktop: two-column layout (form left, info right)
- On mobile: form first, then info below
- Email should be a `mailto:` link
- Social icons use Lucide icons in grimoire-muted, hover to grimoire-gold

---

## Concept Projects

Since you're building the portfolio from scratch, here are 3 concept projects designed to showcase your stack AND appeal to real clients. Build these as actual working demos — they become portfolio pieces AND potential starter kit products for Gumroad later.

### Project 1: "Velo" — Bike Shop E-commerce Landing

**What it demonstrates:** Next.js + Sanity CMS + Tailwind, e-commerce-adjacent design, product showcases

```
Concept: A premium single-page site for a fictional artisan bicycle shop.
Features:
  - Hero with full-bleed product photography (Unsplash/Midjourney)
  - Product showcase grid with Sanity CMS-powered content
  - "Book a Fitting" contact form
  - Responsive, fast, accessible
  - Dark/light mode toggle

Tech shown: Next.js App Router, Sanity CMS, Tailwind CSS, Framer Motion,
            Vercel deployment, image optimization

Why it works for clients: Every local business owner can see themselves
in this. It's relatable, tangible, and obviously professional.
```

**Tags:** `Next.js` `Sanity CMS` `Tailwind CSS` `E-commerce`

### Project 2: "Bufete Reyes" — Law Firm Corporate Site

**What it demonstrates:** Professional/corporate design, multi-page architecture, bilingual capability

```
Concept: A 3–4 page site for a fictional bilingual law firm.
Pages: Home, Practice Areas, Team, Contact
Features:
  - Clean, authoritative design (proves you can do corporate, not just dark/fantasy)
  - Attorney profile cards from Sanity CMS
  - Practice area pages with structured content
  - Contact form with consultation booking
  - Fully bilingual EN/ES (demonstrates your i18n capability)

Tech shown: Next.js App Router, Sanity CMS, next-intl (i18n),
            Tailwind CSS, structured content modeling

Why it works for clients: Professional services firms are a huge market.
This proves you can build serious, trust-building sites. The bilingual
angle opens the entire US Hispanic professional market.
```

**Tags:** `Next.js` `Sanity CMS` `Bilingual` `Corporate`

### Project 3: "Bruma Studio" — This Very Website

**What it demonstrates:** Full brand expression, atmospheric design, your complete technical range

```
This is your real portfolio piece. The site itself IS the project.
Discuss it as a case study:
  - Brand identity development (from naming to design system)
  - Custom atmospheric UI (particles, glows, scroll effects)
  - Sanity CMS for blog and project management
  - Performance optimization (target Lighthouse 95+)
  - Accessibility (WCAG 2.2 AA compliance)

Write it up as: "We built our own studio site to the same standard
we bring to every client project. Here's how."
```

**Tags:** `Next.js` `Sanity CMS` `Brand Identity` `Design System`

### Project Page Template

Each concept project page (`/grimoire/[slug]`) should follow this structure:

```
Hero: Project name + one-line description + tags + hero screenshot

Overview:
  Client (fictional or "Internal project")
  Timeline ("2 weeks" etc.)
  Role ("Design & Development")
  Tech stack (as pills/tags)

The Challenge:
  1–2 paragraphs on the problem being solved

The Approach:
  2–3 paragraphs on design and development decisions
  Include 2–3 screenshots showing key pages/features

The Result:
  Key metrics or outcomes (Lighthouse scores, load times, etc.)
  Link to live demo if hosted

Next Project → [link to next case study]
```

---

## Content Checklist (What You Need Before Building)

### Must Have for Launch

- [ ] Logo/sigil (Fiverr order or placeholder geometric mark)
- [ ] `hello@brumastudio.dev` email set up (Zoho Mail free tier or Google Workspace)
- [ ] 2–3 concept project screenshots (build the demos or use Midjourney mockups)
- [ ] All page copy (drafted above — review and personalize)
- [ ] Social profile URLs (register @brumastudio handles)
- [ ] Contact form backend (Resend API key or Formspree account)
- [ ] Favicon (sigil mark exported as .ico and .svg)
- [ ] OG image for social sharing (1200×630, dark bg with sigil + wordmark)

### Nice to Have (Add Post-Launch)

- [ ] Noise texture SVG for background grain
- [ ] Midjourney atmospheric illustrations (woodcut style, for section breaks)
- [ ] Particle/ember effect on hero
- [ ] Blog setup in Sanity (Scrolls section)
- [ ] Full bilingual i18n (Spanish copy + locale routing)
- [ ] Analytics (Vercel Analytics or Plausible)
- [ ] Sitemap + robots.txt + structured data (JSON-LD)

---

## Build Order (Weekend Sprint)

### Day 1: Foundation + Home

```
Morning:
  □ next-app scaffold with App Router + TypeScript
  □ Tailwind config with grimoire tokens
  □ next/font setup (Cinzel, Crimson Text, Inter)
  □ Global layout: <html> with font variables, body with grimoire-bg
  □ Nav component (responsive with mobile menu)
  □ Footer component

Afternoon:
  □ Home: Hero section
  □ Home: Services preview (3 cards)
  □ Home: Grimoire preview (placeholder project cards)
  □ Home: About/credibility strip
  □ Home: CTA strip
  □ Sanity Studio init + project schema (basic)
```

### Day 2: Services + Contact + Polish

```
Morning:
  □ Services page: hero + 3 service sections + process + CTA
  □ Contact page: form + info sidebar
  □ Form backend (Resend or Formspree API route)

Afternoon:
  □ 404 page
  □ Meta tags + OG images
  □ Responsive QA (mobile, tablet, desktop)
  □ Lighthouse audit (target 90+ across all metrics)
  □ Deploy to Vercel
  □ Connect custom domain
```

### Week After: Content Fill

```
  □ Build concept project 1 (Velo bike shop)
  □ Build concept project 2 (Bufete Reyes law firm) — or just mockups
  □ Write project page for brumastudio.dev itself
  □ Screenshot everything, add to Grimoire section
  □ Publish and share on social
```

---

## SEO & Meta

### Homepage

```html
<title>Bruma Studio — Dark arts of digital craft</title>
<meta name="description" content="Bruma Studio is a bilingual digital studio
specializing in Next.js, Sanity CMS, and modern web development.
Custom websites built with craft and intention." />
```

### Services

```html
<title>Services — Bruma Studio</title>
<meta name="description" content="Web development, CMS solutions, and design
strategy. We build with Next.js, Sanity CMS, and headless WordPress." />
```

### Contact

```html
<title>Contact — Bruma Studio</title>
<meta name="description" content="Start a project with Bruma Studio.
Web development and design for businesses in English and Spanish." />
```

### JSON-LD (add to layout or homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Bruma Studio",
  "url": "https://brumastudio.dev",
  "description": "Bilingual digital studio specializing in Next.js, Sanity CMS, and modern web development.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tijuana",
    "addressCountry": "MX"
  },
  "sameAs": [
    "https://github.com/brumastudio",
    "https://twitter.com/brumastudio",
    "https://linkedin.com/company/brumastudio",
    "https://instagram.com/brumastudio"
  ]
}
```

---

## Sanity CMS Schemas (MVP)

Set these up from day one so you're content-managed from the start.

```
schemas/
├── project.ts      → Portfolio items (spells)
├── service.ts      → Service offerings (arts)
├── siteSettings.ts → Global settings (studio name, tagline, social links)
└── (later)
    ├── post.ts     → Blog posts (scrolls)
    ├── author.ts   → Team members (the order)
    └── offering.ts → Pricing tiers (offerings)
```

### Project Schema (key fields)

```
title: string
slug: slug
description: text (short, for cards)
body: portable text (full case study)
coverImage: image
tags: array of strings
techStack: array of strings
client: string (fictional or real)
timeline: string
liveUrl: url (optional, link to demo)
featured: boolean (show on homepage)
order: number (sort order)
```

### Service Schema (key fields)

```
title: string
slug: slug
subtitle: string (e.g., "The Core Discipline")
body: portable text
icon: string (Lucide icon name)
features: array of strings (the "what's included" list)
order: number
```

---

## Performance Targets

```
Lighthouse:
  Performance:   95+
  Accessibility: 100
  Best Practices: 100
  SEO:           100

Core Web Vitals:
  LCP:  < 2.5s
  FID:  < 100ms
  CLS:  < 0.1

Bundle:
  First Load JS: < 100kB
  Total Transfer: < 500kB (excluding images)
```

Use `next/image` for all images (automatic WebP/AVIF, lazy loading, srcset). Defer atmospheric effects (particles, GSAP) with dynamic imports + `ssr: false`.

---

## What This Plan Doesn't Cover (Future Phases)

- **Phase 2:** Full bilingual i18n (Spanish copy, locale routing, hreflang tags)
- **Phase 2:** Blog / Scrolls section (Sanity-powered, MDX optional)
- **Phase 2:** Full portfolio page with filtering
- **Phase 3:** Pricing page (Offerings)
- **Phase 3:** Process page (The Ritual — expanded)
- **Phase 3:** Gumroad integration for starter kit sales
- **Phase 3:** Newsletter signup (The Signal) with Resend or ConvertKit
