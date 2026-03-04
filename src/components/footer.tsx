import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { GoldDivider } from "@/components/gold-divider";

const footerLinks = [
  { href: "/arts" as const, key: "arts" },
  { href: "/grimoire" as const, key: "grimoire" },
  { href: "/scrolls" as const, key: "scrolls" },
  { href: "/the-order" as const, key: "theOrder" },
  { href: "/offerings" as const, key: "offerings" },
  { href: "/summon" as const, key: "summon" },
];

const socialLinks = [
  { href: "https://github.com/brumastudio", label: "GitHub", icon: Github },
  { href: "https://x.com/brumastudio", label: "X", icon: Twitter },
  { href: "https://linkedin.com/company/brumastudio", label: "LinkedIn", icon: Linkedin },
  { href: "https://instagram.com/brumastudio", label: "Instagram", icon: Instagram },
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

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex items-center justify-center w-11 h-11 rounded-md text-grimoire-muted/50 hover:text-grimoire-gold hover:opacity-100 transition-all duration-200"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
