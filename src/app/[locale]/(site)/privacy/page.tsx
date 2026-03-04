import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy.meta" });
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        [locale]: `https://brumastudio.dev/${locale}/${locale === "en" ? "privacy" : "privacidad"}`,
        [otherLocale]: `https://brumastudio.dev/${otherLocale}/${otherLocale === "en" ? "privacy" : "privacidad"}`,
      },
    },
  };
}

const sectionKeys = [
  "intro",
  "dataCollected",
  "howUsed",
  "sharing",
  "cookies",
  "retention",
  "rights",
  "security",
  "children",
  "changes",
  "contact",
] as const;

const sectionsWithItems = ["dataCollected", "howUsed", "sharing", "rights"] as const;

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Privacy");

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            {t("hero.label")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide text-balance">
            {t("hero.heading")}
          </h1>
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          <p className="mt-6 font-ui text-sm text-grimoire-muted">
            {t("lastUpdated")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl space-y-12">
          {sectionKeys.map((key) => (
            <div key={key}>
              <h2 className="font-display text-xl text-grimoire-gold uppercase tracking-wide mb-4">
                {t(`sections.${key}.heading`)}
              </h2>
              <p className="font-body text-base leading-relaxed text-grimoire-text">
                {t(`sections.${key}.body`)}
              </p>
              {(sectionsWithItems as readonly string[]).includes(key) && (
                <ul className="mt-4 space-y-2">
                  {(t.raw(`sections.${key}.items`) as string[]).map((item, i) => (
                    <li
                      key={i}
                      className="font-body text-sm leading-relaxed text-grimoire-text/80 pl-4 border-l border-grimoire-gold/20"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {key === "cookies" && (
                <p className="mt-2">
                  <Link
                    href="/cookies"
                    className="font-body text-sm text-grimoire-gold hover:text-grimoire-gold-light transition-colors"
                  >
                    {locale === "en" ? "View Cookie Policy →" : "Ver Política de Cookies →"}
                  </Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
