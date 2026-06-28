import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import IhramContent from "./IhramContent";

export const metadata = buildMetadata({
  title: "Ihram Sets Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan ihram manufacturer supplying plain white cotton ihram sets for Hajj and Umrah. Three weave constructions: plain weave, terry, dobby stripe.",
  canonical: "/hometextile/ihram/",
  ogImage: "/images/og/ihram-og.webp",
  ogImageAlt: "Pakistan ihram manufacturer — plain white cotton ihram sets for Hajj and Umrah pilgrims worldwide",
  keywords: [
    "ihram manufacturer Pakistan",
    "ihram sets wholesale Pakistan",
    "hajj ihram supplier Pakistan",
    "white cotton ihram export",
    "umrah ihram manufacturer",
    "ihram fabric Pakistan",
    "bulk ihram sets supplier",
    "OEKO-TEX ihram manufacturer",
    "hajj operator ihram supply",
  ],
});

export default function IhramPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Ihram Sets — Plain White Cotton for Hajj & Umrah",
            description:
              "Plain white cotton Ihram sets manufactured in Pakistan's certified weaving mills. Supplied as two unstitched panels per pair (Rida + Izar). Plain weave, terry weave and dobby stripe cotton. 200–350 GSM. OEKO-TEX Standard 100. Export to Saudi Arabia, UAE, Malaysia, Indonesia, UK and worldwide.",
            image: "https://www.mzglobaltrading.com/images/og/ihram-og.webp",
            provider: { "@id": "https://www.mzglobaltrading.com/#organization" },
            serviceType: "Textile Sourcing",
            areaServed: "Worldwide",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://www.mzglobaltrading.com/images/og/ihram-og.webp",
              name: "Pakistan ihram manufacturer — plain white cotton ihram sets for Hajj and Umrah pilgrims worldwide",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://www.mzglobaltrading.com/hometextile/" },
                { "@type": "ListItem", position: 3, name: "Ihram", item: "https://www.mzglobaltrading.com/hometextile/ihram/" },
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
                name: "What makes an Ihram Shariah-compliant in terms of fabric construction?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Shariah requires Ihram to be unstitched (not sewn into a garment), undyed (white or unbleached natural cotton only) and free from all decoration — no embroidery, print, pattern or ornamentation. MZ Global Trading supplies Ihram as two separate unstitched fabric panels: the Rida (upper body drape) and the Izar (lower body wrap). Both are woven, optically bleached to ≥90 CIE whiteness, and supplied without any coloured thread, dye or applied decoration. The Dobby Stripe option uses a white-on-white woven texture variation — not a colour stripe — to maintain compliance. Our manufacturing processes are specifically designed to preserve these requirements throughout every production stage.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM is suitable for pilgrims travelling to Saudi Arabia in summer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For summer Hajj and Umrah in Saudi Arabia, where ambient temperatures in Makkah and Madinah regularly exceed 40°C, we recommend the 150–200 GSM lightweight range in plain weave or lightweight terry construction. At this weight, a standard 45\"×90\" pair weighs approximately 800–1,050 g — light enough for extended outdoor wear in peak heat while maintaining adequate coverage. The plain weave at 160–180 GSM is the most comfortable for summer use. For year-round programmes and the dominant wholesale specification, 200–280 GSM is the standard tier — a 45\"×90\" pair weighs approximately 1,050–1,460 g and provides better durability for multi-day wear. For winter Umrah, where evening temperatures in Makkah and Madinah can drop significantly, 300–400 GSM is recommended for additional fabric body and warmth.",
                },
              },
              {
                "@type": "Question",
                name: "Can you supply Ihram sets with our company branding on the packaging?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Branding is permitted on the packaging — the religious restriction applies to the Ihram fabric itself, not to the container. We offer retail poly packs with custom header card printing, allowing hajj operators, hotels and Islamic retailers to include their logo, contact information and product description. Custom poly bags with printed graphics are also available for premium programmes. The Ihram fabric inside remains fully compliant: white, unstitched, undecorated. For government ministry or institutional procurement where a neutral or ministry-branded presentation is required, we supply in plain pair pack or unbranded bulk carton with standard documentation.",
                },
              },
              {
                "@type": "Question",
                name: "What is the standard size for an Ihram pair and do you offer custom sizing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The standard adult Ihram is 45\" × 90\" per piece (approximately 114 × 229 cm), which is the dominant wholesale specification globally — confirmed by the majority of bulk buyers and Hajj operator procurement programmes. We offer four size options: Kids pair at 30\" × 60\" (76 × 152 cm) for children aged approximately 4–10; Youth pair at 40\" × 80\" (102 × 203 cm) for older boys and teens aged approximately 10–16; Standard pair at 45\" × 90\" (114 × 229 cm) for adult males; and Large pair at 46\" × 92\" (117 × 234 cm) for taller or broader adults above 185 cm. All dimensions refer to each individual unstitched panel — every set comprises two identical pieces (Rida + Izar). A ±2 cm manufacturing tolerance applies. Non-standard dimensions are available for institutional programmes — include your required piece dimensions in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "Which certifications are required for government ministry procurement?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Government ministry and institutional procurement typically requires ISO 9001 Quality Management System certification as the minimum, alongside full test reports for whiteness (CIE), shrinkage (ISO 6330) and tensile strength (ISO 13934-1). For markets where chemical safety compliance is scrutinised — particularly Malaysia, Indonesia and European markets — OEKO-TEX Standard 100 Class 1 is frequently required in procurement specifications. BSCI or Sedex audit compliance is increasingly asked for by government buyers who include supply chain ethical standards in their tender criteria. We can provide documentation for ISO 9001, OEKO-TEX, BSCI and Sedex across our Ihram supply network.",
                },
              },
              {
                "@type": "Question",
                name: "How is whiteness grade tested and documented for Ihram fabric?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Whiteness is measured using a spectrophotometer calibrated to ISO 2469 standards. Our target specification is ≥90 CIE whiteness with a batch-to-batch tolerance of ±3 CIE units to ensure consistency across shipments. Each bulk shipment is accompanied by a whiteness test report issued by the manufacturing facility, with shade cards provided as a physical reference. For institutional or government procurement where independent third-party testing is required, we can arrange testing through SGS, Bureau Veritas or Intertek prior to shipment. Shade cards are issued with each shipment to allow the buyer to verify colour consistency on arrival.",
                },
              },
              {
                "@type": "Question",
                name: "What packing format is used for bulk hajj operator orders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bulk hajj operator orders are typically packed in export cartons of 24 or 48 pairs per carton, depending on size and GSM. Within each carton, Ihram sets are individually folded in sealed polybags (pair pack format: Rida + Izar together). This allows easy individual distribution to pilgrims at the operator's premises or during Hajj orientation sessions. Cartons are marked with standard export information: item description, quantity, size, weight, country of origin and shipping marks. For mixed-size orders, each size can be packed in separately marked cartons or combined with clear inner bundle separation.",
                },
              },
              {
                "@type": "Question",
                name: "What is the typical lead time from order placement to delivery?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times depend on quantity, construction and current factory capacity. As a general guide: sample production takes 10–15 days from specification confirmation; bulk production typically takes 25–45 days from purchase order placement depending on order volume. Sea freight transit adds 8–35 days depending on destination: 8–12 days to UAE, 12–18 days to Saudi Arabia, 12–16 days to Malaysia, 20–28 days to the UK. For large Hajj season orders, we strongly recommend placing orders a minimum of 90 days before the required delivery date. Lead times are indicative only and subject to factory scheduling, material availability and order complexity.",
                },
              },
              {
                "@type": "Question",
                name: "Is organic cotton Ihram available and which certifications apply?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. GOTS-certified (Global Organic Textile Standard) organic cotton Ihram is available. GOTS certification covers the entire supply chain from organic farming through spinning, weaving, bleaching and packing — ensuring the organic claim is fully substantiated and auditable. Organic cotton Ihram is primarily sourced for premium retail programmes, gift sets and buyers whose commitments require certified organic textile inputs. In addition to GOTS, OEKO-TEX Standard 100 Class 1 applies to all Ihram supply — organic and conventional — ensuring the absence of harmful substances regardless of cotton origin.",
                },
              }
            ],
          }),  
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <IhramContent />
      </main>
      <Footer />
    </>
  );
}
