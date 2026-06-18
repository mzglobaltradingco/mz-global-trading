import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import FormalShirtsContent from "./FormalShirtsContent";

export const metadata: Metadata = {
  title: "Formal Shirts Manufacturer Pakistan | MZ Global Trading",
  description:
    "Source custom formal and casual shirts from Pakistan's certified woven factories. Poplin, Oxford, twill, linen, chambray. 80–200 GSM.",
  keywords: [
    "formal shirts manufacturer Pakistan",
    "casual shirts supplier Pakistan",
    "poplin shirts OEM Pakistan",
    "oxford shirt manufacturer",
    "custom dress shirts Pakistan",
    "linen shirts wholesale",
    "corporate shirts manufacturer Pakistan",
    "woven shirts export Pakistan",
  ],
  alternates: {
    canonical: "/apparel/wovengarments/formalcasualshirts/",
    languages: {
      "en": "https://mzglobaltrading.com/apparel/wovengarments/formalcasualshirts/",
      "x-default": "https://mzglobaltrading.com/apparel/wovengarments/formalcasualshirts/",
    },
  },
  openGraph: {
    title: "Formal Casual Shirts Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom formal and casual shirts from Pakistan's certified woven factories. Poplin, Oxford, twill, linen, chambray. 80–200 GSM. GOTS, OEKO-TEX available.",
    url: "https://mzglobaltrading.com/apparel/wovengarments/formalcasualshirts/",
    images: [
      {
        url: "/images/og/formal-casual-shirts-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan formal and casual shirts manufacturer — OEM woven shirts for corporate and fashion brands in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formal Casual Shirts Manufacturer Pakistan | MZ Global Trading",
    description:
      "Custom formal and casual shirts from Pakistan's certified woven factories. Poplin, Oxford, twill, linen, chambray. 80–200 GSM. GOTS, OEKO-TEX available.",
  },
};

export default function FormalCasualShirtsPage() {
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
                name: "Which shirt construction should I choose for a corporate uniform programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Poplin (80–120 GSM) in a cotton-polyester 65/35 or 60/40 blend is the industry standard for corporate uniform programmes. The polyester content delivers wrinkle resistance and easy-care performance — critical for staff uniforms worn daily. Mercerised cotton poplin elevates the appearance for premium hospitality. For summer or Middle East climates, lightweight poplin (80–100 GSM) is strongly recommended.",
                },
              },
              {
                "@type": "Question",
                name: "Can I get wrinkle-resistant or easy-care woven shirts from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Wrinkle-resistant (non-iron) finishes are available on poplin, oxford and twill constructions using DP (durable press) or WRFP (wrinkle-free performance) resin treatments. Cotton-polyester blend constructions (65/35 or 60/40) deliver comparable easy-care performance without chemical treatment — preferred for programmes where buyers avoid resin-treated fabrics. Both options are OEKO-TEX Standard 100 compatible.",
                },
              },
              {
                "@type": "Question",
                name: "What collar configurations can be produced for OEM shirt programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All standard and custom collar configurations are available: spread, semi-spread, classic point, button-down, tab, mandarin (band) and hidden button-down. French cuff (double cuff) and barrel (single button) cuffs are standard. Custom collar stand heights, collar spread widths and interlining specifications can be provided in your technical pack. The collar is a key brand differentiation point and can be developed to your own patterns.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM is right for linen shirts for warm-climate markets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For summer and tropical markets (Middle East, SE Asia, Australia, South America), 120–150 GSM linen or linen-cotton blend is the optimal range. Pure linen at this weight delivers breathability and the characteristic relaxed linen aesthetic. The linen-cotton blend (55/45 linen-cotton) at 130–160 GSM provides improved dimensional stability and reduced wrinkling — preferred for programmes where buyers want the linen aesthetic with better laundering performance.",
                },
              },
              {
                "@type": "Question",
                name: "How does formal shirt decoration differ from casual shirt programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Formal shirts (poplin, twill, end-on-end) typically use fine embroidery or monogramming as the sole decoration — logo on left chest, monogram at collar or cuff. Screen printing is not used on formal constructions. Casual shirt programmes (oxford, chambray, linen) are more flexible — embroidery, woven badge and screen print (soft-hand inks) are all appropriate. The construction dictates the decoration range.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order a shirt programme requiring GOTS certification from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pakistan's certified organic textile mills produce GOTS-certified poplin, twill and lightweight woven constructions. For EU buyers sourcing organic cotton formal shirts, specify GOTS as a hard requirement in your RFQ — we match you with factories carrying active GOTS certification. GOTS certified programmes require organic cotton throughout the supply chain including dyeing and finishing chemicals.",
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
            name: "Formal & Casual Shirts — Pakistan OEM Sourcing & Export",
            description:
              "Custom formal and casual shirts sourced from Pakistan's certified woven garment factories. Poplin, Oxford weave, twill, linen, chambray, end-on-end, dobby and seersucker. 80–200 GSM. GOTS and OEKO-TEX available.",
            image:
              "https://mzglobaltrading.com/images/og/formal-casual-shirts-og.webp",
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
                  name: "Woven Garments",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Formal & Casual Shirts",
                  item: "https://mzglobaltrading.com/apparel/wovengarments/formalcasualshirts/",
                },
              ],
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/og/formal-casual-shirts-og.webp",
              name: "Pakistan formal and casual shirts manufacturer — OEM woven shirts for brands in USA, UK and Europe",
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <FormalShirtsContent />
      </main>
      <Footer />
    </>
  );
}
