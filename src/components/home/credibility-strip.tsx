import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";

export async function CredibilityStrip() {
  const t = await getTranslations("Home.credibilityStrip");

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide text-balance">
            {t("heading")}
          </h2>

          <div className="mt-4 mx-auto h-px w-24 bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-8 font-body text-lg leading-relaxed text-grimoire-text">
            {t("body1")}
          </p>
          <p className="mt-4 font-body text-lg leading-relaxed text-grimoire-text">
            {t("body2")}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-8 font-ui text-sm text-grimoire-muted">
            {t("techStack")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
