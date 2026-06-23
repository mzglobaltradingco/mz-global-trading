import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TShirtsForKidsContent from "./TShirtsForKidsContent";

export const metadata = buildMetadata({
  title: "Kids T-Shirts Manufacturer Pakistan | OEM Children's Apparel",
  description:
    "Pakistan OEM kids T-shirts — GOTS & OEKO-TEX Class 1 organic cotton and combed jersey. Ages 0–12 years, baby-safe inks. FOB/CIF export.",
  canonical: "/apparel/babyandkids/tshirtsforkids/",
  ogImage: "/images/og/t-shirts-for-kids-og.webp",
  ogImageAlt: "Pakistan kids T-shirt manufacturer — OEM organic cotton and combed jersey children's tees for USA, UK and Europe",
  keywords: [
    "kids t-shirts manufacturer Pakistan",
    "children t-shirts wholesale Pakistan",
    "OEM baby t-shirts Pakistan",
    "GOTS certified kids apparel",
    "OEKO-TEX Class 1 children t-shirts",
    "organic cotton kids t-shirts bulk",
    "toddler t-shirts supplier Pakistan",
    "infant t-shirts OEM export",
  ],
});

export default function TShirtsForKidsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Kids T-Shirts — OEM Children's Apparel Manufacturing Pakistan",
    description:
      "Pakistan OEM kids T-shirt manufacturer producing organic cotton and combed jersey children's tees in sizes from premature to 12 years. GOTS and OEKO-TEX Class 1 certified mills. Baby-safe water-based inks and hypoallergenic finishes. Bulk programmes for USA, UK, Europe and worldwide.",
    image: "https://mzglobaltrading.com/images/og/t-shirts-for-kids-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/t-shirts-for-kids-og.webp",
      name: "Pakistan kids T-shirt manufacturer — OEM organic cotton and combed jersey children's tees for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "T-Shirts for Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/tshirtsforkids/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TShirtsForKidsContent />
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
                name: "What is OEKO-TEX Class 1 and why does it matter for baby T-shirts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "OEKO-TEX Standard 100 has four product classes based on skin contact risk. Class 1 is the most stringent — it applies to products intended for babies and toddlers under 3 years, including clothing that may be put in the mouth. It tests for 100+ harmful substances at tighter thresholds than adult clothing classes. For any T-shirt worn by infants, Class 1 certification is the international safety benchmark expected by EU, USA and Australian retailers.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between GOTS and OEKO-TEX for kids apparel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GOTS (Global Organic Textile Standard) covers the entire supply chain — from certified organic fibre farming through processing and manufacturing. It ensures the cotton is grown without synthetic pesticides and processed with GOTS-approved chemicals. OEKO-TEX Standard 100 tests the finished product for harmful substance limits, regardless of whether the fibre is organic. They serve different purposes and can both be applied: GOTS certifies the process and fibre origin; OEKO-TEX Class 1 certifies the finished garment's chemical safety.",
                },
              },
              {
                "@type": "Question",
                name: "What neckline constructions do you offer for newborn and infant T-shirts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Envelope necklines are standard for newborn and infant sizes — they expand sideways for easy dressing without pulling over a baby's head. Snap closures at the shoulder are an alternative. For toddlers aged 2 years and above, standard crew necks and V-necks are practical. We can produce tagless neck printing to eliminate the irritation of neck labels — important for sensitive baby skin. All neckline and closure specifications are developed from your tech pack or reference samples.",
                },
              },
              {
                "@type": "Question",
                name: "Can kids T-shirts be ordered as multi-pack sets with retail-ready packaging?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. 2-pack, 3-pack, 5-pack and 6-pack configurations are common in US and EU baby retail — typically with a retail header card (branded) or clear polybag with a printed insert. Gift box packaging is also available for premium baby gifting programmes. We manage the pack configuration, header card artwork production and labelling to your specification. Confirm your pack format in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What are the typical construction GSM ranges for babies versus older children?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For newborn and infant (0–12 months), 120–150 GSM single jersey or muslin gauze is preferred for warmth-climate markets; rib 140–180 GSM for temperate climates. Toddler to pre-school (1–6 years): 140–170 GSM single jersey or interlock covers year-round. School age (6–12 years): 150–180 GSM interlock or French terry for durability. Organic muslin (90–120 GSM) is available for premium summer programmes across all infant ages.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical indicative lead times from sample approval to shipment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "As an indicative guide: sample production 14–18 days from spec lock; bulk production 35–55 days from confirmed PO; pre-shipment inspection 3–5 days; sea freight 18–28 days from Karachi. OEKO-TEX test reports add 5–10 days if required as part of the shipment documentation. All timelines are indicative and depend on construction complexity, size range, decoration and factory scheduling. Your confirmed quotation includes a programme-specific timeline.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
