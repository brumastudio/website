# BRUMA.md — Design System & Brand Spec

> This file is the single source of truth for Bruma Studio's brand identity, design tokens, component patterns, and copy guidelines. Reference it when building any Bruma Studio project — website, proposals, templates, or client work.

---

## Brand Identity

**Name:** Bruma Studio
**Domain:** brumastudio.dev
**Tagline:** "Dark arts of digital craft."
**Alt taglines:** "Where code becomes magic." · "Ancient wisdom. Modern code." · "Ars Digitalis"

**What Bruma means:** "Bruma" is Latin/Spanish for "mist" — the veil between what is seen and what is yet to be revealed. Pronounced /BROO-mah/ in both English and Spanish.

**Positioning:** A bilingual (EN/ES) tech studio specializing in Next.js, Sanity CMS, and headless WordPress. Dark mystical/arcane grimoire aesthetic — atmospheric and compelling, never cartoonish. Somewhere between indie creative studio and professional agency.

**Tech stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS · Sanity CMS · Headless WordPress · Vercel · Figma

---

## Design Tokens

### Colors

Use these exact values. Never use pure `#000000` (causes eye strain) or pure `#FFFFFF` (too harsh on dark backgrounds).

```
Primary:
  --grimoire-bg:        #0D0D12    /* Near-black with blue undertone. Page/app background */
  --grimoire-surface:   #1A1425    /* Cards, modals, elevated surfaces */
  --grimoire-gold:      #C9A669    /* Primary accent. Headings, CTAs, borders, icons */
  --grimoire-gold-light:#E0D0A0    /* Hover states, subtle highlights */
  --grimoire-text:      #E8E2D6    /* Body text. Warm off-white (parchment) */

Secondary:
  --grimoire-rune:      #6A0DAD    /* Interactive elements, links, focus rings */
  --grimoire-rune-soft: #8B5FBF    /* Hover state for rune elements */
  --grimoire-ember:     #9A3412    /* Warnings, destructive actions, rare accent */
  --grimoire-border:    #2A2833    /* Subtle borders, dividers, separators */
  --grimoire-muted:     #4A4558    /* Muted text, captions, metadata, placeholders */

Semantic:
  --grimoire-success:   #7ECF8A
  --grimoire-error:     #CF7E7E
  --grimoire-info:      #7EA8CF
```

### Tailwind Config

```js
// tailwind.config.ts — extend theme.colors
colors: {
  grimoire: {
    bg:        '#0D0D12',
    surface:   '#1A1425',
    gold:      '#C9A669',
    'gold-light': '#E0D0A0',
    text:      '#E8E2D6',
    rune:      '#6A0DAD',
    'rune-soft': '#8B5FBF',
    ember:     '#9A3412',
    border:    '#2A2833',
    muted:     '#4A4558',
  }
}
```

### Contrast & Accessibility

- `grimoire-text` on `grimoire-bg` → ~14:1 (exceeds AAA)
- `grimoire-gold` on `grimoire-bg` → ~7:1 (passes AA all sizes)
- `grimoire-gold` must NOT be used for body text below 14px
- `grimoire-rune` on `grimoire-bg` → passes AA for large text only (18px+ or 14px bold)
- `grimoire-muted` on `grimoire-bg` → decorative/non-essential text only
- Always implement `prefers-color-scheme` and `prefers-reduced-motion`

---

## Typography

### Font Stack

```css
/* next/font imports */
--font-display: 'Cinzel', 'Times New Roman', serif;
--font-body:    'Crimson Text', 'Georgia', serif;
--font-ui:      'Inter', 'Helvetica Neue', sans-serif;
--font-mono:    'JetBrains Mono', 'Fira Code', monospace;
```

```js
// app/layout.tsx — next/font setup
import { Cinzel, Crimson_Text, Inter, JetBrains_Mono } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

### Type Scale

| Element            | Font          | Size (desktop) | Weight  | Color         | Tailwind Class Example                        |
| ------------------ | ------------- | -------------- | ------- | ------------- | ---------------------------------------------- |
| Hero title         | Cinzel        | 48–64px        | Regular | grimoire-gold | `font-display text-5xl text-grimoire-gold`     |
| Section heading    | Cinzel        | 28–36px        | Regular | grimoire-gold | `font-display text-3xl text-grimoire-gold`     |
| Subsection         | Cinzel        | 18–22px        | Regular | grimoire-gold-light | `font-display text-xl text-grimoire-gold-light` |
| Body               | Crimson Text  | 16–18px        | Regular | grimoire-text | `font-body text-base text-grimoire-text`       |
| Body emphasis      | Crimson Text  | 16–18px        | Bold    | grimoire-text | `font-body text-base font-bold`                |
| Navigation         | Inter         | 14px           | Medium  | grimoire-gold | `font-ui text-sm font-medium text-grimoire-gold` |
| Button / CTA       | Inter         | 14–16px        | Medium  | grimoire-bg   | `font-ui text-sm font-medium bg-grimoire-gold text-grimoire-bg` |
| Caption / Meta     | Inter         | 12px           | Regular | grimoire-muted | `font-ui text-xs text-grimoire-muted`          |
| Code               | JetBrains Mono | 14px          | Regular | grimoire-text | `font-mono text-sm text-grimoire-text`         |

### Rules

- Cinzel is ALWAYS uppercase for headings: use `uppercase tracking-wide`
- Crimson Text for all long-form content — it's warm and readable at body sizes
- Inter for all UI: buttons, nav, labels, forms, metadata
- Never use Cinzel for body text or Inter for headings
- Line height: body at 1.6–1.7, headings at 1.2–1.3

---

## Spacing & Layout

```
Base unit: 4px (Tailwind default)
Section padding: py-24 md:py-32 (96px / 128px)
Container max-width: max-w-6xl (1152px) for content, max-w-7xl (1280px) for full layouts
Card padding: p-6 md:p-8
Component gap: gap-6 or gap-8
Border radius: rounded-lg (8px) for cards, rounded-md (6px) for buttons
```

---

## Component Patterns

### Card (Grimoire Style)

```tsx
<div className="bg-grimoire-surface border border-grimoire-border rounded-lg p-6
  hover:border-grimoire-gold/30 hover:shadow-[0_0_20px_rgba(201,166,105,0.08)]
  transition-all duration-300">
  {/* content */}
</div>
```

### Button — Primary (Gold)

```tsx
<button className="bg-grimoire-gold text-grimoire-bg font-ui text-sm font-medium
  px-6 py-3 rounded-md hover:bg-grimoire-gold-light
  transition-colors duration-200 uppercase tracking-wider">
  Invoke Us
</button>
```

### Button — Secondary (Outline)

```tsx
<button className="border border-grimoire-gold text-grimoire-gold font-ui text-sm
  font-medium px-6 py-3 rounded-md hover:bg-grimoire-gold/10
  transition-colors duration-200 uppercase tracking-wider">
  View Grimoire
</button>
```

### Section Header

```tsx
<header className="mb-12">
  <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
    Section 01
  </p>
  <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
    The Grimoire
  </h2>
  <div className="mt-4 h-px bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60
    relative">
    <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold
      rotate-45" />
  </div>
</header>
```

### Gold Divider (with diamond)

```tsx
<div className="relative h-px bg-grimoire-gold/40 my-12">
  <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
</div>
```

### Text Glow Effect (for hero headings)

```css
.text-glow {
  text-shadow:
    0 0 10px rgba(201, 166, 105, 0.3),
    0 0 20px rgba(201, 166, 105, 0.15),
    0 0 40px rgba(201, 166, 105, 0.05);
}
```

### Noise Texture Overlay

```tsx
/* Apply to body or main wrapper for grimoire paper texture */
<div className="fixed inset-0 pointer-events-none z-50
  bg-[url('/noise.svg')] opacity-[0.03]" />
```

Generate `noise.svg` as a tiny repeating SVG with feTurbulence, or use a 200×200 PNG grain texture.

---

## Atmospheric Effects

Use sparingly. Always implement `prefers-reduced-motion` fallbacks. Effects should enhance atmosphere, never distract from content.

### Recommended Libraries

- **Aceternity UI** (ui.aceternity.com) — free copy-paste React components: sparkle particles, aurora backgrounds, canvas reveal, encrypted text animations, tracing beams, border beams
- **Magic UI** (magicui.design) — border beam, shine borders, spotlight cards, particle systems. Compatible with shadcn/ui
- **Framer Motion** — page transitions, scroll-triggered reveals, layout animations
- **tsParticles** — floating ember/firefly particles, mouse-interactive
- **GSAP + ScrollTrigger** — complex scroll-driven timeline animations (use for project showcases)

### Effect Guidelines

- Keep micro-interactions under 300ms, larger transitions under 1.2s
- Particle density: max 30–50 particles on screen at once
- Glow effects: max 2–3 layers of box-shadow, keep opacity below 0.2
- Background effects (aurora, particles) at z-0; content always above
- Test performance on mobile — disable heavy effects on `(max-width: 768px)` if needed

---

## Brand Vocabulary

The arcane lexicon is used at **20% of touchpoints** — navigation labels, section headers, CTAs, and microcopy only. All service descriptions, proposals, and client communication are clear and professional.

### Vocabulary Map

| Standard Term    | Bruma Term         | Spanish           | Where to use                |
| ---------------- | ------------------ | ----------------- | --------------------------- |
| Projects / Work  | Spells             | Conjuros          | Portfolio section header    |
| Team             | The Order          | La Orden          | About / team page           |
| Services         | Arts / Disciplines | Artes             | Services section            |
| Portfolio        | Grimoire           | Grimorio          | Portfolio page title        |
| Blog             | Scrolls / Codex    | Pergaminos        | Blog section                |
| Clients          | Patrons            | Patronos          | Client references           |
| Contact          | Summon / Invoke    | Invocar           | Contact page CTA            |
| About            | Origins            | Orígenes          | About page title            |
| Pricing          | Offerings          | Ofrendas          | Pricing page                |
| Process          | The Ritual         | El Ritual         | Process section             |
| Newsletter       | The Signal         | La Señal          | Email signup                |
| Case Study       | Tome               | Tomo              | Individual project pages    |
| 404 page         | "Lost in the mist" | "Perdido en la bruma" | Error page              |

### Copy Formula

**For section headers:** Themed term, then clear subtitle.
```
The Grimoire — Our Work
El Grimorio — Nuestras Obras
```

**For service descriptions:** Clear professional copy with ONE themed phrase at the end.
```
We build fast, scalable websites using Next.js and Sanity CMS.
Every project is hand-crafted with modern tooling and deployed for performance.
The best spells take time to cast right.
```

**Never do this:**
```
We weave enchantments of HTML and JavaScript into arcane constructs,
transmuting your vision into a living grimoire of interactive sorcery.
```

---

## Voice & Tone

**Voice (constant):** Quiet confidence. Knowledgeable without arrogance. Atmospheric without pretension. Direct without coldness. Like a master craftsperson explaining their work to someone they respect.

**Tone (shifts by context):**

| Context       | Tone                      | Example                                                 |
| ------------- | ------------------------- | ------------------------------------------------------- |
| Website hero  | Atmospheric + Bold        | "Dark arts of digital craft."                           |
| Service page  | Clear + Professional      | "We build fast, modern websites with Next.js."          |
| Blog post     | Knowledgeable + Casual    | "Here's what we learned migrating to headless CMS."     |
| Client email  | Warm + Direct             | "Hi — here's the project update for this week."         |
| Social media  | Witty + Brief             | "Another spell shipped. Check it out."                  |
| Proposal      | Professional + Confident  | "Bruma Studio proposes the following scope..."          |
| Error / 404   | Playful + Themed          | "This page has vanished into the mist."                 |

---

## Site Structure

```
/                    → Home (hero + services + portfolio highlights + CTA)
/grimoire            → Portfolio / project index
/grimoire/[slug]     → Individual project (Tome)
/arts                → Services
/the-order           → About / team
/scrolls             → Blog index
/scrolls/[slug]      → Blog post
/offerings           → Pricing
/summon              → Contact
/the-ritual          → Process page
```

### Bilingual Routing (i18n)

```
/en/grimoire         → English portfolio
/es/grimorio         → Spanish portfolio
/en/summon           → English contact
/es/invocar          → Spanish contact
```

Use Next.js middleware + `next-intl` or `next-i18next` for locale detection and routing.

---

## Logo Usage

### Wordmark

"BRUMA" in Cinzel uppercase, Aged Gold (#C9A669). "STUDIO" in Cinzel at smaller size, Bone White (#E8E2D6), tracked wide (letter-spacing: 0.2–0.3em).

```tsx
<div className="flex items-baseline gap-3">
  <span className="font-display text-3xl text-grimoire-gold uppercase">Bruma</span>
  <span className="font-display text-sm text-grimoire-text uppercase tracking-[0.3em]">Studio</span>
</div>
```

### Sigil Mark

Geometric mark built from sacred geometry (overlapping triangles in circle). Use as favicon, social avatar, loading indicator. Minimum size: 24px.

### Approved Backgrounds

- ✅ Gold on Obsidian (#0D0D12) — primary
- ✅ Bone White on Obsidian — secondary
- ✅ Obsidian on light backgrounds — print / light mode
- ❌ Never on mid-tone backgrounds where contrast < 4.5:1

---

## Social & External

**Handle:** @brumastudio (all platforms)
**Platforms:** GitHub, X/Twitter, Instagram, LinkedIn, Behance

**Email signature:**
```
Name | Role
Bruma Studio · brumastudio.dev
Dark arts of digital craft.
```

**Content mix:** 40% project showcases, 30% technical insights, 20% behind-the-scenes, 10% community

---

## Do's & Don'ts

### Do

- Use themed vocabulary in nav, section headers, CTAs (20% of touchpoints)
- Keep service descriptions, proposals, contracts clear and professional
- Use Cinzel for display, Crimson Text for body, Inter for UI — never swap
- Maintain dark background as primary brand context
- Use gold accent sparingly — it should feel precious
- Embrace bilingual identity — Spanish is a feature, not an afterthought
- Use Latin phrases as universal brand anchors
- Let the work carry the mystique — restraint is the real magic
- Always provide `prefers-reduced-motion` fallbacks for animations

### Don't

- Use wizard hats, wands, pointed stars, or cartoon magic imagery
- Write service copy in elaborate fantasy prose
- Use pentagrams, skulls, or religious iconography
- Place logo on backgrounds where contrast drops below 4.5:1
- Use more than one accent color per composition (gold OR amethyst, not both)
- Use blackletter/gothic fonts for anything beyond a single decorative initial
- Let theme override usability — navigation must always be clear
- Use themed vocabulary in legal docs, invoices, or formal contracts
- Overuse particle effects or animations
- Translate literally — use transcreation to adapt tone and cultural context

---

## Sanity CMS Schema Hints

When setting up Sanity schemas for the studio site, use the brand vocabulary as schema names where it helps internal consistency:

```ts
// Example schema naming
spell       → project/portfolio item
tome        → case study (extended project page)
scroll      → blog post
discipline  → service
patron      → client reference/testimonial
offering    → pricing tier
```

This keeps internal tooling aligned with the brand vocabulary and makes content authoring feel on-brand.

---

## Key Dependencies

```json
{
  "next": "^14.0.0",
  "@sanity/client": "latest",
  "framer-motion": "latest",
  "tailwindcss": "^3.4.0",
  "next-intl": "latest",
  "@radix-ui/react-*": "latest",
  "lucide-react": "latest"
}
```

Optional atmospheric effects:
```json
{
  "tsparticles": "latest",
  "@tsparticles/react": "latest",
  "gsap": "latest"
}
```

Aceternity UI and Magic UI components are copy-paste (no npm install) — add them to `components/ui/` as needed.
