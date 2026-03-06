import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const SANITY_REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

// Map Sanity document types to the paths that need revalidation.
// Both locales are revalidated since content affects EN and ES pages.
const PATHS_BY_TYPE: Record<string, string[]> = {
  project: ["/en", "/es", "/en/grimoire", "/es/grimorio", "/sitemap.xml"],
  post: [
    "/en/scrolls",
    "/es/pergaminos",
    "/scrolls/feed.xml",
    "/sitemap.xml",
  ],
  service: ["/en", "/es", "/en/arts", "/es/artes"],
  author: ["/en/the-order", "/es/la-orden"],
  siteSettings: ["/en/summon", "/es/invocar"],
};

export async function POST(request: Request) {
  const secret = request.headers.get("x-sanity-secret");

  if (!SANITY_REVALIDATE_SECRET || secret !== SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { _type, slug } = body;

    const paths = PATHS_BY_TYPE[_type] || [];

    // For documents with slugs, also revalidate the detail pages
    if (slug?.current) {
      if (_type === "project") {
        paths.push(`/en/grimoire/${slug.current}`);
        paths.push(`/es/grimorio/${slug.current}`);
      } else if (_type === "post") {
        paths.push(`/en/scrolls/${slug.current}`);
        paths.push(`/es/pergaminos/${slug.current}`);
      }
    }

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      paths,
    });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
