import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ShortsContent from "./ShortsContent";

export const metadata = buildMetadata({
  title: "Shorts Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom shorts from Pakistan's certified factories. Chino twill, ripstop, linen blend, athletic jersey and nylon swim constructions. 160–280 GSM.",
  canonical: "/apparel/wovengarments/shorts/",
  ogImage: "/images/og/shorts-og.webp",
  ogImageAlt: "Pakistan shorts manufacturer — OEM chino, ripstop and athletic shorts for wholesale buyers worldwide",
  keywords: [
    "shorts manufacturer Pakistan",
    "custom shorts OEM Pakistan",
    "chino shorts supplier Pakistan",
    "athletic shorts manufacturer",
    "swim shorts manufacturer Pakistan",
    "ripstop shorts wholesale",
    "linen shorts manufacturer Pakistan",
  ],
});

export default function ShortsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Shorts — Pakistan OEM Sourcing & Export",
            description:
              "Custom shorts sourced from Pakistan's certified factories. Seven construction types: chino twill, ripstop, canvas, linen blend, single jersey, French terry and nylon swim. 160–280 GSM. OEKO-TEX and BSCI available.",
            image: "https://mzglobaltrading.com/images/og/shorts-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
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
                  name: "Shorts",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/shorts/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/og/shorts-og.webp",
              name: "Pakistan shorts manufacturer — chino, ripstop and athletic shorts for wholesale buyers",
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
                name: "Can you source both woven and knit shorts in a single order?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. MZ Global Trading sources across woven (chino, ripstop, canvas, linen blend, nylon swim) and knit (single jersey, French terry) constructions. Mixed-construction orders can be consolidated under one purchase order and shipped together, subject to factory capability alignment.",
                },
              },
              {
                "@type": "Question",
                name: "What inseam lengths are available, and can inseam be customised?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard inseam options run from 5\" (athletic/running) through to 11\" (utility/workwear). Custom inseam lengths are available — simply specify your target in centimetres or inches when submitting your tech pack. Graded inseam adjustments across the size run are also supported.",
                },
              },
              {
                "@type": "Question",
                name: "Which construction is best for activewear vs. casual fashion shorts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For activewear and sport, single jersey (160–200 GSM) with moisture-wicking treatment or nylon (130–180 GSM) for swim are the primary builds. For casual fashion, chino twill (200–240 GSM) is the strongest performer — refined hand, wide colour range and the broadest retail positioning. Ripstop bridges the outdoor/fashion gap.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer DWR water-repellent finishing for swim and outdoor shorts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. DWR (Durable Water Repellent) coating is a standard finish option on nylon swim shorts and ripstop outdoor programmes. It is applied as a final finishing step and does not affect print or colour. Fluorocarbon-free DWR (C0 DWR) is available for buyers with PFAS-free sourcing requirements.",
                },
              },
              {
                "@type": "Question",
                name: "What certifications apply to linen blend and organic cotton shorts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GOTS certification applies to shorts made from certified organic cotton and organic linen fibres where the entire supply chain (fibre to finished garment) holds GOTS status. OEKO-TEX Standard 100 certifies the finished garment against harmful substances regardless of fibre. BCI applies to conventional (non-organic) cotton programmes with sustainability credentials.",
                },
              },
              {
                "@type": "Question",
                name: "What is the typical lead time for woven shorts programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Indicative total lead time from order confirmation to cargo-ready at Karachi port is 10–16 weeks — comprising 3–5 weeks for sampling and approval, 6–9 weeks for bulk production, and 1–2 weeks for final inspection and packing. Sea transit to USA/UK/EU adds a further 3–5 weeks. Timelines vary with programme size, construction complexity and certification requirements.",
                },
              }
            ],
          }),  
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <ShortsContent />
      </main>
      <Footer />
    </>
  );
}
