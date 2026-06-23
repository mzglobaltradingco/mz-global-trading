import type { Metadata } from "next";

const BASE_URL = "https://mzglobaltrading.com";
const DEFAULT_OG_IMAGE = "/images/og/homepage-og-image.webp";
const DEFAULT_OG_ALT = "MZ Global Trading — Pakistan Textile Sourcing Partner for Apparel, Home Textiles and Fabric";

// ─── Active locales ────────────────────────────────────────────────────────────
// When adding a new language:
//   1. Add its code here, e.g. { code: "de", pathPrefix: "/de" }
//   2. That's it — all pages get the new hreflang automatically.
//   3. "en" and "x-default" always point to the English (no-prefix) URL.
const ACTIVE_LOCALES: { code: string; pathPrefix: string }[] = [
  // { code: "de", pathPrefix: "/de" },   // German — uncomment when ready
  // { code: "fr", pathPrefix: "/fr" },   // French — uncomment when ready
  // { code: "es", pathPrefix: "/es" },   // Spanish — uncomment when ready
  // { code: "ar", pathPrefix: "/ar" },   // Arabic — uncomment when ready
];

interface PageMetadataInput {
  title: string;
  description: string;
  // Relative English path with trailing slash — e.g. "/apparel/" or "/apparel/knittedgarments/"
  // Locale-prefixed URLs are derived automatically from ACTIVE_LOCALES above.
  canonical: string;
  ogImage?: string;
  ogImageAlt?: string;
  keywords?: string[];
}

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_ALT,
  keywords = [],
}: PageMetadataInput): Metadata {
  const englishUrl = `${BASE_URL}${canonical}`;

  // Build languages map: always includes "en" and "x-default"
  // Additional locales are added automatically from ACTIVE_LOCALES
  const languages: Record<string, string> = {
    en: englishUrl,
    "x-default": englishUrl,
  };

  for (const { code, pathPrefix } of ACTIVE_LOCALES) {
    languages[code] = `${BASE_URL}${pathPrefix}${canonical}`;
  }

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: englishUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
