import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  heading: string;
  subheading?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  label,
  heading,
  subheading,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("mb-12", centered && "text-center", className)}>
      {label && (
        <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-2 font-body text-lg text-grimoire-text/70 italic">
          {subheading}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-px bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative",
          centered ? "mx-auto max-w-xs" : "max-w-sm"
        )}
      >
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
      </div>
    </header>
  );
}
