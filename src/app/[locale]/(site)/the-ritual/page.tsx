import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TheRitual.meta" });
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        [locale]: `https://brumastudio.dev/${locale}/${locale === "en" ? "the-ritual" : "el-ritual"}`,
        [otherLocale]: `https://brumastudio.dev/${otherLocale}/${otherLocale === "en" ? "the-ritual" : "el-ritual"}`,
      },
    },
  };
}

const phaseKeys = ["discovery", "design", "development", "delivery"] as const;

export default async function TheRitualPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("TheRitual");

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

      {/* Timeline */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <StaggerContainer
            className="relative ml-4 border-l border-grimoire-gold/30 pl-10 md:ml-8 md:pl-14 space-y-20"
            stagger={0.15}
          >
            {phaseKeys.map((key) => {
              const deliverables = t.raw(`phases.${key}.deliverables`) as string[];

              return (
                <StaggerItem key={key}>
                  <div className="relative">
                    {/* Gold diamond marker */}
                    <div className="absolute -left-[calc(2.5rem+5.5px)] top-2 h-2.5 w-2.5 rotate-45 bg-grimoire-gold md:-left-[calc(3.5rem+5.5px)]" />

                    {/* Phase number watermark */}
                    <span className="font-display text-6xl text-grimoire-gold/20 select-none">
                      {t(`phases.${key}.number`)}
                    </span>

                    {/* Title + timeline badge */}
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <h2 className="font-ui text-sm font-medium uppercase tracking-wider text-grimoire-text">
                        {t(`phases.${key}.title`)}
                      </h2>
                      <span className="inline-block rounded-full border border-grimoire-gold/30 px-3 py-0.5 font-ui text-xs text-grimoire-gold">
                        {t(`phases.${key}.timeline`)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-3 max-w-xl font-body text-base md:text-lg leading-relaxed text-grimoire-text/80">
                      {t(`phases.${key}.body`)}
                    </p>

                    {/* Deliverables checklist */}
                    <ul className="mt-5 space-y-2.5">
                      {deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-grimoire-gold shrink-0 mt-0.5" />
                          <span className="font-body text-base leading-relaxed text-grimoire-text/80">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
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
