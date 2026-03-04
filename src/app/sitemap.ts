import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity";
import { projectSlugsQuery, postSlugsQuery } from "@/lib/queries";

const BASE_URL = "https://brumastudio.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, postSlugs] = await Promise.all([
    client.fetch<string[]>(projectSlugsQuery),
    client.fetch<string[]>(postSlugsQuery),
  ]);

  const staticPages = [
    "",
    "/arts",
    "/grimoire",
    "/scrolls",
    "/the-order",
    "/offerings",
    "/the-ritual",
    "/summon",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const locales = ["en", "es"];
  const localePathMap: Record<string, Record<string, string>> = {
    "": { en: "", es: "" },
    "/arts": { en: "/arts", es: "/artes" },
    "/grimoire": { en: "/grimoire", es: "/grimorio" },
    "/scrolls": { en: "/scrolls", es: "/pergaminos" },
    "/the-order": { en: "/the-order", es: "/la-orden" },
    "/offerings": { en: "/offerings", es: "/ofrendas" },
    "/the-ritual": { en: "/the-ritual", es: "/el-ritual" },
    "/summon": { en: "/summon", es: "/invocar" },
    "/privacy": { en: "/privacy", es: "/privacidad" },
    "/terms": { en: "/terms", es: "/terminos" },
    "/cookies": { en: "/cookies", es: "/cookies" },
  };

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const page of staticPages) {
    for (const locale of locales) {
      const path = localePathMap[page][locale];
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${localePathMap[page].en}`,
            es: `${BASE_URL}/es${localePathMap[page].es}`,
          },
        },
      });
    }
  }

  // Project pages
  for (const slug of projectSlugs) {
    for (const locale of locales) {
      const prefix = locale === "en" ? "grimoire" : "grimorio";
      entries.push({
        url: `${BASE_URL}/${locale}/${prefix}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/grimoire/${slug}`,
            es: `${BASE_URL}/es/grimorio/${slug}`,
          },
        },
      });
    }
  }

  // Blog posts
  for (const slug of postSlugs) {
    for (const locale of locales) {
      const prefix = locale === "en" ? "scrolls" : "pergaminos";
      entries.push({
        url: `${BASE_URL}/${locale}/${prefix}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/scrolls/${slug}`,
            es: `${BASE_URL}/es/pergaminos/${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
