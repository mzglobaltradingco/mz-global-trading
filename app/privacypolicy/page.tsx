import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata = buildMetadata({
  title: "Privacy Policy | MZ Global Trading",
  description:
    "Privacy policy for MZ Global Trading — how we collect, use, and protect personal data submitted by international buyers through our textile sourcing.",
  canonical: "/privacypolicy/",
  ogImage: "/images/og/privacypolicy-og.webp",
  ogImageAlt: "MZ Global Trading — Privacy Policy",
  keywords: ["privacy policy", "data protection", "GDPR", "CCPA", "MZ Global Trading"],
});

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
            "url": "https://www.mzglobaltrading.com/privacypolicy/",
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
                  "item": "https://www.mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Privacy Policy",
                  "item": "https://www.mzglobaltrading.com/privacypolicy/",
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
