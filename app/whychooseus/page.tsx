import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import WhyChooseUsContent from "./WhyChooseUsContent";

export const metadata: Metadata = {
  title: "Why Choose MZ Global Trading | Textile Sourcing Partner",
  description:
    "Discover why international buyers choose MZ Global Trading — 50+ vetted factories, GOTS, OEKO-TEX, BSCI certified. Ethical sourcing from Pakistan.",
  keywords: [
    "why choose MZ Global Trading",
    "certified textile manufacturer Pakistan",
    "ethical textile sourcing",
    "reliable textile supplier Pakistan",
    "on-time textile delivery",
    "B2B textile sourcing partner",
  ],
  alternates: {
    canonical: "/whychooseus/",
    languages: {
      "en": "https://mzglobaltrading.com/whychooseus/",
      "x-default": "https://mzglobaltrading.com/",
    },
  },
  openGraph: {
    title: "Why Choose MZ Global Trading | Pakistan Textile Sourcing Partner",
    description:
      "Quality assurance, ethical sourcing, 50+ vetted factories, and 95% on-time delivery. See why brands in USA, UK and Europe trust MZ Global Trading.",
    url: "https://mzglobaltrading.com/whychooseus/",
    images: [
      {
        url: "/images/og/hero-why-choose-us.webp",
        width: 1200,
        height: 630,
        alt: "Why choose MZ Global Trading — Pakistan B2B textile sourcing partner",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose MZ Global Trading | Pakistan Textile Sourcing Partner",
    description:
      "50+ vetted factories, ethical sourcing, and 95% on-time delivery for brands in USA, UK and Europe.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/whychooseus/",
  url: "https://mzglobaltrading.com/whychooseus/",
  name: "Why Choose MZ Global Trading | Pakistan Textile Sourcing Partner",
  description:
    "Discover why international buyers choose MZ Global Trading — 50+ vetted factories, ethical sourcing, competitive pricing and 95% on-time delivery.",
  inLanguage: "en",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Corporate" },
      { "@type": "ListItem", position: 3, name: "Why Choose Us", item: "https://mzglobaltrading.com/whychooseus/" },
    ],
  },
};

export default function WhyChooseUsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <WhyChooseUsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
