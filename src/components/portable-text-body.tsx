import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { PortableTextBlock } from "@/lib/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-lg leading-relaxed text-grimoire-text mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl text-grimoire-gold uppercase tracking-wide text-balance mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl text-grimoire-gold uppercase tracking-wide mt-10 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-ui text-base font-medium uppercase tracking-wider text-grimoire-text mt-8 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-grimoire-gold pl-6 my-8 italic font-body text-lg text-grimoire-gold-light">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-grimoire-text">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-grimoire-surface px-1.5 py-0.5 rounded text-sm font-mono text-grimoire-gold-light">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-grimoire-rune-soft underline-offset-2 hover:underline transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 my-6 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 my-6 ml-4 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-body text-base md:text-lg leading-relaxed text-grimoire-text before:content-['·'] before:mr-3 before:text-grimoire-gold before:font-bold">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="font-body text-base md:text-lg leading-relaxed text-grimoire-text">
        {children}
      </li>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || ""}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center font-ui text-sm text-grimoire-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="my-8 overflow-x-auto rounded-lg border border-grimoire-border bg-grimoire-surface p-4">
        {value.filename && (
          <div className="mb-3 font-mono text-xs text-grimoire-muted">
            {value.filename}
          </div>
        )}
        <code className="font-mono text-sm leading-relaxed text-grimoire-text">
          {value.code}
        </code>
      </pre>
    ),
  },
};

interface PortableTextBodyProps {
  value: PortableTextBlock[];
}

export function PortableTextBody({ value }: PortableTextBodyProps) {
  return <PortableText value={value} components={components} />;
}
