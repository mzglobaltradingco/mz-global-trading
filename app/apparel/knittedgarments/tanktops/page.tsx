import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TankTopsContent from "./TankTopsContent";

export const metadata = buildMetadata({
  title: "Tank Top Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source OEM tank tops from Pakistan — single jersey, rib, mesh, slub and bamboo jersey. 130–180 GSM. Women's athleisure and performance programmes.",
  canonical: "/apparel/knittedgarments/tanktops/",
  ogImage: "/images/og/tank-tops-og.webp",
  ogImageAlt: "Pakistan tank top manufacturer — OEM single jersey, rib and bamboo jersey athletic vests for USA, UK and Europe",
  keywords: [
    "tank top manufacturer Pakistan",
    "athletic vest OEM Pakistan",
    "bamboo jersey tank top wholesale",
    "women athleisure tank top supplier",
    "mesh tank top manufacturer Pakistan",
    "rib tank top OEM export",
    "performance vest wholesale Pakistan",
    "GOTS certified tank top manufacturer",
  ],
});

export default function TankTopsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Tank Tops — OEM Athleisure and Performance Manufacturing Pakistan",
    description:
      "Pakistan OEM tank top manufacturer producing single jersey, rib, mesh, slub and bamboo jersey athletic vests and athleisure tank tops. 130–180 GSM. Women's athleisure, men's training and lifestyle programmes for USA, UK, Europe and worldwide.",
    image: "https://mzglobaltrading.com/images/og/tank-tops-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/tank-tops-og.webp",
      name: "Pakistan tank top manufacturer — OEM single jersey, rib and bamboo jersey athletic vests for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Knitted Garments", item: "https://mzglobaltrading.com/apparel/knittedgarments/" },
        { "@type": "ListItem", position: 4, name: "Tank Tops", item: "https://mzglobaltrading.com/apparel/knittedgarments/tanktops/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TankTopsContent />
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
                name: "What is the difference between bamboo jersey and single jersey for tank tops?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bamboo jersey (typically 70% bamboo viscose / 30% cotton or 95% bamboo / 5% spandex) is significantly softer, naturally moisture-wicking and temperature-regulating without any chemical finish. Single jersey is the conventional cotton standard — excellent for print programmes and suited to a broader price range. Bamboo positions as premium or sustainable; single jersey covers the mainstream to premium spectrum. Both can be OEKO-TEX certified.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM is right for a women's athleisure tank versus a performance athletic vest?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Women's athleisure tanks in rib or single jersey typically sit in the 160–180 GSM range — enough weight for coverage and structure without heaviness. Performance athletic and running vests tend to be lighter: 130–155 GSM in mesh or single jersey for maximum breathability. If the programme bridges both (lifestyle and active), 155–165 GSM single jersey is a reliable centre point.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer racerback and scoop-neck cuts alongside standard straight necklines?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Neckline and strap configurations are fully customisable: standard tank strap width, narrow spaghetti strap, racerback, wide Y-back, scoop neck and square neck are all available. Racerback patterns require additional pattern-making and cutting operations — factor this into your sampling timeline. We can work from your provided tech pack or develop patterns from reference samples.",
                },
              },
              {
                "@type": "Question",
                name: "Can tank tops be produced as part of a matched set with shorts or leggings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Matched co-ord sets (tank + shorts, tank + leggings, tank + biker short) are a common programme structure for athleisure buyers. Fabric matching across pieces requires coordinating construction, dye lot and GSM across the full set. We manage this across our factory network — specify the full set composition in your RFQ so we can confirm factory capability across all pieces.",
                },
              },
              {
                "@type": "Question",
                name: "What print and decoration options work best for tank tops?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For cotton and cotton-blend tanks: screen print (front chest or full front), embroidery (logo mark, chest placement), DTG (small runs, photo-quality imagery on single jersey). For polyester mesh and performance tanks: sublimation (all-over print) and heat transfer are preferred. Embroidery requires stabiliser backing on stretch constructions — inform your decorator of the fabric type.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical indicative lead times from sample approval to shipment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "As a general indicative guide: sample production 14–18 days from spec lock; bulk production 40–60 days from PO confirmation; pre-shipment QC 3–5 days. These timelines are indicative and vary with construction complexity, colour count, decoration method, quantity and factory scheduling. Your confirmed quotation will include a programme-specific timeline.",
                },
              }
            ],
          }),  
        }}
      />
    </>
  );
}
