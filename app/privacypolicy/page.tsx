import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | MZ Global Trading",
  description:
    "Privacy policy for MZ Global Trading — how we collect, use, and protect personal data submitted by international buyers through our textile sourcing enquiry forms.",
  keywords: ["privacy policy", "data protection", "GDPR", "CCPA", "MZ Global Trading"],
  alternates: { canonical: "/privacypolicy/" },
  openGraph: {
    title: "Privacy Policy | MZ Global Trading",
    description:
      "How MZ Global Trading collects, uses, and protects personal data from international buyers. GDPR and CCPA compliant.",
    url: "https://mzglobaltrading.com/privacypolicy/",
    images: [
      {
        url: "/images/og/privacypolicy-og.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading — Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | MZ Global Trading",
    description:
      "How MZ Global Trading collects, uses, and protects personal data from international buyers.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <PrivacyPolicyContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "url": "https://mzglobaltrading.com/privacypolicy/",
            "name": "Privacy Policy | MZ Global Trading",
            "description":
              "Privacy policy for MZ Global Trading — how we collect, use, and protect personal data submitted by international buyers through our textile sourcing enquiry forms.",
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
                  "name": "Privacy Policy",
                  "item": "https://mzglobaltrading.com/privacypolicy/",
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
