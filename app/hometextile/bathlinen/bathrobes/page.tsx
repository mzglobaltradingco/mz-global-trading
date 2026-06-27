import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BathrobesContent from "./BathrobesContent";

export const metadata = buildMetadata({
  title: "Bathrobe Manufacturer Pakistan | Hotel & Spa OEM Terry Robes",
  description:
    "Source OEM bathrobes from Pakistan — shawl collar, kimono and hooded in terry, velour and waffle. 350–500 GSM. Hotel, spa and resort programmes.",
  canonical: "/hometextile/bathlinen/bathrobes/",
  ogImage: "/images/og/bathrobes-og.webp",
  ogImageAlt: "Pakistan bathrobe manufacturer — OEM terry and velour bathrobes for hotels and spas in USA, UK and Europe",
  keywords: [
    "bathrobe manufacturer Pakistan",
    "hotel bathrobe OEM Pakistan",
    "terry bathrobe wholesale supplier",
    "spa bathrobe manufacturer Pakistan",
    "velour bathrobe OEM export",
    "shawl collar bathrobe manufacturer",
    "OEKO-TEX bathrobe Pakistan",
    "custom bathrobe hotel programme",
    "resort bathrobe supplier Pakistan",
  ],
});

export default function BathrobesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Bathrobes — OEM Hotel & Spa Manufacturing Pakistan",
    description:
      "Pakistan OEM bathrobe manufacturer producing shawl collar, kimono and hooded styles in terry loop, velour, waffle and microfleece. 350–500 GSM. OEKO-TEX and GOTS certified for hotel, spa and resort programmes in USA, UK and Europe.",
    image: "https://mzglobaltrading.com/images/og/bathrobes-og.webp",
    brand: { "@type": "Brand", name: "MZ Global Trading" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-12-31",
      url: "https://mzglobaltrading.com/rfq/",
      seller: { "@type": "Organization", name: "MZ Global Trading" },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: "https://mzglobaltrading.com/images/og/bathrobes-og.webp",
      name: "Pakistan bathrobe manufacturer — OEM terry and velour bathrobes for hotels and spas in USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
        { "@type": "ListItem", position: 3, name: "Bath Linen", item: "https://mzglobaltrading.com/hometextile/bathlinen/" },
        { "@type": "ListItem", position: 4, name: "Bathrobes", item: "https://mzglobaltrading.com/hometextile/bathlinen/bathrobes/" },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MegaMenu />
      <main id="main-content">
        <BathrobesContent />
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
                name: "What is the difference between shawl collar, kimono collar and hooded bathrobes for hotel use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Shawl collar is the standard hotel industry silhouette — wide overlapping lapels that wrap securely and communicate premium quality. It dominates 5-star and city hotel programmes worldwide. Kimono collar is an open V-neckline without structured lapels — cleaner, more minimal and aligned to boutique hotel and spa aesthetics. Hooded adds an integral hood for post-pool and post-beach use, standard in resort and children's programmes. All three collar styles are available across terry loop, velour and waffle constructions.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM range is appropriate for a 5-star hotel versus a mid-scale hospitality programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "5-star hotel programmes typically specify 400–480 GSM terry loop or velour — the substantial weight is the primary quality signal guests experience. Mid-scale and budget hospitality programmes generally specify 300–380 GSM — either waffle weave or mid-weight terry, which balances cost, laundry durability and acceptable guest experience. Microfleece at 280–350 GSM is an option for price-sensitive programmes. For any programme, share your target price band in your RFQ and we will match you with the appropriate construction and mill.",
                },
              },
              {
                "@type": "Question",
                name: "Can you embroider hotel logos and crests on the chest and pocket simultaneously?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Embroidery on the left chest (below the lapel fold) and on the chest pocket simultaneously is standard in hospitality programmes. Both positions are set up in the same embroidery run. Thread colours are matched to your brand guidelines — typically pantone-matched for hotel brand standards. Woven badge or crest is an alternative if your logo has fine detail that requires a woven medium rather than stitch count.",
                },
              },
              {
                "@type": "Question",
                name: "What packaging options are available for a retail gift-box bathrobe launch?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Retail gift programmes can be packaged in a rigid retail box, a cloth drawstring gift bag, a non-woven zipper pouch, or an individual polybag with hanger for rack presentation. Branded sleeve, ribbon and tissue options are available within the packaging brief. Share your retail packaging concept in your RFQ — we manage the packaging specification alongside the bathrobe programme.",
                },
              },
              {
                "@type": "Question",
                name: "Do velour bathrobes require different care instructions from terry loop for commercial hotel laundry?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Velour's sheared face surface is more susceptible to abrasion in commercial tumble drying — lower heat settings and reduced mechanical action are recommended to maintain the smooth pile surface over multiple laundering cycles. Terry loop is more robust in industrial laundering. For hotel programmes with high daily laundry turnover, terry loop at 400+ GSM generally delivers better lifecycle cost than velour. Specify your laundry cycle frequency in your RFQ so the mill can recommend the appropriate construction grade.",
                },
              },
              {
                "@type": "Question",
                name: "What are typical indicative lead times for a custom bathrobe programme with embroidery?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Indicative timelines for a custom embroidered bathrobe programme: RFQ to quotation 3–5 days, pre-production sample with embroidery 18–25 days from spec confirmation, bulk production 50–75 days from approved sample and PO, pre-shipment inspection 3–5 days, sea freight 20–30 days to most destinations. Total indicative programme duration from RFQ to departure port is approximately 95–135 days. These are planning guides — actual timelines depend on factory scheduling, sample iteration rounds and seasonal demand.",
                },
              }
            ],
          }),  
        }}
      />
    </>
  );
}
