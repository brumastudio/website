import { groq } from "next-sanity";

// ─── Projects ─────────────────────────────────────────

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    tags,
    techStack,
    client,
    timeline,
    liveUrl,
    featured,
    order
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    tags,
    techStack,
    featured
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    body,
    coverImage,
    tags,
    techStack,
    client,
    timeline,
    liveUrl,
    featured,
    order
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)].slug.current
`;

// ─── Services ─────────────────────────────────────────

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    body,
    icon,
    features,
    order
  }
`;

// ─── Posts ─────────────────────────────────────────────

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    body,
    category,
    tags,
    publishedAt,
    featured,
    author-> {
      name,
      slug,
      photo
    }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    coverImage,
    category,
    tags,
    publishedAt,
    featured,
    author-> {
      name,
      slug,
      role,
      photo,
      socialLinks
    },
    relatedPosts[]-> {
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt
    }
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)].slug.current
`;

// ─── Authors ──────────────────────────────────────────

export const allAuthorsQuery = groq`
  *[_type == "author"] | order(order asc) {
    _id,
    name,
    slug,
    role,
    bio,
    photo,
    socialLinks,
    order
  }
`;

// ─── Site Settings ────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    studioName,
    tagline,
    description,
    contactEmail,
    location,
    responseTime,
    socialLinks,
    newsletterCTA
  }
`;
