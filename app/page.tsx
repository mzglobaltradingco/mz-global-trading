import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Hero from "@/components/Hero";
import RebrandPopup from "@/components/RebrandPopup";
import StatsBar from "@/components/StatsBar";
import SourcingCapabilities from "@/components/SourcingCapabilities";
import WhyUs from "@/components/WhyUs";
import ProcessSteps from "@/components/ProcessSteps";
import CertificationsStrip from "@/components/CertificationsStrip";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export const metadata = buildMetadata({
  title: "MZ Global Trading | Pakistan Textile Sourcing — Apparel, Home Textiles & Fabric",
  description: "Pakistan textile sourcing for brands in USA, UK, Canada, Europe and South America. Certified apparel, home textiles and fabric manufacturers.",
  canonical: "/",
  ogImage: "/images/og/homepage-og-image.webp",
  ogImageAlt: "MZ Global Trading — Pakistan Textile Sourcing Partner for Apparel, Home Textiles and Fabric",
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mzglobaltrading.com/#website",
  url: "https://mzglobaltrading.com/",
  name: "MZ Global Trading",
  publisher: { "@id": "https://mzglobaltrading.com/#organization" },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mzglobaltrading.com/#webpage",
  url: "https://mzglobaltrading.com/",
  name: "MZ Global Trading | Pakistan Textile Sourcing — Apparel, Home Textiles & Fabric",
  description:
    "B2B textile sourcing partner for brands and importers in USA, UK and Europe. 50+ certified factories across apparel, home textiles and fabric.",
  isPartOf: { "@id": "https://mzglobaltrading.com/#website" },
  about: { "@id": "https://mzglobaltrading.com/#organization" },
  inLanguage: "en",
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: "https://mzglobaltrading.com/images/og/homepage-og-image.webp",
    width: 1200,
    height: 630,
    name: "MZ Global Trading — Pakistan Textile Sourcing Partner",
  },
};

export default function HomePage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <Hero />
        <StatsBar />
        <SourcingCapabilities />
        <WhyUs />
        <ProcessSteps />
        <CertificationsStrip />
        <CTABanner />
      </main>
      <Footer />
      <RebrandPopup />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
