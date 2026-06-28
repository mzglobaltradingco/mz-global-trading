import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SwaddleMuslinContent from "./SwaddleMuslinContent";

export const metadata = buildMetadata({
  title: "Swaddle Muslin Fabric Manufacturer Pakistan | OEM Baby Wraps",
  description:
    "Pakistan OEM swaddle muslin wraps — GOTS certified organic cotton double gauze. 120×120 cm and custom sizes. Baby-safe azo-free dyes.",
  canonical: "/apparel/babyandkids/swaddlemuslinfabric/",
  ogImage: "/images/og/swaddle-muslin-fabric-og.webp",
  ogImageAlt: "Pakistan swaddle muslin manufacturer — GOTS organic cotton double gauze baby wraps for USA, UK and Europe",
  keywords: [
    "swaddle muslin manufacturer Pakistan",
    "muslin swaddle wrap wholesale Pakistan",
    "GOTS organic muslin baby wrap",
    "double gauze swaddle blanket OEM",
    "organic cotton muslin baby wholesale",
    "baby swaddle blanket supplier Pakistan",
    "muslin wrap OEM export Pakistan",
    "OEKO-TEX Class 1 swaddle muslin",
  ],
});

export default function SwaddleMuslinPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Swaddle Muslin Wraps — OEM Baby Textile Manufacturing Pakistan",
    description:
      "Pakistan OEM swaddle muslin wrap manufacturer producing GOTS certified organic cotton muslin and double gauze baby wraps. 90–130 GSM, 120×120 cm standard. OEKO-TEX Class 1 certified mills. Baby-safe azo-free dyes. Bulk programmes for USA, UK, Europe and worldwide baby brands.",
    image: "https://www.mzglobaltrading.com/images/og/swaddle-muslin-fabric-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://www.mzglobaltrading.com/images/og/swaddle-muslin-fabric-og.webp",
      name: "Pakistan swaddle muslin manufacturer — GOTS organic cotton double gauze baby wraps for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://www.mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://www.mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "Swaddle Muslin Fabric", item: "https://www.mzglobaltrading.com/apparel/babyandkids/swaddlemuslinfabric/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <SwaddleMuslinContent />
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
                name: "What is the difference between single muslin and double gauze for swaddles?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Single muslin is one open-weave layer — lightest (90–110 GSM), maximum airflow, ideal for warm climates and summer. Double gauze (double muslin) is two muslin layers bonded at intervals — adds gentle body and drape, still breathable, 110–130 GSM. Double gauze is the premium standard in US boutique, EU organic and Japan baby retail. Single muslin suits warm-climate markets and value programmes.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer GOTS certified organic cotton for swaddle muslin programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. GOTS-certified organic cotton is available across all muslin and double gauze constructions. We source from GOTS-certified mills and can provide transaction certificates at each supply chain stage. GOTS certification covers the full chain: certified farm → spinning → weaving → dyeing → finishing → garment. For 'organic' claims on product labels or retailer compliance requirements, GOTS certification is required — not just organic fibre content.",
                },
              },
              {
                "@type": "Question",
                name: "What print options are available and which are safest for newborn swaddles?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The safest print options for newborn swaddles: (1) Undyed / natural — no dye processing at all; (2) Yarn-dyed patterns — colour applied to yarn before weaving, no ink on the finished product; (3) Water-based screen print or DTG with GOTS-approved azo-free inks. All print on OEKO-TEX Class 1 products uses water-based reactive inks only — no plastisol PVC, no solvent inks. We recommend pre-production test reports for any print applied to infant products.",
                },
              },
              {
                "@type": "Question",
                name: "What are standard swaddle sizes and which format is most popular for US retail?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "US retail standard is 47\"×47\" (approximately 120×120 cm) — this is the dominant format in multi-pack sets sold via US baby chains and DTC brands. 50\"×50\" (127×127 cm) is a premium US boutique size. EU markets more commonly use 120×120 cm (metric equivalent). The 3-pack or 5-pack is the dominant US retail pack format with a printed header card. We produce any size to your specification.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical indicative lead times for swaddle muslin programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "As an indicative guide: sample production 14–18 days from spec lock; bulk production 30–50 days from confirmed PO (shorter than garments — no cutting and sewing complexity); pre-shipment QC 3–5 days; sea freight 18–28 days. GOTS transaction certificates add 3–5 days to documentation. OEKO-TEX test reports 5–10 days if required. All timelines are indicative and depend on construction, print complexity, quantity and factory scheduling.",
                },
              }
            ],
          }),  
        }}
      />
    </>
  );
}
