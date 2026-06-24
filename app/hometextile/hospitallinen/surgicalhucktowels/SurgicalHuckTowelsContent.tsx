"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 160, behavior: "smooth" });
}

function BackToTop({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex justify-center mt-16">
      <button onClick={() => scrollToId("bento-grid")}
        className={`group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold transition-all duration-300 ${dark ? "border border-gold/60 text-[#D4A017] hover:bg-gold hover:text-navy-900" : "border-2 border-gold text-navy-900 hover:bg-gold shadow-xs"}`}
        style={{ animation: "btt-pulse 2.2s ease-out infinite" }}>
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↑</motion.span>
        Back to overview
      </button>
      <style>{`@keyframes btt-pulse{0%{box-shadow:0 0 0 0 rgba(212,160,23,0.45)}70%{box-shadow:0 0 0 10px rgba(212,160,23,0)}100%{box-shadow:0 0 0 0 rgba(212,160,23,0)}}`}</style>
    </div>
  );
}

function ExploreBtn({ sectionId, label }: { sectionId: string; label: string }) {
  return (
    <button onClick={() => scrollToId(sectionId)} className="group self-start inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold transition-colors mt-auto pt-4">
      {label}<span className="group-hover:translate-x-1 transition-transform block" aria-hidden="true">→</span>
    </button>
  );
}

const CONSTRUCTION_DETAIL = {
  name: "Huck / Honeycomb Weave — 100% Cotton",
  description: "Huck weave — also written as huck-a-back or huckaback — is the only construction used for operating theatre towels supplied to the US surgical market. The honeycomb structure of the weave creates a series of raised and recessed cells on the fabric surface. These cells create micro-pockets that trap fluid, tissue and debris at the point of contact, rather than redistributing it across the fabric surface the way plain weave would. The result is a towel that absorbs and retains rather than smears — the defining functional requirement in a surgical field.",
  why: "100% cotton is non-negotiable for surgical huck towels. Synthetic fibre content generates lint — a contamination risk in an open surgical field. All surgical huck towels are pre-washed before packing to remove manufacturing residues and achieve dimensional stability, confirming zero-lint status before first use.",
  gsm: "180–280 GSM (standard: 220 GSM)",
  sizes: "40×75 cm · 45×100 cm · Custom",
};

const GSM_DATA = [
  { gsm: "180–200", label: "Standard Surgical", bar: 55, note: "Lighter range — faster drying between autoclave cycles. Adequate absorbency for general surgical field use.", color: "bg-cyan-400" },
  { gsm: "200–240", label: "Institutional Standard (220 GSM)", bar: 90, note: "The dominant US and Australian surgical huck towel specification. Optimal balance of absorbency, thickness and launder life.", color: "bg-teal-700", highlight: true },
  { gsm: "240–280", label: "Heavy Duty", bar: 68, note: "Maximum absorbency — CSSD central sterile supply and high-volume operating theatre supply.", color: "bg-indigo-700" },
];

const SIZES = [
  { dim: "40 × 75 cm", market: "USA surgical standard — the defining dimension for US operating theatre huck towels", tag: "USA Standard" },
  { dim: "45 × 100 cm", market: "Australian, Canadian and UK surgical standard — larger format for theatre use", tag: "AU · CA · UK" },
  { dim: "Custom", market: "Specify exact centimetre dimensions — for CSSD or distributor house-brand specifications", tag: "Bespoke" },
];

const VARIANTS = [
  { name: "Plain White", icon: "⬜", desc: "Universal standard. Maximum clinical visibility — blood, tissue and fluid contrast clearly against white. Default specification for all US surgical supply programmes. Bleach-stable for repeated decontamination." },
  { name: "Blue Stripe", icon: "🔵", desc: "Blue border stripe on white ground — the standard colour indicator for identifying surgical huck towels versus other plain white linens in CSSD processing. The stripe allows visual differentiation of surgical-grade towels from general hospital laundry without item-level tagging." },
];

const FINISHING = [
  { name: "Pre-Washed", critical: true, desc: "All surgical huck towels are pre-washed before packing to remove manufacturing starches, spinning oils and residual fibres. This is the step that confirms zero-lint status before first clinical use. Non-pre-washed huck towels generate lint — unacceptable in an open surgical field." },
  { name: "Shrink Resistant", critical: true, desc: "Pre-washing achieves dimensional stability — towels will not change size after the first launder. Consistent dimensions are essential for CSSD automated packaging and sterile barrier system sizing." },
  { name: "Autoclave Compatible", critical: false, desc: "100% cotton huck weave is inherently compatible with autoclave sterilisation at 121°C and 134°C. No finishing chemistry is required — the construction itself is the compliance point." },
  { name: "Bleach Stable", critical: false, desc: "Natural cotton construction withstands repeated chlorine bleach laundering to ISO 10993 cleaning protocols without structural degradation across hundreds of launder cycles." },
];

const PACKING_OPTIONS = [
  { name: "Dozen-Bundle (12 pcs)", code: "DZ", desc: "The US surgical huck towel standard packing unit. Banded in groups of 12 — the universal unit of measure for US surgical supply and CSSD restocking." },
  { name: "24-Pack", code: "24P", desc: "Double-dozen packing for efficiency in higher-volume CSSD supply runs. Common for hospital group supply." },
  { name: "50-Pack", code: "50P", desc: "Institution-size packs for bulk CSSD supply and large operating theatre volumes." },
  { name: "Gross (144 pcs)", code: "GRS", desc: "Full gross — 12 dozen — for distributor primary bulk packing. Most efficient packing unit for USA medical distributors and GPO fulfilment." },
  { name: "Bulk Carton", code: "BLK", desc: "Loose packing in carton without inner count packs — for buyers supplying their own pack-down facility or CSSD with internal packaging operation." },
];

const CERTIFICATIONS = [
  { name: "ISO 9001", desc: "Quality management — universal hospital and distributor procurement baseline" },
  { name: "ISO 13485", desc: "Medical devices quality management — specified in US and EU surgical supply frameworks" },
  { name: "OEKO-TEX Standard 100", desc: "No restricted substances — for patient-contact surgical textiles" },
  { name: "BSCI", desc: "Ethical production audit — NHS and EU supply chain standard" },
  { name: "Sedex", desc: "Supply chain ethical data compliance" },
  { name: "SA8000", desc: "Highest social compliance standard" },
];

const SECTORS = [
  { name: "US Operating Theatres", detail: "Primary market for surgical huck towels — 40×75 cm plain white and blue stripe. GPO and hospital group direct supply.", market: "USA" },
  { name: "Central Sterile Supply (CSSD)", detail: "Bulk supply for central sterile supply department autoclave packing and theatre kit assembly.", market: "USA · Australia · Canada" },
  { name: "US Medical Distributors", detail: "Bulk dozen-pack export for US regional and national medical supply distributors. Gross packing available.", market: "USA — Primary Export Market" },
  { name: "Australian Operating Theatres", detail: "45×100 cm standard format. Blue stripe variant to AS/NZS linen identification standards.", market: "Australia · New Zealand" },
  { name: "NHS Operating Theatres", detail: "UK operating theatre supply — NHS procurement framework compliance documentation available.", market: "United Kingdom" },
  { name: "Canadian Hospitals", detail: "45×100 cm format — Canadian hospitals align with UK/AU sizing rather than US standard.", market: "Canada" },
];

const PROCESS_STEPS = [
  { num: "01", title: "RFQ Submission", desc: "Specify dimension (40×75 or 45×100), GSM, variant (white or blue stripe), packing format and destination market." },
  { num: "02", title: "Factory Matching", desc: "We shortlist certified Pakistan huck weave mills with documented surgical supply export history to your target market." },
  { num: "03", title: "Fabric Swatch & Sample", desc: "Huck weave sample at specified GSM. Pre-washed sample confirms zero-lint finish before bulk production." },
  { num: "04", title: "Bulk Production", desc: "From purchase order. Pre-washing is included in production sequence — not a separate add-on step." },
  { num: "05", title: "QC & Pre-Shipment Inspection", desc: "GSM verification, dimensional check post-pre-wash, lint test, packing count verification." },
  { num: "06", title: "Export & Certification Docs", desc: "Packing by size and variant, ISO 9001 documentation, test reports, vessel loading." },
];

const FAQS = [
  { q: "What makes huck weave the standard construction for surgical towels?", a: "Huck weave — also called huckaback weave — creates a honeycomb surface structure of raised and recessed cells. These cells trap fluid, tissue and debris at the point of contact rather than redistributing it across the fabric surface. In a surgical field, containment is the operative function: huck construction absorbs and holds rather than smearing. Plain weave cotton would spread rather than contain, and any synthetic fibre content introduces lint — a contamination risk in an open operative field. Huck weave in 100% cotton is the only construction that satisfies both requirements simultaneously." },
  { q: "Why are surgical huck towels pre-washed?", a: "Pre-washing before packing removes manufacturing starches, spinning oils and loose fibres from the new fabric surface. Without pre-washing, new huck towels generate lint on first use. In an operating theatre or CSSD environment, loose fibres in a sterile field are a contamination risk. Pre-washing is the confirmation step that a huck towel is lint-free before its first clinical deployment. It also achieves dimensional stability — pre-washed towels will not shrink after their first launder, ensuring consistent dimensions for CSSD automated packaging and sterile barrier system sizing." },
  { q: "What is the standard US surgical huck towel size?", a: "The standard US operating theatre huck towel dimension is 40×75 cm. This is the dimension stocked by US medical distributors and purchased by US hospital CSSD departments. US surgical huck towels are available in plain white and blue stripe variants. Australian, Canadian and UK surgical supply typically uses a larger 45×100 cm format. If sourcing for multiple geographies, specify the destination market in your RFQ so we can confirm the correct dimension." },
  { q: "What is the difference between plain white and blue stripe surgical huck towels?", a: "Functionally, both perform identically — the huck weave construction and 100% cotton specification is the same. Blue stripe is a visual identification convention: the woven stripe border allows CSSD staff to identify surgical-grade huck towels from other plain white institutional linen in the laundry sorting and autoclave packing process without item-level tagging. Many US hospital systems specify blue stripe specifically for this reason. Plain white is the default specification for buyers without a specific stripe requirement." },
  { q: "What GSM should I specify for surgical huck towels?", a: "220 GSM is the institutional standard in the US surgical supply market — it provides the optimal combination of absorbency, surface thickness and launder cycle durability. Lighter specifications (180–200 GSM) dry faster between autoclave cycles, relevant where CSSD throughput volume is the constraint. Heavier specifications (240–280 GSM) provide maximum absorbency for high-volume operating theatre environments. Include your GSM requirement in the RFQ; if you are unsure, 220 GSM is the correct default and we can provide samples at this and adjacent weights for comparison." },
  { q: "What packing units are available for surgical huck towels?", a: "The US standard is dozens — groups of 12 pieces banded or poly-wrapped. Dozens are the universal unit of measure for US surgical supply and CSSD restocking. We also supply 24-packs (double dozens), 50-packs for larger CSSD volumes, and gross packing (144 pieces — 12 dozen) for US distributor primary bulk fulfilment. Bulk carton loose packing is available for buyers operating their own CSSD pack-down facility. Specify your preferred packing format in the RFQ." },
  { q: "Are surgical huck towels autoclave-compatible?", a: "Yes. 100% cotton huck weave is inherently compatible with autoclave sterilisation at both 121°C (gravity displacement) and 134°C (pre-vacuum) cycles. No special finishing chemistry is required — the material itself is the compliance point. Pre-washing confirms that no finishing residues are present that could affect sterilisation efficacy or generate contamination in the sterile field. Synthetic fibre content in huck towels would reduce autoclave compatibility; 100% cotton construction is therefore both the clinical and sterilisation requirement." },
  { q: "What is the indicative lead time for surgical huck towels?", a: "Lead times are indicative and depend on GSM, variant and order volume. As a general guide: fabric swatch and sample production takes 10–15 days; bulk production takes 25–40 days from purchase order; pre-washing is included in the production sequence and does not add separate lead time. Sea freight to the USA adds approximately 20–28 days from port of loading; to Australia 18–25 days; to the UK 20–30 days. US distributors with container programme requirements should allow a minimum of 60 days from purchase order to arrival at destination port." },
];

export default function SurgicalHuckTowelsContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero/hero-surgical-huck-towels.webp" fill alt="Pakistan surgical huck towels manufacturer — huckaback weave 100% cotton surgical towels for US and global operating theatre supply" className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,27,42,0.93) 0%, rgba(13,27,42,0.78) 35%, rgba(13,27,42,0.30) 62%, transparent 85%)" }} aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
                        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2 text-gray-500 text-xs mb-8 flex-wrap">
              <Link prefetch={false} href="/" className="hover:text-gold transition-colors">Home</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/" className="hover:text-gold transition-colors">Home Textiles</Link>
              <span aria-hidden="true">&#x203A;</span>
              <Link prefetch={false} href="/hometextile/hospitallinen/" className="hover:text-gold transition-colors">Hospital Linen</Link>
              <span aria-hidden="true">&#x203A;</span>
              <span className="text-gold">Surgical Huck Towels</span>
            </motion.nav>
<motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Pakistan Surgical Supply Export</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8">
              Surgical Huck<br /><span className="text-gold">Towels</span><br />Pakistan
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl">
              MZ Global Trading sources surgical huck towels from Pakistan&rsquo;s certified cotton mills. Huck/honeycomb weave, 100% cotton only, pre-washed zero-lint, 180–280 GSM. Plain white and blue stripe variants. 40×75 cm USA standard and 45×100 cm AU/CA/UK format. ISO 9001, ISO 13485, OEKO-TEX certified. Dozen, gross and bulk carton packing for US and global surgical distributors.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote<span aria-hidden="true">&#8594;</span></Link>
              <button onClick={() => scrollToId("bento-grid")} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Explore Product Guide</button>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <div className="w-px h-8 bg-white/30" />
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* STATS ANCHOR */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="bg-navy-900 rounded-2xl p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            <div className="flex-1">
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Surgical Huck Towels — Pakistan Cotton Mills</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-3">Zero-Lint Huck Weave for Operating Theatres &amp; CSSD Supply</h2>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">Pakistan&rsquo;s certified cotton mills produce surgical huck towels to the specification used by US operating theatres, hospital CSSD departments and medical distributors. Pre-washed, zero-lint, ISO 9001 certified. Dozen and gross packing for US distributor programmes.</p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-8 lg:gap-10 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-10 shrink-0">
              {[{ val: "50+", label: "Vetted Mills" }, { val: "35+", label: "Export Markets" }, { val: "220", label: "Standard GSM" }, { val: "100%", label: "Cotton Only" }].map((s) => (
                <div key={s.label} className="text-center"><p className="text-3xl font-bold text-gold">{s.val}</p><p className="text-xs text-gray-500 mt-1 leading-tight whitespace-nowrap">{s.label}</p></div>
              ))}
            </div>
            <Link prefetch={false} href="/rfq/" className="shrink-0 inline-flex items-center gap-2 bg-gold text-navy-900 font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors w-fit">Request a Quote <span aria-hidden="true">&#8594;</span></Link>
          </motion.div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section id="bento-grid" className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Complete Product Guide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Everything on Surgical Huck Towels</h2>
            <p className="text-gray-500 mt-3 max-w-lg text-sm">Click any card to jump to the detailed section.</p>
          </div>
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-navy-900 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">🧵</span><div><p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">One Construction</p><h3 className="text-xl font-bold text-white mt-0.5">Huck / Honeycomb Weave</h3></div></div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1">
                <p className="text-sm font-bold text-white mb-2">Huck Weave — 100% Cotton ONLY</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">GSM</p><p className="text-sm font-semibold text-white">180–280 GSM</p></div>
                  <div><p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">Standard</p><p className="text-sm font-semibold text-white">220 GSM</p></div>
                  <div><p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">Fibre</p><p className="text-sm font-semibold text-white">100% Cotton</p></div>
                  <div><p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">Lint Status</p><p className="text-sm font-semibold text-gold">Zero-Lint</p></div>
                </div>
              </div>
              <ExploreBtn sectionId="section-construction" label="Read Construction Details" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[300px]">
              <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden="true">📦</span><div><p className="text-slate-500 text-xs font-semibold tracking-[0.2em] uppercase">Packing</p><h3 className="text-xl font-bold text-navy-900 mt-0.5">Packing Units &amp; Sizes</h3></div></div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {PACKING_OPTIONS.slice(0, 4).map((p) => (
                  <div key={p.code} className="bg-white rounded-xl p-3 border border-slate-100">
                    <p className="text-xs font-bold text-gold mb-0.5">{p.code}</p>
                    <p className="text-sm font-semibold text-navy-900 leading-tight">{p.name}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-packing" label="View All Packing Formats" />
            </motion.div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-teal-50 border border-teal-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-teal-600 text-xs font-semibold tracking-[0.2em] uppercase">Weight</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">GSM Ranges</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {GSM_DATA.map(g => (
                  <div key={g.gsm} className="flex items-start gap-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-700 shrink-0 mt-0.5">{g.gsm}</span>
                    <span className="text-xs text-gray-600 leading-tight">{g.label}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-gsm" label="GSM Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.07 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-blue-600 text-xs font-semibold tracking-[0.2em] uppercase">Dimensions</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Sizes</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SIZES.map(s => (
                  <div key={s.dim} className="flex items-start gap-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 shrink-0 mt-0.5">{s.tag}</span>
                    <span className="text-xs text-gray-600 leading-tight">{s.dim}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sizes" label="Size Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.14 }}
              className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase">Appearance</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Variants</h3>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {VARIANTS.map(v => (
                  <div key={v.name} className="flex items-start gap-2">
                    <span className="text-base leading-none mt-0.5" aria-hidden="true">{v.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900">{v.name}</p>
                      <p className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-2">{v.desc.slice(0, 60)}…</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-variants" label="Variant Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.21 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-green-600 text-xs font-semibold tracking-[0.2em] uppercase">Treatment</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Critical Finishing</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {FINISHING.map(f => (
                  <div key={f.name} className="flex items-start gap-2">
                    {f.critical
                      ? <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-200 text-green-800 shrink-0 mt-0.5">REQ</span>
                      : <span className="text-green-500 text-xs mt-0.5">✓</span>}
                    <span className="text-xs text-gray-600 leading-tight">{f.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-finishing" label="Finishing Detail" />
            </motion.div>
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-amber-600 text-xs font-semibold tracking-[0.2em] uppercase">Compliance</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Certifications</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.name} className="flex items-start gap-2">
                    <span className="text-amber-500 text-xs mt-0.5 shrink-0">✓</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900 leading-tight">{c.name}</p>
                      <p className="text-[10px] text-gray-500 leading-tight">{c.desc.split(" — ")[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-certifications" label="Cert Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}
              className="bg-rose-50 border border-rose-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-rose-600 text-xs font-semibold tracking-[0.2em] uppercase">Markets</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">Buyer Sectors</h3>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                {SECTORS.map((s) => (
                  <div key={s.name} className="flex items-start gap-2">
                    <span className="text-rose-400 text-xs mt-0.5 shrink-0">▶</span>
                    <div>
                      <p className="text-xs font-semibold text-navy-900 leading-tight">{s.name}</p>
                      <p className="text-[10px] text-gray-500">{s.market}</p>
                    </div>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-sectors" label="Sector Detail" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.16 }}
              className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex flex-col gap-3 min-h-[200px]">
              <div>
                <p className="text-purple-600 text-xs font-semibold tracking-[0.2em] uppercase">Packing Formats</p>
                <h3 className="text-base font-bold text-navy-900 mt-0.5">OEM Programme</h3>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {PACKING_OPTIONS.map((p) => (
                  <div key={p.code} className="flex items-center gap-2">
                    <span className="w-8 text-center text-[9px] font-bold bg-purple-100 text-purple-700 rounded px-1 py-0.5">{p.code}</span>
                    <span className="text-xs text-gray-700 font-medium">{p.name}</span>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-oem" label="Packing Detail" />
            </motion.div>
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="bg-cyan-50 border border-cyan-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">🔄</span>
                <div>
                  <p className="text-cyan-600 text-xs font-semibold tracking-[0.2em] uppercase">Process</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Sourcing Process</h3>
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-1">
                {PROCESS_STEPS.map((s, i) => (
                  <div key={s.num} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-xs font-semibold text-navy-900 leading-tight">{s.title}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-process" label="Full Process" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
              className="bg-orange-50 border border-orange-100 rounded-2xl p-7 flex flex-col gap-4 min-h-[280px]">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">❓</span>
                <div>
                  <p className="text-orange-600 text-xs font-semibold tracking-[0.2em] uppercase">FAQ</p>
                  <h3 className="text-xl font-bold text-navy-900 mt-0.5">Common Questions</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {FAQS.slice(0, 3).map((f, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-orange-100">
                    <p className="text-[11px] font-semibold text-navy-900 leading-tight">{f.q}</p>
                  </div>
                ))}
              </div>
              <ExploreBtn sectionId="section-faq" label="View All FAQs" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">Explore Our Guides &amp; Resources</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link prefetch={false} href="/knowledge/huck-towel-guide/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Knowledge Hub</p>
              <p className="font-semibold text-navy-900">Huck Towel Guide: Lint-Free Construction & Healthcare Standards</p>
              <p className="text-xs text-gray-500 leading-relaxed">How huck weave eliminates lint, clinical GSM grades, sterilisation compatibility and colour specification.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Article →</span>
            </Link>
            <Link prefetch={false} href="/guides/sourcing-huck-towels-pakistan/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">📄</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Sourcing Guide</p>
              <p className="font-semibold text-navy-900">Sourcing Surgical Huck Towels from Pakistan: Lint-Free Standards & Bulk Orders</p>
              <p className="text-xs text-gray-500 leading-relaxed">Step-by-step guide — GSM, size format, sterilisation compatibility, colour and certification.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Read Guide →</span>
            </Link>
            <Link prefetch={false} href="/downloads/huck-towel-spec-reference/" className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold hover:shadow-md transition-all flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">⬇️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Downloads</p>
              <p className="font-semibold text-navy-900">Huck Towel Specification & Size Reference</p>
              <p className="text-xs text-gray-500 leading-relaxed">GSM grades, USA and UK/EU size formats, sterilisation compatibility table and colour reference.</p>
              <span className="text-xs font-semibold text-navy-900 group-hover:text-gold transition-colors mt-auto">Get Reference →</span>
            </Link>
            <Link prefetch={false} href="/rfq/" className="group bg-navy-900 rounded-2xl p-6 flex flex-col gap-3">
              <span className="text-2xl" aria-hidden="true">✉️</span>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest">Quick Start</p>
              <p className="font-semibold text-white">Ready to Source Huck Towels?</p>
              <p className="text-xs text-gray-300 leading-relaxed">Specify GSM, variant, quantity and packing format. RFQ to factory quotation: 3–5 working days.</p>
              <span className="text-xs font-semibold text-gold group-hover:text-yellow-300 transition-colors mt-auto">Request a Quote →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* S1 — CONSTRUCTION (Neo-Brutalist) */}
      <section id="section-construction" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Construction</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">One Construction. No Exceptions.</h2>
            <div className="border-4 border-navy-900 rounded-2xl p-8 mb-6">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <h3 className="text-2xl font-black text-navy-900">{CONSTRUCTION_DETAIL.name}</h3>
                <span className="text-xs font-bold text-white bg-navy-900 px-3 py-1 rounded-full">100% Cotton Only</span>
                <span className="text-xs font-bold text-gold bg-gold/10 border border-gold/30 px-3 py-1 rounded-full">Zero-Lint</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{CONSTRUCTION_DETAIL.description}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Why 100% Cotton Only</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{CONSTRUCTION_DETAIL.why}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-navy-900 rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Standard GSM</p>
                  <p className="text-xl font-black text-gold">{CONSTRUCTION_DETAIL.gsm}</p>
                </div>
                <div className="bg-navy-900 rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Standard Dimensions</p>
                  <p className="text-xl font-black text-gold">{CONSTRUCTION_DETAIL.sizes}</p>
                </div>
              </div>
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S2 — GSM (Industrial) */}
      <section id="section-gsm" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Weight Reference</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">GSM Weight Guide</h2>
            <div className="space-y-5">
              {GSM_DATA.map((tier, i) => (
                <motion.div key={tier.gsm} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className={`rounded-2xl p-6 border-l-4 ${tier.highlight ? "bg-navy-900 border-l-gold" : "bg-white border-l-gray-300"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <span className={`text-2xl font-black shrink-0 ${tier.highlight ? "text-gold" : "text-navy-900"}`}>{tier.gsm} GSM</span>
                    <div className="flex-1">
                      <p className={`font-semibold ${tier.highlight ? "text-white" : "text-navy-900"}`}>{tier.label}</p>
                    </div>
                    {tier.highlight && <span className="text-[11px] font-semibold text-gold bg-gold/20 border border-gold/30 px-2.5 py-1 rounded-full shrink-0">US Market Standard</span>}
                  </div>
                  <div className={`w-full rounded-full h-2 mb-3 ${tier.highlight ? "bg-white/20" : "bg-gray-100"}`}>
                    <div className={`${tier.color} h-2 rounded-full`} style={{ width: `${tier.bar}%` }} />
                  </div>
                  <p className={`text-sm ${tier.highlight ? "text-gray-300" : "text-gray-500"}`}>{tier.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S3 — SIZES (Minimalist) */}
      <section id="section-sizes" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Dimensions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Standard Sizes by Market</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SIZES.map((s, i) => (
                <motion.div key={s.dim} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-black text-navy-900">{s.dim}</p>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.tag === "USA Standard" ? "text-gold bg-gold/10 border border-gold/30" : s.tag === "Bespoke" ? "text-purple-700 bg-purple-50" : "text-blue-700 bg-blue-50"}`}>{s.tag}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.market}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S4 — VARIANTS (Command Center) */}
      <section id="section-variants" className="bg-navy-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Visual Variants</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Plain White &amp; Blue Stripe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VARIANTS.map((v, i) => (
                <motion.div key={v.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="border border-white/10 rounded-2xl p-6 bg-white/5">
                  <span className="text-3xl mb-4 block" aria-hidden="true">{v.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-3">{v.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop dark />
        </div>
      </section>

      {/* S5 — FINISHING (Aurora/Gradient Mesh) */}
      <section id="section-finishing" className="bg-gradient-to-br from-teal-900 via-navy-900 to-indigo-900 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-teal-300 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Critical Finish Requirements</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Finishing &amp; Sterilisation Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {FINISHING.map((f, i) => (
                <motion.div key={f.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-white/10 backdrop-blur-xs border border-white/15 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-white">{f.name}</h3>
                    {f.critical && <span className="text-[10px] font-bold text-teal-300 bg-teal-300/20 px-2 py-0.5 rounded-full">Critical</span>}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop dark />
        </div>
      </section>

      {/* S6 — CERTIFICATIONS (Luxury) */}
      <section id="section-certifications" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Compliance</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Certifications Available</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-gold/40 transition-colors">
                  <p className="text-gold font-bold text-xl mb-2">{cert.name}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{cert.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S7 — SECTORS (Organic) */}
      <section id="section-sectors" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Target Markets</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Buyer Sectors &amp; Markets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECTORS.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-navy-900 mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{s.detail}</p>
                  <p className="text-xs font-semibold text-teal-600">{s.market}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S8 — PACKING (Layered Card) */}
      <section id="section-packing" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Pack Formats</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Packing Units &amp; Formats</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xl">Dozens are the standard US surgical huck towel supply unit. Gross packing is the most efficient primary bulk format for US distributor programmes.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PACKING_OPTIONS.map((p, i) => (
                <motion.div key={p.code} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5">
                  <span className="w-12 h-12 rounded-xl bg-navy-900 text-gold text-sm font-black flex items-center justify-center shrink-0">{p.code}</span>
                  <div><p className="font-bold text-navy-900 mb-1">{p.name}</p><p className="text-sm text-gray-500">{p.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S9 — OEM (Typography-First) */}
      <section id="section-oem" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Custom Development</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">OEM Specifications</h2>
            <div className="space-y-3">
              {[
                { title: "Custom GSM Specification", desc: "Any GSM from 180–280 to match your clinical standard, CSSD specification or distributor house-brand requirement." },
                { title: "Custom Dimensions", desc: "Standard 40×75 cm (USA) and 45×100 cm (AU/CA/UK) plus any custom centimetre dimension for CSSD kit specification." },
                { title: "White or Blue Stripe Selection", desc: "Plain white or blue stripe border variant — or a mixed variant order for programmes requiring both." },
                { title: "Custom Packing Format", desc: "Dozen-bundle, 24-pack, 50-pack, gross (144 pcs) or bulk carton — configured to your warehouse and distribution operation." },
                { title: "Certification Documentation Package", desc: "ISO 9001, ISO 13485, OEKO-TEX, BSCI, Sedex documents assembled to match your GPO, IDN or hospital tender requirements." },
                { title: "House-Brand Labelling", desc: "Woven label or printed label with your distributor brand name and item specification — available for branded programme supply." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-5 p-5 border-b border-gray-200 last:border-b-0">
                  <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div><p className="font-bold text-navy-900 mb-1">{item.title}</p><p className="text-sm text-gray-500">{item.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S10 — PROCESS (Brutalist) */}
      <section id="section-process" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Sourcing Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">Six-Step Sequence</h2>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <span className="text-amber-500 text-lg shrink-0" aria-hidden="true">⚠</span>
              <p className="text-sm text-amber-800">All lead times are <strong>indicative only</strong>. Actual timelines depend on order volume and packing configuration.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="border-4 border-navy-900 rounded-xl p-5">
                  <p className="text-4xl font-black text-gray-100 mb-2">{step.num}</p>
                  <h3 className="font-bold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <BackToTop />
        </div>
      </section>

      {/* S11 — FAQ */}
      <section id="section-faq" className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="border border-gray-100 rounded-2xl bg-white overflow-hidden">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors" aria-expanded={faqOpen === i}>
                    <span className="font-semibold text-navy-900 pr-4">{faq.q}</span>
                    <motion.span animate={{ rotate: faqOpen === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-gold text-xl shrink-0" aria-hidden="true">+</motion.span>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SAME-TIER PAGES ═══ */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-1">Hospital Linen</p>
            <h2 className="text-2xl font-bold text-navy-900">More Hospital Linen Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Doctor Surgical Gowns", desc: "Level 2 and Level 4 surgical gowns. Sterile and non-sterile programme options.", href: "/hometextile/hospitallinen/doctorsurgicalgowns/", img: "/images/hero/hero-doctor-surgical-gowns.webp", alt: "Pakistan surgical gowns manufacturer — OEM Level 2 and Level 4 disposable and reusable surgical gowns" },
              { name: "Medical Scrubs", desc: "Four-way stretch and cotton-poly scrubs. NHS, private hospital and clinic programmes.", href: "/hometextile/hospitallinen/medicalscrubs/", img: "/images/hero/hero-medical-scrubs.webp", alt: "Pakistan medical scrubs manufacturer — OEM stretch and cotton-poly scrubs for NHS and hospital buyers" },
              { name: "Patient Gowns", desc: "Cotton and poly-cotton patient gowns. Open-back and snap fastening options.", href: "/hometextile/hospitallinen/patientgowns/", img: "/images/hero/hero-patient-gowns.webp", alt: "Pakistan patient gowns manufacturer — OEM cotton and poly-cotton hospital gowns for healthcare buyers" },
            ].map((p) => (
              <Link prefetch={false} href={p.href} key={p.name} className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image src={p.img} alt={p.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-bold text-white text-sm leading-tight mb-1">{p.name}</p>
                  <p className="text-gray-300 text-xs leading-relaxed mb-2">{p.desc}</p>
                  <span className="text-xs font-semibold text-gold transition-all duration-200">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-snug">Source Pre-Washed Surgical Huck Towels from Pakistan</h2>
            <p className="text-gray-300 text-base mb-10 max-w-xl mx-auto leading-relaxed">Specify dimension, GSM, variant and packing format. We match your requirement to certified Pakistan cotton mills with surgical supply export history. Pricing and compliance documentation within 3&ndash;5 business days.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link prefetch={false} href="/rfq/" className="inline-flex items-center justify-center gap-2 bg-gold text-navy-900 font-semibold px-10 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base">Request a Quote <span aria-hidden="true">&#8594;</span></Link>
              <Link prefetch={false} href="/contact-us/" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/5 transition-colors text-base">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

