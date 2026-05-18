import { defineArrayMember, defineField, defineType } from "sanity";

const prospectBullet = defineArrayMember({
  type: "object",
  name: "prospectBullet",
  title: "Bullet",
  fields: [
    defineField({
      name: "title",
      title: "Title (EN)",
      type: "string",
      description: "Bold uppercase title",
    }),
    defineField({
      name: "titleEs",
      title: "Title (ES)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description (EN)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "descriptionEs",
      title: "Description (ES)",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "titleEs" },
  },
});

const prospectTier = defineArrayMember({
  type: "object",
  name: "prospectTier",
  title: "Tier",
  fields: [
    defineField({ name: "name", title: "Name (EN)", type: "string" }),
    defineField({ name: "nameEs", title: "Name (ES)", type: "string" }),
    defineField({ name: "tagline", title: "Tagline (EN)", type: "string" }),
    defineField({ name: "taglineEs", title: "Tagline (ES)", type: "string" }),
    defineField({
      name: "price",
      title: "Price (EN)",
      type: "string",
      description: 'Free-form text, e.g. "From $300 USD" or "Custom quote"',
    }),
    defineField({
      name: "priceEs",
      title: "Price (ES)",
      type: "string",
      description: 'e.g. "Desde $3,500 MXN" o "Cotización personalizada"',
    }),
    defineField({
      name: "duration",
      title: "Duration (EN)",
      type: "string",
      description: 'e.g. "2–3 weeks"',
    }),
    defineField({
      name: "durationEs",
      title: "Duration (ES)",
      type: "string",
      description: 'e.g. "2–3 semanas"',
    }),
    defineField({
      name: "isMostPopular",
      title: "Most Popular",
      type: "boolean",
      description: "Adds the highlighted styling and badge",
      initialValue: false,
    }),
    defineField({
      name: "mostPopularLabel",
      title: "Most Popular Label (EN)",
      type: "string",
      description: 'e.g. "Most Popular"',
    }),
    defineField({
      name: "mostPopularLabelEs",
      title: "Most Popular Label (ES)",
      type: "string",
      description: 'e.g. "Más popular"',
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [prospectBullet],
    }),
    defineField({ name: "ctaLabel", title: "CTA Label (EN)", type: "string" }),
    defineField({
      name: "ctaLabelEs",
      title: "CTA Label (ES)",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Href",
      type: "string",
      description: "Canonical path, e.g. /summon (locale resolved at runtime)",
      initialValue: "/summon",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline" },
  },
});

export const prospectOfferings = defineType({
  name: "prospectOfferings",
  title: "Prospect Offerings (Private)",
  type: "document",
  description:
    "Private pricing page for prospects. Not indexed, not linked from nav/footer. Accessible only by direct URL.",
  fields: [
    // Hero
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow (EN)",
      type: "string",
    }),
    defineField({
      name: "heroEyebrowEs",
      title: "Hero Eyebrow (ES)",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title (EN)",
      type: "string",
    }),
    defineField({
      name: "heroTitleEs",
      title: "Hero Title (ES)",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle (EN)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroSubtitleEs",
      title: "Hero Subtitle (ES)",
      type: "text",
      rows: 3,
    }),

    // Tiers
    defineField({
      name: "tiers",
      title: "Tiers",
      type: "array",
      validation: (rule) => rule.min(3).max(3),
      of: [prospectTier],
    }),

    // Pricing section
    defineField({
      name: "pricingSectionTitle",
      title: "Pricing Section Title (EN)",
      type: "string",
    }),
    defineField({
      name: "pricingSectionTitleEs",
      title: "Pricing Section Title (ES)",
      type: "string",
    }),
    defineField({
      name: "pricingSectionBody",
      title: "Pricing Section Body (EN)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "pricingSectionBodyEs",
      title: "Pricing Section Body (ES)",
      type: "array",
      of: [{ type: "block" }],
    }),

    // Final CTA
    defineField({
      name: "finalCtaTitle",
      title: "Final CTA Title (EN)",
      type: "string",
    }),
    defineField({
      name: "finalCtaTitleEs",
      title: "Final CTA Title (ES)",
      type: "string",
    }),
    defineField({
      name: "finalCtaSubtitle",
      title: "Final CTA Subtitle (EN)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "finalCtaSubtitleEs",
      title: "Final CTA Subtitle (ES)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "finalCtaButtonLabel",
      title: "Final CTA Button Label (EN)",
      type: "string",
    }),
    defineField({
      name: "finalCtaButtonLabelEs",
      title: "Final CTA Button Label (ES)",
      type: "string",
    }),
    defineField({
      name: "finalCtaButtonHref",
      title: "Final CTA Button Href",
      type: "string",
      initialValue: "/summon",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Prospect Offerings (Private)" };
    },
  },
});
