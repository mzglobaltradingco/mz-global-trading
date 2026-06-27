import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BedsheetContent from "./BedsheetContent";

export const metadata = buildMetadata({
  title: "Bedsheets Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan bedsheet manufacturer for wholesale buyers in USA, UK and Europe. Percale, sateen, jacquard and microfiber. GOTS, OEKO-TEX certified. FOB/CIF export.",
  canonical: "/hometextile/bedlinen/bedsheets/",
  ogImage: "/images/og/bedsheets-og.webp",
  ogImageAlt: "Pakistan bedsheet manufacturer — wholesale cotton percale and sateen sheets for USA, UK and Europe",
  keywords: [
    "bedsheets manufacturer Pakistan",
    "cotton bedsheets wholesale",
    "percale sheets supplier",
    "sateen sheets manufacturer",
    "custom bedsheets export Pakistan",
    "hotel bedsheets wholesale",
  ],
});

export default function BedsheetPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <BedsheetContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Bedsheets — Pakistan Home Textile Export",
            description:
              "Wholesale bedsheets manufactured in Pakistan. Percale, sateen, jacquard, oxford, flannel, linen, microfiber and jersey knit. 200–600 TC. GOTS, OEKO-TEX, BSCI certified. FOB/CIF export.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-bedsheets.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-bedsheets.webp",
              name: "Pakistan bedsheet manufacturer — cotton percale and sateen sheets wholesale export",
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
                  name: "Bed Linen",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Bedsheets",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/bedsheets/",
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
                name: "What thread count should I order for retail bedsheets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For mainstream retail programmes, 300–400 TC percale is the industry standard — it balances hand feel, durability and price point. For premium retail, 400–600 TC sateen delivers the smooth, silky surface associated with luxury bedding. A key buyer note: thread count above 400 does not automatically mean softer — yarn quality (combed vs carded cotton, ring-spun vs open-end) matters more than the raw TC number.",
                },
              },
              {
                "@type": "Question",
                name: "What's the difference between percale and sateen bedsheets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Percale uses a one-over-one-under plain weave — the result is a crisp, matte surface that feels cool to the touch and stays crisp after washing. Sateen uses a four-over-one-under weave — more thread surface is exposed, creating a silky sheen and smooth drape. Percale is the dominant construction for USA hotel programmes and UK mainstream retail. Sateen dominates European premium retail and luxury hotel collections.",
                },
              },
              {
                "@type": "Question",
                name: "Can you supply both UK and US standard bed sizes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. All standard sizes are available: US (Twin through Cal King), UK (Single through Super King), European (EU Single 140×200cm through EU Super King 240×220cm), and custom dimensions. We recommend confirming your actual mattress dimensions before locking cut specs — UK and EU nominal sizes can vary slightly between markets.",
                },
              },
              {
                "@type": "Question",
                name: "Are your Pakistan bedsheets OEKO-TEX certified?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. OEKO-TEX Standard 100 is available across all standard constructions. GOTS certification is available for 100% organic cotton variants. For EU and UK buyers where chemical compliance is scrutinised at import — particularly for bedding in contact with skin — we recommend specifying OEKO-TEX as a hard requirement in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What order quantities work for custom bedsheet programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Order quantities vary significantly depending on fabric construction, colour programme, factory scheduling and seasonal demand. There is no single universal figure. The best approach is to include your target quantity in your RFQ. We match you with factories whose production capacity aligns with your programme size, and can advise on the most cost-efficient quantity structure for your specific construction and colour combination.",
                },
              },
              {
                "@type": "Question",
                name: "How long does a custom bedsheet sample take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "15–20 days from specification lock and fabric approval for percale and sateen. Jacquard patterns require loom programming before sampling begins — allow an additional 5–10 days. For colour-critical programmes, lab dip approval should be completed before sampling commences to avoid rework.",
                },
              },
              {
                "@type": "Question",
                name: "Can you source microfiber bedsheets for budget hospitality programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Microfiber (100% polyester) bedsheets at 80–120 GSM are available for budget hospitality, institutional and high-volume programmes. Microfiber is measured in GSM rather than thread count, dries faster than cotton and requires no ironing — making it the preferred specification for high-turnover hotel programmes in the Middle East, Southeast Asia and South America. Note that microfiber is not eligible for GOTS or organic cotton certification; OEKO-TEX Standard 100 applies for chemical safety compliance.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between woven and knitted bedsheets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Woven bedsheets (percale, sateen, jacquard, oxford, flannel, linen) are made on looms by interlacing warp and weft threads — the result is a structured, dimensionally stable fabric measured in thread count. Knitted bedsheets (jersey knit) are made by interlocking yarn loops — the same process as T-shirt fabric — producing a stretchy, soft sheet measured in GSM. Woven constructions dominate hotel and retail programmes for their durability and crispness. Jersey knit is preferred in DTC casual bedding and children's ranges for its stretch, softness and ease of use.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
