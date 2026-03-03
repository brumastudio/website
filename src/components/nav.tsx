"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";

const navLinks = [
  { href: "/arts" as const, key: "arts" },
  { href: "/grimoire" as const, key: "grimoire" },
  { href: "/scrolls" as const, key: "scrolls" },
  { href: "/the-order" as const, key: "theOrder" },
  { href: "/summon" as const, key: "summon" },
];

export function Nav() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) closeMobile();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, closeMobile]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-grimoire-bg/80 border-b border-grimoire-border/50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label={t("mainNav")}
      >
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl text-grimoire-gold uppercase">
            Bruma
          </span>
          <span className="font-display text-xs text-grimoire-text uppercase tracking-[0.3em]">
            Studio
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative font-ui text-sm font-medium uppercase tracking-wider transition-colors duration-200 hover:text-grimoire-gold",
                "after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-grimoire-gold after:transition-all after:duration-300",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-grimoire-gold after:w-full"
                  : "text-grimoire-text/80 after:w-0 hover:after:w-full"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            href="/summon"
            className="font-ui text-sm font-medium uppercase tracking-wider border border-grimoire-gold text-grimoire-gold px-5 py-2 rounded-md hover:bg-grimoire-gold/10 active:scale-95 transition-all duration-200"
          >
            {t("startProject")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-grimoire-text hover:text-grimoire-gold transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-grimoire-bg/95 backdrop-blur-lg md:hidden">
          {/* Close button at top right */}
          <button
            className="absolute top-4 right-6 text-grimoire-text hover:text-grimoire-gold transition-colors"
            onClick={closeMobile}
            aria-label={t("closeMenu")}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Logo at top */}
          <div className="absolute top-4 left-6 flex items-baseline gap-2">
            <span className="font-display text-2xl text-grimoire-gold uppercase">
              Bruma
            </span>
            <span className="font-display text-xs text-grimoire-text uppercase tracking-[0.3em]">
              Studio
            </span>
          </div>

          {/* Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={cn(
                "font-display text-2xl uppercase tracking-wide transition-colors duration-200 hover:text-grimoire-gold",
                pathname === link.href
                  ? "text-grimoire-gold"
                  : "text-grimoire-text"
              )}
            >
              {t(link.key)}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/summon"
            onClick={closeMobile}
            className="mt-4 w-64 text-center font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200"
          >
            {t("startProject")}
          </Link>

          {/* Language switcher at bottom of mobile menu */}
          <div className="mt-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
