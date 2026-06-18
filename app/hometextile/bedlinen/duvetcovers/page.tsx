import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import DuvetCoversContent from "./DuvetCoversContent";

export const metadata: Metadata = {
  title: "Duvet Covers Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan duvet cover manufacturer for wholesale buyers in UK, Europe and USA. Custom cotton percale, sateen and jacquard comforter covers in UK.",
  keywords: [
    "duvet covers manufacturer Pakistan",
    "comforter cover wholesale Pakistan",
    "custom duvet covers export",
    "cotton duvet covers supplier",
    "hotel duvet covers manufacturer",
    "bedding manufacturer Pakistan",
  ],
  alternates: {
    canonical: "/hometextile/bedlinen/duvetcovers/",
    languages: {
      "en": "https://mzglobaltrading.com/hometextile/bedlinen/duvetcovers/",
      "x-default": "https://mzglobaltrading.com/hometextile/bedlinen/duvetcovers/",
    },
  },
  openGraph: {
    title: "Duvet Covers Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan duvet cover manufacturer — percale, sateen and jacquard. UK, US and EU sizing. Button, zip and envelope closure. GOTS and OEKO-TEX certified. FOB / CIF export.",
    url: "https://mzglobaltrading.com/hometextile/bedlinen/duvetcovers/",
    images: [
      {
        url: "/images/og/duvet-covers-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan duvet cover manufacturer — wholesale comforter covers for USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duvet Covers Manufacturer Pakistan | MZ Global Trading",
    description:
      "Pakistan duvet cover manufacturer — percale, sateen and jacquard in UK, US and EU sizes. GOTS certified. FOB / CIF export.",
  },
};

export default function DuvetCoversPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <DuvetCoversContent />
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
                name: "Which closure is most popular for UK retail duvet covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Button closure is the standard for mainstream UK and European retail — typically 3–5 pearl or fabric-covered buttons along the foot of the duvet opening. Concealed zip is preferred by hotel buyers for operational efficiency and clean appearance. Envelope closure suits value and casual markets where cost and simplicity take priority.",
                },
              },
              {
                "@type": "Question",
                name: "Do you supply UK, US and EU sized duvet covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. UK: Single 135×200cm, Double 200×200cm, King 225×220cm, Super King 260×220cm. US: Twin 172×218cm, Full/Queen 203×228cm, King 259×228cm. EU: 135×200cm, 200×200cm, 200×220cm. Custom dimensions are accommodated — include your required dimensions in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order duvet covers with matching flat sheets and pillow covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — coordinated bedding sets are among our most frequently ordered programmes. Specify the complete set in your RFQ: duvet cover, flat sheet, fitted sheet and pillow covers. We source across all components from the same mill to ensure consistent thread count, construction and colour throughout the set.",
                },
              },
              {
                "@type": "Question",
                name: "What construction should I specify for a hotel duvet cover programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Percale 200–300 TC in a cotton-poly blend delivers the operational durability and wash-cycle resistance hotel housekeeping demands. For luxury hotel tier or room upgrade sets, specify sateen 400–500 TC in 100% combed cotton with concealed zip closure. OEKO-TEX certification should be included as a standard requirement.",
                },
              },
              {
                "@type": "Question",
                name: "Are GOTS-certified duvet covers available from Pakistan?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. GOTS certification is available for 100% organic cotton percale and sateen constructions. This is required for organic cotton claims in the EU and UK and increasingly demanded by GOTS-certified brands in the USA and Australia. Specify GOTS as a hard requirement in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "How are duvet covers packaged for retail export?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard retail: individual polybag with header card or folded in retail box. Premium: zippered display pouch or branded gift box. Coordinated sets can be packaged together in a single retail box. Hotel and institutional supply: bulk folded, 12–24 per carton with carton labelling. Specify your fulfilment requirement in the RFQ.",
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
            name: "Duvet Covers — Pakistan Manufacturer",
            description:
              "Custom duvet covers sourced from Pakistan's certified weaving mills. Cotton percale, sateen and jacquard constructions. UK, US and EU sizing. GOTS and OEKO-TEX certified.",
            image:
              "https://mzglobaltrading.com/images/hero/hero-duvet-covers.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: "MZ Global Trading",
              },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://mzglobaltrading.com/images/hero/hero-duvet-covers.webp",
              name: "Pakistan duvet cover manufacturer — wholesale comforter covers for international buyers",
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
                  name: "Duvet Covers",
                  item: "https://mzglobaltrading.com/hometextile/bedlinen/duvetcovers/",
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
