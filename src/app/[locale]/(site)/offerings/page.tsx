import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Check, Clock } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { PortableTextBody } from "@/components/portable-text-body";
import { client } from "@/lib/sanity";
import { prospectOfferingsQuery } from "@/lib/queries";
import type { ProspectOfferings, ProspectTier } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Offerings.meta" });
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        [locale]: `https://brumastudio.dev/${locale}/${locale === "en" ? "offerings" : "ofrendas"}`,
        [otherLocale]: `https://brumastudio.dev/${otherLocale}/${otherLocale === "en" ? "offerings" : "ofrendas"}`,
      },
    },
  };
}

type Locale = "en" | "es";

function pick<T>(en: T | undefined, es: T | undefined, locale: Locale): T | undefined {
  return locale === "es" ? es ?? en : en;
}

function tierField(tier: ProspectTier, key: keyof ProspectTier, locale: Locale): string | undefined {
  if (locale === "es") {
    const esKey = `${String(key)}Es` as keyof ProspectTier;
    return (tier[esKey] as string | undefined) ?? (tier[key] as string | undefined);
  }
  return tier[key] as string | undefined;
}

export default async function OfferingsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (localeParam === "es" ? "es" : "en") as Locale;
  setRequestLocale(localeParam);

  const data = await client.fetch<ProspectOfferings | null>(prospectOfferingsQuery);

  if (!data) {
    return (
      <section className="px-6 pt-32 pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-grimoire-muted">
            Content not yet configured.
          </p>
        </div>
      </section>
    );
  }

  const eyebrow = pick(data.heroEyebrow, data.heroEyebrowEs, locale);
  const heroTitle = pick(data.heroTitle, data.heroTitleEs, locale);
  const heroSubtitle = pick(data.heroSubtitle, data.heroSubtitleEs, locale);
  const pricingTitle = pick(data.pricingSectionTitle, data.pricingSectionTitleEs, locale);
  const pricingBody = pick(data.pricingSectionBody, data.pricingSectionBodyEs, locale);
  const ctaTitle = pick(data.finalCtaTitle, data.finalCtaTitleEs, locale);
  const ctaSubtitle = pick(data.finalCtaSubtitle, data.finalCtaSubtitleEs, locale);
  const ctaButton = pick(data.finalCtaButtonLabel, data.finalCtaButtonLabelEs, locale);
  const ctaHref = (data.finalCtaButtonHref || "/summon") as "/summon";

  const tiers = data.tiers || [];

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <ScrollReveal className="mx-auto max-w-6xl">
          {eyebrow && (
            <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
              {eyebrow}
            </p>
          )}
          {heroTitle && (
            <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide text-balance">
              {heroTitle}
            </h1>
          )}
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          {heroSubtitle && (
            <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-grimoire-text">
              {heroSubtitle}
            </p>
          )}
        </ScrollReveal>
      </section>

      {/* Tier Cards — no prices on the public page */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <StaggerContainer className="grid gap-8 md:grid-cols-3 items-stretch" stagger={0.1}>
            {tiers.map((tier, idx) => {
              const isFeatured = !!tier.isMostPopular;
              const name = tierField(tier, "name", locale);
              const tagline = tierField(tier, "tagline", locale);
              const duration = tierField(tier, "duration", locale);
              const popularLabel = tierField(tier, "mostPopularLabel", locale);
              const ctaLabel = tierField(tier, "ctaLabel", locale);
              const tierHref = (tier.ctaHref || "/summon") as "/summon";
              const bullets = tier.bullets || [];

              return (
                <StaggerItem
                  key={idx}
                  className={cn(
                    "relative flex flex-col rounded-lg bg-grimoire-surface p-8 transition-all duration-300",
                    isFeatured
                      ? "border-2 border-grimoire-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.08)] md:scale-[1.02] order-first md:order-none"
                      : "border border-grimoire-border hover:border-grimoire-gold/30"
                  )}
                >
                  {isFeatured && popularLabel && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-block bg-grimoire-gold text-grimoire-bg font-ui text-xs font-semibold uppercase tracking-wider px-4 py-1 rounded-full">
                        {popularLabel}
                      </span>
                    </div>
                  )}

                  {name && (
                    <h3 className="font-display text-2xl text-grimoire-gold uppercase tracking-wide">
                      {name}
                    </h3>
                  )}
                  {tagline && (
                    <p className="mt-1 font-body text-base italic text-grimoire-text/70">
                      {tagline}
                    </p>
                  )}

                  {/* Bullets */}
                  <ul className="mt-6 flex-1 space-y-4">
                    {bullets.map((bullet, i) => {
                      const bTitle =
                        locale === "es"
                          ? bullet.titleEs ?? bullet.title
                          : bullet.title;
                      const bDesc =
                        locale === "es"
                          ? bullet.descriptionEs ?? bullet.description
                          : bullet.description;
                      return (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-grimoire-gold shrink-0 mt-1" />
                          <div className="flex-1">
                            {bTitle && (
                              <p className="font-ui text-xs font-semibold uppercase tracking-wider text-grimoire-text">
                                {bTitle}
                              </p>
                            )}
                            {bDesc && (
                              <p className="mt-1 font-body text-sm leading-relaxed text-grimoire-text/75">
                                {bDesc}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Duration */}
                  {duration && (
                    <div className="mt-6 flex items-center gap-2 text-grimoire-muted">
                      <Clock className="h-4 w-4" />
                      <span className="font-ui text-sm">{duration}</span>
                    </div>
                  )}

                  {/* CTA */}
                  {ctaLabel && (
                    <Link
                      href={tierHref}
                      className={cn(
                        "mt-6 block text-center font-ui text-sm font-medium uppercase tracking-wider px-6 py-3 rounded-md active:scale-95 transition-all duration-200",
                        isFeatured
                          ? "bg-grimoire-gold text-grimoire-bg hover:bg-grimoire-gold-light"
                          : "border border-grimoire-gold text-grimoire-gold hover:bg-grimoire-gold/10"
                      )}
                    >
                      {ctaLabel}
                    </Link>
                  )}
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* How Pricing Works */}
      {(pricingTitle || pricingBody?.length) && (
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            {pricingTitle && (
              <ScrollReveal>
                <SectionHeader heading={pricingTitle} centered />
              </ScrollReveal>
            )}
            {pricingBody?.length ? (
              <ScrollReveal delay={0.1}>
                <div className="mt-8">
                  <PortableTextBody value={pricingBody} />
                </div>
              </ScrollReveal>
            ) : null}
          </div>
        </section>
      )}

      {/* Final CTA */}
      {(ctaTitle || ctaSubtitle || ctaButton) && (
        <section className="border-t border-grimoire-gold/20 bg-grimoire-surface px-6 py-24 md:py-32">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            {ctaTitle && (
              <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
                {ctaTitle}
              </h2>
            )}
            {ctaSubtitle && (
              <p className="mt-6 font-body text-lg leading-relaxed text-grimoire-text">
                {ctaSubtitle}
              </p>
            )}
            {ctaButton && (
              <Link
                href={ctaHref}
                className="mt-8 inline-block font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200"
              >
                {ctaButton}
              </Link>
            )}
          </ScrollReveal>
        </section>
      )}
    </>
  );
}
