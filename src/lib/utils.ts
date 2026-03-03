import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Extract plain text from Portable Text blocks and estimate reading time. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function estimateReadingTime(body: any[]): number {
  if (!body) return 0;
  const text = body
    .filter((block) => block._type === "block")
    .map((block) =>
      (block.children || [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((child: any) => child.text || "")
        .join("")
    )
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Format a date string as "Mar 15, 2026" */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Format a category slug as a display label */
export function formatCategory(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
