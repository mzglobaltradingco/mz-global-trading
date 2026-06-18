import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ApparelFabricContent from "./ApparelFabricContent";

export const metadata: Metadata = {
  title: "Apparel Fabric Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan apparel fabric supplier for garment manufacturers in USA, UK and Europe. Knitted and woven — jersey to canvas. GOTS, OEKO-TEX certified.",
  keywords: [
    "apparel fabric manufacturer Pakistan",
    "knitted fabric supplier Pakistan",
    "woven fabric manufacturer Pakistan",
    "single jersey fabric Pakistan",
    "denim fabric supplier Pakistan",
    "twill fabric manufacturer Pakistan",
    "bulk fabric export Pakistan",
    "GOTS certified fabric Pakistan",
    "OEKO-TEX fabric Pakistan",
    "textile fabric wholesale Pakistan",
  ],
  alternates: {
    canonical: "/fabric/apparelfabric/",
    languages: {
      "en": "https://mzglobaltrading.com/fabric/apparelfabric/",
      "x-default": "https://mzglobaltrading.com/fabric/apparelfabric/",
    },
  },
  openGraph: {
    title: "Apparel Fabric Manufacturer Pakistan | Knitted & Woven Fabric Export | MZ Global Trading",
    description:
      "Pakistan apparel fabric supplier for garment manufacturers worldwide. Knitted and woven fabric rolls, 80–450 GSM. OEKO-TEX, GOTS, BSCI certified. FOB / CIF export.",
    url: "https://mzglobaltrading.com/fabric/apparelfabric/",
    images: [
      {
        url: "/images/og/menu-apparelfabric.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan apparel fabric manufacturer — knitted and woven fabric rolls for garment manufacturers in USA, UK and Europe",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apparel Fabric Manufacturer Pakistan | Knitted & Woven Fabric Export | MZ Global Trading",
    description:
      "Knitted and woven apparel fabric from Pakistan's certified mills. 80–450 GSM. Single jersey, french terry, denim, twill, canvas. GOTS, OEKO-TEX certified.",
  },
};

export default function ApparelFabricPage() {
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
                name: "What is the minimum quantity for ordering apparel fabric from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Minimum quantities vary by fabric construction, GSM and colour programme — there is no single universal figure. Knitted fabric programmes (single jersey, French terry, fleece) typically have higher minimum roll quantities than woven shirting due to machine setup requirements. The most effective approach is to include your target quantity in your RFQ submission. We match you with mills whose capacity and production minimums align with your programme size and advise on the most cost-efficient structure. Buyers with smaller initial programmes are often accommodated through combined orders across similar constructions.",
                },
              },
              {
                "@type": "Question",
                name: "What knit constructions are available in organic cotton?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GOTS-certified organic cotton is available across all major knit constructions including single jersey, interlock, French terry and piqué. The key requirement is that the entire supply chain — from raw fibre to finished fabric — holds GOTS certification, which Pakistan's certified mills can provide. Organic cotton is ring-spun rather than open-end for better quality. GSM ranges are equivalent to conventional cotton. OEKO-TEX Standard 100 certified options (harmless substance test, not organic) are available more broadly across all constructions. Specify your certification requirement in your RFQ to ensure the correct mill is selected.",
                },
              },
              {
                "@type": "Question",
                name: "How is GSM measured and what tolerance is acceptable?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GSM (grams per square metre) is measured per ISO 3801 by weighing a standard circular sample cut from the fabric roll. Industry standard GSM tolerance is ±5% of the specified target — so a 200 GSM fabric would be accepted between 190 and 210 GSM. For performance programmes where weight directly affects functionality (moisture management, insulation, drape), tighter tolerance of ±3% can be specified in the technical pack. Pre-shipment test reports include GSM measurements from multiple points across the roll width and length to ensure consistency throughout the bulk.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order fabric in a custom GSM outside your standard range?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, custom GSM specifications are available within the structural capability of each construction. Single jersey can be produced from approximately 100 GSM up to 280 GSM by adjusting yarn count and loop structure. French terry ranges from 220 to 420 GSM depending on loop density. Woven constructions are adjusted through yarn count and weave density. Custom GSM specifications require a lab sample approval stage before bulk production to confirm the construction achieves the target weight consistently. Include your exact GSM target in your RFQ along with any hand-feel or performance requirements.",
                },
              },
              {
                "@type": "Question",
                name: "What is the typical lead time for apparel fabric from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times are indicative and depend on construction complexity, finishing requirements, colour programme and mill scheduling. Typical timelines: lab sample (3–5m) approximately 10–14 days from specification lock; bulk production for standard knit fabrics approximately 20–35 days from purchase order; bulk production for woven fabrics approximately 25–40 days. Special constructions, certifications (GOTS requires organic fibre sourcing time), or specific finishes extend timelines. Sea freight from Karachi to USA typically 22–28 days, UK 20–26 days, EU 18–24 days. Air freight available for urgent sample consignments. All timelines are indicative only and subject to factory scheduling, material availability and order complexity.",
                },
              },
              {
                "@type": "Question",
                name: "How are rolls inspected before shipment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pre-shipment fabric inspection follows the 4-point system (per ASTM D5430) for woven fabric and A-grade equivalent visual inspection for knitted fabric. Inspection points include: GSM measurement at start, middle and end of rolls; width measurement at multiple points; colour consistency check against approved lab dip; shade sorting across roll batches to ensure garment-to-garment consistency; surface defect check (holes, broken ends, oil marks, knots) with acceptable defect point count per 100 linear metres. A pre-shipment inspection report is issued with every bulk shipment. Third-party inspection (SGS, Bureau Veritas, Intertek) can be arranged on buyer's account if required.",
                },
              },
              {
                "@type": "Question",
                name: "Which certifications are available for apparel fabric from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pakistan's certified textile mills carry a range of third-party certifications relevant to apparel fabric export. OEKO-TEX Standard 100 is widely available across knit and woven constructions — certifies no harmful substances. GOTS (Global Organic Textile Standard) is available for organic cotton programmes from certified mills with organic fibre sourcing. GRS (Global Recycled Standard) is available for recycled polyester and recycled cotton constructions. BSCI, Sedex and ISO 9001 cover social compliance and quality management at the mill level. For EU buyers, REACH compliance documentation is available. Specify your certification requirements in your RFQ so we can match you with appropriately certified mills.",
                },
              },
              {
                "@type": "Question",
                name: "What is the roll length and width tolerance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard roll lengths are 50m, 100m, 150m and 200m per roll, with custom lengths available on request. Roll length tolerance is typically ±2% — a 100m roll will be between 98m and 102m. Width tolerance for woven fabric is ±1.5 cm of the nominal width after finishing. Knitted fabric width tolerance is ±2 cm (knit fabric has slight dimensional variability due to construction). Fabric is measured and documented on the roll ticket attached to each roll. Width consistency is particularly important for automated cutting — specify tight tolerance in your technical pack if required for automated garment manufacturing.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order greige fabric for my own dyeing programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, greige (undyed) fabric is available for buyers who operate their own dyeing facilities or prefer to outsource dyeing locally. Greige fabric provides a consistent, clean base for reliable results in your dyeing programme. Important considerations: greige fabric should be scoured (cleaned) before dyeing to remove spinning oils and sizing agents — this can be specified in the greige finishing requirements. For knitted greige, specify whether the fabric should be in tube or open-width form, and the target scoured weight. Standard certifications (OEKO-TEX, GOTS for organic greige) remain available. Greige orders typically have shorter lead times than dyed programmes.",
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
            name: "Apparel Fabric — Pakistan Knitted & Woven Fabric Export",
            description:
              "Knitted and woven apparel fabric sourced from Pakistan's certified textile mills. Single jersey, interlock, pique, French terry, fleece, twill, denim, canvas and more. 80–450 GSM. GOTS, OEKO-TEX, BSCI certified. FOB / CIF export.",
            image:
              "https://mzglobaltrading.com/images/og/menu-apparelfabric.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-fabric.webp",
              name: "Pakistan apparel fabric manufacturer — knitted and woven fabric rolls for garment manufacturers worldwide",
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
                  name: "Fabric",
                  item: "https://mzglobaltrading.com/fabric/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Apparel Fabric",
                  item: "https://mzglobaltrading.com/fabric/apparelfabric/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <ApparelFabricContent />
      </main>
      <Footer />
    </>
  );
}
