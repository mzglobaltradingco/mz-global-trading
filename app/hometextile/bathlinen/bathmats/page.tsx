import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BathMatsContent from "./BathMatsContent";

export const metadata = buildMetadata({
  title: "Bath Mat Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source OEM bath mats from Pakistan — tufted terry, chenille and memory foam, 800–1500 GSM, latex and rubber spray anti-slip backing.",
  canonical: "/hometextile/bathlinen/bathmats/",
  ogImage: "/images/og/bath-mats-og.webp",
  ogImageAlt: "Pakistan bath mat manufacturer — OEM anti-slip tufted and chenille bath mats for hotels and retailers worldwide",
  keywords: [
    "bath mat manufacturer Pakistan",
    "anti-slip bath mat OEM Pakistan",
    "hotel bath mat supplier Pakistan",
    "tufted bath mat wholesale",
    "chenille bath mat manufacturer",
    "bath mat bulk supplier Pakistan",
    "custom bath mats OEM export",
    "OEKO-TEX bath mat manufacturer",
  ],
});

export default function BathMatsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bath Mats — OEM Anti-Slip Manufacturing Pakistan",
    description:
      "Pakistan OEM bath mat manufacturer producing tufted terry, chenille, memory foam and microfiber bath mats with latex and rubber spray anti-slip backing. 800–1500 GSM. Hotel, healthcare and retail programmes for USA, UK, Europe and worldwide.",
    image: "https://mzglobaltrading.com/images/og/bath-mats-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/bath-mats-og.webp",
      name: "Pakistan bath mat manufacturer — OEM anti-slip tufted and chenille bath mats for hotels and retailers worldwide",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
        { "@type": "ListItem", position: 3, name: "Bath Linen", item: "https://mzglobaltrading.com/hometextile/bathlinen/" },
        { "@type": "ListItem", position: 4, name: "Bath Mats", item: "https://mzglobaltrading.com/hometextile/bathlinen/bathmats/" },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MegaMenu />
      <main id="main-content">
        <BathMatsContent />
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
                name: "What is the difference between latex and rubber spray anti-slip backing for hotel bath mats?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Latex backing is a continuous vulcanised layer — it maintains grip performance across 150+ industrial wash cycles at 85°C, making it the specification standard for hotel and healthcare contracts where slip risk creates liability. Rubber spray backing is a cost-effective alternative suited to domestic retail programmes — adequate for 80–100 wash cycles but degradation is faster under industrial laundering conditions. For any programme where buyer liability or duty-of-care applies, latex is the required specification.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM is right for a hotel bath mat that will go through industrial laundering?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Hotel contract bath mats are typically specified at 1000–1200 GSM in tufted terry. This weight band balances pile density (for absorbency and appearance), structural integrity under repeated industrial washing at 85°C, and cost-per-cycle economics. Mats below 800 GSM tend to show pile loss after 100–150 washes. Above 1200 GSM, drying time increases, adding cost to laundry operations. 1000–1200 GSM is the industry sweet spot for 4- and 5-star hotel contracts.",
                },
              },
              {
                "@type": "Question",
                name: "Can bath mats be produced as a coordinated set with a toilet mat or pedestal mat?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Two-piece bathroom sets (bath mat + toilet mat / pedestal mat) are a standard programme structure for retail and hospitality buyers. Both pieces are produced from the same fabric lot to ensure colour consistency. Set dimensions are specified independently — typically 50×80 cm bath mat paired with a 40×60 cm or 45×45 cm pedestal/toilet mat. Retail set packaging (gift box or polybag multi-pack) is available alongside individual unit packing.",
                },
              },
              {
                "@type": "Question",
                name: "What is the correct bath mat specification for healthcare facilities?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Healthcare bath mat specifications prioritise verifiable slip resistance (EN 13893 or ASTM F462 certification for the backing), infection control (OEKO-TEX certified chemicals, no antimicrobial residues banned under EU biocide regulations) and laundering robustness (rated for repeated high-temperature cycles). Latex backing is mandatory for healthcare applications. Plain white or institutional colour — no decorative pile patterns. Tufted terry loop at 1000–1200 GSM is the standard healthcare specification.",
                },
              },
              {
                "@type": "Question",
                name: "Are custom sizes available, and what are the lead time implications?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Custom sizes are available — the most common custom requests are from hotel fit-out projects (bespoke dimensions matching bathroom layouts), healthcare facilities (to clear door clearances and wet-room drainage configurations) and luxury residential programmes. Custom sizing adds 5–7 days to the sampling timeline due to custom cutting and pattern setup. There is no additional unit cost beyond sampling setup for quantities above a programme-viable volume. Specify custom dimensions precisely in the RFQ including any corner cutout requirements.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical indicative lead times from sample approval to shipment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "As an indicative guide: sample production 14–21 days from specification lock; backing approval 3–5 days; bulk production 45–60 days from confirmed PO; pre-shipment QC 3–5 days. These timelines are indicative and vary with construction complexity, custom dimensions, pattern requirements, quantity and factory scheduling. Bath mat programmes have a longer sampling cycle than lighter knitwear because backing adhesion and pile density require physical testing before bulk approval. Your confirmed quotation will include a programme-specific production schedule.",
                },
              }
            ],
          }),  
        }}
      />
    </>
  );
}
