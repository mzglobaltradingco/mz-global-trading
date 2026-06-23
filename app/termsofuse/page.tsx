import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TermsOfUseContent from "./TermsOfUseContent";

export const metadata = buildMetadata({
  title: "Terms of Use | MZ Global Trading",
  description:
    "Terms of use for mzglobaltrading.com — governing law, RFQ submission terms, intellectual property and liability limitations for buyers and service users.",
  canonical: "/termsofuse/",
  ogImage: "/images/og/termsofuse-og.webp",
  ogImageAlt: "MZ Global Trading — Terms of Use",
  keywords: ["terms of use", "terms and conditions", "legal", "MZ Global Trading"],
});

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
