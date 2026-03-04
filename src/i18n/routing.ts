import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/arts": {
      en: "/arts",
      es: "/artes",
    },
    "/grimoire": {
      en: "/grimoire",
      es: "/grimorio",
    },
    "/grimoire/[slug]": {
      en: "/grimoire/[slug]",
      es: "/grimorio/[slug]",
    },
    "/scrolls": {
      en: "/scrolls",
      es: "/pergaminos",
    },
    "/scrolls/[slug]": {
      en: "/scrolls/[slug]",
      es: "/pergaminos/[slug]",
    },
    "/the-order": {
      en: "/the-order",
      es: "/la-orden",
    },
    "/offerings": {
      en: "/offerings",
      es: "/ofrendas",
    },
    "/the-ritual": {
      en: "/the-ritual",
      es: "/el-ritual",
    },
    "/summon": {
      en: "/summon",
      es: "/invocar",
    },
    "/privacy": {
      en: "/privacy",
      es: "/privacidad",
    },
    "/terms": {
      en: "/terms",
      es: "/terminos",
    },
    "/cookies": {
      en: "/cookies",
      es: "/cookies",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
