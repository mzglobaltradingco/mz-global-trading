"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  cardVariant,
  viewportOnce,
} from "@/lib/animations";
import CertificationsStrip from "@/components/CertificationsStrip";

// ─── Map Data ─────────────────────────────────────────────────────────────────

// Karachi origin dot — adjust y here if position still looks off on the rendered map
const PK = { x: 650, y: 305 };

const markets = [
  { name: "New York",     x: 289, y: 219, region: "North America", delay: 1.1  },
  { name: "Los Angeles",  x: 163, y: 244, region: "North America", delay: 1.2  },
  { name: "Toronto",      x: 274, y: 209, region: "North America", delay: 1.0  },
  { name: "Chicago",      x: 247, y: 216, region: "North America", delay: 1.15 },
  { name: "Mexico City",  x: 217, y: 298, region: "North America", delay: 1.3  },
  { name: "London",       x: 500, y: 184, region: "Europe",        delay: 0.55 },
  { name: "Amsterdam",    x: 514, y: 180, region: "Europe",        delay: 0.6  },
  { name: "Paris",        x: 506, y: 191, region: "Europe",        delay: 0.65 },
  { name: "Berlin",       x: 537, y: 176, region: "Europe",        delay: 0.7  },
  { name: "Brussels",     x: 511, y: 184, region: "Europe",        delay: 0.62 },
  { name: "Madrid",       x: 489, y: 223, region: "Europe",        delay: 0.75 },
  { name: "Rome",         x: 534, y: 216, region: "Europe",        delay: 0.78 },
  { name: "Stockholm",    x: 551, y: 155, region: "Europe",        delay: 0.85 },
  { name: "Warsaw",       x: 560, y: 180, region: "Europe",        delay: 0.73 },
  { name: "Lisbon",       x: 474, y: 226, region: "Europe",        delay: 0.72 },
  { name: "Athens",       x: 568, y: 230, region: "Europe",        delay: 0.8  },
  { name: "Zurich",       x: 526, y: 198, region: "Europe",        delay: 0.68 },
  { name: "Dubai",        x: 610, y: 293, region: "Middle East",   delay: 0.35 },
  { name: "Riyadh",       x: 588, y: 302, region: "Middle East",   delay: 0.38 },
  { name: "Istanbul",     x: 539, y: 243, region: "Middle East",   delay: 0.45 },
  { name: "Cairo",        x: 541, y: 273, region: "Middle East",   delay: 0.42 },
  { name: "Kuwait",       x: 599, y: 280, region: "Middle East",   delay: 0.4  },
  { name: "São Paulo",    x: 304, y: 446, region: "South America", delay: 1.5  },
  { name: "Buenos Aires", x: 282, y: 491, region: "South America", delay: 1.6  },
  { name: "Bogotá",       x: 239, y: 358, region: "South America", delay: 1.4  },
  { name: "Santiago",     x: 265, y: 483, region: "South America", delay: 1.55 },
  { name: "Lima",         x: 252, y: 410, region: "South America", delay: 1.45 },
  { name: "Johannesburg", x: 541, y: 461, region: "Africa",        delay: 1.0  },
  { name: "Nairobi",      x: 568, y: 376, region: "Africa",        delay: 0.95 },
  { name: "Sydney",       x: 880, y: 485, region: "Asia Pacific",  delay: 1.75 },
  { name: "Tokyo",        x: 843, y: 255, region: "Asia Pacific",  delay: 1.65 },
  { name: "Seoul",        x: 813, y: 248, region: "Asia Pacific",  delay: 1.7  },
  { name: "Singapore",    x: 800, y: 362, region: "Asia Pacific",  delay: 1.55 },
  { name: "Kuala Lumpur", x: 788, y: 353, region: "Asia Pacific",  delay: 1.58 },
  { name: "Jakarta",      x: 806, y: 390, region: "Asia Pacific",  delay: 1.62 },
];

const regionColors: Record<string, string> = {
  "North America":  "rgba(212,175,55,0.55)",
  "Europe":         "rgba(212,175,55,0.65)",
  "Middle East":    "rgba(212,175,55,0.80)",
  "South America":  "rgba(212,175,55,0.45)",
  "Africa":         "rgba(212,175,55,0.50)",
  "Asia Pacific":   "rgba(212,175,55,0.45)",
};

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 40;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

// ─── End-to-End Journey ───────────────────────────────────────────────────────

const journeySteps = [
  {
    num: "01",
    title: "Submit Your Requirements",
    desc: "Share your product specifications — fabric construction, dimensions, colours, target FOB price, required certifications and delivery window. A complete tech pack is ideal; we can help scope requirements at an earlier stage too.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Factory Shortlisting",
    desc: "Within 3–7 working days we present 2–3 vetted factories best matched to your product type, required certifications, production capacity and target price range — with a clear recommendation and rationale for each.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Sampling & Approval",
    desc: "Pre-order samples are produced to your specifications for review and sign-off before bulk begins. Pre-order sampling costs are charged to the buyer. Once bulk is confirmed, pre-production and post-production samples are part of the standard production cycle.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Production & Oversight",
    desc: "Bulk production begins after your sample approval. We track every milestone — fabric receipt, cutting, sewing, finishing and packing — with proactive milestone updates. In-line QC checks are conducted throughout the production run.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Pre-Shipment Inspection",
    desc: "Before goods are packed and released, a pre-shipment inspection is conducted against your approved sample and specifications. Basic production reviews are standard; dedicated QC inspection scope and any associated costs are agreed upfront on a per-order basis.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Export & Delivery",
    desc: "Goods are packed to your specification and consolidated for handover to your nominated freight forwarder, or booked on your behalf. We confirm cargo readiness and remain available throughout the shipment window until goods reach you.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M3 17h18M3 17l3-10h12l3 10M3 17l-1 2h20l-1-2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
      </svg>
    ),
  },
];

// ─── Sourcing Hubs ────────────────────────────────────────────────────────────

const sourcingHubs = [
  {
    city: "Karachi",
    label: "The Export Capital of Pakistan",
    badge: "Textile King of Pakistan",
    desc: "Karachi is not simply one of Pakistan's textile cities — it is the country's dominant textile hub by volume, variety and value. Its unmatched concentration of apparel factories, fabric mills, knitwear units, dye houses and finishing facilities — combined with Port Karachi and Port Qasim, South Asia's two busiest seaports — creates an integrated ecosystem no other Pakistani city replicates. The result is the broadest product range in Pakistan delivered at consistently competitive unit economics, backed by full financial and logistics infrastructure in one location.",
    products: ["Apparel", "Home Textiles", "Knitwear", "Fabric", "Denim", "Workwear", "Export Gateway", "Port Karachi"],
  },
  {
    city: "Faisalabad",
    label: "The Manchester of Asia",
    badge: "",
    desc: "Pakistan's largest textile manufacturing city — home to fabric mills, yarn producers and a high concentration of home textile manufacturers.",
    products: ["Towels", "Bed Linen", "Fabric", "Yarn", "Terry Cloth"],
  },
  {
    city: "Lahore",
    label: "Fashion & Knitwear",
    badge: "",
    desc: "A strong centre for fashion apparel, knitted garments and OEM programmes — with broad capability in printed, branded and retail-ready products.",
    products: ["Knitwear", "Fashion Apparel", "OEM", "Printed Garments"],
  },
  {
    city: "Sialkot",
    label: "Technical & Workwear",
    badge: "",
    desc: "Specialising in technical apparel, protective workwear and performance textiles for institutional and industrial buyers internationally.",
    products: ["Workwear", "Technical Textiles", "Protective Apparel"],
  },
  {
    city: "Multan",
    label: "Household & Kitchen Linen",
    badge: "",
    desc: "Located at the heart of Pakistan's cotton belt, Multan is a key sourcing hub for kitchen linen and household textile products with direct raw material access.",
    products: ["Kitchen Linen", "Household Textiles", "Cotton Products"],
  },
];

// ─── Factory Vetting ──────────────────────────────────────────────────────────

const vettingCriteria = [
  {
    num: "01",
    title: "Compliance Certifications",
    desc: "Every factory must hold the certifications relevant to your product and market — GOTS, BSCI, Sedex, SA8000, OEKO-TEX or others — before being considered for any order.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Production Capacity",
    desc: "We verify machinery, floor space, workforce size and seasonal capacity to confirm the factory can fulfil your order volume within your required timeline.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Quality Management Systems",
    desc: "Factories must have documented QC procedures — in-line checks, measurement audits and pre-shipment inspection protocols — not just end-of-line review.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Labour & Ethical Standards",
    desc: "Worker welfare, safe conditions and fair labour practices are non-negotiable. We prioritise factories audited under recognised ethical frameworks.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Sample Quality Review",
    desc: "Before onboarding, factories submit samples against our benchmark specifications. Construction, finish, measurements and consistency are evaluated before any order is placed.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Ongoing Re-Auditing",
    desc: "Approved factories are reviewed regularly. Certification renewal, production consistency and compliance standing are reassessed before each new order cycle.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
];

// ─── Supply Chain Stages ──────────────────────────────────────────────────────

const supplyChainStages = [
  {
    num: "01", title: "Raw Material", detail: "Cotton, yarn & fabric from certified mills",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>,
  },
  {
    num: "02", title: "Yarn, Weaving & Knitting", detail: "Fabric formation via weaving or knitting depending on product type",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>,
  },
  {
    num: "03", title: "Dyeing & Printing", detail: "Reactive, vat, digital & screen printing",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2a5 5 0 015 5c0 4-5 11-5 11S7 11 7 7a5 5 0 015-5z" /><circle cx="12" cy="7" r="1.5" /></svg>,
  },
  {
    num: "04", title: "Cut & Sew", detail: "Precision cutting, stitching & finishing",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" /></svg>,
  },
  {
    num: "05", title: "QC & Testing", detail: "In-line + pre-shipment inspection",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    num: "06", title: "Packaging", detail: "Branded, retail-ready or bulk packing",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  },
  {
    num: "07", title: "Export", detail: "FCL/LCL · Sea & air · Global delivery",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 17h18M3 17l3-10h12l3 10M3 17l-1 2h20l-1-2" /><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>,
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqItems = [
  {
    q: "How long does the sourcing process take from enquiry to delivery?",
    a: "Timeline depends on your product, quantity, factory availability and delivery window. Factory matching typically takes 3–7 days and sampling 2–4 weeks. For bulk production: new orders generally run 60–120 days depending on product and factory schedule; recurring orders with established factories can turn around significantly faster — container loads have been delivered in 7–21 days. Sea freight adds 15–35 days depending on destination. We provide a specific timeline for your order once we receive your full requirements.",
  },
  {
    q: "How does sampling work — and who pays?",
    a: "Pre-order samples requested before placing a bulk order are charged to the buyer at cost. Once a bulk order is confirmed, pre-production and post-production samples form part of the standard production cycle and are not billed separately. We coordinate the full sampling process and keep you updated at every stage.",
  },
  {
    q: "What certifications do your factory partners hold?",
    a: "Certifications depend on the product type and each factory's individual profile and strengths — not every factory holds every certification. We match you specifically to factories whose certifications align with your product and market requirements. Across our network you will find factories certified under GOTS, OEKO-TEX, BSCI, Sedex, SA8000, ISO 9001, GRS, WRAP and several others. Certification documentation is available on request during the factory matching stage.",
  },
  {
    q: "Can you source multiple product categories in a single order?",
    a: "Yes — we cover apparel, home textiles and fabric and can coordinate multiple product types within a single sourcing programme. Each category is matched to the appropriate factory based on capability and capacity. MOQs differ by product type and are confirmed once we understand your full requirement and specification in detail.",
  },
  {
    q: "What happens if production quality doesn't meet my specifications?",
    a: "We offer QC involvement at key production stages — the scope and any associated costs depend on the order and level of oversight agreed upfront. At a minimum, basic production reviews are conducted as standard. Where issues are identified, we communicate them promptly and work with the factory toward resolution. The outcome depends on the nature and extent of the issue, and we aim to protect your interests throughout — but our role is that of a sourcing and oversight partner, not the manufacturing party. Specifics are always discussed and agreed before an order is placed.",
  },
  {
    q: "What do you need from me to get started?",
    a: "The more detail you share upfront, the faster and more accurately we can match you to the right factory. Useful inputs include: product specifications and construction details, a complete tech pack where available, size ratios and measurement charts, designs, print types and colour Pantones, physical samples or swatches if you have them, your target FOB price, required quantity, compliance certifications needed, delivery timeline, and any branding or packaging requirements. Not all of these are required to begin a conversation — we can help scope your requirements if you are at an early stage.",
  },
];

// ─── Hub Cards ────────────────────────────────────────────────────────────────

const hubCards = [
  {
    title: "About Us",
    desc: "Learn who we are, how MZ Global Trading was founded, and the values that guide every order.",
    image: "/images/menu/menu-aboutus.webp",
    alt: "About MZ Global Trading — Pakistan B2B textile sourcing company founded in Karachi",
    href: "/our-company/",
    cta: "Our Story",
  },
  {
    title: "Why Choose Us",
    desc: "Certified factories, independent QC, and one accountable partner from enquiry to shipment.",
    image: "/images/menu/menu-whychooseus.webp",
    alt: "Why choose MZ Global Trading as your Pakistan textile sourcing partner",
    href: "/whychooseus/",
    cta: "See Why We're Different",
  },
  {
    title: "Blog",
    desc: "Pakistan textile sourcing insights, compliance guides and supply chain best practices.",
    image: "/images/menu/menu-blog.webp",
    alt: "MZ Global Trading blog — textile sourcing insights and Pakistan manufacturing industry articles",
    href: "/blog/",
    cta: "Read the Blog",
  },
  {
    title: "Careers",
    desc: "Join a team dedicated to connecting global buyers with Pakistan's best textile manufacturers.",
    image: "/images/menu/menu-careers.webp",
    alt: "Careers at MZ Global Trading — textile sourcing jobs in Karachi Pakistan",
    href: "/careers/",
    cta: "View Open Roles",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OurProcessContent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mapRef, offset: ["start end", "end start"] });
  const mapY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-navy-900 pt-20 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
        {/* Hero image */}
        <Image
          src="/images/hero/hero-our-process.webp"
          alt="Pakistan textile sourcing process — factory matching, production oversight and global export"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-950/50" />
        {/* Gold glow — bottom left */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-gray-500 text-xs mb-8"
          >
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>›</span>
            <span className="text-gray-400">Corporate</span>
            <span>›</span>
            <span className="text-gold">Our Process</span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            >
              The Sourcing Process
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            >
              From Pakistan.{" "}
              <span className="text-gold">To Everywhere.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
            >
              We connect international buyers in 25+ countries with Pakistan&apos;s most capable
              textile manufacturers — managing every step from factory matching through
              production, QC and delivery to your door.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex flex-wrap gap-3"
            >
              {["50+ Vetted Factories", "25+ Export Markets", "End-to-End Managed"].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Sourcing Network Map ───────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-10"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Global Reach</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">Our Sourcing Network</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Pakistan is our manufacturing base. Your business is our destination — in 25+ countries across every major market.
            </p>
          </motion.div>

          <motion.div
            ref={mapRef}
            style={{ y: mapY, aspectRatio: "2/1" }}
            className="relative w-full rounded-2xl overflow-hidden border border-gray-200"
          >
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full bg-white"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(13,27,42,0.05)" strokeWidth="0.5" />
                </pattern>
              </defs>

              <image href="/images/world-map.webp" x="-14" y="-36" width="1029" height="643" opacity="0.65" preserveAspectRatio="none" />

              <rect width="1000" height="500" fill="url(#grid)" />

              {markets.map((m) => (
                <motion.path
                  key={`line-${m.name}`}
                  d={curvePath(PK.x, PK.y, m.x, m.y)}
                  stroke={regionColors[m.region]}
                  strokeWidth={0.8}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: m.delay, ease: "easeInOut" }}
                />
              ))}

              {markets.map((m) => (
                <motion.g
                  key={`dot-${m.name}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: m.delay + 1.4 }}
                >
                  <circle cx={m.x} cy={m.y} r={3} fill="rgba(13,27,42,0.65)" />
                  <text x={m.x} y={m.y - 6} textAnchor="middle" fontSize="7" fill="rgba(13,27,42,0.45)" fontFamily="sans-serif">
                    {m.name}
                  </text>
                </motion.g>
              ))}

              <motion.circle cx={PK.x} cy={PK.y} r={14} fill="rgba(212,175,55,0.12)"
                animate={{ r: [14, 24, 14], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle cx={PK.x} cy={PK.y} r={7} fill="rgba(212,175,55,0.25)"
                animate={{ r: [7, 12, 7], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />
              <circle cx={PK.x} cy={PK.y} r={5} fill="#d4af37" />
              <text x={PK.x} y={PK.y - 12} textAnchor="middle" fontSize="8" fill="#d4af37" fontFamily="sans-serif" fontWeight="bold">
                KARACHI
              </text>

              {[
                { label: "North America", x: 200, y: 55 },
                { label: "Europe",        x: 515, y: 55 },
                { label: "Middle East",   x: 570, y: 165 },
                { label: "South America", x: 245, y: 455 },
                { label: "Africa",        x: 530, y: 455 },
                { label: "Asia Pacific",  x: 840, y: 55 },
              ].map((r) => (
                <motion.text
                  key={r.label} x={r.x} y={r.y}
                  textAnchor="middle" fontSize="9" fill="rgba(160,120,10,0.55)"
                  fontFamily="sans-serif" letterSpacing="2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {r.label.toUpperCase()}
                </motion.text>
              ))}
            </svg>

            <div className="absolute bottom-4 right-4 bg-navy-900/90 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 text-right">
              <p className="text-gold font-bold text-xl leading-none">25+</p>
              <p className="text-gray-400 text-xs mt-0.5">Export Markets</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. End-to-End Journey ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-navy-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-16 sm:mb-20"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Your Experience</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">The End-to-End Journey</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
              From your first enquiry to goods arriving at your warehouse — a clear, managed process with one accountable partner throughout.
            </p>
          </motion.div>

          {/* ── Desktop: zig-zag alternating layout ── */}
          <div className="hidden lg:block relative">
            <div className="absolute left-1/2 top-6 bottom-6 -translate-x-1/2 w-px border-l-2 border-dashed border-gold/15" />

            <div className="space-y-12">
              {journeySteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={step.num} className="grid grid-cols-[1fr_auto_1fr] items-center gap-0">

                    {/* Left slot — slides in from left on odd steps */}
                    <div className={`pr-12 ${isLeft ? "flex flex-col items-end text-right" : ""}`}>
                      {isLeft && (
                        <motion.div
                          className="max-w-sm"
                          initial={{ opacity: 0, x: -40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <motion.span
                            className="text-gold/35 text-5xl font-bold leading-none select-none block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 + 0.2 }}
                          >{step.num}</motion.span>
                          <h3 className="text-white font-bold text-lg mt-1 mb-3">{step.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                      )}
                    </div>

                    {/* Center node — spring scale bounce */}
                    <div className="flex flex-col items-center relative z-10">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-navy-800 hover:bg-orange-500 border-2 border-gold/40 hover:border-orange-500 flex items-center justify-center text-gold hover:text-white transition-all duration-300 shadow-lg shadow-navy-950/60 cursor-pointer"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.06 + 0.1 }}
                      >
                        {step.icon}
                      </motion.div>
                      {/* Animated connector line */}
                      <motion.div
                        className={`absolute top-1/2 -translate-y-1/2 h-px origin-${isLeft ? "right" : "left"} bg-gradient-to-${isLeft ? "r" : "l"} from-gold/40 to-transparent ${isLeft ? "-left-12 w-12" : "-right-12 w-12"}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06 + 0.3, ease: "easeOut" }}
                      />
                    </div>

                    {/* Right slot — slides in from right on even steps */}
                    <div className={`pl-12 ${!isLeft ? "flex flex-col items-start" : ""}`}>
                      {!isLeft && (
                        <motion.div
                          className="max-w-sm"
                          initial={{ opacity: 0, x: 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <motion.span
                            className="text-gold/35 text-5xl font-bold leading-none select-none block"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 + 0.2 }}
                          >{step.num}</motion.span>
                          <h3 className="text-white font-bold text-lg mt-1 mb-3">{step.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Mobile / Tablet: vertical left-side timeline ── */}
          <div className="lg:hidden relative pl-12">
            <div className="absolute top-2 bottom-2 left-[19px] w-px border-l-2 border-dashed border-gold/15" />
            <div className="space-y-10">
              {journeySteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-10 h-10 rounded-full bg-navy-800 hover:bg-orange-500 border-2 border-gold/40 hover:border-orange-500 flex items-center justify-center text-gold hover:text-white transition-all duration-300 flex-shrink-0 -ml-12 relative z-10 cursor-pointer">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-gold/40 text-2xl font-bold leading-none select-none block">{step.num}</span>
                    <h3 className="text-white font-bold text-base mt-1 mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. Factory Vetting ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Factory Network</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">How We Qualify a Factory</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto leading-relaxed">
              Every factory in our network passes a structured evaluation before we place a single order with them.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-2 gap-px bg-gray-100 rounded-2xl overflow-hidden shadow-sm"
          >
            {vettingCriteria.map((c) => (
              <motion.div
                key={c.num}
                variants={staggerItemVariants}
                className="bg-white p-7 group hover:bg-navy-900 transition-colors duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center gap-3">
                    <span className="text-4xl font-bold text-gray-100 leading-none group-hover:text-white/10 transition-colors select-none">
                      {c.num}
                    </span>
                    <div className="w-10 h-10 bg-navy-900 rounded-lg flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                      {c.icon}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-navy-900 font-bold text-base mb-2 group-hover:text-white transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                      {c.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Supply Chain Stages ────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Supply Chain</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">From Raw Material to Your Door</h2>
            <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto">
              Every order passes through a structured, monitored production pipeline — from raw fibre to packaged goods.
            </p>
          </motion.div>

          {/* Desktop: horizontal chain */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="hidden lg:flex items-stretch gap-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
          >
            {supplyChainStages.map((stage, i) => (
              <motion.div
                key={stage.num}
                variants={staggerItemVariants}
                className="flex-1 group relative bg-white hover:bg-navy-900 transition-colors duration-300 p-6 flex flex-col items-center text-center border-r border-gray-100 last:border-0"
              >
                {i < supplyChainStages.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-4 h-4 rotate-45 border-t-2 border-r-2 border-gray-200 bg-white group-hover:border-gold/40 group-hover:bg-navy-900 transition-colors" />
                )}
                <div className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center text-gold mb-4 group-hover:bg-gold group-hover:text-navy-900 transition-colors">
                  {stage.icon}
                </div>
                <span className="text-gold text-xs font-bold mb-1 group-hover:text-gold/80">{stage.num}</span>
                <h3 className="text-navy-900 font-bold text-sm mb-1.5 group-hover:text-white transition-colors">{stage.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-400 transition-colors">{stage.detail}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile: vertical list */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:hidden relative pl-10"
          >
            <div className="absolute top-2 bottom-2 left-[18px] w-px border-l-2 border-dashed border-gold/20" />
            <div className="space-y-6">
              {supplyChainStages.map((stage) => (
                <motion.div key={stage.num} variants={staggerItemVariants} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-gold flex-shrink-0 -ml-10 relative z-10">
                    {stage.icon}
                  </div>
                  <div>
                    <p className="text-gold text-xs font-bold mb-0.5">{stage.num}</p>
                    <h3 className="text-navy-900 font-bold text-sm mb-1">{stage.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{stage.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Pakistan Manufacturing Hubs ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-navy-900" style={{ background: "linear-gradient(to bottom, #0D1B2A, #0a1520)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Where We Source</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Pakistan&apos;s Manufacturing Hubs</h2>
            <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
              Pakistan&apos;s textile industry is geographically concentrated across five specialised cities.
              We source across all of them — matching every product to the hub that knows it best.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {/* Karachi — featured prominently as #1 */}
            <motion.div
              variants={staggerItemVariants}
              className="bg-white/5 border border-gold/25 rounded-2xl p-7 lg:flex lg:items-start lg:gap-10 group hover:border-gold/45 hover:bg-white/8 transition-colors"
            >
              <div className="lg:flex-1 mb-5 lg:mb-0">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2.5 py-0.5 bg-gold/15 border border-gold/30 rounded text-gold text-[10px] font-bold tracking-[0.15em] uppercase">
                    Export Capital · #1
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/8 border border-white/15 rounded text-white/60 text-[10px] font-semibold tracking-[0.12em] uppercase">
                    {sourcingHubs[0].badge}
                  </span>
                </div>
                <h3 className="text-gold font-bold text-2xl leading-tight mb-1">{sourcingHubs[0].city}</h3>
                <p className="text-white/55 text-sm mb-4">{sourcingHubs[0].label}</p>
                <div className="w-10 h-px bg-gold/30 mb-4" />
                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">{sourcingHubs[0].desc}</p>
              </div>
              <div className="lg:w-56 flex-shrink-0">
                <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase mb-3">Product Coverage</p>
                <div className="flex flex-wrap gap-2">
                  {sourcingHubs[0].products.map((p) => (
                    <span key={p} className="inline-block px-2.5 py-1 bg-gold/10 border border-gold/20 rounded text-gold/80 text-xs group-hover:border-gold/35 transition-colors">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Remaining 4 cities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sourcingHubs.slice(1).map((hub) => (
                <motion.div
                  key={hub.city}
                  variants={staggerItemVariants}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/30 hover:bg-white/8 transition-colors group"
                >
                  <div className="mb-4">
                    <h3 className="text-gold font-bold text-lg leading-tight">{hub.city}</h3>
                    <p className="text-white/60 text-xs mt-0.5">{hub.label}</p>
                  </div>
                  <div className="w-8 h-px bg-gold/30 mb-4" />
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">{hub.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {hub.products.map((p) => (
                      <span key={p} className="inline-block px-2 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400 text-[10px] group-hover:border-gold/20 transition-colors">
                        {p}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7. FAQ ────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Common Questions</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
          >
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={staggerItemVariants}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors group"
                  aria-expanded={openFaq === i}
                >
                  <span className={`font-semibold text-sm sm:text-base pr-4 transition-colors ${openFaq === i ? "text-gold" : "text-navy-900"}`}>
                    {item.q}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? "bg-gold text-navy-900" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. Explore More ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center mb-12"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Learn More</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900">Explore Our Company</h2>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 gap-6"
          >
            {hubCards.map((card) => (
              <motion.div
                key={card.title}
                variants={cardVariant}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <Link href={card.href} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-1.5">{card.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{card.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                      {card.cta} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 9. Certifications ─────────────────────────────────────────────── */}
      <CertificationsStrip />

      {/* ── 10. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">Start Today</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Source From Pakistan?
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto mb-8">
              Tell us what you need. We&apos;ll respond within 24 hours with a factory recommendation and pricing overview.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
