import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ShopTowelsContent from "./ShopTowelsContent";

export const metadata: Metadata = {
  title: "Shop Towels Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan shop towel manufacturer supplying heavy cotton terry and huck weave shop rags for automotive workshops, dealerships and industrial facilities. 300–450 GSM. ISO 9001, BSCI. Export to USA, Canada, UK.",
  keywords: [
    "shop towels manufacturer Pakistan",
    "shop rags wholesale Pakistan",
    "automotive shop towels supplier",
    "heavy cotton terry towels industrial",
    "bulk shop towels USA",
    "huck weave industrial towels Pakistan",
    "industrial wiper supplier Pakistan",
    "auto workshop towels export",
    "janitorial supply towels Pakistan",
  ],
  alternates: {
    canonical: "/hometextile/industriallinen/shoptowels/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/industriallinen/shoptowels/",
      "x-default": "https://mzglobaltrading.com/hometextile/industriallinen/shoptowels/",
    },
  },
  openGraph: {
    title: "Shop Towels Manufacturer Pakistan | MZ Global Trading",
    description:
      "Heavy cotton terry and huck weave shop towels from Pakistan. 300–450 GSM. Oil and grease absorbent. ISO 9001, BSCI, WRAP. Bulk export to USA automotive workshops, dealerships and industrial facilities.",
    url: "https://mzglobaltrading.com/hometextile/industriallinen/shoptowels/",
    images: [
      {
        url: "/images/og/hero-home-textiles.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan shop towel manufacturer — heavy cotton terry and huck weave shop rags for automotive and industrial buyers worldwide",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Towels Manufacturer Pakistan | MZ Global Trading",
    description:
      "Heavy cotton terry shop towels from Pakistan. 300–450 GSM. Oil-absorbent. ISO 9001, BSCI. Bulk export to USA, Canada, UK automotive and industrial sectors.",
  },
};

export default function ShopTowelsPage() {
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
                name: "What is the difference between shop towels, shop rags and industrial wipers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "These terms are largely interchangeable in the USA — the same cotton terry or huck weave wiper is called a shop towel, shop rag or industrial wiper depending on the buyer segment. 'Shop towels' and 'shop rags' are the dominant terms in US automotive retail and distribution. 'Industrial wiper' is more common in manufacturing and print industry procurement. In the UK and Australia, the same product is typically called a 'cleaning cloth' or 'cotton rag.' MZ Global Trading supplies the same heavy cotton terry construction regardless of terminology — buyers should specify GSM, weave type and quantity in their RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What construction is most suitable for oil and grease absorption in automotive applications?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Heavy cotton terry loop (300–450 GSM) is the primary construction for automotive oil and grease applications. The looped pile creates surface area that draws and holds hydrocarbons — far more effective than flat-weave cotton at equivalent weight. The loops also provide mechanical wiping action against metal surfaces. For abrasive applications where the pile might catch on metal edges, plain weave canvas-weight cotton (often called shop cloth) provides a flat, durable surface. Huck weave sits between these: the multi-thread honeycomb provides good absorbency with a more stable surface than pile terry. All three are available through MZ Global Trading — include your application in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "Can shop towels be supplied with oil-absorbent treatment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Oil-absorbent treatment enhances the natural hydrophilic absorbency of cotton for hydrocarbon liquids — improving oil, grease and solvent uptake beyond the baseline cotton performance. The treatment modifies the fibre surface to attract rather than repel oil-based fluids. This is available on heavy terry and huck weave constructions. For food processing environments where mineral oil residues are a concern, anti-bacterial treatment is available alongside the standard cotton construction. Specify finishing requirements in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What is the standard pack size for bulk automotive distribution orders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The dominant bulk pack in USA automotive distribution is dozen (12 pcs) banded — this is what janitorial supply distributors and automotive parts distributors receive. For wholesale supply chain buyers, 50-pack or 200-pack bulk carton is standard — reducing per-unit packaging cost for high-volume programmatic supply. Individual units within bulk cartons are typically plain-packed or rubber-banded per dozen. We can accommodate any pack configuration — include your distribution format (distributor/end-user/retail) in the RFQ so we can recommend the most efficient pack structure.",
                },
              },
              {
                "@type": "Question",
                name: "Are blue and white stripe shop towels available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Blue and white stripe is available in yarn-dyed production and is a widely recognised shop towel variant in USA distribution — particularly useful for product differentiation in mixed-sku distribution and colour-coding applications where different towel types are used for different fluid types (e.g., white for general, blue for coolant, red for transmission fluid). Plain white is the dominant specification and the lowest cost option. Colour stripe adds a yarn-dye step — lead times and minimum quantities may apply for non-standard colours. Specify colour requirement in RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "Which certifications apply to industrial shop towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ISO 9001 Quality Management System certification is standard — ensuring consistent production quality and documented process control across bulk orders. BSCI (Business Social Compliance Initiative) ethical audit applies to the supply network — relevant for buyers with supplier code of conduct requirements. WRAP (Worldwide Responsible Accredited Production) 12-principle compliance is available for buyers specifying manufacturing ethics in their procurement policy. OEKO-TEX Standard 100 is available for buyers in food processing or any application where chemical safety documentation is required — confirming absence of restricted substances in the finished textile.",
                },
              },
              {
                "@type": "Question",
                name: "Can custom sizing be supplied for specialist industrial applications?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Standard sizes are 35×35 cm (standard) and 40×50 cm (large). Custom dimensions are available for specialist applications — larger workshop wipes for heavy machinery, precision-cut sizes for specific industrial processes, or non-standard widths for proprietary dispensing equipment. Custom sizes typically require higher minimum quantities than standard. Include exact dimensions and intended application in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What is the indicative lead time for bulk shop towel orders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "RFQ response and quotation: 3–5 business days. Sample production: 10–15 days from specification confirmation. Bulk production: 30–45 days from purchase order placement — shop towels are a volume product and production is typically on running programmes with predictable scheduling. Sea freight transit adds 18–30 days to USA, 8–14 days to UK. For distributors with seasonal peaks, advance purchasing 60–75 days before required delivery is recommended. All timelines are indicative only and subject to order volume and factory capacity.",
                },
              },
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
            name: "Shop Towels — Pakistan Industrial Cotton Textile Manufacturing",
            description:
              "Heavy cotton terry loop and huck weave shop towels manufactured in Pakistan. 300–450 GSM. Oil and grease absorbent. Supplied in dozen, 50-pack and bulk carton to USA automotive workshops, dealerships, industrial facilities and janitorial distributors. ISO 9001, BSCI, WRAP certified.",
            image: "https://mzglobaltrading.com/images/og/hero-home-textiles.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/hero-home-textiles.webp",
              name: "Pakistan shop towel manufacturer — heavy cotton terry shop rags for automotive and industrial buyers",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
                { "@type": "ListItem", position: 3, name: "Industrial Linen", item: "https://mzglobaltrading.com/hometextile/industriallinen/" },
                { "@type": "ListItem", position: 4, name: "Shop Towels", item: "https://mzglobaltrading.com/hometextile/industriallinen/shoptowels/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <ShopTowelsContent />
      </main>
      <Footer />
    </>
  );
}
