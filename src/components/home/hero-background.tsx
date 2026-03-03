"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.5 + 0.5,
    speedY: -(Math.random() * 0.15 + 0.05),
    speedX: (Math.random() - 0.5) * 0.1,
    opacity: Math.random() * 0.3 + 0.05,
    fadeSpeed: Math.random() * 0.002 + 0.001,
  };
}

/**
 * Subtle floating ember/dust particles on canvas.
 * ~20 tiny gold dots drift slowly upward.
 * Fully disabled when prefers-reduced-motion is set.
 * Hidden on mobile (< 768px) for performance.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particleCount = 20;
    let particles: Particle[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      const rect = canvas!.getBoundingClientRect();
      particles = Array.from({ length: particleCount }, () =>
        createParticle(rect.width, rect.height)
      );
    }

    function animate() {
      if (!ctx || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.fadeSpeed;

        // Reverse fade direction at bounds
        if (p.opacity >= 0.35 || p.opacity <= 0.02) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Reset when particle drifts off screen
        if (p.y < -10 || p.x < -10 || p.x > w + 10) {
          p.x = Math.random() * w;
          p.y = h + 10;
          p.opacity = 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 166, 105, ${p.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 hidden md:block"
      aria-hidden="true"
    />
  );
}
