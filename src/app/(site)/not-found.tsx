import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-4">
        404
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide">
        Lost in the Mist
      </h1>

      <div className="mt-6 h-px w-24 bg-grimoire-gold/40" />

      <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-grimoire-text">
        This page has vanished — or perhaps it never existed. The path you seek
        lies elsewhere.
      </p>

      <Link
        href="/"
        className="mt-10 inline-block font-ui text-sm font-medium uppercase tracking-wider bg-grimoire-gold text-grimoire-bg px-6 py-3 rounded-md hover:bg-grimoire-gold-light transition-colors duration-200"
      >
        Return to the Origin
      </Link>
    </section>
  );
}
