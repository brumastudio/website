import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Check, Clock } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { FaqAccordion } from "@/components/faq-accordion";
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

const tierKeys = ["parchment", "tome", "codex"] as const;

export default async function OfferingsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Offerings");

  const faqItems = t.raw("faq.items") as { question: string; answer: string }[];

  // Schema.org FAQPage structured data
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <ScrollReveal className="mx-auto max-w-6xl">
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            {t("hero.label")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide text-balance">
            {t("hero.heading")}
          </h1>
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-grimoire-text">
            {t("hero.body")}
          </p>
        </ScrollReveal>
      </section>

      {/* Tier Cards */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <StaggerContainer className="grid gap-8 md:grid-cols-3" stagger={0.1}>
            {tierKeys.map((key) => {
              const isFeatured = key === "tome";
              const scope = t.raw(`tiers.${key}.scope`) as string[];

              return (
                <StaggerItem
                  key={key}
                  className={cn(
                    "relative flex flex-col rounded-lg bg-grimoire-surface p-8 transition-all duration-300",
                    isFeatured
                      ? "border-2 border-grimoire-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.08)] md:scale-[1.02] order-first md:order-none"
                      : "border border-grimoire-border hover:border-grimoire-gold/30"
                  )}
                >
                  {/* Badge */}
                  {isFeatured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-block bg-grimoire-gold text-grimoire-bg font-ui text-xs font-semibold uppercase tracking-wider px-4 py-1 rounded-full">
                        {t("tiers.tome.badge")}
                      </span>
                    </div>
                  )}

                  {/* Name & subtitle */}
                  <h3 className="font-display text-2xl text-grimoire-gold uppercase tracking-wide">
                    {t(`tiers.${key}.name`)}
                  </h3>
                  <p className="mt-1 font-body text-base italic text-grimoire-text/70">
                    {t(`tiers.${key}.subtitle`)}
                  </p>

                  {/* Scope list */}
                  <ul className="mt-6 flex-1 space-y-3">
                    {scope.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-grimoire-gold shrink-0 mt-0.5" />
                        <span className="font-body text-sm leading-relaxed text-grimoire-text/80">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Timeline */}
                  <div className="mt-6 flex items-center gap-2 text-grimoire-muted">
                    <Clock className="h-4 w-4" />
                    <span className="font-ui text-sm">
                      {t(`tiers.${key}.timeline`)}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/summon"
                    className={cn(
                      "mt-6 block text-center font-ui text-sm font-medium uppercase tracking-wider px-6 py-3 rounded-md active:scale-95 transition-all duration-200",
                      isFeatured
                        ? "bg-grimoire-gold text-grimoire-bg hover:bg-grimoire-gold-light"
                        : "border border-grimoire-gold text-grimoire-gold hover:bg-grimoire-gold/10"
                    )}
                  >
                    {t(`tiers.${key}.cta`)}
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <SectionHeader
              heading={t("howItWorks.heading")}
              centered
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-8 font-body text-lg leading-relaxed text-grimoire-text text-center">
              {t("howItWorks.body")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <SectionHeader
              heading={t("faq.heading")}
              centered
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-8">
              <FaqAccordion items={faqItems} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="border-t border-grimoire-gold/20 bg-grimoire-surface px-6 py-24 md:py-32">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
            {t("cta.heading")}
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-grimoire-text">
            {t("cta.body")}
          </p>
          <Link
            href="/summon"
            className="mt-8 inline-block font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200"
          >
            {t("cta.button")}
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
