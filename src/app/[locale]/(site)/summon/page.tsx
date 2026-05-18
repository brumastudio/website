import type { Metadata } from "next";
import { MapPin, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal";
import { client } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/queries";
import type { SiteSettings } from "@/lib/types";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Summon.meta" });
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        [locale]: `https://brumastudio.dev/${locale}/${locale === "en" ? "summon" : "invocar"}`,
        [otherLocale]: `https://brumastudio.dev/${otherLocale}/${otherLocale === "en" ? "summon" : "invocar"}`,
      },
    },
  };
}

const fallbackSettings: SiteSettings = {
  location: "Tijuana, MX — serving clients worldwide",
  locationEs: "Tijuana, MX — clientes en todo el mundo",
  responseTime: "Within 24 hours on business days",
  responseTimeEs: "Menos de 24 horas en días hábiles",
};

export default async function SummonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Summon");
  const sanitySettings = await client.fetch<SiteSettings | null>(siteSettingsQuery);
  const settings = sanitySettings || fallbackSettings;
  const isEs = locale === "es";

  const location = isEs
    ? settings.locationEs || fallbackSettings.locationEs!
    : settings.location || fallbackSettings.location!;

  const responseTime = isEs
    ? settings.responseTimeEs || fallbackSettings.responseTimeEs!
    : settings.responseTime || fallbackSettings.responseTime!;

  const contactInfo = [
    {
      icon: MapPin,
      labelKey: "basedIn" as const,
      value: location,
    },
    {
      icon: Clock,
      labelKey: "responseTime" as const,
      value: responseTime,
    },
  ];

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

      {/* Form + Contact Info */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl grid gap-16 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <ScrollReveal>
            <ContactForm />
          </ScrollReveal>

          {/* Sidebar */}
          <StaggerContainer className="space-y-10" stagger={0.1}>
            {contactInfo.map((item) => (
              <StaggerItem key={item.labelKey}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-grimoire-gold" />
                  <h3 className="font-ui text-sm font-medium uppercase tracking-wider text-grimoire-muted">
                    {t(`sidebar.${item.labelKey}`)}
                  </h3>
                </div>
                <p className="font-body text-base md:text-lg leading-relaxed text-grimoire-text">
                  {item.value}
                </p>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
