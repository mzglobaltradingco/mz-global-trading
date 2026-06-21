import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PotHoldersContent from "./PotHoldersContent";

export const metadata: Metadata = {
  title: "Pot Holders Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan pot holders manufacturer: quilted cotton, silicone-lined and terry constructions. EN407 heat ratings. OEKO-TEX, BSCI. Bulk export to USA, UK, EU, Australia.",
  keywords: [
    "pot holders manufacturer Pakistan",
    "oven mitts supplier Pakistan",
    "quilted pot holders Pakistan export",
    "silicone oven mitts Pakistan",
    "kitchen heat protection Pakistan",
    "pot holders wholesale supplier",
    "custom pot holders OEM Pakistan",
    "OEKO-TEX pot holders Pakistan",
    "restaurant kitchen gloves Pakistan",
  ],
  alternates: {
    canonical: "/hometextile/kitchenlinen/potholders/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/kitchenlinen/potholders/",
      "x-default":
        "https://mzglobaltrading.com/hometextile/kitchenlinen/potholders/",
    },
  },
  openGraph: {
    title: "Pot Holders Manufacturer Pakistan | MZ Global Trading",
    description:
      "OEM pot holders and oven mitts from Pakistan. Quilted cotton, silicone-lined and terry constructions. Heat ratings to EN407. OEKO-TEX, BSCI certified. Bulk export to USA, UK, EU and worldwide.",
    url: "https://mzglobaltrading.com/hometextile/kitchenlinen/potholders/",
    images: [
      {
        url: "/images/og/pot-holders-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan pot holders manufacturer — quilted cotton and silicone oven mitts for kitchenware retail and foodservice buyers in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pot Holders Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pot holders and oven mitts from Pakistan: quilted cotton, silicone-lined, terry. EN407 heat ratings. OEKO-TEX, BSCI. Export to USA, UK, EU.",
  },
};

export default function PotHoldersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Pot Holders & Oven Mitts — OEM Pakistan Manufacturer",
            description:
              "OEM pot holders and oven mitts sourced from Pakistan's certified textile factories. Quilted cotton, silicone-lined and terry constructions. Heat protection ratings to EN407. Square pot holder, gauntlet mitt and silicone mitt styles. OEKO-TEX, BSCI, ISO 9001. Bulk export to USA, UK, EU, Australia and worldwide.",
            image:
              "https://mzglobaltrading.com/images/og/pot-holders-og.webp",
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
                "https://mzglobaltrading.com/images/og/pot-holders-og.webp",
              name: "Pakistan pot holders manufacturer — quilted and silicone oven mitts for kitchenware retail and foodservice worldwide",
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
                  name: "Kitchen Linen",
                  item: "https://mzglobaltrading.com/hometextile/kitchenlinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Pot Holders",
                  item: "https://mzglobaltrading.com/hometextile/kitchenlinen/potholders/",
                },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What constructions are available for OEM pot holders and oven mitts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Three primary constructions are available: quilted cotton (the standard kitchen textiles choice for retail — multi-layer quilted cotton shell with cotton wadding, 6–8 mm fill); silicone-lined quilted (quilted outer shell with food-grade silicone inner layer for superior heat transfer resistance and non-slip grip, preferred for commercial kitchen programmes); and terry cotton (single or double terry layer with quilted backing — the standard specification for foodservice and restaurant programmes). Silicone mitt style is also available for buyers requiring EN407-rated protection with the lowest profile.",
                },
              },
              {
                "@type": "Question",
                name: "What heat ratings are available and what do they mean?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Heat protection ratings are measured under EN407 (European standard) or ASTM F1060 (US standard). EN407 rates six parameters — contact heat, convective heat, radiant heat, small flame, large flame and molten metal splash. Our quilted cotton pot holders provide contact heat protection to approximately 120–150°C (suitable for domestic oven use and casual restaurant use). Silicone-lined constructions provide contact heat protection to 200–220°C — the specification required for commercial kitchen and professional chef programmes. EN407-certified oven gauntlets for industrial food processing environments are also available. Include your required heat protection specification in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What styles of pot holders and oven mitts can be produced?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Four standard styles are produced: square pot holder (18×18 cm to 22×22 cm — the standard retail kitchenware specification); standard mitt / gauntlet (28–32 cm length, fits either hand — the most common retail and foodservice format); double gauntlet mitt (38–45 cm length for forearm protection — the commercial kitchen specification); and silicone glove mitt (full silicone with fabric backing — rated to 200°C+). All styles are available in custom sizes and configurations for OEM programmes.",
                },
              },
              {
                "@type": "Question",
                name: "Can pot holders be printed or embroidered with brand artwork?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Screen printing, embroidery and heat transfer decoration are all available for branded pot holder and oven mitt programmes. For retail kitchenware brands, embroidered logos and screen printed patterns on the quilted face are the most common applications. For foodservice and restaurant branded programmes, embroidery on the outer face or cuff of the mitt is the standard. Hang tags, woven labels and custom packaging are all available as part of a complete retail-ready OEM programme.",
                },
              },
              {
                "@type": "Question",
                name: "What certifications should I require for pot holders in the EU or US market?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For EU buyers, OEKO-TEX Standard 100 is the minimum chemical safety requirement. EN407 testing certification is required if making heat protection performance claims on retail packaging. BSCI or Sedex social compliance audit is required by most European retailers. For US buyers, OEKO-TEX Standard 100 satisfies chemical safety concerns; ASTM F1060 testing is required if making heat protection performance claims for professional or commercial use. ISO 9001 ensures consistent production quality across batches.",
                },
              },
              {
                "@type": "Question",
                name: "What filling materials are used in quilted pot holders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Quilted pot holders use cotton wadding as the primary insulating fill — typically 200–300 GSM per layer. The quilted construction locks the wadding in place to prevent bunching and loss of insulation over time. Multi-layer construction (2–3 layers of wadding) is used for higher heat ratings. Non-woven polyester fill is available as a lower-cost alternative, though cotton fill maintains performance better through repeated domestic laundering. Silicone-lined construction replaces or supplements the wadding layer with a food-grade silicone inner.",
                },
              },
              {
                "@type": "Question",
                name: "Are pot holders machine washable?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. All cotton quilted and terry pot holders produced to our standard specifications are machine washable at 40°C. Silicone-lined pot holders are machine washable at 40°C for the outer fabric; silicone itself is hand-wash recommended. Heat resistance properties of cotton pot holders are maintained through multiple wash cycles. Colour fastness meets ISO 105-C06 at 40°C as standard. Testing to higher wash temperatures (60°C) is available for institutional and foodservice programmes.",
                },
              },
              {
                "@type": "Question",
                name: "Can pot holders be sourced as part of a coordinated kitchen linen set?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pot holders are frequently sourced as part of a coordinated kitchen linen programme: kitchen towels, bar mops, aprons and pot holders in matching construction, colour and decoration. A coordinated set RFQ simplifies sampling and reduces per-unit costs through production batching. MZ Global Trading sources across all kitchen linen categories simultaneously — submit a complete programme RFQ specifying all required items.",
                },
              },
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <PotHoldersContent />
      </main>
      <Footer />
    </>
  );
}
