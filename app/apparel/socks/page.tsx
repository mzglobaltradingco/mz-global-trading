import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SocksContent from "./SocksContent";

export const metadata: Metadata = {
  title: "Socks Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan socks manufacturer — 7 knit structures from plain to compression. Athletic, fashion and institutional programmes. GOTS, OEKO-TEX, BSCI certified.",
  keywords: [
    "socks manufacturer Pakistan",
    "wholesale socks supplier Pakistan",
    "OEM socks manufacturer",
    "athletic socks Pakistan",
    "compression socks manufacturer Pakistan",
    "fashion socks wholesale",
    "knitted socks exporter Pakistan",
    "bulk socks supplier",
    "GOTS certified socks Pakistan",
  ],
  alternates: {
    canonical: "/apparel/socks/",
    languages: {
      "en": "https://mzglobaltrading.com/apparel/socks/",
      "x-default": "https://mzglobaltrading.com/apparel/socks/",
    },
  },
  openGraph: {
    title: "Socks Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan socks manufacturer — 7 knit structures from plain liner to compression. Athletic, fashion and institutional programmes. GOTS, OEKO-TEX certified.",
    url: "https://mzglobaltrading.com/apparel/socks/",
    images: [
      {
        url: "/images/og/hero-apparel.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan socks manufacturer — knitted performance and fashion socks for wholesale buyers in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Socks Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan socks manufacturer — 7 knit structures, athletic to compression. GOTS, OEKO-TEX certified. FOB / CIF export worldwide.",
  },
};

export default function SocksPage() {
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
                name: "What knit structures are available for socks from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pakistan's hosiery sector produces all seven major knit structures: plain knit (smooth, everyday), rib cuff + plain foot (casual and crew), terry sole cushion (sport and work), full terry cushion (heavy-duty and winter), jacquard / pattern knit (fashion and branded), mesh / open knit (ventilated athletic), and compression knit (medical and recovery). Include your intended end use and performance requirement in your RFQ for correct structure matching.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between jacquard and sublimation for patterned socks?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Jacquard knitting builds the pattern into the fabric structure using coloured yarns — the pattern is permanent, does not fade and has no feel difference on the sock surface. Sublimation is a dye-transfer print applied to a finished white polyester-base sock — it delivers photographic image quality and unlimited colour range but requires 100% polyester as the base fabric. Cotton and cotton-blend socks cannot receive sublimation print. For branded or gift programmes where pattern longevity and hand feel are priorities, jacquard is typically preferred. For photographic or complex artwork, sublimation is the correct choice.",
                },
              },
              {
                "@type": "Question",
                name: "Can compression socks be manufactured in Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Graduated compression socks (10–40 mmHg) are available from Pakistan's certified hosiery factories. Compression programmes require specific needle count and yarn tension specification — include your target mmHg rating, size range (typically shoe size or calf circumference) and compression class in your RFQ. Test reporting and compression curve documentation are available on request for medical-grade programmes.",
                },
              },
              {
                "@type": "Question",
                name: "What fibre options are available for hosiery from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Combed cotton, organic cotton (GOTS certified), cotton-polyester blends, bamboo viscose, merino wool blend, recycled polyester (GRS certified) and nylon blend for reinforced heels and toes. Fibre selection depends on knit structure, performance requirements and target market positioning. Organic cotton and recycled polyester programmes require corresponding factory certification — specify in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What order quantities are typical for sock programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sock programme quantities vary considerably by knit complexity and pack format — plain bulk programmes run differently to complex jacquard or compression programmes. Include your target quantity, size breakdown, number of colour/pattern options and pack configuration in your RFQ and we match you with factories whose equipment and production economics align with your programme size.",
                },
              },
              {
                "@type": "Question",
                name: "What retail packaging options are available for socks?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All standard hosiery retail pack formats are available: ankle band (single pair, the most common retail format), header card in 2-pair and 3-pair configurations, polybag in 3-pair, 6-pair, 12-pair and 24-pair counts, and bulk bale without individual packing for institutional and trade programmes. Ankle band and header card artwork is submitted for approval before bulk production.",
                },
              }
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
            name: "Socks — Pakistan OEM Manufacturing & Export",
            description:
              "Knitted performance, athletic, compression and fashion socks manufactured in Pakistan. 7 knit structures covering liner to heavy cushion. GOTS and OEKO-TEX available.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-apparel.webp",
              name: "Pakistan socks manufacturer — knitted performance and fashion socks",
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
                  name: "Apparel",
                  item: "https://mzglobaltrading.com/apparel/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Socks",
                  item: "https://mzglobaltrading.com/apparel/socks/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <SocksContent />
      </main>
      <Footer />
    </>
  );
}
