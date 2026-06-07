import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import SourcingCapabilities from "@/components/SourcingCapabilities";
import WhyUs from "@/components/WhyUs";
import ProcessSteps from "@/components/ProcessSteps";
import Certifications from "@/components/Certifications";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <SourcingCapabilities />
        <WhyUs />
        <ProcessSteps />
        <Certifications />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
