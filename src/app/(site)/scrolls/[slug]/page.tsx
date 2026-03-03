import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import { postBySlugQuery, postSlugsQuery } from "@/lib/queries";
import { PortableTextBody } from "@/components/portable-text-body";
import { GoldDivider } from "@/components/gold-divider";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { estimateReadingTime, formatDate, formatCategory } from "@/lib/utils";
import type { Post } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function ScrollPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.body || []);

  return (
    <>
      {/* Article header */}
      <article className="px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/scrolls"
            className="font-ui text-sm text-grimoire-muted hover:text-grimoire-gold transition-colors duration-200 mb-8 inline-block"
          >
            &larr; Back to Scrolls
          </Link>

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-ui text-xs text-grimoire-muted mb-4">
            {post.category && (
              <>
                <span className="text-grimoire-gold/70">
                  {formatCategory(post.category)}
                </span>
                <span>&middot;</span>
              </>
            )}
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span>&middot;</span>
            <span>{readingTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-grimoire-gold uppercase tracking-wide leading-tight">
            {post.title}
          </h1>

          {/* Excerpt / subtitle */}
          {post.excerpt && (
            <p className="mt-4 font-body text-lg italic text-grimoire-gold-light leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="mt-8 h-px bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>

          {/* Body */}
          <div className="mt-12">
            {post.body && post.body.length > 0 ? (
              <PortableTextBody value={post.body} />
            ) : (
              <p className="font-body text-lg text-grimoire-muted italic">
                Content coming soon.
              </p>
            )}
          </div>

          {/* Author attribution */}
          {post.author && (
            <div className="mt-16 pt-8 border-t border-grimoire-border">
              <div className="flex items-center gap-4">
                {post.author.photo && (
                  <Image
                    src={urlFor(post.author.photo).width(80).height(80).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-ui text-sm text-grimoire-text">
                    Written by{" "}
                    <span className="font-medium text-grimoire-gold">
                      {post.author.name}
                    </span>
                  </p>
                  {post.author.role && (
                    <p className="font-ui text-xs text-grimoire-muted">
                      {post.author.role} at Bruma Studio
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Related posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-16">
              <GoldDivider className="mb-12" />
              <h2 className="font-display text-xl text-grimoire-gold uppercase tracking-wide mb-8">
                Related Scrolls
              </h2>
              <div className="space-y-1">
                {post.relatedPosts.map((related) => (
                  <Link
                    key={related._id}
                    href={`/scrolls/${related.slug.current}`}
                    className="group block border-l-2 border-transparent hover:border-grimoire-gold pl-6 py-4 -ml-6 transition-colors duration-200"
                  >
                    <div className="flex flex-wrap items-center gap-x-2 font-ui text-xs text-grimoire-muted">
                      <time dateTime={related.publishedAt}>
                        {formatDate(related.publishedAt)}
                      </time>
                      {related.category && (
                        <>
                          <span>&middot;</span>
                          <span className="text-grimoire-gold/70">
                            {formatCategory(related.category)}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-1 font-display text-lg uppercase tracking-wide text-grimoire-text group-hover:text-grimoire-gold transition-colors duration-200">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="mt-1 font-body text-sm text-grimoire-text/70 line-clamp-1">
                        {related.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* Newsletter CTA */}
          <div className="mt-16">
            <GoldDivider className="mb-12" />
            <NewsletterSignup />
          </div>
        </div>
      </article>
    </>
  );
}
