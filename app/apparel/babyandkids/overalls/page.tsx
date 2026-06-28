import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import OverallsContent from "./OverallsContent";

export const metadata = buildMetadata({
  title: "Baby & Kids Overalls Manufacturer Pakistan | OEM Dungarees",
  description:
    "Pakistan OEM baby and kids overalls — denim, canvas and corduroy dungarees from 0–12 years. GOTS & OEKO-TEX certified. Adjustable straps, snap crotch.",
  canonical: "/apparel/babyandkids/overalls/",
  ogImage: "/images/og/overalls-og.webp",
  ogImageAlt: "Pakistan baby and kids overalls manufacturer — OEM denim and canvas dungarees for USA, UK and Europe",
  keywords: [
    "baby overalls manufacturer Pakistan",
    "kids dungarees OEM Pakistan",
    "denim overalls wholesale Pakistan",
    "children overalls supplier Pakistan",
    "GOTS certified baby overalls",
    "canvas dungarees OEM export",
    "infant overalls manufacturer Pakistan",
    "toddler dungarees bulk order",
  ],
});

export default function OverallsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Baby & Kids Overalls — OEM Dungarees Manufacturing Pakistan",
    description:
      "Pakistan OEM baby and kids overalls manufacturer producing denim, canvas and corduroy dungarees from newborn to 12 years. Adjustable straps, snap crotch for diaper access, GOTS and OEKO-TEX Class 1 certified mills. Bulk programmes for USA, UK, Europe and worldwide.",
    image: "https://www.mzglobaltrading.com/images/og/overalls-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://www.mzglobaltrading.com/images/og/overalls-og.webp",
      name: "Pakistan baby and kids overalls manufacturer — OEM denim and canvas dungarees for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://www.mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://www.mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "Overalls", item: "https://www.mzglobaltrading.com/apparel/babyandkids/overalls/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <OverallsContent />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What are the essential design features for infant and baby overalls?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Snap crotch closure is non-negotiable for infant and toddler sizes (0–3 years) — it allows diaper changes without undressing the baby. Adjustable shoulder straps (button, clip or elastic loop) accommodate rapid growth. Wide leg openings help for pull-up access in older toddlers. Envelope-style or wide bib necklines allow the garment to be put on over the head without the baby's arms in — standard for newborn and infant sizes. All hardware (snaps, buttons, clips) must be OEKO-TEX tested for heavy metal limits.",
                },
              },
              {
                "@type": "Question",
                name: "What denim weight is right for baby overalls versus older children?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For infant and toddler sizes (0–3 years): 7–9 oz stretch denim (98/2 cotton-spandex) is preferred — stretch provides comfort during crawling and diaper changes. For pre-school and school-age (3–12 years): 9–12 oz rigid denim or stretch denim works well. Heavier weights (10–12 oz) are typically restricted to older kids (6+) where the additional structure is practical rather than restricting. Corduroy (8–10 wale) and canvas (240–280 GSM) are good alternatives to denim for infant and toddler — they are softer and easier to move in.",
                },
              },
              {
                "@type": "Question",
                name: "Can overalls be produced in organic cotton or linen for eco-conscious brands?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. GOTS-certified organic cotton denim is available for both stretch and rigid constructions — full chain-of-custody documentation from certified farm through weaving and garment production. GOTS-certified organic linen and linen-cotton blends are available for summer and warm-weather overalls programmes. For any 'organic' claim on product labelling or retailer compliance, GOTS certification at the garment level is required — not just organic fibre content.",
                },
              },
              {
                "@type": "Question",
                name: "What wash treatments are available for denim overalls?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard washes: stone wash (medium-dark to light blue), enzyme wash (softer hand, subtle fade), sand wash (even fade, smooth surface), overdye (coloured over indigo for fashion tones). Eco alternatives: enzyme wash replaces pumice stone reducing water consumption; laser distress creates fading and whiskering effects without chemical spray. Raw/unwashed is available for darker indigo and rigid denim programmes. Wash approval is always required before bulk — denim wash results vary between fabric lots and water chemistry.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical indicative lead times for overalls from sample approval to shipment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "As an indicative guide: sample production 14–21 days from spec lock (denim wash development adds time versus non-washed constructions); bulk production 40–60 days from confirmed PO; pre-shipment QC 3–5 days including hardware pull-test; sea freight 18–28 days from Karachi. GOTS transaction certificates add 3–5 days to documentation. All timelines are indicative and depend on construction, wash complexity, embroidery/appliqué and quantity.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
