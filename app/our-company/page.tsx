import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import OurCompanyContent from "./OurCompanyContent";

export const metadata: Metadata = {
  title: "About Us | MZ Global Trading",
  description:
    "Learn about MZ Global Trading — a Karachi-based textile sourcing company serving international buyers across 30+ countries with apparel, home textiles, and fabric.",
  openGraph: {
    title: "About Us | MZ Global Trading",
    description: "Pakistan's trusted textile sourcing partner for international buyers, brands and retailers.",
    url: "https://mzglobaltrading.com/our-company/",
  },
};

export default function OurCompanyPage() {
  return (
    <>
      <MegaMenu />
      <main>
        <OurCompanyContent />
      </main>
      <Footer />
    </>
  );
}
