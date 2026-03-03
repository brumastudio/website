import type { Metadata } from "next";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { allAuthorsQuery } from "@/lib/queries";
import { GoldDivider } from "@/components/gold-divider";
import type { Author } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  description:
    "A deliberately small studio. The people you talk to are the people who build your project.",
};

const values = [
  {
    title: "Craft over speed.",
    body: "We'd rather take an extra week than ship something mediocre.",
  },
  {
    title: "Clarity over cleverness.",
    body: "The best code and the best copy are both easy to understand.",
  },
  {
    title: "Bilingual by nature.",
    body: "Two languages, two markets, one standard of quality.",
  },
  {
    title: "Small by design.",
    body: "Every client gets our full attention. No layers, no handoffs.",
  },
];

const socialIcons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

export default async function TheOrderPage() {
  const authors = await client.fetch<Author[]>(allAuthorsQuery);

  return (
    <>
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="font-ui text-xs text-grimoire-muted uppercase tracking-[0.2em] mb-2">
            The Order
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-grimoire-gold uppercase tracking-wide">
            Who We Are
          </h1>
          <div className="mt-4 h-px max-w-sm bg-gradient-to-r from-grimoire-gold/60 via-grimoire-gold to-grimoire-gold/60 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-grimoire-gold rotate-45" />
          </div>
          <p className="mt-8 font-body text-lg leading-relaxed text-grimoire-text">
            A deliberately small studio. The people you talk to are the people
            who build your project.
          </p>
        </div>
      </section>

      {/* Origins */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold uppercase tracking-wide mb-8">
            Origins
          </h2>
          <div className="space-y-6 font-body text-base md:text-lg leading-relaxed text-grimoire-text">
            <p>
              Bruma Studio was founded on a simple conviction: the best digital
              work comes from small, focused teams who care deeply about craft.
            </p>
            <p>
              We saw too many agencies selling process over product — layers of
              account managers, junior developers, and templated solutions
              dressed up as custom work. We built Bruma to be the opposite: a
              studio where every project gets direct attention from the people
              actually doing the work.
            </p>
            <p>
              We&rsquo;re bilingual by nature, not by strategy. English and
              Spanish are both native to our team, which means we don&rsquo;t
              just translate — we think, design, and communicate fluently in
              both languages.
            </p>
            <p className="text-grimoire-gold-light italic">
              Based in Tijuana, we serve clients across the Americas and beyond.
              Small by design. Powerful by craft.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      {authors.length > 0 && (
        <section className="px-6 pb-24 md:pb-32">
          <div className="mx-auto max-w-4xl">
            <GoldDivider className="mb-16" />
            <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold uppercase tracking-wide text-center mb-12">
              The Practitioners
            </h2>

            <div
              className={`grid gap-8 ${
                authors.length === 1
                  ? "max-w-md mx-auto"
                  : authors.length === 2
                    ? "md:grid-cols-2 max-w-2xl mx-auto"
                    : "md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {authors.map((author) => (
                <div
                  key={author._id}
                  className="bg-grimoire-surface border border-grimoire-border rounded-lg p-6 md:p-8 text-center"
                >
                  {/* Photo or initials */}
                  {author.photo ? (
                    <Image
                      src={urlFor(author.photo).width(160).height(160).url()}
                      alt={author.name}
                      width={80}
                      height={80}
                      className="mx-auto rounded-full mb-4"
                    />
                  ) : (
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-grimoire-gold bg-grimoire-bg">
                      <span className="font-display text-2xl text-grimoire-gold">
                        {author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}

                  <h3 className="font-display text-lg uppercase tracking-wide text-grimoire-gold">
                    {author.name}
                  </h3>

                  {author.role && (
                    <p className="mt-1 font-ui text-sm text-grimoire-muted">
                      {author.role}
                    </p>
                  )}

                  {author.bio && author.bio.length > 0 && (
                    <div className="mt-4 font-body text-sm leading-relaxed text-grimoire-text/80">
                      {author.bio
                        .filter((block) => block._type === "block")
                        .map((block, i) => (
                          <p key={i}>
                            {(block.children || [])
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              .map((child: any) => child.text || "")
                              .join("")}
                          </p>
                        ))}
                    </div>
                  )}

                  {/* Social links */}
                  {author.socialLinks && (
                    <div className="mt-4 flex items-center justify-center gap-3">
                      {(
                        Object.entries(author.socialLinks) as [
                          keyof typeof socialIcons,
                          string | undefined,
                        ][]
                      )
                        .filter(([key, url]) => url && key in socialIcons)
                        .map(([key, url]) => {
                          const Icon = socialIcons[key];
                          return (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={key}
                              className="text-grimoire-muted hover:text-grimoire-gold transition-colors duration-200"
                            >
                              <Icon className="h-4 w-4" />
                            </a>
                          );
                        })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-4xl">
          <GoldDivider className="mb-16" />
          <h2 className="font-display text-2xl md:text-3xl text-grimoire-gold uppercase tracking-wide text-center mb-12">
            What We Believe
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-display text-base uppercase tracking-wide text-grimoire-gold">
                  {value.title}
                </h3>
                <p className="mt-2 font-body text-base md:text-lg leading-relaxed text-grimoire-text/80">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
