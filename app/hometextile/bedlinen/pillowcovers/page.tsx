import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PillowCoversContent from "./PillowCoversContent";

export const metadata: Metadata = {
  title: "Pillow Covers Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan pillowcase manufacturer for wholesale buyers in USA, UK and Europe. Cotton percale, sateen, 200–600 TC. Zip, button and envelope closure.",
  keywords: [
    "pillow covers manufacturer Pakistan",
    "pillowcases wholesale Pakistan",
    "custom pillowcases export",
    "Oxford pillow covers manufacturer",
    "sateen pillowcases supplier Pakistan",
    "hotel pillowcases manufacturer",
  ],
  alternates: {
    canonical: "/hometextile/bedlinen/pillowcovers/",
    languages: {
      "en": "https://mzglobaltrading.com/hometextile/bedlinen/pillowcovers/",
      "x-default": "https://mzglobaltrading.com/hometextile/bedlinen/pillowcovers/",
    },
  },
  openGraph: {
    title: "Pillow Covers Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan pillowcase manufacturer — percale, sateen and Oxford styles in standard, queen and Euro sizes. GOTS and OEKO-TEX certified. FOB / CIF export.",
    url: "https://mzglobaltrading.com/hometextile/bedlinen/pillowcovers/",
    images: [
      {
        url: "/images/og/pillow-covers-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan pillow cover manufacturer — wholesale pillowcases for USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pillow Covers Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan pillowcase manufacturer — percale, sateen and Oxford in all standard sizes. OEKO-TEX certified. FOB / CIF export.",
  },
};

export default function PillowCoversPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <PillowCoversContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What size should I order for USA and UK retail pillow cover programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "USA: Standard 50×75cm is the baseline for most retail and hotel programmes. Queen 50×90cm is ordered for queen-specific bedding collections. UK: Standard (Housewife) 50×75cm and Oxford 50×75cm+5cm flange are both common. Euro square 65×65cm is the dominant size across continental Europe.",
                },
              },
              {
                "@type": "Question",
                name: "What is an Oxford pillowcase?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An Oxford pillowcase has a flat sewn border — called a flange — of 5–8cm that extends around all four sides beyond the pillow-sized opening. Popular in premium UK and EU retail. The flange creates a decorative frame around the pillow when the bed is made. Oxford-style pillowcases are produced in Oxford weave, percale or sateen constructions.",
                },
              },
              {
                "@type": "Question",
                name: "What TC is standard for hotel pillowcases?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hotels typically specify 250–350 TC percale for standard room supply and 300–400 TC sateen for premium room tier. Luxury hotel programmes move to 500–600 TC sateen with embroidered monogram or border. TC selection should be confirmed against the hotel's target wash-cycle count — higher TC requires more careful laundering.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order pillowcases with matching duvet covers and flat sheets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Coordinated bedding sets — duvet cover, flat sheet, fitted sheet and pillow covers — are among our most common hotel and retail orders. Specify the complete set in your RFQ to ensure consistent thread count, construction and colour matching across all components.",
                },
              },
              {
                "@type": "Question",
                name: "Are OEKO-TEX certified pillowcases available from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. OEKO-TEX Standard 100 certification is available across all standard constructions. This is mandatory for EU and UK buyers with chemical compliance requirements and increasingly expected by US retailers. Specify OEKO-TEX as a hard requirement in your RFQ — it should be non-negotiable for any retail programme.",
                },
              },
              {
                "@type": "Question",
                name: "How are pairs and sets packaged for retail?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard: polybag with header card or label (1-pack or 2-pack). Retail: folded in branded retail box. Premium: zippered fabric display pouch. Gift programmes: fabric pouch or gift box, often with ribbon or card insert. Coordinated sets can be packaged as a complete unit. Specify your fulfilment requirement in the RFQ.",
                },
              }
            ],
          }),  
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Pillow Covers — Pakistan Manufacturer",
            description:
              "Custom pillowcases and pillow covers sourced from Pakistan's certified weaving mills. Percale, sateen and Oxford constructions. Standard, Queen and Euro sizing. GOTS and OEKO-TEX certified.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-pillow-covers.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "MZ Global Trading",
              },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-pillow-covers.webp",
              name: "Pakistan pillow cover manufacturer — wholesale pillowcases for international retail and hospitality buyers",
            },
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
                  name: "Bed Linen",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Pillow Covers",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/pillowcovers/",
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
