import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import HenleyContent from "./HenleyContent";

export const metadata: Metadata = {
  title: "Henley Shirt Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom henley shirts from Pakistan's certified knitwear factories. Single jersey, waffle knit, rib, French terry. 160–240 GSM.",
  keywords: [
    "henley shirt manufacturer Pakistan",
    "henley shirts wholesale Pakistan",
    "custom henley shirts OEM",
    "waffle knit henley Pakistan",
    "thermal henley shirt manufacturer",
    "henley shirt supplier Pakistan",
    "bulk henley shirts export",
    "OEKO-TEX henley shirts Pakistan",
    "knitted henley shirt factory",
  ],
  alternates: {
    canonical: "/apparel/knittedgarments/henleyshirts/",
    languages: {
      "en": "https://mzglobaltrading.com/apparel/knittedgarments/henleyshirts/",
      "x-default": "https://mzglobaltrading.com/apparel/knittedgarments/henleyshirts/",
    },
  },
  openGraph: {
    title: "Henley Shirt Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom henley shirts sourced from Pakistan's certified knitwear factories. Single jersey, waffle knit, rib, French terry. 160–240 GSM. GOTS, OEKO-TEX available.",
    url: "https://mzglobaltrading.com/apparel/knittedgarments/henleyshirts/",
    images: [
      {
        url: "/images/og/henley-shirts-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan henley shirt manufacturer — OEM henley shirts wholesale for brands in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henley Shirt Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom henley shirts from Pakistan's certified knitwear factories. Single jersey, waffle knit, rib. 160–240 GSM. GOTS, OEKO-TEX available.",
  },
};

export default function HenleyShritsPage() {
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
                name: "What GSM should I order for a retail henley shirt?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For year-round retail programmes, 170–200 GSM is the industry standard. Lighter 160–170 GSM suits spring/summer and warmer-climate markets — SE Asia, Australia, Middle East. For thermal or winter programmes targeting USA, Canada and Northern Europe, 200–240 GSM in waffle knit or rib delivers the expected warmth-to-weight ratio.",
                },
              },
              {
                "@type": "Question",
                name: "What distinguishes a henley from a crew neck in production terms?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A henley requires a placket panel at the front neckline — typically 15–20 cm — with 2–4 buttons. This adds a cutting and sewing operation versus a standard crew neck. Plackets can be rib-knit, woven, or self-fabric matching the body construction.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get OEKO-TEX certified henley shirts from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pakistan's major knitwear factories carry OEKO-TEX Standard 100 across all standard constructions. GOTS certification is available for 100% organic cotton variants. For EU and UK buyers where chemical compliance is scrutinised at import, we recommend specifying OEKO-TEX as a hard requirement in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "How do I plan my order quantity for a henley programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Order quantities vary significantly depending on fabric construction, colour programme, factory scheduling and seasonal demand — there is no single universal figure. The best approach is to include your target quantity in your RFQ. We match you with factories whose capacity aligns with your programme size and can advise on the most cost-efficient quantity structure.",
                },
              },
              {
                "@type": "Question",
                name: "Which construction is best for a thermal or winter programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Waffle knit is the primary construction for thermal programmes. The grid cell structure traps air, providing warmth without bulk — this is the classic US workwear thermal layer. Rib (1×1) is the secondary option: closer fit with natural stretch and recovery. French terry at 240–280 GSM bridges casual and performance positioning.",
                },
              },
              {
                "@type": "Question",
                name: "What decorations work on waffle knit henley shirts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Embroidery works best — the structured texture provides a firm base for stitch registration. Screen printing is possible with soft-hand inks and reduced squeegee pressure. Heat transfer vinyl is not recommended. DTG is not suitable for waffle constructions.",
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
            name: "Henley Shirts — Pakistan OEM Sourcing & Export",
            description:
              "Custom henley shirts sourced from Pakistan's certified knitwear factories. Single jersey, waffle knit, rib and French terry constructions. 160–240 GSM. GOTS and OEKO-TEX available.",
            image:
              "https://mzglobaltrading.com/images/og/henley-shirts-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
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
                  name: "Knitted Garments",
                  item: "https://mzglobaltrading.com/apparel/knittedgarments/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Henley Shirts",
                  item: "https://mzglobaltrading.com/apparel/knittedgarments/henleyshirts/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <HenleyContent />
      </main>
      <Footer />
    </>
  );
}
