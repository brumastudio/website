export function CredibilityStrip() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl text-grimoire-gold uppercase tracking-wide">
          The Order
        </h2>

        <div className="mt-4 mx-auto h-px w-24 bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
        </div>

        <p className="mt-8 font-body text-lg leading-relaxed text-grimoire-text">
          Bruma Studio is a focused digital studio led by practitioners, not
          managers. We bring agency-level craft with the agility and attention of
          a dedicated team.
        </p>
        <p className="mt-4 font-body text-lg leading-relaxed text-grimoire-text">
          Our stack is modern. Our standards are exacting. Every project receives
          senior-level attention from start to finish.
        </p>

        <p className="mt-8 font-ui text-sm text-grimoire-muted">
          Next.js · React · TypeScript · Sanity CMS · Tailwind CSS · Vercel
        </p>
      </div>
    </section>
  );
}
