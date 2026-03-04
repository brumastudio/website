"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Wraps page content with a subtle fade-in on route changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div
      className="transition-opacity duration-300 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
