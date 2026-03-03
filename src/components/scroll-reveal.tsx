"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds */
  delay?: number;
}

/**
 * Wraps children with a fade-up reveal animation on scroll.
 * Respects prefers-reduced-motion via framer-motion's built-in support.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const, delay },
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger wrapper for card grids ── */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Delay between each child in seconds (default 0.12) */
  stagger?: number;
}

/**
 * Container that staggers the reveal of its StaggerItem children.
 */
export function StaggerContainer({
  children,
  className,
  stagger = 0.12,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Individual item inside a StaggerContainer.
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" as const },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
