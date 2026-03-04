import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { client, urlFor } from "@/lib/sanity";
import { postBySlugQuery, postSlugsQuery } from "@/lib/queries";
import { PortableTextBody } from "@/components/portable-text-body";
import { FadeImage } from "@/components/fade-image";
import { GoldDivider } from "@/components/gold-divider";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ScrollReveal } from "@/components/scroll-reveal";
import { estimateReadingTime, formatDate, formatCategory } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import type { Post } from "@/lib/types";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postSlugsQuery);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
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
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ScrollsPost");
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
            {t("backLink")}
          </Link>

          <ScrollReveal>
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
                {formatDate(post.publishedAt, locale)}
              </time>
              <span>&middot;</span>
              <span>{t("minRead", { minutes: readingTime })}</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-grimoire-gold uppercase tracking-wide leading-tight text-balance">
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
          </ScrollReveal>

          {/* Body */}
          <div className="mt-12">
            {post.body && post.body.length > 0 ? (
              <PortableTextBody value={post.body} />
            ) : (
              <p className="font-body text-lg text-grimoire-muted italic">
                {t("contentComingSoon")}
              </p>
            )}
          </div>

          {/* Author attribution */}
          {post.author && (
            <div className="mt-16 pt-8 border-t border-grimoire-border">
              <div className="flex items-center gap-4">
                {post.author.photo && (
                  <FadeImage
                    src={urlFor(post.author.photo).width(80).height(80).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-ui text-sm text-grimoire-text">
                    {t("writtenBy")}{" "}
                    <span className="font-medium text-grimoire-gold">
                      {post.author.name}
                    </span>
                  </p>
                  {post.author.role && (
                    <p className="font-ui text-xs text-grimoire-muted">
                      {t("atStudio", { role: post.author.role })}
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
                {t("relatedScrolls")}
              </h2>
              <div className="space-y-1">
                {post.relatedPosts.map((related) => (
                  <Link
                    key={related._id}
                    href={{ pathname: "/scrolls/[slug]", params: { slug: related.slug.current } }}
                    className="group block border-l-2 border-transparent hover:border-grimoire-gold pl-6 py-4 -ml-6 transition-colors duration-200"
                  >
                    <div className="flex flex-wrap items-center gap-x-2 font-ui text-xs text-grimoire-muted">
                      <time dateTime={related.publishedAt}>
                        {formatDate(related.publishedAt, locale)}
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
