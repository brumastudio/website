"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/arts", label: "Arts" },
  { href: "/#grimoire", label: "Grimoire" },
  { href: "/summon", label: "Summon" },
];

export function Nav() {
  const pathname = usePathname();
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
        aria-label="Main navigation"
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
                "font-ui text-sm font-medium uppercase tracking-wider transition-colors duration-200 hover:text-grimoire-gold",
                pathname === link.href
                  ? "text-grimoire-gold"
                  : "text-grimoire-text/80"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/summon"
            className="font-ui text-sm font-medium uppercase tracking-wider border border-grimoire-gold text-grimoire-gold px-5 py-2 rounded-md hover:bg-grimoire-gold/10 transition-colors duration-200"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-grimoire-text hover:text-grimoire-gold transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
            aria-label="Close menu"
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
              {link.label}
            </Link>
          ))}

          {/* CTA at bottom */}
          <Link
            href="/summon"
            onClick={closeMobile}
            className="mt-4 w-64 text-center font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light transition-colors duration-200"
          >
            Start a Project
          </Link>
        </div>
      )}
    </header>
  );
}
