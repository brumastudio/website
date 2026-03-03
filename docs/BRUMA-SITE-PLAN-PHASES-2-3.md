# BRUMA-SITE-PLAN-PHASES-2-3.md — Post-MVP Roadmap

> Phase 2: Content engine + bilingual + full portfolio (weeks 3–6 after launch)
> Phase 3: Revenue features + community + growth (weeks 7–12)
> Each phase builds on the last. Don't skip ahead.

---

## Phase 2: Content Engine & Bilingual Expansion

**Timeline:** 2–4 weeks after MVP launch
**Goal:** Turn the site from a static brochure into a living content hub that generates inbound leads. Add Spanish. Build out the full portfolio.

### What Gets Built

```
New pages:
  /grimoire              → Full portfolio index with filtering
  /scrolls               → Blog index
  /scrolls/[slug]        → Individual blog posts
  /the-order             → About / team page
  /es/...                → Full Spanish locale mirror

Enhanced:
  Homepage               → Dynamic project grid from Sanity (replace placeholders)
  All pages              → Bilingual routing + language switcher
  Nav                    → Add "Scrolls" and "The Order" links
  Footer                 → Add newsletter signup (The Signal)
```

---

### Page: Portfolio Index (/grimoire)

The full portfolio page with filtering. This replaces the homepage preview section as the canonical project listing.

**Hero:**

```
Section label: THE GRIMOIRE
Heading: Our Work
Body: Every project is a spell cast with intention — built from
modern code, shaped by design, and delivered with craft.
```

**Filter Bar:**

```
[All]  [Web Development]  [CMS]  [Design]  [Bilingual]
```

Filters are tag-based, pulled from Sanity project tags. Use URL params (`/grimoire?tag=cms`) for shareability and SEO. Active filter gets gold underline/highlight.

**Project Grid:**

```
Layout: 2-column on desktop, single column on mobile
Each card:
  ┌─────────────────────────────────┐
  │  [Screenshot / Browser Mockup]  │
  │                                 │
  │  Project Title                  │
  │  One-line description           │
  │  [Next.js] [Sanity] [Bilingual] │
  └─────────────────────────────────┘

Hover: subtle scale(1.02) + border glow + image overlay with "View Tome →"
```

**Implementation notes:**
- All content from Sanity — use the `project` schema from MVP
- `featured` projects appear first, then sorted by `order` field
- Filtering is client-side (small dataset) — use `useState` for active tag, filter the array
- Add a "More spells in progress" footer text if you have fewer than 4 projects
- Lazy-load project images with `next/image` + blur placeholder

---

### Page: Blog Index (/scrolls)

The blog is your primary SEO and authority-building tool. Write about what you know — Next.js, Sanity, headless CMS, bilingual web dev.

**Hero:**

```
Section label: THE SCROLLS
Heading: Codex
Body: Technical insights, build logs, and lessons from the craft.
Notes from the workshop floor.
```

**Post Grid:**

```
Layout: Single column, max-w-3xl centered (reading-focused)
Each post card:
  ┌─────────────────────────────────────┐
  │  Mar 15, 2026 · 6 min read          │
  │  Post Title in Cinzel               │
  │  First 2 lines of post as excerpt   │
  │  [Next.js] [Tutorial]               │
  └─────────────────────────────────────┘

No images on index cards — keep it text-focused like a codex/journal.
Gold left-border accent on hover.
```

**Category filter (optional, add when you have 6+ posts):**

```
[All]  [Tutorials]  [Build Logs]  [Strategy]  [Tools]
```

**Implementation notes:**
- Sanity `post` schema with Portable Text body
- Estimate reading time from word count (avg 200 wpm)
- RSS feed at `/scrolls/feed.xml` — use `next/rss` or generate in API route
- Add `<link rel="alternate" type="application/rss+xml">` to head
- Each post should have an OG image auto-generated (dark bg + Cinzel title + gold accent)

---

### Page: Blog Post (/scrolls/[slug])

**Layout:** Reading-focused. Single column, `max-w-3xl`, generous line height.

```
Structure:
  ─────────────────────────
  Category · Mar 15, 2026 · 6 min read

  Post Title
  in Large Cinzel

  Post subtitle / excerpt in italic
  ─────────────────────────

  [Portable Text body content]

  — Written by [Author Name], [Role] at Bruma Studio

  ─────────────────────────

  Related Scrolls
  [2-3 related post cards]

  ─────────────────────────

  [Newsletter CTA: "The Signal"]
```

**Typography for blog content:**

```
Body:        Crimson Text, 18px, leading-relaxed (1.75), grimoire-text
Headings:    Cinzel, grimoire-gold (h2: text-2xl, h3: text-xl)
Code blocks: JetBrains Mono on grimoire-surface, border grimoire-border,
             rounded-lg, p-4 — use a syntax highlighter (Shiki or Prism)
Inline code: bg-grimoire-surface px-1.5 py-0.5 rounded text-sm font-mono
Blockquotes: left border grimoire-gold, italic, grimoire-gold-light
Links:       grimoire-rune, underline on hover
Images:      full-width with rounded-lg, optional caption in grimoire-muted
```

**First 5 blog post ideas (prioritized by SEO value):**

```
1. "Why We Chose Next.js + Sanity CMS (And When You Should Too)"
   → Targets: next.js sanity cms, headless cms comparison
   → Establishes your stack authority

2. "Headless WordPress vs Sanity CMS: A Developer's Honest Comparison"
   → Targets: headless wordpress vs sanity, headless cms comparison
   → High search volume comparison keyword

3. "Building a Bilingual Website with Next.js and next-intl"
   → Targets: next.js bilingual, next-intl tutorial, i18n nextjs
   → Showcases your bilingual differentiator + technical depth

4. "How We Built Bruma Studio: A Design System Case Study"
   → Targets: design system case study, dark theme website
   → Build-in-public content, shows your process

5. "What Small Businesses Actually Need from a Website in 2026"
   → Targets: small business website, what makes a good business website
   → Client-facing content that builds trust with non-technical prospects
```

---

### Page: About / Team (/the-order)

**Hero:**

```
Section label: THE ORDER
Heading: Who We Are
Body: A deliberately small studio. Senior-level practitioners,
not junior teams managed by account executives.
```

**Studio Story:**

```
Heading: Origins

Bruma Studio was founded on a simple conviction: the best digital work
comes from small, focused teams who care deeply about craft.

We saw too many agencies selling process over product — layers of
account managers, junior developers, and templated solutions dressed
up as custom work. We built Bruma to be the opposite: a studio where
every project gets direct attention from the people actually doing the work.

We're bilingual by nature, not by strategy. English and Spanish are
both native to our team, which means we don't just translate —
we think, design, and communicate fluently in both languages.

Based in Tijuana, we serve clients across the Americas and beyond.
Small by design. Powerful by craft.
```

**Team Section:**

```
Layout: Card grid (2–3 members)
Each card:
  [Photo or illustrated avatar]
  Name
  Role
  Short bio (2–3 sentences, warm and human)
  [GitHub icon] [LinkedIn icon] [X icon]
```

**Your card example:**

```
[Your Name]
Founder · Developer · Designer

Project manager by day, developer and designer by conviction.
Background in agency work and a deep love for fantasy, dark aesthetics,
and building things that feel crafted rather than assembled.

[GitHub] [LinkedIn]
```

**Girlfriend's card (if she wants to be listed):**

```
[Her Name]
Operations & Client Relations

The calm in the storm. Manages timelines, client communication,
and everything that keeps the studio running while the code is being written.

[LinkedIn]
```

**Implementation notes:**
- Photos: professional headshots are ideal but not required. For launch, use Midjourney to generate stylized illustrated avatars (prompt: "portrait illustration, geometric low-poly style, dark background, gold accents, professional") or just use initials in a gold circle
- Keep bios human and warm — this is where the brand voice turns from atmospheric to approachable
- If it's just you at launch, frame it as "Founded and led by [Name]" — don't pretend to be bigger than you are. Solo studios with high craft are very appealing.
- Optional: "Collaborators" section for referral partners — "We work with a trusted network of designers, strategists, and specialists when a project calls for it."

**Values / Principles (optional section):**

```
Heading: What We Believe

Craft over speed.
We'd rather take an extra week than ship something mediocre.

Clarity over cleverness.
The best code and the best copy are both easy to understand.

Bilingual by nature.
Two languages, two markets, one standard of quality.

Small by design.
Every client gets senior attention. No junior handoffs.
```

**Implementation:** Show as a 2×2 grid of short text blocks. Title in Cinzel gold, body in Crimson Text. No icons needed — let the words carry it.

---

### Bilingual Implementation (i18n)

This is one of your biggest differentiators. Do it right.

**Routing structure:**

```
/en/                → English home
/en/arts            → English services
/en/grimoire        → English portfolio
/en/scrolls         → English blog
/en/the-order       → English about
/en/summon          → English contact

/es/                → Spanish home
/es/artes           → Spanish services
/es/grimorio        → Spanish portfolio
/es/pergaminos      → Spanish blog
/es/la-orden        → Spanish about
/es/invocar         → Spanish contact
```

**Library:** `next-intl` (best Next.js App Router support)

**Language switcher:**
```
Position: nav bar, right side before CTA
Style: subtle text toggle — "EN / ES" in Inter, grimoire-muted,
       active language in grimoire-gold
Behavior: switches locale, maintains current page
```

**Translation approach:**
- UI strings (nav, buttons, labels, form fields): JSON translation files
- Page copy (hero text, service descriptions): Sanity CMS with locale fields
- Blog posts: separate Sanity documents per language (not field-level translation — it's cleaner for different writing styles)
- Don't machine-translate. Write Spanish copy natively. You're fluent — this is an advantage. The tone and cultural nuances should feel native, not translated.

**SEO for bilingual:**
```html
<link rel="alternate" hreflang="en" href="https://brumastudio.dev/en/arts" />
<link rel="alternate" hreflang="es" href="https://brumastudio.dev/es/artes" />
<link rel="alternate" hreflang="x-default" href="https://brumastudio.dev/en/arts" />
```

**Spanish vocabulary adaptation:**

| English page      | Spanish page        | URL slug     |
| ------------------ | ------------------- | ------------ |
| Home               | Inicio              | /es          |
| The Arts           | Las Artes           | /es/artes    |
| The Grimoire       | El Grimorio         | /es/grimorio |
| The Scrolls        | Los Pergaminos      | /es/pergaminos |
| The Order          | La Orden            | /es/la-orden |
| Summon             | Invocar             | /es/invocar  |
| The Ritual         | El Ritual           | /es/el-ritual |
| Offerings          | Las Ofrendas        | /es/ofrendas |

**Spanish taglines:**
- Primary: "Artes oscuras del oficio digital."
- Alt: "Donde el código se convierte en magia."
- Alt: "Sabiduría ancestral. Código moderno."

**Content priority for Spanish translation:**
1. Navigation + footer + global UI (day 1 of i18n work)
2. Home page (complete translation)
3. Services page (complete translation)
4. Contact page + form labels
5. About page
6. Portfolio project descriptions (translate the summaries, not full case studies initially)
7. Blog posts (write new posts in both languages simultaneously going forward)

---

### Newsletter: The Signal

Add a signup form to the blog page footer and optionally to the site footer.

**CTA copy:**

```
THE SIGNAL

Technical insights, project stories, and the occasional arcane discovery.
No spam. Unsubscribe anytime.

[Email input]  [Subscribe →]

We send 1–2 times per month.
```

**Implementation:**
- Email provider: Resend (you're already using it for contact form) or ConvertKit (free up to 1,000 subscribers, better for newsletters)
- Store subscribers in Sanity or directly in the email platform
- Welcome email: short, branded, sets expectations
- No double opt-in for MVP (add later when list grows)

---

### Phase 2 Sanity Schemas (New)

**Post schema (scrolls):**
```
title: string
slug: slug
excerpt: text (2-3 sentences, for index cards and SEO)
body: portable text (full post content)
coverImage: image (optional, for OG image generation)
category: string (Tutorial / Build Log / Strategy / Tools)
tags: array of strings
author: reference → author
publishedAt: datetime
language: string (en / es)
relatedPosts: array of references → post
featured: boolean
```

**Author schema (the order):**
```
name: string
slug: slug
role: string
bio: portable text
photo: image
socialLinks: object { github, linkedin, twitter, instagram }
order: number
```

**Site Settings (extend):**
```
+ newsletterCTA: text
+ defaultLanguage: string
+ socialLinks: object { github, linkedin, twitter, instagram, behance }
```

---

### Phase 2 Build Order

```
Week 1:
  □ /the-order page (about/team)
  □ Write and photograph/illustrate team content
  □ /grimoire full portfolio index with filtering
  □ Build concept project 2 if not done (Bufete Reyes)
  □ Write case study for brumastudio.dev itself

Week 2:
  □ Post schema in Sanity
  □ /scrolls index page
  □ /scrolls/[slug] post template with syntax highlighting
  □ Write first blog post ("Why We Chose Next.js + Sanity CMS")
  □ RSS feed generation
  □ Newsletter signup component (The Signal)

Week 3:
  □ next-intl setup + locale routing
  □ JSON translation files for all UI strings
  □ Language switcher component in nav
  □ Translate Home page to Spanish
  □ Translate Services page to Spanish
  □ Translate Contact page + form labels

Week 4:
  □ Translate About page
  □ Translate portfolio project summaries
  □ hreflang tags on all pages
  □ Write second blog post
  □ OG image generation for blog posts
  □ Full QA pass: both languages, all pages, all devices
```

---

## Phase 3: Revenue Features & Growth

**Timeline:** Weeks 7–12 after initial launch
**Goal:** Turn the site into a revenue-generating platform. Pricing page, digital products, process documentation, and community presence.

### What Gets Built

```
New pages:
  /offerings           → Pricing / packages page
  /the-ritual          → Expanded process page
  /grimoire/starter-kits → Digital products (link to Gumroad)

Enhanced:
  Homepage             → Add testimonial section (when you have real clients)
  Blog                 → Series/collection pages
  Contact              → Add Calendly embed for booking calls
  Footer               → Add Gumroad product links
```

---

### Page: Pricing (/offerings)

This is a strategic page. Don't just list prices — frame the value.

**Hero:**

```
Section label: THE OFFERINGS
Heading: Investment & Scope
Body: Transparent pricing for quality craft. Every project includes
direct communication with senior practitioners, not account managers.
```

**Pricing Tiers:**

```
Layout: 3-column card grid (stacks on mobile)
Middle card (recommended) gets a gold border + "Most Popular" badge
```

**Tier 1: Starter**

```
Name: The Spark
Price: From $3,000
Timeline: 2–3 weeks

What's included:
  · Landing page or single-page site
  · Custom Next.js development
  · Responsive design (mobile-first)
  · Basic Sanity CMS setup
  · Vercel deployment
  · 1 round of revisions
  · 30-day post-launch support

Best for: Launches, MVPs, and businesses that
need a strong first impression, fast.

[CTA: "Start a Spark" →]
```

**Tier 2: Core (Recommended)**

```
Name: The Forge
Price: From $8,000
Timeline: 4–6 weeks
Badge: ★ Most Popular

What's included:
  · Multi-page marketing site (up to 8 pages)
  · Custom Next.js + Sanity CMS development
  · UI/UX design in Figma
  · Content modeling & migration
  · Full responsive + accessibility audit
  · 2 rounds of revisions
  · Team training on CMS
  · 60-day post-launch support
  · Monthly maintenance available ($150/mo)

Best for: Established businesses ready for a
professional, content-managed web presence.

[CTA: "Enter the Forge" →]
```

**Tier 3: Premium**

```
Name: The Grimoire
Price: From $15,000
Timeline: 6–10 weeks

What's included:
  · Everything in The Forge, plus:
  · Design system documentation
  · Bilingual (EN/ES) implementation
  · Advanced integrations (APIs, e-commerce, dashboards)
  · Custom component library
  · Performance optimization (Lighthouse 95+)
  · Ongoing support retainer included (3 months)
  · Priority communication

Best for: Complex projects that demand a comprehensive
solution and long-term partnership.

[CTA: "Commission a Grimoire" →]
```

**Below the tiers:**

```
Heading: How Pricing Works

We price by project scope, not by hour. After an initial conversation,
we provide a detailed proposal with a fixed price — no surprises, no
scope creep. Every project includes:

  · A dedicated practitioner (not a junior handoff)
  · Transparent timeline with milestone check-ins
  · Staging environment for review before launch
  · Source code ownership (it's yours)
  · Post-launch support period

For ongoing needs, we offer monthly retainers starting at $100/month
for hosting management, updates, and priority support.
```

**FAQ section:**

```
Heading: Common Questions

Q: Do you require a deposit?
A: Yes — 30% upfront to begin, 30% at design approval,
   and 40% upon delivery. This protects both parties.

Q: What if my project doesn't fit these tiers?
A: These are starting points. We'll scope a custom proposal
   based on your specific needs after our first conversation.

Q: Can I start with Starter and upgrade later?
A: Absolutely. Many clients begin with a focused launch and
   expand as their business grows. We build with scalability in mind.

Q: Do you work with clients outside of Mexico?
A: Yes. Most of our clients are in the US and Latin America.
   We communicate in English and Spanish and work across time zones.

Q: What's your tech stack?
A: Next.js, React, TypeScript, Tailwind CSS, Sanity CMS,
   headless WordPress, and Vercel. Modern, fast, maintainable.

Q: Do you do WordPress sites?
A: We build headless WordPress sites where WordPress serves
   as the content backend and Next.js powers the frontend.
   We don't build traditional WordPress theme sites.
```

**Implementation notes:**
- Pricing cards: grimoire-surface background, gold border on recommended tier
- "From $X" — always use "from" to leave room for scope adjustments
- FAQ: use an accordion component (Radix UI Accordion or shadcn/ui). Cinzel for questions, Crimson Text for answers.
- Add schema.org `FAQPage` structured data for SEO
- Mobile: stack tiers vertically, recommended tier first

---

### Page: Process (/the-ritual)

Expand the brief process section from Services into a full page that builds client confidence.

**Hero:**

```
Section label: THE RITUAL
Heading: How We Work
Body: Every project follows a proven process — structured enough
to keep things on track, flexible enough to adapt to your needs.
```

**Steps (expanded from MVP):**

```
PHASE 01 — DISCOVERY
Timeline: 3–5 days

It starts with listening. We schedule a discovery call to understand
your business, your audience, your goals, and your constraints. No
questionnaire templates — a real conversation.

Deliverables:
  · Project brief documenting scope and goals
  · Sitemap and information architecture
  · Technical requirements document
  · Timeline and milestone schedule
  · Fixed-price proposal


PHASE 02 — DESIGN
Timeline: 1–2 weeks

We design in Figma, starting with wireframes and progressing to
full-fidelity mockups. You review and approve the visual direction
before development begins. No surprises.

Deliverables:
  · Wireframes for all pages
  · High-fidelity Figma mockups (desktop + mobile)
  · Interactive prototype for key user flows
  · Design system components
  · 2 rounds of revision included


PHASE 03 — DEVELOPMENT
Timeline: 2–4 weeks

Clean, hand-crafted code. We build in Next.js with TypeScript and
deploy to a staging environment where you can review progress in
real time. We check in regularly — you're never left wondering
what's happening.

Deliverables:
  · Custom Next.js application
  · Sanity CMS setup and configuration
  · Staging environment with regular updates
  · Responsive across all devices
  · Accessibility audit (WCAG 2.2 AA)
  · Performance optimization (Lighthouse 90+)


PHASE 04 — DELIVERY & BEYOND
Timeline: 3–5 days + ongoing

Launch day. We handle deployment, DNS, SSL, and everything
technical. We train your team on the CMS and hand over
complete documentation. Then we stick around.

Deliverables:
  · Production deployment on Vercel
  · Custom domain setup
  · CMS training session (recorded)
  · Technical documentation
  · Post-launch support (30–90 days depending on tier)
  · Optional: monthly retainer for ongoing support
```

**Implementation notes:**
- Vertical timeline layout with gold connecting line
- Phase numbers in Cinzel, `text-6xl`, grimoire-gold, `opacity-20` as background watermark
- Deliverables as subtle lists with checkmark icons
- Optional: animated timeline that reveals sections on scroll (Framer Motion `whileInView`)
- CTA at bottom: "Ready to begin the ritual?" → `/summon`

---

### Digital Products: Starter Kits

Link from the site to Gumroad for your starter kit products. These serve two purposes: passive income and lead generation (free versions bring people to your brand).

**Products to build:**

**Free — Next.js + Sanity Starter (Lead Magnet)**

```
Name: Bruma Spark — Next.js + Sanity Starter
Price: Free (email gate on Gumroad)
What's included:
  · Next.js 14 App Router boilerplate
  · Sanity CMS pre-configured with blog + page schemas
  · Tailwind CSS setup with dark/light mode
  · Basic SEO (meta tags, sitemap, robots.txt)
  · Vercel-ready deployment config
  · README with setup instructions

Purpose: Builds email list, establishes authority, gets your
name on Vercel Templates and Sanity Exchange.
```

**Paid — The Grimoire Stack ($49–$79)**

```
Name: The Grimoire Stack — Next.js + Sanity Pro Starter
Price: $49 (intro) → $79 (after 50 sales)
What's included:
  · Everything in Bruma Spark, plus:
  · Complete dark-theme design system (Tailwind tokens)
  · Pre-built component library (hero, cards, nav, footer, forms)
  · Blog with categories, tags, and reading time
  · Contact form with Resend integration
  · i18n setup (next-intl) ready for bilingual
  · Portfolio/project schema and pages
  · Lighthouse 95+ out of the box
  · Figma design file included
  · Video walkthrough (15 min)
```

**Paid — Agency Template ($99–$149)**

```
Name: The Codex — Agency/Studio Website Template
Price: $99 (intro) → $149 (after 30 sales)
What's included:
  · Full studio/agency website built on Next.js + Sanity
  · 8 pre-designed pages (home, services, portfolio, blog, about,
    pricing, process, contact)
  · Atmospheric effects (particles, scroll animations)
  · Bilingual ready (EN/ES structure pre-configured)
  · Client testimonial and team member schemas
  · CMS training documentation template
  · Complete Figma design file
  · 30-minute setup video
```

**Site integration:**
- Add a "Tools" or "Resources" link in the footer
- Create a `/resources` page (or just link directly to your Gumroad profile)
- Mention starter kits in relevant blog posts
- Include a Gumroad embed or link card on the resources page

---

### Testimonials Section (Homepage Enhancement)

Add this to the homepage between the Grimoire preview and the About strip once you have 2–3 real client quotes.

**Copy structure:**

```
Section label: SECTION 03
Heading: Words from Our Patrons

Layout: Carousel or 2–3 stacked cards

Each testimonial:
  "Quote from the client about working with Bruma Studio.
   Keep it to 2–3 sentences maximum."

   — Client Name, Role, Company
     [Optional: small project tag like "Web Development"]
```

**Implementation:**
- Don't add this section until you have REAL testimonials — placeholder quotes look worse than no section at all
- If you only have 1 testimonial, display it as a single featured quote instead of a carousel
- Sanity schema: `testimonial` with fields for `quote`, `clientName`, `clientRole`, `company`, `projectRef`
- Style: Crimson Text italic for quotes, grimoire-gold-light, Inter for attribution in grimoire-muted

**How to get testimonials early:**
- After delivering a concept project demo to a friend/contact, ask for a quote about the experience
- After your first real project, send a specific request: "Could you share 2–3 sentences about what it was like working with us? Specifically [timeline/communication/quality]?"
- Make it easy — draft a quote for them to approve/edit if needed

---

### Enhanced Contact: Calendly Integration

Add a scheduling option alongside the contact form.

```
Layout: Tabs or side-by-side

Tab 1: Send a Message (existing form)
Tab 2: Book a Call

"Prefer to talk it through? Book a free 30-minute
discovery call and we'll discuss your project live."

[Calendly embed — 30min "Discovery Call" event type]
```

**Implementation:**
- Calendly free tier supports 1 event type
- Use `react-calendly` package for inline embed
- Style the embed container to match brand (Calendly supports custom colors)
- Set availability to your real working hours (account for timezone — you're in Tijuana/Pacific)

---

### Blog Series/Collections

As your blog grows, group related posts into series.

```
Series ideas:
  "Building Bruma" — behind-the-scenes build log of the studio site
  "Headless CMS Deep Dives" — comparisons, tutorials, migration guides
  "Bilingual Web" — i18n tutorials, cultural localization tips
  "Client Playbook" — non-technical posts for potential clients
```

**Implementation:**
- Add `series` field to post schema (reference → series document)
- Series document: `title`, `slug`, `description`, `coverImage`
- On post page, show "Part X of [Series Name]" with prev/next navigation
- Series index page at `/scrolls/series/[slug]`

---

### Phase 3 Sanity Schemas (New)

**Testimonial:**
```
quote: text
clientName: string
clientRole: string
company: string
projectRef: reference → project (optional)
featured: boolean
order: number
```

**Offering (pricing tier):**
```
name: string (The Spark, The Forge, The Grimoire)
slug: slug
price: string ("From $3,000")
timeline: string ("2–3 weeks")
description: text
features: array of strings
recommended: boolean
ctaText: string
ctaLink: string
order: number
```

**FAQ:**
```
question: string
answer: portable text
category: string (Pricing / Process / Technical / General)
order: number
```

**Series (blog):**
```
title: string
slug: slug
description: text
coverImage: image
```

**Product (Gumroad links):**
```
name: string
description: text
price: string
gumroadUrl: url
coverImage: image
featured: boolean
```

---

### Phase 3 Build Order

```
Week 7–8: Revenue pages
  □ /offerings pricing page with 3 tiers
  □ FAQ section with accordion
  □ Schema.org FAQPage structured data
  □ /the-ritual expanded process page
  □ Calendly integration on contact page
  □ Write blog posts 3 and 4

Week 9–10: Digital products
  □ Build free Next.js + Sanity starter kit
  □ Publish to Gumroad (free, email-gated)
  □ Submit to Vercel Templates
  □ Submit to Sanity Exchange
  □ Build paid Grimoire Stack starter kit
  □ /resources page or footer links to Gumroad
  □ Write blog post about the starter kit (doubles as marketing)

Week 11–12: Growth & polish
  □ Testimonials section (add when you have real quotes)
  □ Blog series grouping
  □ Social media templates (Figma or Canva) for consistent posting
  □ OG image auto-generation for blog posts
  □ Full Lighthouse audit and performance pass
  □ Analytics review — identify top-performing pages
  □ Plan content calendar for next 3 months
```

---

## Metrics to Track Across Phases

### Phase 2 Success Metrics

```
□ Blog gets 3+ posts published
□ Full bilingual site live (all pages in EN and ES)
□ Portfolio has 3+ project case studies
□ Newsletter (The Signal) has first 25 subscribers
□ Organic search impressions begin appearing in Google Search Console
□ At least 1 inbound inquiry through the contact form
```

### Phase 3 Success Metrics

```
□ Pricing page live — clear packaging reduces "how much?" back-and-forth
□ Free starter kit published — generates email subscribers
□ Paid product has first 5 sales on Gumroad
□ 2+ client testimonials displayed on site
□ Blog posts ranking for at least 1 target keyword
□ Monthly recurring revenue from retainers: $100–$300
□ 1–2 projects completed via inbound leads
□ Total monthly revenue approaching $500–$1,000 target
```

---

## Content Calendar Template (Post-Phase 3)

Once all phases are complete, maintain momentum with a simple content rhythm:

```
Weekly:
  · 1 social media post (project update, tip, or behind-the-scenes)

Biweekly:
  · 1 blog post (alternate between technical tutorials and client-facing strategy)

Monthly:
  · 1 newsletter issue (The Signal — roundup of posts + 1 exclusive insight)
  · 1 portfolio update (new project, case study update, or starter kit release)

Quarterly:
  · Review analytics and adjust strategy
  · Update pricing if needed
  · Publish a substantial piece (guide, comparison, or tool)
```

---

## File Summary

You now have three documents that cover the complete Bruma Studio build:

```
BRUMA.md              → Design system & brand spec (for Claude Code)
BRUMA-SITE-PLAN.md    → MVP: Home + Services + Contact (Phase 1)
BRUMA-SITE-PLAN-PHASES-2-3.md → This file (Phases 2 & 3)
```

Drop all three into your project root. Claude Code references BRUMA.md for design decisions, and you reference the site plans for what to build and what copy to use.
