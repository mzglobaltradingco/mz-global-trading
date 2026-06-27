import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import BabyBibsContent from "./BabyBibsContent";

export const metadata = buildMetadata({
  title: "Baby Bibs Manufacturer Pakistan | OEM Drool & Feeding Bibs",
  description:
    "Pakistan OEM baby bibs — terry, muslin and bandana drool bibs with TPU waterproof backing. GOTS & OEKO-TEX Class 1 certified. Velcro or snap closure.",
  canonical: "/apparel/babyandkids/babybibs/",
  ogImage: "/images/og/baby-bibs-og.webp",
  ogImageAlt: "Pakistan baby bibs manufacturer — OEM terry and muslin drool bibs for USA, UK and Europe",
  keywords: [
    "baby bibs manufacturer Pakistan",
    "drool bibs OEM Pakistan",
    "bandana bibs wholesale Pakistan",
    "OEKO-TEX Class 1 baby bibs",
    "GOTS certified baby bibs",
    "terry bib supplier Pakistan",
    "feeding bibs OEM export",
    "waterproof baby bibs bulk",
  ],
});

export default function BabyBibsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Baby Bibs — OEM Drool and Feeding Bib Manufacturing Pakistan",
    description:
      "Pakistan OEM baby bibs manufacturer producing terry, muslin, interlock and bandana drool bibs. GOTS and OEKO-TEX Class 1 certified. Velcro and snap closures. TPU waterproof backing available. Bulk programmes for USA, UK, Europe and global baby brands.",
    image: "https://mzglobaltrading.com/images/og/baby-bibs-og.webp",
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
      contentUrl: "https://mzglobaltrading.com/images/og/baby-bibs-og.webp",
      name: "Pakistan baby bibs manufacturer — OEM terry and muslin drool bibs for USA, UK and Europe",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
        { "@type": "ListItem", position: 2, name: "Apparel", item: "https://mzglobaltrading.com/apparel/" },
        { "@type": "ListItem", position: 3, name: "Baby & Kids", item: "https://mzglobaltrading.com/apparel/babyandkids/" },
        { "@type": "ListItem", position: 4, name: "Baby Bibs", item: "https://mzglobaltrading.com/apparel/babyandkids/babybibs/" },
      ],
    },
  };

  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <BabyBibsContent />
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
                name: "What backing material do you use for waterproof bibs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard is TPU (thermoplastic polyurethane) — BPA-free, phthalate-free, and OEKO-TEX Class 1 certified. TPU is heat-bonded to the face fabric without adhesive chemicals. It withstands 60°C machine washing without delamination. PVC vinyl backing is available on request but not recommended — most European and North American retailers now require PVC-free alternatives.",
                },
              },
              {
                "@type": "Question",
                name: "Velcro or snap closure — which do you recommend?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Both are standard. Velcro (hook-and-loop) is easier for carers to use with one hand but can pick up lint and loses grip after 40–50 washes. KAM-style resin snaps are more durable (100+ cycles) and are preferred for programmes targeting USA market where snap detachment testing (CPSC) is required. We recommend snaps for drool bibs and Velcro for quick-release feeding bibs. Mixed options available within the same programme.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order both drool bibs and bandana bibs in the same production run?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Multi-style programmes are common — typically branded baby gift sets containing one bandana bib and one drool bib. We can batch both styles in the same production run if fabrics and closures align. Lead time is based on the longest style in the programme.",
                },
              },
              {
                "@type": "Question",
                name: "What is the minimum neck opening clearance for safety compliance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Per EN 14682 (UK/EU) and equivalent CPSC guidance, neck openings must be either fully closed (no loop > 150mm) or fully open (> 360mm circumference). Our standard bibs use adjustable snap or Velcro closures that meet both EU and US requirements. Fixed tie-around closures are not recommended for retail sale and are only produced for institutional/restaurant programmes.",
                },
              },
              {
                "@type": "Question",
                name: "Do you produce silicone bibs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — food-grade BPA-free silicone bibs with rigid catchall scoop pockets. Silicone bibs are custom-moulded and have longer development tooling lead times (30–40 days for tooling + 45–55 days production). Available in solid colours and two-tone. All silicone compounds comply with FDA 21 CFR 177.2600 and EU Regulation 10/2011 for food contact materials.",
                },
              }
            ],
          }),
        }}
      />
    </>
  );
}
