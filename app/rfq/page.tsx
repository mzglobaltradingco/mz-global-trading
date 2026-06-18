import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import RFQContent from "./RFQContent";

export const metadata: Metadata = {
  title: "Request a Quote | MZ Global Trading",
  description:
    "Submit a sourcing request to MZ Global Trading — apparel, home textiles, and fabric from Pakistan's certified manufacturers. Response within 3–5 business days.",
  keywords: [
    "request a quote textile",
    "Pakistan manufacturer RFQ",
    "wholesale textile sourcing",
    "apparel home textile quote",
  ],
  alternates: {
    canonical: "/rfq/",
    languages: {
      "en": "https://mzglobaltrading.com/rfq/",
      "x-default": "https://mzglobaltrading.com/rfq/",
    },
  },
  openGraph: {
    title: "Request a Quote | MZ Global Trading",
    description:
      "Submit your textile sourcing requirements — apparel, home textiles, and fabric from Pakistan's certified manufacturers. Response within 3–5 business days.",
    url: "https://mzglobaltrading.com/rfq/",
    images: [
      {
        url: "/images/og/rfq-og.webp",
        width: 1200,
        height: 630,
        alt: "Request a Quote — MZ Global Trading Pakistan Textile Sourcing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Quote | MZ Global Trading",
    description:
      "Submit your textile sourcing requirements to MZ Global Trading. Response within 48 hours.",
  },
};

export default function RFQPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <RFQContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "url": "https://mzglobaltrading.com/rfq/",
            "name": "Request a Quote | MZ Global Trading",
            "description":
              "Submit a textile sourcing request to MZ Global Trading — apparel, home textiles, and fabric from Pakistan's certified manufacturers.",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Request a Quote",
                  "item": "https://mzglobaltrading.com/rfq/",
                },
              ],
            },
            "potentialAction": {
              "@type": "CommunicateAction",
              "target": "https://mzglobaltrading.com/rfq/",
              "name": "Submit sourcing request",
            },
          }),
        }}
      />
    </>
  );
}
