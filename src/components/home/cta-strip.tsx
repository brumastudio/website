import Link from "next/link";

export function CtaStrip() {
  return (
    <section className="border-t border-grimoire-gold/20 bg-grimoire-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
          Ready to Begin?
        </h2>
        <p className="mt-6 font-body text-lg leading-relaxed text-grimoire-text">
          Every project starts with a conversation. Tell us about your vision
          and we&rsquo;ll craft a plan to bring it to life.
        </p>
        <Link
          href="/summon"
          className="mt-8 inline-block font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light transition-colors duration-200"
        >
          Summon Us
        </Link>
      </div>
    </section>
  );
}
