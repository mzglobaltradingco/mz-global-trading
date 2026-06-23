import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import WhyChooseUsContent from "./WhyChooseUsContent";

export const metadata = buildMetadata({
  title: "Why Choose MZ Global Trading | Textile Sourcing Partner",
  description:
    "Discover why international buyers choose MZ Global Trading — 50+ vetted factories, GOTS, OEKO-TEX, BSCI certified. Ethical sourcing from Pakistan.",
  canonical: "/whychooseus/",
  ogImage: "/images/og/hero-why-choose-us.webp",
  ogImageAlt: "Why choose MZ Global Trading — Pakistan B2B textile sourcing partner",
  keywords: [
    "why choose MZ Global Trading",
    "certified textile manufacturer Pakistan",
    "ethical textile sourcing",
    "reliable textile supplier Pakistan",
    "on-time textile delivery",
    "B2B textile sourcing partner",
  ],
});

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
