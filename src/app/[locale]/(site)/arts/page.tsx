import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Code2, Database, PenTool, type LucideIcon } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { SectionHeader } from "@/components/section-header";
import { GoldDivider } from "@/components/gold-divider";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { client } from "@/lib/sanity";
import { allServicesQuery } from "@/lib/queries";
import type { Service } from "@/lib/types";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Arts.meta" });
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        [locale]: `https://brumastudio.dev/${locale}/${locale === "en" ? "arts" : "artes"}`,
        [otherLocale]: `https://brumastudio.dev/${otherLocale}/${otherLocale === "en" ? "arts" : "artes"}`,
      },
    },
  };
}

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Database,
  PenTool,
};

export default async function ArtsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Arts");

  const sanityServices = await client.fetch<Service[]>(allServicesQuery);

  // Build fallback services from translations
  const fallbackServices: Service[] = [
    {
      _id: "fallback-1",
      title: t("fallback.webDev.title"),
      slug: { current: "web-development" },
      subtitle: t("fallback.webDev.subtitle"),
      icon: "Code2",
      features: t.raw("fallback.webDev.features") as string[],
      order: 1,
    },
    {
      _id: "fallback-2",
      title: t("fallback.cms.title"),
      slug: { current: "cms" },
      subtitle: t("fallback.cms.subtitle"),
      icon: "Database",
      features: t.raw("fallback.cms.features") as string[],
      order: 2,
    },
    {
      _id: "fallback-3",
      title: t("fallback.design.title"),
      slug: { current: "design" },
      subtitle: t("fallback.design.subtitle"),
      icon: "PenTool",
      features: t.raw("fallback.design.features") as string[],
      order: 3,
    },
  ];

  const fallbackBodies: Record<string, string[]> = {
    [t("fallback.webDev.title")]: [
      t("fallback.webDev.body1"),
      t("fallback.webDev.body2"),
    ],
    [t("fallback.cms.title")]: [
      t("fallback.cms.body1"),
      t("fallback.cms.body2"),
    ],
    [t("fallback.design.title")]: [
      t("fallback.design.body1"),
      t("fallback.design.body2"),
    ],
  };

  const services =
    sanityServices && sanityServices.length > 0
      ? sanityServices
      : fallbackServices;

  const processStepKeys = ["discovery", "design", "development", "delivery"] as const;

  return (
    <>
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

      {/* Service Sections */}
      {services.map((service, i) => {
        const Icon = iconMap[service.icon || ""] || Code2;
        const anchorId = service.slug?.current || service.title.toLowerCase().replace(/\s+/g, "-");

        return (
          <section
            key={service._id}
            id={anchorId}
            className="px-6 py-24 md:py-32 scroll-mt-24"
          >
            <div className="mx-auto max-w-6xl">
              {i > 0 && <GoldDivider className="mb-16 mt-0" />}

              <ScrollReveal>
                <div className="flex items-start gap-4 mb-8">
                  <Icon className="h-8 w-8 text-grimoire-gold shrink-0 mt-1" />
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold uppercase tracking-wide">
                      {service.title}
                    </h2>
                    {service.subtitle && (
                      <p className="mt-1 font-body text-lg italic text-grimoire-gold-light">
                        {service.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="max-w-3xl space-y-4">
                  {service.body && service.body.length > 0 ? (
                    <div className="prose-grimoire">
                      <PortableText
                        value={service.body}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="font-body text-base md:text-lg leading-relaxed text-grimoire-text mb-4">
                                {children}
                              </p>
                            ),
                          },
                        }}
                      />
                    </div>
                  ) : (
                    fallbackBodies[service.title]?.map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-body text-base md:text-lg leading-relaxed text-grimoire-text"
                      >
                        {paragraph}
                      </p>
                    ))
                  )}
                </div>
              </ScrollReveal>

              {service.features && service.features.length > 0 && (
                <StaggerContainer className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 max-w-3xl">
                  {service.features.map((feature) => (
                    <StaggerItem key={feature}>
                      <p className="font-ui text-sm text-grimoire-text/80 before:content-['·'] before:mr-2 before:text-grimoire-gold">
                        {feature}
                      </p>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </div>
          </section>
        );
      })}

      {/* Process: The Ritual */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionHeader
              heading={t("process.heading")}
              subheading={t("process.subheading")}
            />
          </ScrollReveal>

          <StaggerContainer className="relative ml-4 mt-12 border-l border-grimoire-gold/30 pl-10 md:ml-8 md:pl-14 space-y-16" stagger={0.15}>
            {processStepKeys.map((key) => (
              <StaggerItem key={key}>
                <div className="relative">
                  <div className="absolute -left-[calc(2.5rem+5.5px)] top-2 h-2.5 w-2.5 rotate-45 bg-grimoire-gold md:-left-[calc(3.5rem+5.5px)]" />
                  <span className="font-display text-4xl text-grimoire-gold/40">
                    {t(`process.steps.${key}.number`)}
                  </span>
                  <h3 className="mt-1 font-ui text-sm font-medium uppercase tracking-wider text-grimoire-text">
                    {t(`process.steps.${key}.title`)}
                  </h3>
                  <p className="mt-2 max-w-lg font-body text-base md:text-lg leading-relaxed text-grimoire-text/80">
                    {t(`process.steps.${key}.body`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
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
