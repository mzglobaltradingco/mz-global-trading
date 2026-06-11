import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TermsOfUseContent from "./TermsOfUseContent";

export const metadata: Metadata = {
  title: "Terms of Use | MZ Global Trading",
  description:
    "Terms of use for mzglobaltrading.com — governing law, RFQ submission terms, intellectual property, and liability limitations for international B2B textile buyers.",
  keywords: ["terms of use", "terms and conditions", "legal", "MZ Global Trading"],
  alternates: { canonical: "/termsofuse/" },
  openGraph: {
    title: "Terms of Use | MZ Global Trading",
    description:
      "Terms governing use of the MZ Global Trading website and B2B textile sourcing enquiry services. Governing law: Pakistan.",
    url: "https://mzglobaltrading.com/termsofuse/",
    images: [
      {
        url: "/images/og/termsofuse-og.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading — Terms of Use",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | MZ Global Trading",
    description:
      "Terms governing use of the MZ Global Trading website and B2B textile sourcing enquiry services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <TermsOfUseContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "url": "https://mzglobaltrading.com/termsofuse/",
            "name": "Terms of Use | MZ Global Trading",
            "description":
              "Terms governing use of the MZ Global Trading website and B2B textile sourcing enquiry services.",
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
                  "name": "Legal",
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Terms of Use",
                  "item": "https://mzglobaltrading.com/termsofuse/",
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
