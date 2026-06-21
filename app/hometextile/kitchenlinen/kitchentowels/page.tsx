import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import KitchenTowelsContent from "./KitchenTowelsContent";

export const metadata: Metadata = {
  title: "Kitchen Towels Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan kitchen towel manufacturer: waffle, huck weave, terry and plain weave. 150–250 GSM, yarn-dyed programmes. OEKO-TEX, BSCI. Export to USA, UK, EU, Middle East.",
  keywords: [
    "kitchen towels manufacturer Pakistan",
    "kitchen towels wholesale Pakistan",
    "waffle kitchen towels supplier",
    "huck weave kitchen towels Pakistan",
    "tea towels manufacturer Pakistan",
    "OEM kitchen towels Pakistan",
    "hospitality kitchen towels supplier",
    "dish towels wholesale Pakistan",
    "OEKO-TEX kitchen towels Pakistan",
  ],
  alternates: {
    canonical: "/hometextile/kitchenlinen/kitchentowels/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/kitchenlinen/kitchentowels/",
      "x-default":
        "https://mzglobaltrading.com/hometextile/kitchenlinen/kitchentowels/",
    },
  },
  openGraph: {
    title: "Kitchen Towels Manufacturer Pakistan | MZ Global Trading",
    description:
      "Kitchen towels sourced from Pakistan's certified textile mills. Waffle, huck weave, terry and plain weave. 150–250 GSM. Yarn-dyed stripe and check programmes. OEKO-TEX, BSCI. FOB / CIF export.",
    url: "https://mzglobaltrading.com/hometextile/kitchenlinen/kitchentowels/",
    images: [
      {
        url: "/images/og/kitchen-towels-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan kitchen towels manufacturer — waffle, huck weave and terry kitchen towels for retail and hospitality buyers in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Towels Manufacturer Pakistan | MZ Global Trading",
    description:
      "Kitchen towels from Pakistan: waffle, huck weave, terry. 150–250 GSM. Yarn-dyed stripe/check programmes. OEKO-TEX, BSCI. FOB export to USA, UK, EU.",
  },
};

export default function KitchenTowelsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Kitchen Towels — Pakistan Manufacturer & Exporter",
            description:
              "Kitchen towels sourced from Pakistan's certified textile mills. Waffle/honeycomb, huck weave, plain weave and terry loop constructions. 150–250 GSM. Yarn-dyed stripe and check decoration. OEKO-TEX, BSCI, ISO 9001. FOB/CIF export to USA, UK, EU, Middle East and worldwide.",
            image:
              "https://mzglobaltrading.com/images/og/kitchen-towels-og.webp",
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
                "https://mzglobaltrading.com/images/og/kitchen-towels-og.webp",
              name: "Pakistan kitchen towels manufacturer — waffle and huck weave kitchen towels for retail and hospitality buyers",
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
                  name: "Kitchen Towels",
                  item: "https://mzglobaltrading.com/hometextile/kitchenlinen/kitchentowels/",
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
                name: "What is the difference between waffle weave and huck weave kitchen towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Waffle weave (honeycomb) has a raised grid cell pattern that creates air pockets for rapid moisture absorption and quick drying — this is the dominant construction for retail kitchen and tea towel programmes globally. Huck weave uses a multi-float thread structure that creates a slightly pebbled surface texture with exceptional scrubbing and wiping performance — this is the preferred construction for commercial foodservice and institutional buyers. Both constructions are available at 150–250 GSM depending on end-use requirement.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM should I specify for a retail kitchen towel programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For retail programmes targeting USA, UK and EU grocery and kitchenware buyers, 160–200 GSM is the standard retail specification range. Within this, 180 GSM is the most commonly ordered specification — it provides good hand-feel and absorbency while keeping weight and shipping cost at an optimal level for retail price positioning. For upmarket retail or premium gift set programmes, 200–220 GSM delivers a more substantial hand-feel. For commercial or institutional use where durability under repeated laundering is the priority, 220–250 GSM is recommended.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get OEKO-TEX certified kitchen towels from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pakistan's kitchen towel factories carry OEKO-TEX Standard 100 certification — this is a standard requirement for EU and UK retail buyers and is readily available across all constructions and GSM weights. GOTS certification is available for 100% organic cotton kitchen towel programmes. BSCI and Sedex are standard on all factory audits. For buyers in markets where chemical safety compliance is a hard import requirement — particularly Germany, France and Scandinavia — we recommend specifying OEKO-TEX as a mandatory requirement in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What decoration options are available for branded kitchen towel programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yarn-dyed stripe and check is the primary decoration method for kitchen towels — the pattern is woven into the fabric rather than printed, which gives superior wash durability and a premium hand. Full-face reactive printing is available for photographic or complex multi-colour artwork programmes. Embroidery is used for logo placement on plain-ground or striped towels — typically corner or border positioning. Screen print is suitable for bold, limited-colour artwork on plain ground constructions. All decoration methods are available with lab dip or strike-off approval before bulk production.",
                },
              },
              {
                "@type": "Question",
                name: "What standard sizes are available for kitchen towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our standard size range for kitchen towels covers: Small 40×60 cm (suitable for retail multipacks and promotional programmes), Standard 45×65 cm (the dominant retail specification for USA, UK and EU buyers), and Large 50×70 cm (premium retail and hospitality). Custom dimensions are available for institutional programmes — include your required size in the RFQ. A ±2 cm manufacturing tolerance applies to all finished dimensions. EU and UK buyers often specify centimetres while USA buyers commonly reference inch equivalents — we can work to either measurement system.",
                },
              },
              {
                "@type": "Question",
                name: "How should I order kitchen towels — by piece, pack or dozen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The packing and ordering unit depends on the end channel. Retail buyers typically order in pieces packed as 2-packs or 4-packs with a header card or polybag — these are the standard shelf-ready formats for grocery and kitchenware retail. Foodservice and institutional buyers typically order in dozens (12 pcs per bundle) in bulk cartons. Promotional and corporate gifting buyers often require individual polybag packing per piece. We can pack to any of these configurations — specify your required packing format in the RFQ and we will confirm cost and lead time accordingly.",
                },
              },
              {
                "@type": "Question",
                name: "What is the minimum order quantity for kitchen towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Minimum programme sizes vary by construction, colourway count and factory. Yarn-dyed stripe and check programmes typically require larger quantities per colourway due to the loom set-up cost, while plain-ground or printed towels are more flexible on programme size. The most effective approach is to include your target quantity in your RFQ — we match you with factories whose capacity structure aligns with your programme size and can advise on quantity breaks where pricing improves.",
                },
              },
              {
                "@type": "Question",
                name: "What is the typical lead time from order to delivery?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times are indicative and subject to factory scheduling, material availability and order complexity. As a general guide: RFQ response and quotation take 3–5 working days; pre-production samples take 15–20 days from specification confirmation; bulk production takes 30–50 days depending on quantity and construction; sea freight from Karachi adds 18–25 days to USA/UK/EU ports. We recommend buyers allow a minimum of 90 days from RFQ submission to in-warehouse receipt for their first programme, reducing to 75 days for repeat orders once the factory relationship is established.",
                },
              },
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <KitchenTowelsContent />
      </main>
      <Footer />
    </>
  );
}
