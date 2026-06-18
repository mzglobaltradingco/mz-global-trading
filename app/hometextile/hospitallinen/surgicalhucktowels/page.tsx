import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import SurgicalHuckTowelsContent from "./SurgicalHuckTowelsContent";

export const metadata: Metadata = {
  title: "Surgical Huck Towels Manufacturer Pakistan | MZ Global",
  description:
    "Pakistan surgical huck towel manufacturer — 100% cotton honeycomb weave, pre-washed, lint-free. Hospital and surgical suite supply. ISO 9001, BSCI certified export.",
  keywords: [
    "surgical huck towels manufacturer Pakistan",
    "huck towels wholesale Pakistan",
    "surgical towels supplier Pakistan",
    "honeycomb weave huck towels",
    "hospital huck towel export",
    "lint-free surgical towels Pakistan",
    "huck towels bulk supply",
    "ISO 9001 huck towels Pakistan",
    "operating theatre towels supplier",
  ],
  alternates: {
    canonical: "/hometextile/hospitallinen/surgicalhucktowels/",
    languages: {
      en: "https://mzglobaltrading.com/hometextile/hospitallinen/surgicalhucktowels/",
      "x-default":
        "https://mzglobaltrading.com/hometextile/hospitallinen/surgicalhucktowels/",
    },
  },
  openGraph: {
    title: "Surgical Huck Towels Manufacturer Pakistan | MZ Global",
    description:
      "Surgical huck towels sourced from Pakistan's ISO-certified weaving mills. 100% cotton honeycomb huck weave. Pre-washed, lint-free, high absorbency. ISO 9001, BSCI certified. Export to USA, UK, Australia.",
    url: "https://mzglobaltrading.com/hometextile/hospitallinen/surgicalhucktowels/",
    images: [
      {
        url: "/images/og/hero-home-textiles.webp",
        width: 1200,
        height: 630,
        alt: "Pakistan surgical huck towel manufacturer — 100% cotton honeycomb weave lint-free surgical towels for hospitals worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surgical Huck Towels Manufacturer Pakistan | MZ Global",
    description:
      "Pakistan surgical huck towels — 100% cotton honeycomb weave, pre-washed, lint-free. ISO 9001, BSCI certified. Export to USA, UK, Australia, Canada.",
  },
};

export default function SurgicalHuckTowelsPage() {
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
                name: "What construction defines a surgical huck towel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A surgical huck towel is defined by its huck (huckaback) weave — a specific honeycomb-like woven structure that creates a raised texture through interlacing long weft floats with plain weave ground. This construction produces a fabric with dramatically higher surface area than flat woven alternatives, delivering superior absorbency for surgical suite applications. The textured surface also releases lint through pre-washing before use — a critical requirement for operating theatre environments where loose fibres in the surgical field present infection risks. No substitute construction delivers the same combination of absorbency and lint-free performance after pre-washing.",
                },
              },
              {
                "@type": "Question",
                name: "Why must surgical huck towels be pre-washed before use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "New huck towels contain residual manufacturing lint from the weaving and finishing process. Pre-washing removes this surface lint, establishing the lint-free state required for sterile surgical environments. Our huck towels are pre-washed before packing and dispatch — they are lint-stable on arrival and will not contaminate the surgical field. The pre-wash also eliminates initial shrinkage: our delivered dimensions reflect post-wash stable measurements, removing the risk of size reduction on first institutional laundering. This is non-negotiable for operating theatre procurement.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM range is available for surgical huck towels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We supply surgical huck towels in 180–280 GSM. The standard specification for US operating theatre and hospital central sterile supply departments (CSSD) is 220 GSM — balancing absorbency, durability and practical handling weight. Lighter 180–200 GSM variants are specified for applications prioritising faster drying in high-turnover laundry cycles. Heavier 250–280 GSM is available for premium surgical supply programmes requiring maximum fluid capacity per towel. All GSM tiers use identical huck weave construction — weight variation comes from yarn count and density rather than construction change.",
                },
              },
              {
                "@type": "Question",
                name: "What are the standard and available sizes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The standard surgical huck towel is 40×75 cm — the dominant specification in US hospital purchasing and CSSD supply programmes. Large format 45×100 cm is available for surgical suites requiring greater coverage per towel. Custom dimensions are available for institutional programmes with specific size requirements — include your required finished dimensions (post-wash stable) in the RFQ. For blue-stripe variants used as absorbent-side markers in surgical fields, stripe placement is across the short end at 3–5 cm from the edge.",
                },
              },
              {
                "@type": "Question",
                name: "Are plain white and blue stripe variants available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Plain white is the standard surgical huck towel specification — preferred for sterile environments where any colour variation could be confused with contamination. Blue stripe variants feature a single or double blue woven stripe across the short end, used as an absorbent-side marker or visual orientation indicator in the surgical field. The blue stripe is yarn-dyed and woven into the fabric structure — it is colourfast through repeated autoclaving and industrial laundering. Specify your preference in the RFQ; both variants are supplied in the same GSM and construction options.",
                },
              },
              {
                "@type": "Question",
                name: "How are surgical huck towels packed for hospital supply?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard packing for US hospital and CSSD supply: dozens (12 pcs) banded or poly-wrapped, then packed in bulk cartons. We also supply in 24-pack and 50-pack bulk carton formats depending on buyer preference. For gross-quantity purchasing (144 pcs per carton), units are counted, banded in dozens and cartoned with double-wall export carton. Carton marking includes item description, construction, size, quantity, GSM and country of origin. For sterile individual-wrapped presentation for direct theatre use, this is available as a premium packing option.",
                },
              },
              {
                "@type": "Question",
                name: "What certifications apply to your surgical huck towel supply?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "ISO 9001 Quality Management System certification covers production process quality across our huck towel supply network. BSCI (Business Social Compliance Initiative) covers ethical production and labour standards — standard for US hospital purchasing organisations (GPOs) and NHS supply chain. SA8000 is available for buyers with strict social compliance requirements. OEKO-TEX Standard 100 certifies freedom from restricted substances in the finished product. For US buyers, we provide factory audit reports and production process documentation supporting GPO qualification requirements.",
                },
              },
              {
                "@type": "Question",
                name: "What is the lead time for huck towel orders?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times are indicative and subject to order volume. As a general guide: samples take 7–12 days from specification confirmation (huck towel constructions are typically maintained in factory sampling inventory); bulk production takes 25–40 days from purchase order placement, including pre-washing and packing. Sea freight adds 20–30 days to USA (East or West Coast), 25–30 days to UK and 28–35 days to Australia. For GPO or IDN programmes with fixed quarterly delivery schedules, we recommend placing orders 60–75 days before the required delivery date.",
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
            name: "Surgical Huck Towels — Pakistan Hospital Supply Export",
            description:
              "Surgical huck towels manufactured in Pakistan's certified weaving mills. 100% cotton honeycomb huck weave. Pre-washed, lint-free, high absorbency. 180–280 GSM. Plain white and blue stripe. ISO 9001, BSCI certified. FOB / CIF export to USA, UK, Australia.",
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
              name: "Pakistan surgical huck towel manufacturer — lint-free cotton honeycomb weave surgical towels for hospitals worldwide",
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
                  name: "Hospital Linen",
                  item: "https://mzglobaltrading.com/hometextile/hospitallinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Surgical Huck Towels",
                  item: "https://mzglobaltrading.com/hometextile/hospitallinen/surgicalhucktowels/",
                },
              ],
            },
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <SurgicalHuckTowelsContent />
      </main>
      <Footer />
    </>
  );
}
