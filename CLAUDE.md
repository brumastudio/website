# CLAUDE.md — Bruma Studio Project Instructions

## Project Overview

Bruma Studio (brumastudio.dev) is a bilingual (EN/ES) digital studio website. Dark mystical/arcane grimoire aesthetic. Built with Next.js 14+ App Router, TypeScript, Tailwind CSS, Sanity CMS, deployed on Vercel.

## Reference Documents

Read these files before making any design, copy, or architectural decisions:

- **`docs/BRUMA.md`** — Design system & brand spec. All color tokens, typography, component patterns, brand vocabulary, voice/tone rules. Single source of truth for how things look, read, and feel.
- **`docs/BRUMA-SITE-PLAN.md`** — Phase 1 MVP plan (completed).
- **`docs/BRUMA-SITE-PLAN-PHASES-2-3.md`** — Phase 2 (completed). Phase 3 is NOT active yet.

## Current Phase: Refinement — Visual Polish & Presentation Quality

Phases 1 and 2 are complete and deployed. All pages exist with full content and bilingual support. The site is functional but needs visual refinement to feel premium and client-ready.

This phase is about making every page feel finished — adding atmosphere, motion, imagery, and micro-details that communicate quality at first glance.

## Build Order

### Step 1: Noise Texture & Background Depth
- Add a subtle SVG noise/grain texture overlay to the entire site (`fixed inset-0 pointer-events-none z-50 opacity-[0.03]`)
- Generate a `noise.svg` using feTurbulence or use a 200x200 PNG grain tile
- Add subtle radial gradient spots on key pages (grimoire-rune or grimoire-gold at very low opacity) to break up the flat dark background
- Consider a very subtle vignette effect on page edges (dark corners fading inward)

### Step 2: Hero Section Enhancement
- Add an atmospheric background effect to the homepage hero:
  - Option A: Aceternity UI aurora background or spotlight effect
  - Option B: tsParticles with slow-moving ember/dust particles (max 30–40 particles)
  - Option C: Animated gradient mesh (CSS-only, lowest performance cost)
- Whichever effect is chosen, it MUST:
  - Be fully disabled when `prefers-reduced-motion: reduce` is set
  - Not affect text readability (keep effects behind content at z-0)
  - Perform smoothly on mobile (disable or simplify on screens < 768px)
  - Be subtle — if someone notices the effect before the content, it's too much
- Add a gentle fade-in animation on the hero text (opacity 0→1, translateY 20px→0, staggered by element, 600ms ease-out)

### Step 3: Scroll Animations
- Add reveal-on-scroll animations to all major sections site-wide using Framer Motion `whileInView`
- Pattern: elements fade in and slide up slightly as they enter the viewport
  - `initial={{ opacity: 0, y: 30 }}`
  - `whileInView={{ opacity: 1, y: 0 }}`
  - `transition={{ duration: 0.6, ease: "easeOut" }}`
  - `viewport={{ once: true, margin: "-100px" }}`
- Stagger children in card grids (services, projects) with 100–150ms delay between cards
- Section headers: gold divider line animates width from 0 to full
- Apply consistently across ALL pages (home, arts, grimoire, scrolls, the-order, summon)
- CRITICAL: wrap all motion in a check for `prefers-reduced-motion` — if reduced motion is preferred, show everything immediately with no animation

### Step 4: Hover & Interaction Polish
- Project cards (`/grimoire`): on hover, image scales slightly (scale-105), overlay fades in with "View Tome →" text, border transitions to grimoire-gold/30, subtle gold glow shadow
- Blog post cards (`/scrolls`): gold left-border slides in from 0 to 3px width on hover
- Service cards (`/arts`): icon transitions to grimoire-gold, card lifts slightly (translateY -2px) with shadow
- Navigation links: underline slides in from left on hover (not instant appear)
- Buttons: slight scale on press (active:scale-95), smooth color transition (duration-200)
- Footer social icons: opacity-50 → opacity-100 on hover with gold color transition
- All transitions: 200–300ms, ease-out, never jarring

### Step 5: Typography & Spacing Refinements
- Audit every page for consistent spacing rhythm (sections should breathe evenly)
- Ensure all headings have consistent tracking and sizing across pages
- Verify the 18px body text change is applied everywhere
- Add subtle letter-spacing to all Cinzel uppercase headings if not already present (tracking-wide or tracking-[0.08em])
- Blog post body: verify comfortable reading width, line height, and paragraph spacing
- Add proper `text-balance` or `text-wrap: balance` on headings to prevent awkward line breaks

### Step 6: Image & Visual Content
- Homepage hero: add the finalized sigil/logo mark (SVG) with a subtle glow or pulse animation
- Project pages (`/grimoire/[slug]`): add browser mockup frames around project screenshots to make them feel more polished — a simple dark border with rounded corners and a fake browser chrome bar
- About page (`/the-order`): add team member photos or illustrated avatars. If photos aren't ready, create stylized placeholder avatars (gold initials on grimoire-surface circle with border)
- Services page: ensure icons are visually consistent and properly sized
- Add a proper OG image (1200×630) for social sharing: dark background, sigil, "BRUMA STUDIO" wordmark, tagline. Use the same for all pages as default, with custom OG for blog posts.
- Favicon: ensure the sigil is implemented as favicon.ico (16x16, 32x32), apple-touch-icon (180x180), and site.webmanifest

### Step 7: Loading & Page Transitions
- Add a page transition animation between routes using Framer Motion `AnimatePresence`
  - Simple fade (opacity 0→1, 300ms) is sufficient — don't over-animate
- Add skeleton loading states for Sanity-powered content if not already present
- Images: ensure all `next/image` instances have blur placeholder or a shimmer loading state
- Consider a brief branded loading screen for first visit only (sigil fade-in, then reveal site) — but ONLY if it takes under 1 second. If the site loads fast, skip this entirely.

### Step 8: Dark Mode Refinements
- Verify that the dark theme looks intentional, not just "dark background with text"
- Add depth through layering: cards should feel elevated above the background
  - Base: grimoire-bg
  - Elevated: grimoire-surface
  - Most elevated: slightly lighter than grimoire-surface for modals/dropdowns
- Ensure borders are visible but subtle (grimoire-border, not too bright)
- Gold accent usage audit: gold should appear in headings, dividers, CTAs, and key interactive elements — but NOT everywhere. If everything is gold, nothing is.

### Step 9: Mobile Polish
- Full responsive audit on actual devices (or Chrome DevTools: iPhone SE, iPhone 14 Pro, iPad, iPad Pro)
- Mobile navigation: ensure hamburger menu animation is smooth, overlay is full-screen, links are large touch targets (min 44px)
- Touch interactions: ensure hover effects have appropriate touch equivalents
- Verify no horizontal scrolling on any page at any breakpoint
- Text should never feel cramped on mobile — generous padding on all containers
- Project/blog card grids stack cleanly to single column
- Forms (contact page): inputs are comfortable size on mobile, keyboard doesn't obscure fields

### Step 10: Performance Audit
- Run Lighthouse on every page — target:
  - Performance: 95+
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100
- Core Web Vitals check:
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- Optimize any atmospheric effects that hurt performance:
  - Lazy-load particle effects with `dynamic(() => import(...), { ssr: false })`
  - Reduce particle count on mobile or disable entirely
  - Ensure animations use GPU-accelerated properties (transform, opacity) not layout-triggering ones (width, height, top, left)
- Bundle size check: first-load JS should be under 100kB
- Image optimization: all images through next/image, verify WebP/AVIF serving
- Font loading: verify `display: swap` prevents FOIT (flash of invisible text)

## Effect Guidelines (from BRUMA.md)

- Max 30–50 particles on screen at once
- Glow effects: max 2–3 layers of box-shadow, opacity below 0.2
- Background effects at z-0, content always above
- Micro-interactions under 300ms
- Larger transitions under 1.2s
- ALWAYS implement prefers-reduced-motion fallbacks
- If someone notices the effect before the content, it's too much

## Tech Decisions

Same as Phase 2, plus:

| Choice | Use | Rationale |
|--------|-----|-----------|
| Framer Motion | All animations | whileInView for scroll reveals, AnimatePresence for page transitions |
| Aceternity UI / Magic UI | Atmospheric effects | Copy-paste components, no npm install — add to components/ui/ |
| tsParticles | Particle effects (optional) | Only if performance budget allows |
| CSS only | Noise texture, gradients | Zero JS cost for background atmosphere |

## Code Style

Same as Phase 2. Additional rules:
- Animation components should be separate files (e.g., `components/motion/fade-in.tsx`) for reusability
- All animation components must accept a `className` prop for composition
- Create a shared motion wrapper: `components/motion/reveal.tsx` that handles the whileInView pattern so it's consistent across all pages
- Heavy effects (particles, canvas) must use `dynamic import` with `ssr: false`

## What NOT to Do

- Don't add animations that delay content visibility — content should be readable within 1 second
- Don't use animation libraries besides Framer Motion (no AOS, no animate.css)
- Don't add a loading screen that takes more than 1 second
- Don't use stock photos — better to have no image than a generic one
- Don't over-animate — if every element bounces, slides, and glows, nothing feels special
- Don't sacrifice performance for visual effects — if Lighthouse drops below 90, pull back effects
- Don't animate on mobile unless it performs at 60fps
- Don't forget prefers-reduced-motion — this is an accessibility requirement, not optional
