import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PoloContent from "./PoloContent";

export const metadata = buildMetadata({
  title: "Polo Shirt Manufacturer Pakistan | OEM & Corporate",
  description:
    "Source OEM polo shirts from Pakistan — piqué, performance and classic polo constructions. OEKO-TEX certified. Embroidery, PMS colour. FOB/CIF.",
  canonical: "/apparel/knittedgarments/poloshirts/",
  ogImage: "/images/og/polo-shirts-og.webp",
  ogImageAlt: "Pakistan polo shirt manufacturer — OEM piqué polo shirts for corporate and sports brands in USA and UK",
  keywords: [
    "polo shirt manufacturer Pakistan",
    "OEM polo shirt manufacturer",
    "pique polo shirt manufacturer Pakistan",
    "corporate polo shirt supplier",
    "polo shirt bulk wholesale Pakistan",
    "polo shirt exporter USA UK Europe",
    "embroidered polo shirt manufacturer Pakistan",
    "knitted garment manufacturer Pakistan",
  ],
});

export default function PoloShirtsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Polo Shirts — OEM Manufacturing Pakistan",
    description:
      "Pakistan OEM polo shirt manufacturer producing classic piqué, mini piqué, jersey and performance polo shirts for corporate buyers, hospitality groups and sports brands in USA, UK and Europe.",
    image: "https://www.mzglobaltrading.com/images/og/polo-shirts-og.webp",
    provider: { "@id": "https://www.mzglobaltrading.com/#organization" },
    serviceType: "Textile Sourcing",
    areaServed: "Worldwide",
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://www.mzglobaltrading.com/images/og/polo-shirts-og.webp",
      name: "Pakistan polo shirt manufacturer — OEM piqué polo shirts for corporate and sports brands",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://www.mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://www.mzglobaltrading.com/apparel/knittedgarments/" },
        { "@type": "ListItem", position: 4, name: "Polo Shirts", item: "https://www.mzglobaltrading.com/apparel/knittedgarments/poloshirts/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <PoloContent />
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
                name: "What is the difference between classic piqué and mini piqué polo shirts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Classic piqué has a larger, more visible cell structure — the traditional polo shirt texture instantly recognisable on corporate and golf programmes. Mini piqué uses a finer knit structure with smaller cells, creating a more refined, premium surface texture while retaining piqué's breathability advantages. Mini piqué is typically positioned as a premium tier option and is popular in high-end corporate and luxury brand polo programmes, especially in UK, EU and East Asian markets.",
                },
              },
              {
                "@type": "Question",
                name: "Why is embroidery the primary decoration for polo shirts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The raised texture of piqué and mini piqué provides an exceptionally firm base for embroidery stitch registration. Screen printing on piqué requires special techniques to achieve acceptable ink fill across the textured surface — embroidery naturally adapts to the texture and produces a clean, premium result. Woven crests and badges are the secondary premium option for heritage or luxury brand positioning.",
                },
              },
              {
                "@type": "Question",
                name: "Can I specify OEKO-TEX certified polo shirts from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pakistan's piqué manufacturing facilities carry OEKO-TEX Standard 100 certification across all standard constructions. This is particularly important for EU buyers where chemical compliance is reviewed at import. Specify OEKO-TEX as a hard requirement in your RFQ — we match you with certified factories only.",
                },
              },
              {
                "@type": "Question",
                name: "What collar and cuff options are available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard polo shirts use a rib-knit collar and cuffs in the same construction as the body. Custom options include woven collar and cuffs (formal positioning), self-fabric collar (jersey polo), and contrast collar/cuff in a different colour (yarn-dyed programmes). Collar and cuff specifications are included in the RFQ specification form.",
                },
              },
              {
                "@type": "Question",
                name: "How do I plan order quantities for a polo shirt programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Polo shirt order quantities vary by construction, embroidery complexity, colour count, size distribution and factory scheduling. There is no single universal quantity that applies to all programmes. Include your target quantity per style and colour in your RFQ — we match you with factories whose capacity aligns with your programme and advise on the most cost-efficient quantity structure.",
                },
              },
              {
                "@type": "Question",
                name: "Do you supply polo shirts for hospitality and hotel programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — hospitality is one of the most active polo shirt segments in our supply network. Hotel staff and restaurant crew polo programmes typically require: regular fit piqué in corporate colours, embroidered logo on left chest, board fold or hanger packaging, and phased delivery aligned with seasonal staffing cycles. Specify your deployment timeline in your RFQ.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
