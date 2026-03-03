import { HeroBackground } from "@/components/home/hero-background";
import { HeroContent } from "@/components/home/hero-content";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
      <HeroBackground />
      <HeroContent />
    </section>
  );
}
