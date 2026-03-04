import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/**
 * Hero text content with CSS-only staggered fade-in animation.
 * Server-rendered for optimal LCP — text is visible in initial HTML.
 * Respects prefers-reduced-motion via CSS media query.
 */
export async function HeroContent() {
  const t = await getTranslations("Home.hero");

  return (
    <>
      <h1 className="font-display text-5xl md:text-7xl text-grimoire-gold uppercase tracking-wide text-balance">
        {t("title")}
      </h1>

      <p
        className="hero-fade mt-4 font-body text-xl italic text-grimoire-gold-light"
        style={{ animationDelay: "100ms" }}
      >
        {t("tagline")}
      </p>

      <div
        className="hero-fade mt-6 h-px w-24 bg-grimoire-gold/40"
        style={{ animationDelay: "200ms" }}
      />

      <p
        className="hero-fade mt-8 max-w-lg font-body text-lg leading-relaxed text-grimoire-text"
        style={{ animationDelay: "300ms" }}
      >
        {t("body")}
      </p>

      <div
        className="hero-fade mt-10 flex flex-col items-center gap-4 sm:flex-row"
        style={{ animationDelay: "400ms" }}
      >
        <Link
          href="/summon"
          className="font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200"
        >
          {t("ctaPrimary")}
        </Link>
        <a
          href="#grimoire"
          className="font-ui text-sm font-medium uppercase tracking-wider border border-grimoire-gold text-grimoire-gold px-6 py-3 rounded-md hover:bg-grimoire-gold/10 active:scale-95 transition-all duration-200"
        >
          {t("ctaSecondary")}
        </a>
      </div>
    </>
  );
}
