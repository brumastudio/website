import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function CtaStrip() {
  const t = await getTranslations("Home.ctaStrip");

  return (
    <section className="border-t border-grimoire-gold/20 bg-grimoire-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
          {t("heading")}
        </h2>
        <p className="mt-6 font-body text-lg leading-relaxed text-grimoire-text">
          {t("body")}
        </p>
        <Link
          href="/summon"
          className="mt-8 inline-block font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light transition-colors duration-200"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
