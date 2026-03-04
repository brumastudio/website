import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cookies.meta" });
  const otherLocale = locale === "en" ? "es" : "en";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        [locale]: `https://brumastudio.dev/${locale}/cookies`,
        [otherLocale]: `https://brumastudio.dev/${otherLocale}/cookies`,
      },
    },
  };
}

const sectionKeys = [
  "intro",
  "howWeUse",
  "types",
  "thirdParty",
  "managing",
  "changes",
  "contact",
] as const;

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Cookies");

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
          {sectionKeys.map((key) => {
            if (key === "types") {
              return (
                <div key={key}>
                  <h2 className="font-display text-xl text-grimoire-gold uppercase tracking-wide mb-4">
                    {t("sections.types.heading")}
                  </h2>

                  {/* Essential cookies */}
                  <div className="mb-6">
                    <h3 className="font-ui text-sm font-medium text-grimoire-text uppercase tracking-wider mb-3">
                      {t("sections.types.essential.heading")}
                    </h3>
                    <p className="font-body text-base leading-relaxed text-grimoire-text">
                      {t("sections.types.essential.body")}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {(t.raw("sections.types.essential.items") as string[]).map((item, i) => (
                        <li
                          key={i}
                          className="font-body text-sm leading-relaxed text-grimoire-text/80 pl-4 border-l border-grimoire-gold/20"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Analytics */}
                  <div>
                    <h3 className="font-ui text-sm font-medium text-grimoire-text uppercase tracking-wider mb-3">
                      {t("sections.types.analytics.heading")}
                    </h3>
                    <p className="font-body text-base leading-relaxed text-grimoire-text">
                      {t("sections.types.analytics.body")}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div key={key}>
                <h2 className="font-display text-xl text-grimoire-gold uppercase tracking-wide mb-4">
                  {t(`sections.${key}.heading`)}
                </h2>
                <p className="font-body text-base leading-relaxed text-grimoire-text">
                  {t(`sections.${key}.body`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
