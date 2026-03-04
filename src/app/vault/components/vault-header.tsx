import { LogOut } from "lucide-react";

interface VaultHeaderProps {
  label: string;
  heading: string;
  backHref?: string;
  backLabel?: string;
}

export function VaultHeader({ label, heading, backHref, backLabel }: VaultHeaderProps) {
  return (
    <header className="px-6 pt-12 pb-8 md:pt-16 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {backHref && (
              <a
                href={backHref}
                className="font-ui text-xs text-grimoire-muted hover:text-grimoire-gold uppercase tracking-wider transition-colors"
              >
                &larr; {backLabel || "Back"}
              </a>
            )}
          </div>
          <form action="/api/vault/logout" method="POST">
            <button
              type="submit"
              className="inline-flex items-center gap-2 font-ui text-xs text-grimoire-muted hover:text-grimoire-gold uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log out
            </button>
          </form>
        </div>

        <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
          {label}
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
          {heading}
        </h1>
        <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
        </div>
      </div>
    </header>
  );
}
