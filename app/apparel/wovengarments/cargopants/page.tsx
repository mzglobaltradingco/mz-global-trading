import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import CargoPantsContent from "./CargoPantsContent";

export const metadata: Metadata = {
  title: "Cargo Pants Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom cargo pants from Pakistan's certified woven factories. Ripstop, canvas, TC poly-cotton and stretch ripstop. 200–300 GSM. OEKO-TEX, BSCI.",
  keywords: [
    "cargo pants manufacturer Pakistan",
    "cargo trousers supplier Pakistan",
    "ripstop cargo pants OEM",
    "custom cargo pants wholesale",
    "tactical pants manufacturer Pakistan",
    "canvas cargo pants export",
    "outdoor pants manufacturer Pakistan",
  ],
  alternates: {
    canonical: "/apparel/wovengarments/cargopants/",
    languages: {
      "en": "https://mzglobaltrading.com/apparel/wovengarments/cargopants/",
      "x-default": "https://mzglobaltrading.com/apparel/wovengarments/cargopants/",
    },
  },
  openGraph: {
    title: "Cargo Pants Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom cargo pants sourced from Pakistan's certified woven factories. Ripstop, canvas, TC poly-cotton and stretch ripstop. 200–300 GSM. OEKO-TEX, BSCI available.",
    url: "https://mzglobaltrading.com/apparel/wovengarments/cargopants/",
    images: [
      {
        url: "/images/og/cargo-pants-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan cargo pants manufacturer — OEM ripstop and canvas cargo for outdoor, tactical and workwear brands worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cargo Pants Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom cargo pants from Pakistan's certified woven factories. Ripstop, canvas, TC poly-cotton, stretch ripstop. OEKO-TEX, BSCI available.",
  },
};

export default function CargoPantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the best cargo pants construction for outdoor and adventure brands?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ripstop is the primary construction for outdoor and adventure programmes — the grid-reinforced weave prevents tear propagation without adding significant weight. For packable and travel-oriented collections, lightweight nylon canvas (200–230 GSM) with DWR finish is the correct choice. Stretch ripstop (200–250 GSM) is growing rapidly in the performance-outdoor and tactical-fashion crossover segment where freedom of movement is as important as durability.",
                },
              },
              {
                "@type": "Question",
                name: "What finishes are available for water resistance on cargo pants?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DWR (Durable Water Repellent) is the standard water-repellent finish for cargo pants. Fluorinated DWR (C6 based) is the most durable but is being phased out in EU markets under REACH regulation. Non-fluorinated (PFAS-free) DWR is now available at comparable performance — strongly recommended for EU-market programmes. For industrial workwear requiring waterproofing beyond DWR, PU-coated nylon canvas is the appropriate construction.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get FR (flame retardant) cargo pants from Pakistan for industrial safety programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. FR-treated cotton and inherent-FR Nomex-blend cargo pants are available for industrial safety programmes. Treated FR cotton meets NFPA 2112 and EN ISO 11612 standards on request. Inherent FR provides higher-performance protection where standard FR treatment is insufficient. Specify your required standard (NFPA, EN ISO or ASTM) and end-use environment in your RFQ to ensure correct fabric selection and certification.",
                },
              },
              {
                "@type": "Question",
                name: "What pocket configurations are available for OEM cargo programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cargo pocket configuration is fully OEM-customisable. Specify pocket count, size, position (thigh, knee, rear, coin), closure type (snap button, zip, Velcro, bellows open), flap style and depth. Multi-pocket programmes (6–8 pockets) are common for workwear; cleaner 4-pocket configurations for fashion cargo. Technical packs accepted — any configuration achievable from your specification.",
                },
              },
              {
                "@type": "Question",
                name: "Which GSM is standard for fashion cargo programmes versus trade workwear?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fashion cargo programmes typically specify 200–240 GSM cotton or TC ripstop — lightweight enough for comfort but providing the structured look expected in tactical fashion. Trade workwear requires 240–300 GSM canvas or heavy TC for durability in demanding environments. FR cargo for industrial safety typically runs 250–350 GSM to meet flame resistance standards. Specify your end-use environment in your RFQ and we align GSM to your performance requirements.",
                },
              },
              {
                "@type": "Question",
                name: "What order quantities are typical for cargo pants programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cargo pants programme quantities vary depending on construction, number of colourways, pocket specification complexity and factory capacity. Standard commercial ripstop and TC construction programmes are achievable at moderate order quantities. FR and specialty constructions typically require larger programme sizes due to fabric minimums. Include your target quantity and size breakdown in your RFQ — we will advise on the optimal quantity structure for your construction and certification requirements.",
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
            name: "Cargo Pants — Pakistan OEM Sourcing & Export",
            description:
              "Custom cargo pants sourced from Pakistan's certified woven factories. Ripstop, canvas, TC poly-cotton, stretch ripstop and FR cotton constructions. 200–300 GSM. OEKO-TEX and BSCI available.",
            image:
              "https://mzglobaltrading.com/images/og/cargo-pants-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
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
                  name: "Apparel",
                  item: "https://mzglobaltrading.com/apparel/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Woven Garments",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Cargo Pants",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/cargopants/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/cargo-pants-og.webp",
              name: "Pakistan cargo pants manufacturer — ripstop and canvas cargo for outdoor and workwear brands",
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <CargoPantsContent />
      </main>
      <Footer />
    </>
  );
}
