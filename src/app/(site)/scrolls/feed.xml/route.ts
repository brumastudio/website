import { client } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";
import type { Post } from "@/lib/types";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await client.fetch<Post[]>(allPostsQuery);
  const siteUrl = "https://brumastudio.dev";

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/scrolls/${post.slug.current}</link>
      <guid isPermaLink="true">${siteUrl}/scrolls/${post.slug.current}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ""}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bruma Studio — The Scrolls</title>
    <link>${siteUrl}/scrolls</link>
    <description>Technical insights, build logs, and lessons from the craft.</description>
    <language>en</language>
    <atom:link href="${siteUrl}/scrolls/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
