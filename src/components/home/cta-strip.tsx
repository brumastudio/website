import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BackgroundGlow } from "@/components/background-glow";
import { ScrollReveal } from "@/components/scroll-reveal";

export async function CtaStrip() {
  const t = await getTranslations("Home.ctaStrip");

  return (
    <section className="relative border-t border-grimoire-gold/20 bg-grimoire-surface px-6 py-24 md:py-32 overflow-hidden">
      <BackgroundGlow color="gold" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide text-balance">
          {t("heading")}
        </h2>
        <p className="mt-6 font-body text-lg leading-relaxed text-grimoire-text">
          {t("body")}
        </p>
        <Link
          href="/summon"
          className="mt-8 inline-block font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200"
        >
          {t("cta")}
        </Link>
      </ScrollReveal>
    </section>
  );
}
