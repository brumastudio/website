import type { Metadata } from "next";
import { FadeImage } from "@/components/fade-image";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { client, urlFor } from "@/lib/sanity";
import { allAuthorsQuery } from "@/lib/queries";
import { GoldDivider } from "@/components/gold-divider";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import type { Author } from "@/lib/types";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TheOrder.meta" });
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        [locale]: `https://brumastudio.dev/${locale}/${locale === "en" ? "the-order" : "la-orden"}`,
        [otherLocale]: `https://brumastudio.dev/${otherLocale}/${otherLocale === "en" ? "the-order" : "la-orden"}`,
      },
    },
  };
}

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

const valueKeys = ["craft", "clarity", "bilingual", "small"] as const;

export default async function TheOrderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("TheOrder");
  const tc = await getTranslations("Content");
  const rawAuthors = await client.fetch<Author[]>(allAuthorsQuery);

  // Overlay translated roles on author data
  const authors = rawAuthors.map((author) => {
    const slug = author.slug?.current || "";
    return {
      ...author,
      role: tc.has(`authors.${slug}`) ? tc(`authors.${slug}`) : author.role,
    };
  });

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <ScrollReveal className="mx-auto max-w-3xl">
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            {t("hero.label")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide text-balance">
            {t("hero.heading")}
          </h1>
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          <p className="mt-8 font-body text-lg leading-relaxed text-grimoire-text">
            {t("hero.body")}
          </p>
        </ScrollReveal>
      </section>

      {/* Origins */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold uppercase tracking-wide mb-8">
              {t("origins.heading")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="space-y-6 font-body text-base md:text-lg leading-relaxed text-grimoire-text">
              <p>{t("origins.body1")}</p>
              <p>{t("origins.body2")}</p>
              <p>{t("origins.body3")}</p>
              <p className="text-grimoire-gold-light italic">
                {t("origins.body4")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Team */}
      {authors.length > 0 && (
        <section className="px-6 pb-24 md:pb-32">
          <div className="mx-auto max-w-4xl">
            <GoldDivider className="mb-16" />
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold uppercase tracking-wide text-center mb-12">
                {t("team.heading")}
              </h2>
            </ScrollReveal>

            <StaggerContainer
              className={`grid gap-8 ${
                authors.length === 1
                  ? "max-w-md mx-auto"
                  : authors.length === 2
                    ? "md:grid-cols-2 max-w-2xl mx-auto"
                    : "md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {authors.map((author) => (
                <StaggerItem key={author._id}>
                <div
                  className="bg-grimoire-surface border border-grimoire-border rounded-lg p-6 md:p-8 text-center h-full shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                >
                  {/* Photo or initials */}
                  {author.photo ? (
                    <FadeImage
                      src={urlFor(author.photo).width(160).height(160).url()}
                      alt={author.name}
                      width={80}
                      height={80}
                      className="mx-auto rounded-full mb-4"
                    />
                  ) : (
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-grimoire-gold bg-grimoire-bg">
                      <span className="font-display text-2xl text-grimoire-gold">
                        {author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}

                  <h3 className="font-display text-lg uppercase tracking-wide text-grimoire-gold">
                    {author.name}
                  </h3>

                  {author.role && (
                    <p className="mt-1 font-ui text-sm text-grimoire-muted">
                      {author.role}
                    </p>
                  )}

                  {author.bio && author.bio.length > 0 && (
                    <div className="mt-4 font-body text-base leading-relaxed text-grimoire-text/80">
                      {author.bio
                        .filter((block) => block._type === "block")
                        .map((block, i) => (
                          <p key={i}>
                            {(block.children || [])
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              .map((child: any) => child.text || "")
                              .join("")}
                          </p>
                        ))}
                    </div>
                  )}

                  {/* Social links */}
                  {author.socialLinks && (
                    <div className="mt-4 flex items-center justify-center gap-1">
                      {(
                        Object.entries(author.socialLinks) as [
                          keyof typeof socialIcons,
                          string | undefined,
                        ][]
                      )
                        .filter(([key, url]) => url && key in socialIcons)
                        .map(([key, url]) => {
                          const Icon = socialIcons[key];
                          return (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={key}
                              className="flex items-center justify-center w-10 h-10 rounded-md text-grimoire-muted hover:text-grimoire-gold transition-colors duration-200"
                            >
                              <Icon className="h-4 w-4" />
                            </a>
                          );
                        })}
                    </div>
                  )}
                </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Values */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <GoldDivider className="mb-16" />
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold uppercase tracking-wide text-center mb-12">
              {t("values.heading")}
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid gap-8 sm:grid-cols-2">
            {valueKeys.map((key) => (
              <StaggerItem key={key}>
                <h3 className="font-display text-base uppercase tracking-wide text-grimoire-gold">
                  {t(`values.${key}.title`)}
                </h3>
                <p className="mt-2 font-body text-base md:text-lg leading-relaxed text-grimoire-text/80">
                  {t(`values.${key}.body`)}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
