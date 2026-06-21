import Image from "next/image";
import AnimateInView from "./AnimateInView";

const reasons = [
  {
    icon: "/images/icons/whyus/icon-quality-assurance.svg",
    title: "Quality Assurance",
    desc: "Every order goes through rigorous quality checks by our in-house QC team before shipment.",
  },
  {
    icon: "/images/icons/whyus/icon-pricing.svg",
    title: "Competitive Pricing",
    desc: "Direct factory relationships let us deliver premium products at the most competitive prices.",
  },
  {
    icon: "/images/icons/whyus/icon-ethical-sourcing.svg",
    title: "Ethical Sourcing",
    desc: "We partner exclusively with GOTS, BSCI, and Sedex-certified factories committed to fair labor.",
  },
  {
    icon: "/images/icons/whyus/icon-strong-network.svg",
    title: "Strong Network",
    desc: "50+ vetted factories across Pakistan give you access to every product category under one roof.",
  },
  {
    icon: "/images/icons/whyus/icon-timely-delivery.svg",
    title: "Timely Delivery",
    desc: "95% on-time delivery rate backed by real-time production tracking and proactive communication.",
  },
  {
    icon: "/images/icons/whyus/icon-custom-solutions.svg",
    title: "Custom Solutions",
    desc: "From custom specifications to branded packaging — we tailor every sourcing program to your exact business needs.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimateInView className="text-center mb-12">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Why Work With Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Built on Trust, Driven by Quality
          </h2>
          <p className="text-gray-400 text-base mt-3 max-w-2xl mx-auto">
            We&apos;ve spent over a decade building the systems, relationships, and expertise that international buyers demand.
          </p>
        </AnimateInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <AnimateInView key={r.title} delay={i * 80}>
              <div className="bg-navy-800/60 border border-white/5 rounded-xl p-6 hover:border-gold/30 hover:-translate-y-1.5 transition-all duration-200 group cursor-default h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Image src={r.icon} alt={r.title} width={28} height={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1.5">{r.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>

      </div>
    </section>
  );
}
