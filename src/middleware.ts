import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api (API routes)
    // - /studio (Sanity Studio)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /scrolls/feed.xml (RSS feed)
    // - Static files (with extensions)
    "/((?!api|studio|vault|_next|_vercel|scrolls/feed\\.xml|.*\\..*).*)",
  ],
};
