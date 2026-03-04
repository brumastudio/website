"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    // Replace the current locale prefix in the URL
    // pathname is like /en/arts or /es/artes
    const segments = pathname.split("/");
    segments[1] = newLocale;

    // Map English paths to Spanish and vice versa
    const pathMappings: Record<string, string> = {
      // EN -> ES
      arts: "artes",
      grimoire: "grimorio",
      scrolls: "pergaminos",
      "the-order": "la-orden",
      summon: "invocar",
      // ES -> EN
      artes: "arts",
      grimorio: "grimoire",
      pergaminos: "scrolls",
      "la-orden": "the-order",
      invocar: "summon",
    };

    if (segments[2] && pathMappings[segments[2]]) {
      segments[2] = pathMappings[segments[2]];
    }

    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center font-ui text-sm">
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "px-2.5 py-2 rounded-md transition-colors duration-200",
          locale === "en"
            ? "text-grimoire-gold font-medium"
            : "text-grimoire-muted hover:text-grimoire-text"
        )}
        aria-label="English"
      >
        EN
      </button>
      <span className="text-grimoire-muted" aria-hidden="true">/</span>
      <button
        onClick={() => switchLocale("es")}
        className={cn(
          "px-2.5 py-2 rounded-md transition-colors duration-200",
          locale === "es"
            ? "text-grimoire-gold font-medium"
            : "text-grimoire-muted hover:text-grimoire-text"
        )}
        aria-label="Español"
      >
        ES
      </button>
    </div>
  );
}
