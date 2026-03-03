import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { allPostsQuery } from "@/lib/queries";
import { estimateReadingTime, formatDate, formatCategory } from "@/lib/utils";
import type { Post } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical insights, build logs, and lessons from the craft. Notes from the workshop floor.",
  alternates: {
    types: {
      "application/rss+xml": "/scrolls/feed.xml",
    },
  },
};

export default async function ScrollsPage() {
  const posts = await client.fetch<Post[]>(allPostsQuery);

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            The Scrolls
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide">
            Codex
          </h1>
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          <p className="mt-8 font-body text-lg leading-relaxed text-grimoire-text">
            Technical insights, build logs, and lessons from the craft. Notes
            from the workshop floor.
          </p>
        </div>
      </section>

      {/* Post list */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl">
          {posts.length > 0 ? (
            <div className="space-y-1">
              {posts.map((post) => {
                const readingTime = estimateReadingTime(post.body || []);

                return (
                  <Link
                    key={post._id}
                    href={`/scrolls/${post.slug.current}`}
                    className="group block border-l-2 border-transparent hover:border-grimoire-gold pl-6 py-6 -ml-6 transition-colors duration-200"
                  >
                    {/* Meta line */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-ui text-xs text-grimoire-muted">
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      <span>&middot;</span>
                      <span>{readingTime} min read</span>
                      {post.category && (
                        <>
                          <span>&middot;</span>
                          <span className="text-grimoire-gold/70">
                            {formatCategory(post.category)}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="mt-2 font-display text-xl md:text-2xl uppercase tracking-wide text-grimoire-text group-hover:text-grimoire-gold transition-colors duration-200">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-2 font-body text-base md:text-lg leading-relaxed text-grimoire-text/70 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-grimoire-surface border border-grimoire-border text-grimoire-muted font-ui text-xs px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-body text-lg text-grimoire-muted italic">
                The first scroll is being written. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
