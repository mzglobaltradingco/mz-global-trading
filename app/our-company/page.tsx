import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import OurCompanyContent from "./OurCompanyContent";

export const metadata: Metadata = {
  title: "About Us | MZ Global Trading",
  description:
    "MZ Global Trading — Pakistan's B2B textile sourcing partner for brands and importers in the USA, UK and Europe. 50+ certified manufacturers across apparel, home textiles and fabric.",
  keywords: [
    "about MZ Global Trading",
    "Pakistan textile sourcing company",
    "B2B textile supplier Pakistan",
    "textile sourcing partner Karachi",
    "certified textile manufacturer Pakistan",
    "apparel home textiles fabric sourcing Pakistan",
    "textile exporter Pakistan USA UK Europe",
  ],
  alternates: {
    canonical: "/our-company/",
    languages: {
      "en": "https://mzglobaltrading.com/our-company/",
      "x-default": "https://mzglobaltrading.com/",
    },
  },
  openGraph: {
    title: "About MZ Global Trading | Pakistan Textile Sourcing Partner",
    description:
      "Pakistan's B2B textile sourcing partner — 50+ vetted factories, 10+ certifications, serving brands and importers across USA, UK, Europe and South America.",
    url: "https://mzglobaltrading.com/our-company/",
    images: [
      {
        url: "/images/og/homepage-og-image.webp",
        width: 1200,
        height: 630,
        alt: "About MZ Global Trading — Pakistan Textile Sourcing Company",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About MZ Global Trading | Pakistan Textile Sourcing Partner",
    description:
      "Pakistan's B2B textile sourcing partner — 50+ vetted factories, 10+ certifications, serving brands and importers across USA, UK, Europe and South America.",
  },
};

export default function OurCompanyPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <OurCompanyContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "url": "https://mzglobaltrading.com/our-company/",
            "name": "About MZ Global Trading",
            "description":
              "MZ Global Trading is a Karachi-based B2B textile sourcing company connecting international brands, importers and retailers with certified Pakistani manufacturers across apparel, home textiles and fabric.",
            "inLanguage": "en",
            "mainEntity": { "@id": "https://mzglobaltrading.com/#organization" },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "contentUrl": "https://mzglobaltrading.com/images/hero/hero-about.webp",
              "name": "Textile factory floor in Pakistan — MZ Global Trading vetted sourcing network",
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Corporate",
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "About Us",
                  "item": "https://mzglobaltrading.com/our-company/",
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
