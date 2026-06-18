import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HospitalLinenContent from "./HospitalLinenContent";

export const metadata: Metadata = {
  title: "Hospital Linen Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan hospital linen manufacturer — surgical gowns, medical scrubs, patient gowns and huck towels. ISO 9001, ISO 13485, BSCI certified healthcare textile export.",
  keywords: [
    "hospital linen manufacturer Pakistan",
    "medical linen supplier Pakistan",
    "surgical gowns manufacturer Pakistan",
    "medical scrubs supplier Pakistan",
    "healthcare textile Pakistan",
    "hospital textile export Pakistan",
    "ISO 13485 medical linen Pakistan",
    "BSCI hospital linen supplier",
  ],
  alternates: {
    canonical: "/hometextile/hospitallinen/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/hospitallinen/",
      "x-default": "https://mzglobaltrading.com/hometextile/hospitallinen/",
    },
  },
  openGraph: {
    title: "Hospital Linen Manufacturer Pakistan | MZ Global Trading",
    description:
      "Healthcare-grade linen from Pakistan's ISO-certified facilities. Surgical gowns, medical scrubs, patient gowns and huck towels. Anti-bacterial, fluid-repellent, sterilizable. ISO 9001, ISO 13485, BSCI certified.",
    url: "https://mzglobaltrading.com/hometextile/hospitallinen/",
    images: [
      {
        url: "/images/og/hero-home-textiles.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan hospital linen manufacturer — healthcare-grade surgical gowns, scrubs and medical textiles for global buyers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospital Linen Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan hospital linen — surgical gowns, scrubs, patient gowns, huck towels. ISO 9001, ISO 13485, BSCI certified. Export to USA, UK, EU, Middle East.",
  },
};

export default function HospitalLinenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: "https://mzglobaltrading.com/hometextile/hospitallinen/",
            name: "Hospital Linen Manufacturer Pakistan | MZ Global Trading",
            description:
              "Healthcare-grade linen manufactured in Pakistan's ISO-certified facilities. Surgical gowns, medical scrubs, patient gowns and surgical huck towels. Anti-bacterial, fluid-repellent, sterilizable finishes. ISO 9001, ISO 13485, BSCI certified.",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Home Textiles",
                  item: "https://mzglobaltrading.com/hometextile/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Hospital Linen",
                  item: "https://mzglobaltrading.com/hometextile/hospitallinen/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <HospitalLinenContent />
      </main>
      <Footer />
    </>
  );
}
