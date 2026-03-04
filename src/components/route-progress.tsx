"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin gold progress bar at the top of the viewport during route changes.
 * Detects navigation by watching pathname changes.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPathname = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      // Route changed — finish the bar
      prevPathname.current = pathname;
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(100);
      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }
  }, [pathname]);

  // Start progress on click of internal links
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;

      // Internal navigation detected
      if (timerRef.current) clearInterval(timerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

      setVisible(true);
      setProgress(15);

      let current = 15;
      timerRef.current = setInterval(() => {
        current += Math.random() * 10;
        if (current >= 90) {
          current = 90;
          if (timerRef.current) clearInterval(timerRef.current);
        }
        setProgress(current);
      }, 200);
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      if (timerRef.current) clearInterval(timerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] h-0.5 pointer-events-none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="h-full bg-grimoire-gold transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible || progress > 0 ? 1 : 0,
        }}
      />
    </div>
  );
}
