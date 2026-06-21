import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import FenderCoversContent from "./FenderCoversContent";

export const metadata: Metadata = {
  title: "Fender Covers Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan fender cover manufacturer supplying knitted terry stretch and non-scratch automotive fender covers for dealerships, body shops and professional detailers. ISO 9001, BSCI. Export worldwide.",
  keywords: [
    "fender covers manufacturer Pakistan",
    "automotive fender covers wholesale",
    "knitted terry fender cover supplier",
    "non-scratch fender covers Pakistan",
    "auto dealership fender covers bulk",
    "body shop fender covers export",
    "car protection covers manufacturer",
    "professional detailing covers Pakistan",
  ],
  alternates: {
    canonical: "/hometextile/industriallinen/fendercovers/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/industriallinen/fendercovers/",
      "x-default": "https://mzglobaltrading.com/hometextile/industriallinen/fendercovers/",
    },
  },
  openGraph: {
    title: "Fender Covers Manufacturer Pakistan | MZ Global Trading",
    description:
      "Knitted terry stretch and non-scratch automotive fender covers from Pakistan. 300–400 GSM. Non-scratch surface. ISO 9001, BSCI. Export to USA, UK, EU, Australia automotive dealerships and body shops.",
    url: "https://mzglobaltrading.com/hometextile/industriallinen/fendercovers/",
    images: [
      {
        url: "/images/og/fender-covers-og.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan fender cover manufacturer — knitted terry stretch automotive fender covers for dealerships and body shops worldwide",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fender Covers Manufacturer Pakistan | MZ Global Trading",
    description:
      "Knitted terry stretch automotive fender covers from Pakistan. Non-scratch. 300–400 GSM. ISO 9001, BSCI. Export to USA, UK, EU, Australia.",
  },
};

export default function FenderCoversPage() {
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
                name: "What makes knitted terry stretch the best construction for fender covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Knitted terry stretch is the optimal fender cover construction for three reasons. First, the stretch characteristic allows the cover to conform precisely to any fender profile — from compact hatchback to wide SUV — without leaving exposed gaps that woven covers can fail to bridge. Second, the looped terry surface is non-scratch by construction: the soft cotton loops contact the vehicle paintwork rather than any abrasive fibre edge. Third, the knitted structure does not ravel at cut edges, which woven alternatives do — maintaining a clean edge throughout the product's service life. Woven terry fender covers trade stretch conformability for a more stable lay, which some mechanics prefer for flat panel applications. Chenille offers the softest surface for ultra-luxury vehicle care. All three are available through MZ Global Trading.",
                },
              },
              {
                "@type": "Question",
                name: "Can fender covers be supplied with embroidered company logo?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Embroidered logo placement is available on all fender cover constructions. Standard placement is bottom corner or centre panel. For dealership branded programmes, the company name, logo and service department designation are commonly embroidered. We manage artwork digitisation and stitch placement approval as part of the ordering process. Include your artwork file (AI or EPS preferred) and preferred placement in the RFQ. Branded fender covers serve both a practical and marketing function at dealerships — they are visible to customers in the service bay and project a professional, brand-consistent image.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM is standard for professional automotive use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "350 GSM knitted terry stretch is the standard specification for professional automotive workshop and dealership use — this weight provides sufficient pile density to cushion the cover against vehicle paintwork while maintaining the stretch conformability that makes knitted terry the preferred professional construction. 300 GSM is the lighter-duty specification — suitable for car wash, light detailing and volume supply where cost is the primary consideration. 400 GSM is heavy-duty — more substantial pile, greater abrasion resistance, suited to body shop work where the fender cover may be exposed to more physical stress than in light servicing applications.",
                },
              },
              {
                "@type": "Question",
                name: "What is the standard size and are custom dimensions available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The standard size is 35×55 cm — the dominant specification for universal-fit applications across compact cars through to most SUVs. Small (28×45 cm) suits compact and city cars where a full standard cover would overhang excessively. Large (45×65 cm) suits full-size SUVs, trucks and commercial vehicles where the standard size would undercover. Custom dimensions are available for vehicle fleet operators with specific coverage requirements, proprietary workshop equipment sizing or non-standard vehicle types. Include the vehicle type and intended application in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "How are fender covers typically packed for dealership supply?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The standard pack for professional dealership and body shop supply is 2-pack (pair — one for each front fender) as this is how they are used: both front fenders are protected simultaneously during engine, suspension and brake work. 4-pack (set — both front and rear fenders) is common for full-body protection applications in body shops and detailing businesses. Bulk loose packing in export cartons is used for distributor wholesale supply. Branded polybag packing with buyer's logo is available for dealership retail programmes where fender covers are sold as accessories. Specify your distribution format in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "Are oil and solvent resistant fender covers available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oil and solvent resistance is available as a finishing treatment — relevant for body shop applications where brake fluid, solvent cleaners or other aggressive fluids may contact the fender cover during work. Standard cotton terry is naturally absorbent to these fluids, which means a solvent-soaked cover pressed against paintwork is a contamination risk. The resistance treatment applies a barrier coating that prevents fluid penetration into the pile, allowing the cover to be wiped clean and reused safely. This is an optional finishing specification — include it in the RFQ if body shop or chemical-exposure applications are intended.",
                },
              },
              {
                "@type": "Question",
                name: "Which certifications apply to automotive fender covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ISO 9001 Quality Management System certification ensures consistent production quality and documented process control — standard for all automotive supply programmes. BSCI (Business Social Compliance Initiative) ethical audit applies to the supply network — relevant for dealership groups and automotive retailers with supplier compliance codes. For buyers in markets with strict chemical safety requirements at import (particularly EU and UK), OEKO-TEX Standard 100 confirmation that no harmful substances are present is available on request.",
                },
              },
              {
                "@type": "Question",
                name: "What is the indicative lead time for fender cover orders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "RFQ response and quotation: 3–5 business days. Sample production: 12–18 days from specification and artwork confirmation. Bulk production: 30–50 days from confirmed purchase order. Sea freight transit adds 18–30 days to USA, 8–14 days to UK, 20–35 days to Australia. For dealership group procurement with volume commitments, advance ordering 60–75 days before required delivery is recommended. All timelines are indicative and subject to factory scheduling and material availability.",
                },
              },
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
            name: "Fender Covers — Pakistan Automotive Textile Manufacturing",
            description:
              "Knitted terry stretch, woven terry, chenille and microfiber non-scratch automotive fender covers manufactured in Pakistan. 300–400 GSM. Non-scratch surface. ISO 9001, BSCI certified. Supplied to auto dealerships, body shops and professional detailers worldwide. Logo embroidery available.",
            image: "https://mzglobaltrading.com/images/og/fender-covers-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/fender-covers-og.webp",
              name: "Pakistan fender cover manufacturer — knitted terry stretch non-scratch automotive fender covers",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Home Textiles", item: "https://mzglobaltrading.com/hometextile/" },
                { "@type": "ListItem", position: 3, name: "Industrial Linen", item: "https://mzglobaltrading.com/hometextile/industriallinen/" },
                { "@type": "ListItem", position: 4, name: "Fender Covers", item: "https://mzglobaltrading.com/hometextile/industriallinen/fendercovers/" },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <FenderCoversContent />
      </main>
      <Footer />
    </>
  );
}
