"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";

const navLinks = [
  { href: "/arts" as const, key: "arts" },
  { href: "/grimoire" as const, key: "grimoire" },
  { href: "/the-order" as const, key: "theOrder" },
  { href: "/offerings" as const, key: "offerings" },
  { href: "/summon" as const, key: "summon" },
];

export function Nav() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const openMobile = useCallback(() => {
    setMobileOpen(true);
    // Trigger animation on next frame
    requestAnimationFrame(() => setIsAnimating(true));
  }, []);

  const closeMobile = useCallback(() => {
    setIsAnimating(false);
    closeTimeoutRef.current = setTimeout(() => {
      setMobileOpen(false);
    }, 300);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) closeMobile();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, closeMobile]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-grimoire-bg/80 border-b border-grimoire-border/40 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
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
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-grimoire-text hover:text-grimoire-gold transition-colors"
            onClick={openMobile}
            aria-label={t("openMenu")}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div
          className={cn(
            "fixed inset-0 z-[60] flex flex-col bg-grimoire-surface-elevated/95 backdrop-blur-lg md:hidden transition-all duration-300 ease-out",
            isAnimating
              ? "opacity-100 scale-100"
              : "opacity-0 scale-[0.97]"
          )}
        >
          {/* Close button — same position as hamburger */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={closeMobile} className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-grimoire-gold uppercase">
                Bruma
              </span>
              <span className="font-display text-xs text-grimoire-text uppercase tracking-[0.3em]">
                Studio
              </span>
            </Link>
            <button
              onClick={closeMobile}
              aria-label={t("closeMenu")}
              className="flex items-center justify-center w-11 h-11 -mr-2 text-grimoire-text hover:text-grimoire-gold transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Centered navigation links */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={cn(
                    "py-4 font-display text-2xl uppercase tracking-wider transition-all duration-300 ease-out",
                    isAnimating
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-grimoire-gold"
                      : "text-grimoire-text hover:text-grimoire-gold"
                  )}
                  style={{ transitionDelay: isAnimating ? `${100 + i * 50}ms` : "0ms" }}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            {/* Gold divider */}
            <div
              className={cn(
                "mt-6 mb-6 h-px w-12 bg-grimoire-gold/40 transition-all duration-300 ease-out",
                isAnimating
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              )}
              style={{ transitionDelay: isAnimating ? "400ms" : "0ms" }}
            />

            {/* Language switcher */}
            <div
              className={cn(
                "transition-all duration-300 ease-out",
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              )}
              style={{ transitionDelay: isAnimating ? "450ms" : "0ms" }}
            >
              <LanguageSwitcher />
            </div>
          </div>

          {/* CTA at bottom */}
          <div
            className={cn(
              "px-6 pb-10 transition-all duration-300 ease-out",
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            )}
            style={{ transitionDelay: isAnimating ? "500ms" : "0ms" }}
          >
            <Link
              href="/summon"
              onClick={closeMobile}
              className="block w-full text-center font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-4 rounded-md hover:bg-grimoire-gold-light active:scale-95 transition-all duration-200"
            >
              {t("startProject")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
