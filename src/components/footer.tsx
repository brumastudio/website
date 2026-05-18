import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { GoldDivider } from "@/components/gold-divider";

const footerLinks = [
  { href: "/arts" as const, key: "arts" },
  { href: "/offerings" as const, key: "offerings" },
  { href: "/the-ritual" as const, key: "theRitual" },
  { href: "/grimoire" as const, key: "grimoire" },
  { href: "/scrolls" as const, key: "scrolls" },
  { href: "/the-order" as const, key: "theOrder" },
  { href: "/summon" as const, key: "summon" },
];

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="px-6 pb-12 pt-0">
      <div className="mx-auto max-w-6xl">
        <GoldDivider className="my-16" />

        <div className="flex flex-col items-center text-center">
          {/* Wordmark */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl text-grimoire-gold uppercase">
              Bruma
            </span>
            <span className="font-display text-xs text-grimoire-text uppercase tracking-[0.3em]">
              Studio
            </span>
          </div>

          {/* Tagline */}
          <p className="mt-4 font-body text-sm italic text-grimoire-muted">
            {t("tagline")}
          </p>

          {/* Nav links */}
          <nav
            className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-ui text-sm text-grimoire-text/70"
            aria-label={t("footerNav")}
          >
            {footerLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-grimoire-muted" aria-hidden="true">
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  className="py-1 hover:text-grimoire-gold transition-colors duration-200"
                >
                  {t(link.key)}
                </Link>
              </span>
            ))}
          </nav>

          {/* Copyright */}
          <p className="mt-6 font-ui text-xs text-grimoire-muted">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>

          {/* Legal links */}
          <nav
            className="mt-3 flex items-center justify-center gap-x-2 font-ui text-xs text-grimoire-muted/60"
            aria-label={t("legalNav")}
          >
            <Link href="/privacy" className="hover:text-grimoire-gold transition-colors duration-200">
              {t("privacy")}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-grimoire-gold transition-colors duration-200">
              {t("terms")}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/cookies" className="hover:text-grimoire-gold transition-colors duration-200">
              {t("cookies")}
            </Link>
          </nav>

        </div>
      </div>
    </footer>
  );
}
