import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import FAQsContent from "./FAQsContent";

export const metadata: Metadata = {
  title: "FAQs | MZ Global Trading",
  description:
    "Common questions from international textile buyers answered — MOQ, lead times, AQL inspection standards, certifications, shipping incoterms and payment terms.",
  keywords: [
    "textile sourcing FAQ",
    "Pakistan manufacturer MOQ",
    "AQL inspection textile",
    "textile certification questions",
    "FOB incoterms textile buyer",
    "B2B textile importer FAQ",
  ],
  alternates: { canonical: "/faqs/" },
  openGraph: {
    title: "Frequently Asked Questions | MZ Global Trading",
    description:
      "MOQ, lead times, AQL inspection, certifications, incoterms and payment terms — common buyer questions answered by MZ Global Trading.",
    url: "https://mzglobaltrading.com/faqs/",
    images: [
      {
        url: "/images/og/hero-why-choose-us.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading FAQ — textile sourcing questions answered for international buyers",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | MZ Global Trading",
    description:
      "MOQ, lead times, AQL, certifications and payment terms — common buyer questions answered.",
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://mzglobaltrading.com/faqs/",
  url: "https://mzglobaltrading.com/faqs/",
  name: "Frequently Asked Questions | MZ Global Trading",
  inLanguage: "en",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
      { "@type": "ListItem", position: 2, name: "Corporate" },
      { "@type": "ListItem", position: 3, name: "FAQs", item: "https://mzglobaltrading.com/faqs/" },
    ],
  },
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the minimum order quantity (MOQ) for textile sourcing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MOQ varies from product to product. Normally the MOQ is 2,000 metres per colour per design/style. MOQs remain negotiable depending on product type, and repeat customers are given special consideration. Submit via the RFQ form for a product-specific MOQ confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "What AQL standard do you use for pre-shipment inspection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depending on the agreed scope of work, we apply ISO 2859-1 AQL Level II: Critical defects = 0 (zero tolerance), Major defects = AQL 2.5, Minor defects = AQL 4.0. Shipments are only released on a PASS result.",
      },
    },
    {
      "@type": "Question",
      name: "Which certifications are available across your factory network?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our factory network covers GOTS, OEKO-TEX Standard 100, BSCI, Sedex, ISO 9001, GRS, WRAP, BCI, SA8000 and Bluesign. Certification availability varies by factory and product type. Specify required certifications in the RFQ.",
      },
    },
    {
      "@type": "Question",
      name: "What incoterms do you offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The incoterms we confidently offer are FOB, CIF and CFR/CNF. FOB Karachi or FOB Port Qasim is the most common arrangement. DDP may be considered for existing customers, depending on global challenges and risks.",
      },
    },
    {
      "@type": "Question",
      name: "What are the payment terms for textile orders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standard terms are 30% deposit on order confirmation, 70% balance against copy of bill of lading before shipment release. Payment is by bank transfer (T/T) in USD. LC at sight is also entertained through reliable banking channels; D/A terms are not preferred.",
      },
    },
  ],
};

export default function FAQsPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <FAQsContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </>
  );
}
