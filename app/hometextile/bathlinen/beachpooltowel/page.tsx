import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BeachTowelsContent from "./BeachTowelsContent";

export const metadata = buildMetadata({
  title: "Beach & Pool Towel Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source OEM beach and pool towels from Pakistan — velour, fouta, microfiber, 350–500 GSM. Sublimation all-over print. GOTS, OEKO-TEX certified.",
  canonical: "/hometextile/bathlinen/beachpooltowel/",
  ogImage: "/images/og/beach-pool-towels-og.webp",
  ogImageAlt: "Pakistan beach towel manufacturer — OEM velour and sublimation print pool towels for resorts and retailers worldwide",
  keywords: [
    "beach towel manufacturer Pakistan",
    "pool towel OEM Pakistan",
    "velour beach towel wholesale",
    "sublimation beach towel supplier",
    "fouta towel manufacturer Pakistan",
    "resort towel bulk supplier",
    "beach towel export Pakistan",
    "OEM beach towel factory Pakistan",
  ],
});

export default function BeachPoolTowelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Beach & Pool Towels — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM beach and pool towel manufacturer. Velour one-sided and both-sided, terry loop, microfiber and fouta/pestemal. 350–500 GSM. Sublimation all-over print, reactive print and yarn-dyed stripe. GOTS and OEKO-TEX certified.",
    image:
      "https://mzglobaltrading.com/images/og/beach-pool-towels-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl:
        "https://mzglobaltrading.com/images/og/beach-pool-towels-og.webp",
      name: "Pakistan beach towel manufacturer — OEM velour and sublimation print pool towels for resorts and retailers worldwide",
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
          name: "Bath Linen",
          item: "https://mzglobaltrading.com/hometextile/bathlinen/",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Beach & Pool Towels",
          item: "https://mzglobaltrading.com/hometextile/bathlinen/beachpooltowel/",
        },
      ],
    },
  };

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
                name: "What is the difference between sublimation print and reactive print for beach towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sublimation bonds dye into the fibre at high temperature — it achieves photographic all-over imagery but requires a 100% polyester face (velour polyester or microfiber). Reactive print uses dye chemistry applied to the fabric surface and is compatible with cotton — it produces rich, deep colours with excellent wash fastness but cannot replicate photographic detail. The choice is determined by your fabric construction: photographic resort identity programmes use sublimation on polyester velour; geometric repeat patterns on cotton terry use reactive print.",
                },
              },
              {
                "@type": "Question",
                name: "What is a fouta or pestemal towel, and which hospitality programmes use them?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Fouta (also called pestemal or hammam towel) is a flat-woven cotton textile — no pile, no looping, no shearing. It originated in Turkish hammam culture and is now a premium segment in boutique hospitality and beach lifestyle retail. Fouta dries in under an hour, weighs 40–50% less than equivalent cotton terry, and folds to a fraction of the size. EU boutique hotels, Australian beach lifestyle brands and premium spa programmes are the primary buyers. Yarn-dyed stripe and jacquard woven are the only decoration options — sublimation and reactive print are not compatible with flat woven construction.",
                },
              },
              {
                "@type": "Question",
                name: "What does chlorine and salt-resistant finishing do, and is it recommended for pool towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Chlorine and salt-resistant finishing applies a chemical treatment that slows dye fading and fibre degradation caused by pool chlorination and seawater exposure. For pool-side programmes where towels are used daily in chlorinated water environments, this finishing significantly extends usable life and maintains colour vibrancy through repeated laundering. It is particularly recommended for hotel and resort programmes with high-rotation inventory where replacement cost is a commercial factor. It adds a small cost premium per unit and is available on velour and terry constructions.",
                },
              },
              {
                "@type": "Question",
                name: "Can you produce branded all-over print beach towels for a resort property launch?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. All-over sublimation print on velour one-sided construction is the standard specification for resort identity programmes. The process requires your brand artwork in a high-resolution vector or raster file (300 DPI minimum at print size), confirmation of towel dimensions, and fabric composition confirmation (100% polyester face required for sublimation). Strike-off samples are produced before bulk. Indicative lead time from artwork approval to bulk ex-factory is 50–70 working days — actual timeline depends on print complexity, quantity and mill scheduling.",
                },
              },
              {
                "@type": "Question",
                name: "What sizes are available and can oversized 100×180 cm be produced at volume?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard sizes are 75×150 cm, 90×170 cm, 100×180 cm, 60×120 cm (kids) and custom. The 100×180 cm oversized dimension is a regular programme size for luxury hotel and premium retail — it is not a special order. All standard sizes are production-capable at volume. Custom dimensions can be accommodated for branded programmes with confirmed order quantities. Fouta programmes typically run in standard pair dimensions.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical indicative lead times for a beach towel print programme from artwork approval?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Indicative lead times from artwork approval: sublimation print programme — 40–55 working days to ex-factory; reactive print programme — 35–50 working days. Sea freight to USA or Europe adds 20–30 working days depending on routing. These are indicative estimates based on typical production scheduling. Actual timelines depend on construction, quantity, factory capacity and seasonal demand. All timelines are confirmed at quotation stage before purchase order placement.",
                },
              }
            ],
          }),  
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MegaMenu />
      <main id="main-content">
        <BeachTowelsContent />
      </main>
      <Footer />
    </>
  );
}
