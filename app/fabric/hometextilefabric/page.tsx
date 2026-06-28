import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HomeTextileFabricContent from "./HomeTextileFabricContent";

export const metadata = buildMetadata({
  title: "Home Textile Fabric Supplier Pakistan | MZ Global Trading",
  description:
    "Pakistan home textile fabric supplier for towel, bedding and linen manufacturers in USA, UK and Europe. Terry, percale, sateen. OEKO-TEX certified.",
  canonical: "/fabric/hometextilefabric/",
  ogImage: "/images/og/home-textile-fabric-og.webp",
  ogImageAlt: "Pakistan home textile fabric manufacturer — terry and woven fabric for towel and bedding manufacturers in USA, UK and Europe",
  keywords: [
    "home textile fabric manufacturer Pakistan",
    "terry fabric supplier Pakistan",
    "woven bedding fabric Pakistan",
    "percale fabric wholesale Pakistan",
    "sateen fabric manufacturer Pakistan",
    "terry loop fabric supplier",
    "zero twist fabric Pakistan",
    "jacquard bedding fabric Pakistan",
    "GOTS certified textile fabric Pakistan",
    "home textile fabric export Pakistan",
  ],
});

export default function HomeTextileFabricPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Home Textile Fabric — Pakistan Terry & Woven Fabric Export",
            description:
              "Terry loop, velour, zero twist and woven home textile fabric from Pakistan's certified mills. Percale, sateen, jacquard, flannel and plain weave for bedding manufacturers. GSM 300–800 (terry), TC 200–800 (woven). GOTS, OEKO-TEX, BSCI certified. FOB / CIF export.",
            image:
              "https://www.mzglobaltrading.com/images/og/home-textile-fabric-og.webp",
            provider: { "@id": "https://www.mzglobaltrading.com/#organization" },
            serviceType: "Textile Sourcing",
            areaServed: "Worldwide",
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://www.mzglobaltrading.com/images/og/home-textile-fabric-og.webp",
              name: "Pakistan home textile fabric manufacturer — terry and woven fabric for towel and bedding manufacturers worldwide",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Fabric",
                  item: "https://www.mzglobaltrading.com/fabric/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Home Textile Fabric",
                  item: "https://www.mzglobaltrading.com/fabric/hometextilefabric/",
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
                name: "What GSM is appropriate for hotel-grade bath towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard hotel-grade bath towel fabric runs at 400–550 GSM. At 400–480 GSM, fabric delivers a good weight-to-drying-time ratio suitable for 3-star and mid-tier hotel programmes where laundry frequency is high. At 500–550 GSM, the fabric qualifies for 4–5 star hotel positioning — the increased pile weight gives a noticeably denser hand. Ultra-premium spa and luxury hotel programmes typically specify 600+ GSM zero twist or velour terry. For reference, 450 GSM terry is currently the most ordered tier across the USA and European hotel supply market. Please note that GSM alone does not determine quality — cotton grade, combing process and pile height are equally important factors and should be specified alongside GSM in your procurement brief.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between terry loop and velour terry fabric?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Terry loop fabric has uncut looped pile on both faces, giving the characteristic textured surface of a standard bath towel. Absorbency is highest in this construction because the looped pile maximises fibre surface area in contact with water. Velour terry is produced by shearing one face of terry loop fabric, creating a smooth, velvet-like surface on the front while retaining looped pile on the back. Velour has slightly lower absorbency per GSM than loop due to the cutting of the pile, but it is sublimation print compatible, which makes it preferred for beach towels, promotional towels and premium retail where visual presentation is the priority. For standard hotel towel programmes, terry loop is the specification; for beach and promotional programmes, velour is typically specified.",
                },
              },
              {
                "@type": "Question",
                name: "How does thread count affect bedding fabric quality?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Thread count is the number of warp and weft threads per square inch. It is a useful indicator of fabric fineness but is frequently misrepresented in retail marketing. A 400 TC single-ply percale made from long-staple combed cotton is a superior product to a 600 TC multi-ply construction using short-staple yarn — the multi-ply count doubles or triples the thread count by counting each twisted ply separately, inflating the number without improving quality. We supply fabrics with single-ply thread counts and issue technical data sheets confirming ply count, yarn count and fibre specification alongside the TC figure. For international buyers evaluating fabric for institutional or hotel programmes, we recommend specifying both TC and yarn count (Ne) to avoid ambiguity.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order home textile fabric with anti-bacterial finishing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Anti-bacterial finishing is available on terry loop, institutional terry and woven bedding fabric. The treatment uses silver-ion technology or natural antimicrobial agents depending on the end application and certification requirements. For healthcare and hospital linen programmes, silver-ion anti-bacterial finish is standard, and we can supply mills with ISO 13485 certification where required. For retail programmes making anti-bacterial claims, the treatment must be tested to ISO 20743 or ASTM E2149 and documentation provided. Anti-bacterial finishing adds 7–15% to fabric cost depending on the treatment type and fabric weight. Please specify the end application and required test standard in your RFQ so we can match you with the appropriate mill.",
                },
              },
              {
                "@type": "Question",
                name: "What roll lengths and widths are available for terry fabric?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard terry loop fabric rolls are available in 50m, 100m and 150m lengths. 200m rolls are available on request for high-volume programmes. Width options for terry fabric are: 30\" / 76cm (face cloth and hand towel cutting), 44\" / 112cm (hand towel and bath towel), 58–60\" / 147–152cm (bath sheet and large format cutting) and 72\" / 183cm for bath sheet programmes with minimal off-cut waste. Non-standard widths are available with a minimum quantity requirement. For bedding fabric (percale, sateen, jacquard), standard widths are 58–60\" / 147–152cm and 90\" / 228cm for bed-width cutting. Roll cores are paper tube or plastic tube — specify in your order if required for your production line.",
                },
              },
              {
                "@type": "Question",
                name: "What certifications are available for home textile fabric from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The following certifications are available from Pakistan's certified home textile mills: GOTS (Global Organic Textile Standard) for organic cotton programmes; OEKO-TEX Standard 100 for chemical safety (Class 1 for baby and healthcare applications); BSCI and Sedex for social compliance; ISO 9001 for quality management systems; GRS (Global Recycled Standard) for recycled fibre blends; WRAP for factory compliance; and BCI (Better Cotton Initiative) for cotton farming sustainability. Not all mills hold all certifications — we match buyers with mills whose certification profile meets the programme requirements. Please specify the certifications required as hard requirements in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What is the lead time for home textile fabric from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times depend on construction, order quantity and mill scheduling at the time of order. As a general guide: lab samples (3–5m) are produced within 10–14 working days from specification confirmation. Bulk production of standard terry loop fabric at 5,000–20,000 metres runs 25–35 working days from purchase order and fabric approval. Woven bedding fabric (percale, sateen) at similar quantities runs 30–40 working days. Jacquard fabric with custom pattern requires an additional 10–15 working days for loom programming before production begins. These figures are indicative only and subject to factory scheduling, material availability and order complexity. Sea freight from Pakistan to the USA takes 22–28 days; to the UK 20–26 days; to mainland Europe 18–24 days.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order jacquard fabric with a custom woven pattern?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Custom jacquard patterns are available — we work with mills that operate dobby and jacquard looms capable of producing custom geometric, damask, floral and stripe patterns to buyer artwork. The process requires: buyer-supplied artwork or pattern specification, a loom programming fee (varies by pattern complexity), a minimum sample length of 20–50m to verify pattern registration and colour, and buyer approval before bulk production. Custom jacquard is appropriate for branded hotel bedding programmes, premium retail collections and table linen programmes where a unique woven pattern differentiates the product. Standard jacquard patterns (damask, herringbone, satin stripe) are available from stock designs without additional programming cost.",
                },
              },
              {
                "@type": "Question",
                name: "What is zero twist terry fabric and when should I specify it?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Zero twist terry uses cotton yarn with zero twist in the pile yarn — the pile fibres lie flat rather than being twisted together. This maximises the individual fibre surface area exposed to water, producing faster absorption and an exceptionally soft hand compared to conventional twisted yarn terry. The trade-off is structural: untwisted yarn is fragile during weaving and finishing, requiring a temporary PVA or silicone size that washes out after the first launder cycle. After the first wash, the fabric softens significantly and the zero-twist characteristic is fully realised. Specify zero twist for luxury hotel programmes, spa towelling and premium retail gifting where softness and absorbency are the primary selling attributes. It commands a 20–35% price premium over standard ring-spun terry at equivalent GSM.",
                },
              }
            ],
          }),  
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <HomeTextileFabricContent />
      </main>
      <Footer />
    </>
  );
}
