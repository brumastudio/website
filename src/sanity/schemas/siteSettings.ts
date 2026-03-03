import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "studioName",
      title: "Studio Name",
      type: "string",
      initialValue: "Bruma Studio",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Dark arts of digital craft.",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      initialValue: "hello@brumastudio.dev",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Tijuana, MX — serving clients worldwide",
    }),
    defineField({
      name: "responseTime",
      title: "Response Time",
      type: "string",
      initialValue: "Within 24 hours on business days",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "github", title: "GitHub", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "X / Twitter", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "behance", title: "Behance", type: "url" },
      ],
    }),
    defineField({
      name: "newsletterCTA",
      title: "Newsletter CTA Text",
      type: "text",
      rows: 2,
      initialValue:
        "Technical insights, project stories, and the occasional arcane discovery.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
