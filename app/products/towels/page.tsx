import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TowelsContent from "./TowelsContent";

export const metadata: Metadata = {
  title: "Towels Manufacturer & Exporter | MZ Global Trading",
  description:
    "Source premium towels from Pakistan — bath, beach, hand, kitchen, institutional, and more. 44 towel types, 20+ yarn options, 12 weaving techniques. Request a quote today.",
  keywords: [
    "towels manufacturer Pakistan",
    "bath towels wholesale",
    "beach towels exporter",
    "custom towels B2B",
    "terry towels Pakistan",
    "hotel towels supplier",
    "cotton towels OEM",
  ],
  openGraph: {
    title: "Towels Manufacturer & Exporter | MZ Global Trading",
    description:
      "44 towel types sourced from Pakistan's certified mills. Competitive pricing, custom branding, global shipping.",
    url: "https://mzglobaltrading.com/products/towels",
  },
};

export default function TowelsPage() {
  return (
    <>
      <MegaMenu />
      <main>
        <TowelsContent />
      </main>
      <Footer />
    </>
  );
}
