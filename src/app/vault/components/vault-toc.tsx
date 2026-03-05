"use client";

import { useState } from "react";
import { List, ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

export function VaultToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="rounded-lg border border-grimoire-border bg-grimoire-surface p-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between md:pointer-events-none"
      >
        <span className="inline-flex items-center gap-2 font-ui text-xs uppercase tracking-wider text-grimoire-muted">
          <List className="w-4 h-4" />
          Table of Contents
        </span>
        <ChevronDown
          className={`w-4 h-4 text-grimoire-muted transition-transform md:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>

      <ol
        className={`mt-3 space-y-1.5 overflow-hidden transition-all duration-200 ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
        }`}
      >
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group flex items-baseline gap-2 py-0.5 font-body text-sm text-grimoire-text/70 hover:text-grimoire-gold transition-colors"
            >
              <span className="font-ui text-[10px] text-grimoire-muted/50 tabular-nums shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
