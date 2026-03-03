import { cn } from "@/lib/utils";

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative h-px bg-grimoire-gold/40 my-12", className)}
    >
      <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
    </div>
  );
}
