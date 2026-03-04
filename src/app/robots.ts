import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/", "/vault"],
    },
    sitemap: "https://brumastudio.dev/sitemap.xml",
  };
}
