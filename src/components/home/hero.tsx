import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Hero() {
  const t = await getTranslations("Home.hero");

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Wordmark */}
      <h1 className="font-display text-5xl md:text-7xl text-grimoire-gold uppercase tracking-wide">
        {t("title")}
      </h1>

      {/* Tagline */}
      <p className="mt-4 font-body text-xl italic text-grimoire-gold-light">
        {t("tagline")}
      </p>

      {/* Gold rule */}
      <div className="mt-6 h-px w-24 bg-grimoire-gold/40" />

      {/* Body */}
      <p className="mt-8 max-w-lg font-body text-lg leading-relaxed text-grimoire-text">
        {t("body")}
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/summon"
          className="font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light transition-colors duration-200"
        >
          {t("ctaPrimary")}
        </Link>
        <a
          href="#grimoire"
          className="font-ui text-sm font-medium uppercase tracking-wider border border-grimoire-gold text-grimoire-gold px-6 py-3 rounded-md hover:bg-grimoire-gold/10 transition-colors duration-200"
        >
          {t("ctaSecondary")}
        </a>
      </div>
    </section>
  );
}
