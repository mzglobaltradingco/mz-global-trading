import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import ApronsContent from "./ApronsContent";

export const metadata: Metadata = {
  title: "Aprons Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan aprons manufacturer: canvas, denim, terry and poplin. Bib and waist styles. Screen print, embroidery. OEKO-TEX, BSCI. Export to USA, UK, EU, Middle East.",
  keywords: [
    "aprons manufacturer Pakistan",
    "aprons wholesale Pakistan",
    "chef aprons supplier Pakistan",
    "canvas aprons manufacturer Pakistan",
    "OEM aprons Pakistan",
    "restaurant aprons bulk supplier",
    "branded aprons manufacturer Pakistan",
    "custom aprons Pakistan export",
    "OEKO-TEX aprons Pakistan",
  ],
  alternates: {
    canonical: "/hometextile/kitchenlinen/aprons/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/kitchenlinen/aprons/",
      "x-default":
        "https://mzglobaltrading.com/hometextile/kitchenlinen/aprons/",
    },
  },
  openGraph: {
    title: "Aprons Manufacturer Pakistan | MZ Global Trading",
    description:
      "OEM aprons sourced from Pakistan's certified textile mills. Canvas, denim, terry and poplin constructions. Bib and waist styles. Screen print and embroidery decoration. OEKO-TEX, BSCI. Export to USA, UK, EU and worldwide.",
    url: "https://mzglobaltrading.com/hometextile/kitchenlinen/aprons/",
    images: [
      {
        url: "/images/og/hero-home-textiles.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan aprons manufacturer — canvas, denim and terry aprons for restaurant, hospitality and corporate buyers in USA, UK and Europe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aprons Manufacturer Pakistan | MZ Global Trading",
    description:
      "OEM aprons from Pakistan: canvas, denim, terry, poplin. Bib and waist styles. Screen print, embroidery. OEKO-TEX, BSCI. Export to USA, UK, EU.",
  },
};

export default function ApronsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Aprons — OEM Manufacturing Pakistan",
            description:
              "OEM aprons sourced from Pakistan's certified textile mills. Canvas heavy (280–400 GSM), denim, terry and plain weave/poplin constructions. Bib and waist apron styles. Screen print, digital print, embroidery and heat transfer decoration. OEKO-TEX, BSCI, ISO 9001. FOB/CIF export to USA, UK, EU, Middle East and worldwide.",
            image:
              "https://mzglobaltrading.com/images/og/hero-home-textiles.webp",
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
                "https://mzglobaltrading.com/images/og/hero-home-textiles.webp",
              name: "Pakistan aprons manufacturer — canvas, denim and terry aprons for restaurant and hospitality buyers worldwide",
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
                  name: "Kitchen Linen",
                  item: "https://mzglobaltrading.com/hometextile/kitchenlinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Aprons",
                  item: "https://mzglobaltrading.com/hometextile/kitchenlinen/aprons/",
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
                name: "What construction should I specify for a chef or commercial kitchen apron programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For commercial kitchen use where durability, heat resistance and repeated industrial laundering are the primary requirements, heavyweight canvas (280–400 GSM) is the correct specification. Canvas provides a stiff, structured front protection and takes branded embroidery and screen print decoration well. Denim (300–380 GSM) is the construction of choice for bistro, restaurant and front-of-house programmes where a fashionable aesthetic is as important as durability — the indigo-dyed surface wears in with use, creating a desirable vintage appearance. For kitchen staff who need absorbency in addition to coverage — such as pastry chefs and food prep stations — terry bib aprons (300–400 GSM) provide the best moisture management.",
                },
              },
              {
                "@type": "Question",
                name: "What decoration methods are available for branded restaurant apron programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Screen printing is the primary decoration method for bold, multi-colour brand artwork on canvas and denim aprons. Embroidery is the preferred choice for logo-mark placement — particularly chest, bib centre and strap embroidery — on all apron constructions. Digital printing is available for photo-quality or complex artwork on plain weave and poplin aprons. Heat transfer vinyl is used for athletic-style or foil finish decorations on lighter constructions. All methods are available with artwork approval samples before bulk production.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between a bib apron and a waist apron?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A bib apron (typically 60×90 cm) covers both the chest and the lower body — providing full-front protection from chest to knee. This is the standard for back-of-house kitchen use: chefs, line cooks, bakers and food preparation staff. A waist apron (typically 60×40 cm) covers only the lower body from waist to mid-thigh — providing a less obtrusive profile for front-of-house service staff, servers and baristas. Waist aprons are also used in retail and food counter environments where mobility is a priority. Both styles are available in all constructions and all decoration methods.",
                },
              },
              {
                "@type": "Question",
                name: "Can I order custom aprons with DWR or stain-repellent finishing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. DWR (Durable Water Repellent) and stain-repellent finishing is available on canvas and denim apron constructions. The treatment creates a surface that repels water and oil-based stains, maintaining the appearance of the apron in active kitchen environments. DWR treatment is OEKO-TEX compliant — fluorocarbon-free formulations are available for programmes with environmental compliance requirements. Anti-bacterial treatment is also available as a standard finish for kitchen and food service apron programmes.",
                },
              },
              {
                "@type": "Question",
                name: "What certifications should I require for EU or UK apron sourcing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For EU and UK buyers, OEKO-TEX Standard 100 is the minimum certification requirement — ensuring the finished apron contains no restricted harmful substances. BSCI or Sedex audit compliance is required by most EU retailers and large restaurant chains as part of their supplier qualification process. GOTS certification is available for organic cotton apron programmes. ISO 9001 ensures consistent production quality across batches. For US buyers, OEKO-TEX and BSCI are the primary requirements.",
                },
              },
              {
                "@type": "Question",
                name: "Are pockets available on OEM apron programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Pocket configurations are fully customisable: single front pocket, double front pocket, kangaroo-style pocket, side-seam pockets and breast pocket options are all available. Pocket depth, width and reinforcement stitching can be specified. For professional kitchen programmes, reinforced triple-stitched pockets are recommended for tools and equipment. For front-of-house programmes, welt pockets and slim-profile chest pockets are the most common specifications.",
                },
              },
              {
                "@type": "Question",
                name: "What is the typical lead time for custom branded apron programmes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times are indicative and depend on construction, decoration method, order size and factory scheduling. As a general guide: pre-production samples with artwork approval take 20–30 days from specification and artwork confirmation; bulk production takes 35–55 days from confirmed purchase order and approved sample; sea freight from Karachi adds 18–25 days to USA/EU/UK ports. Embroidery-intensive programmes with complex multi-position decoration take longer than screen print programmes — include your required delivery date in the RFQ for a specific timeline.",
                },
              },
              {
                "@type": "Question",
                name: "Can aprons be supplied as part of a complete F&B uniform programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. MZ Global Trading sources across all F&B workwear categories — aprons, chef jackets, kitchen trousers and front-of-house service wear. Sourcing a complete programme through a single supply partner simplifies procurement, ensures consistent certification coverage and reduces coordination cost. Contact our team or submit an RFQ specifying your full uniform requirements for a consolidated programme quotation.",
                },
              },
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <ApronsContent />
      </main>
      <Footer />
    </>
  );
}
