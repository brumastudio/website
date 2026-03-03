import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { GoldDivider } from "@/components/gold-divider";

const footerLinks = [
  { href: "/arts", label: "Arts" },
  { href: "/grimoire", label: "Grimoire" },
  { href: "/scrolls", label: "Scrolls" },
  { href: "/the-order", label: "The Order" },
  { href: "/summon", label: "Summon" },
];

const socialLinks = [
  { href: "https://github.com/brumastudio", label: "GitHub", icon: Github },
  { href: "https://x.com/brumastudio", label: "X", icon: Twitter },
  { href: "https://linkedin.com/company/brumastudio", label: "LinkedIn", icon: Linkedin },
  { href: "https://instagram.com/brumastudio", label: "Instagram", icon: Instagram },
];

export function Footer() {
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
            Dark arts of digital craft.
          </p>

          {/* Nav links */}
          <nav
            className="mt-6 flex items-center gap-2 font-ui text-sm text-grimoire-text/70"
            aria-label="Footer navigation"
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
                  className="hover:text-grimoire-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>

          {/* Copyright */}
          <p className="mt-6 font-ui text-xs text-grimoire-muted">
            &copy; {new Date().getFullYear()} Bruma Studio &middot; brumastudio.dev
          </p>

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-grimoire-muted hover:text-grimoire-gold transition-colors duration-200"
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
