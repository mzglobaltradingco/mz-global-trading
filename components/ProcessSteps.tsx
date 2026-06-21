import Image from "next/image";
import AnimateInView from "./AnimateInView";

const steps = [
  {
    icon: "/images/icons/process/icon-requirement-analysis.svg",
    step: "01",
    title: "Requirement Analysis",
    desc: "You share your product specs, quality standards, and target pricing. We review and align on deliverables.",
  },
  {
    icon: "/images/icons/process/icon-supplier-selection.svg",
    step: "02",
    title: "Supplier Selection",
    desc: "We match your requirements with the most suitable certified factories from our vetted network.",
  },
  {
    icon: "/images/icons/process/icon-sampling-approval.svg",
    step: "03",
    title: "Sampling & Approval",
    desc: "Samples are produced, inspected by our QC team, and sent to you for approval before bulk production.",
  },
  {
    icon: "/images/icons/process/icon-bulk-production.svg",
    step: "04",
    title: "Bulk Production",
    desc: "Approved samples trigger bulk production with ongoing milestone tracking and inline QC monitoring.",
  },
  {
    icon: "/images/icons/process/icon-quality-inspection.svg",
    step: "05",
    title: "Quality Inspection",
    desc: "Final pre-shipment inspection ensures every piece meets your specifications before it leaves the factory.",
  },
  {
    icon: "/images/icons/process/icon-shipping-delivery.svg",
    step: "06",
    title: "Shipping & Delivery",
    desc: "We coordinate freight, customs documentation, and ensure your cargo arrives on time at your destination.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Our Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">
            From Concept to Container
          </h2>
          <p className="text-gray-500 text-base mt-3 max-w-2xl mx-auto">
            A transparent, end-to-end process designed to eliminate risk and deliver results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <AnimateInView key={s.step} delay={i * 80}>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-gold/40 hover:shadow-md transition-all h-full">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-navy-900 rounded-lg flex items-center justify-center mb-2">
                      <Image src={s.icon} alt={s.title} width={26} height={26} />
                    </div>
                    <span className="text-2xl font-bold text-gold/30">{s.step}</span>
                  </div>
                  <div>
                    <h3 className="text-navy-900 font-semibold text-base mb-1.5">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
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
