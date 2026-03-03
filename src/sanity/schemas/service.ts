import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: 'e.g. "The Core Discipline"',
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Used on homepage service preview cards",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide icon name (e.g. Code2, Database, PenTool)",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "What's included list",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
  },
});
