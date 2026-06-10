import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import KnowledgeHubContent from "./KnowledgeHubContent";

export const metadata: Metadata = {
  title: "Knowledge Hub | MZ Global Trading",
  description:
    "Trade guides, sourcing insights and company updates from MZ Global Trading — practical knowledge for procurement managers and textile buyers in USA, UK, Europe and Canada.",
  keywords: [
    "textile sourcing guide",
    "Pakistan textile export",
    "fabric specification guide",
    "GSM fabric weight",
    "Incoterms textile",
    "pre-shipment inspection",
    "textile tech pack",
  ],
  alternates: { canonical: "/knowledge/" },
  openGraph: {
    title: "Knowledge Hub | MZ Global Trading",
    description:
      "Trade guides, sourcing insights and company updates from MZ Global Trading — practical knowledge for procurement managers and textile buyers in USA, UK, Europe and Canada.",
    url: "https://mzglobaltrading.com/knowledge/",
    images: [
      {
        url: "/images/og/hero-about.webp",
        width: 1200,
        height: 630,
        alt: "MZ Global Trading Knowledge Hub — textile sourcing guides and trade insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Hub | MZ Global Trading",
    description:
      "Trade guides, sourcing insights and company updates from MZ Global Trading — practical knowledge for procurement managers and textile buyers.",
  },
};

export default function KnowledgePage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <KnowledgeHubContent />
      </main>
      <Footer />
    </>
  );
}
