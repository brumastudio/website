// ─── Sanity Document Types ────────────────────────────

export interface SanitySlug {
  current: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityImage = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any;

export interface Service {
  _id: string;
  title: string;
  slug: SanitySlug;
  subtitle?: string;
  description?: string;
  body?: PortableTextBlock[];
  icon?: string;
  features?: string[];
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  body?: PortableTextBlock[];
  bodyEs?: PortableTextBlock[];
  coverImage?: SanityImage;
  tags?: string[];
  techStack?: string[];
  client?: string;
  timeline?: string;
  liveUrl?: string;
  featured?: boolean;
  order: number;
}

export interface Author {
  _id: string;
  name: string;
  slug: SanitySlug;
  role?: string;
  email?: string;
  bio?: PortableTextBlock[];
  photo?: SanityImage;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  order: number;
}

export interface Post {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  category?: string;
  tags?: string[];
  publishedAt: string;
  featured?: boolean;
  author?: {
    name: string;
    slug: SanitySlug;
    role?: string;
    photo?: SanityImage;
    socialLinks?: Author["socialLinks"];
  };
  relatedPosts?: {
    _id: string;
    title: string;
    slug: SanitySlug;
    excerpt: string;
    category?: string;
    publishedAt: string;
  }[];
}

export interface SiteSettings {
  studioName?: string;
  tagline?: string;
  description?: string;
  contactEmail?: string;
  location?: string;
  locationEs?: string;
  responseTime?: string;
  responseTimeEs?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    behance?: string;
  };
  newsletterCTA?: string;
}

// ─── Prospect Offerings (Private) ─────────────────────

export interface ProspectBullet {
  title?: string;
  titleEs?: string;
  description?: string;
  descriptionEs?: string;
}

export interface ProspectTier {
  name?: string;
  nameEs?: string;
  tagline?: string;
  taglineEs?: string;
  price?: string;
  priceEs?: string;
  duration?: string;
  durationEs?: string;
  isMostPopular?: boolean;
  mostPopularLabel?: string;
  mostPopularLabelEs?: string;
  bullets?: ProspectBullet[];
  ctaLabel?: string;
  ctaLabelEs?: string;
  ctaHref?: string;
}

export interface ProspectOfferings {
  heroEyebrow?: string;
  heroEyebrowEs?: string;
  heroTitle?: string;
  heroTitleEs?: string;
  heroSubtitle?: string;
  heroSubtitleEs?: string;
  tiers?: ProspectTier[];
  pricingSectionTitle?: string;
  pricingSectionTitleEs?: string;
  pricingSectionBody?: PortableTextBlock[];
  pricingSectionBodyEs?: PortableTextBlock[];
  finalCtaTitle?: string;
  finalCtaTitleEs?: string;
  finalCtaSubtitle?: string;
  finalCtaSubtitleEs?: string;
  finalCtaButtonLabel?: string;
  finalCtaButtonLabelEs?: string;
  finalCtaButtonHref?: string;
}
