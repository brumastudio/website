import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
  /** Color: "gold" (default) or "rune" */
  color?: "gold" | "rune";
  /** Position: CSS top/left/right/bottom values */
  className?: string;
}

const colorMap = {
  gold: "rgba(201, 166, 105, 0.04)",
  rune: "rgba(106, 13, 173, 0.035)",
};

/**
 * Subtle radial gradient spot to break up flat dark backgrounds.
 * Uses a blurred solid-color circle rather than a CSS gradient
 * to avoid 8-bit color banding on dark backgrounds.
 * Place inside a `relative overflow-hidden` container, positioned with className.
 */
export function BackgroundGlow({
  color = "gold",
  className,
}: BackgroundGlowProps) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none w-[600px] h-[600px] md:w-[800px] md:h-[800px] -z-10 rounded-full",
        className
      )}
      style={{
        backgroundColor: colorMap[color],
        filter: "blur(250px)",
      }}
      aria-hidden="true"
    />
  );
}
