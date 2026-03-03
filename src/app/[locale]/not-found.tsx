import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-4">
        {t("label")}
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide text-balance">
        {t("heading")}
      </h1>

      <div className="mt-6 h-px w-24 bg-grimoire-gold/40" />

      <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-grimoire-text">
        {t("body")}
      </p>

      <Link
        href="/"
        className="mt-10 inline-block font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200"
      >
        {t("cta")}
      </Link>
    </section>
  );
}
