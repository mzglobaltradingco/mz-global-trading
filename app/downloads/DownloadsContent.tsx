"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  viewportOnce,
} from "@/lib/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocCategory = "all" | "company" | "quality" | "technical" | "trade";
type DocKind = "Reference" | "Checklist" | "Template" | "Policy";

interface DocumentCard {
  id: number;
  slug: string;
  category: Exclude<DocCategory, "all">;
  kind: DocKind;
  title: string;
  description: string;
  length: string;
  popular?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const docCategories: { id: DocCategory; label: string }[] = [
  { id: "all", label: "All Documents" },
  { id: "company", label: "Company" },
  { id: "quality", label: "Quality & Compliance" },
  { id: "technical", label: "Technical" },
  { id: "trade", label: "Shipping & Trade" },
];

const documents: DocumentCard[] = [
  {
    id: 1,
    slug: "company-profile",
    category: "company",
    kind: "Reference",
    title: "Company Profile",
    description: "Full company overview — sourcing capabilities, product categories, certifications, process and contact details. Share with stakeholders before placing an order.",
    length: "5 min read",
    popular: true,
  },
  {
    id: 2,
    slug: "factory-network-overview",
    category: "company",
    kind: "Reference",
    title: "Factory Network Overview",
    description: "How our vetted factory network is structured — product specialisations by cluster, certification coverage and the five-step qualification process.",
    length: "4 min read",
  },
  {
    id: 3,
    slug: "sustainable-sourcing-policy",
    category: "company",
    kind: "Policy",
    title: "Sustainable Sourcing Policy",
    description: "Our documented commitments on environmental responsibility, ethical labour standards and restricted substance compliance across the supply chain.",
    length: "4 min read",
  },
  {
    id: 4,
    slug: "pre-shipment-inspection-checklist",
    category: "quality",
    kind: "Checklist",
    title: "Pre-Shipment Inspection Checklist",
    description: "Comprehensive AQL Level II pre-shipment checklist covering workmanship, measurements, colour, packing and documentation — for buyers and QC teams.",
    length: "40+ check items",
    popular: true,
  },
  {
    id: 5,
    slug: "aql-reference-table",
    category: "quality",
    kind: "Reference",
    title: "AQL Level II Reference Table",
    description: "ISO 2859-1 sampling table — sample sizes, acceptance and rejection numbers by lot size for Critical (0), Major (2.5) and Minor (4.0) defect classes.",
    length: "Full sampling table",
  },
  {
    id: 6,
    slug: "supplier-evaluation-matrix",
    category: "quality",
    kind: "Reference",
    title: "Supplier Evaluation Criteria Matrix",
    description: "The full scoring matrix used during factory onboarding — production capability, certifications, quality systems and social compliance, with scoring bands.",
    length: "3 min read",
  },
  {
    id: 7,
    slug: "restricted-substances-list",
    category: "quality",
    kind: "Reference",
    title: "Restricted Substances List (RSL)",
    description: "Reference list of prohibited and restricted chemical groups in compliance with REACH, CPSIA, OEKO-TEX and market regulations for the USA, EU and UK.",
    length: "13 substance groups",
  },
  {
    id: 8,
    slug: "tech-pack-template-apparel",
    category: "technical",
    kind: "Template",
    title: "Tech Pack Template — Apparel",
    description: "Structured, printable Tech Pack template for apparel — BOM, measurement chart with tolerances, construction, artwork, colourways, packing and QC requirements.",
    length: "9 sections",
    popular: true,
  },
  {
    id: 9,
    slug: "tech-pack-template-home-textiles",
    category: "technical",
    kind: "Template",
    title: "Tech Pack Template — Home Textiles",
    description: "Printable Tech Pack template for home textiles — fabric and weave spec, size tables, decoration, colourways, finishing, set composition and packing.",
    length: "8 sections",
  },
  {
    id: 10,
    slug: "gsm-thread-count-reference",
    category: "technical",
    kind: "Reference",
    title: "GSM & Thread Count Reference Guide",
    description: "Quick-reference charts mapping GSM and thread count ranges to product applications — apparel, home textiles and bed linen — with verification methods.",
    length: "4 reference tables",
  },
  {
    id: 11,
    slug: "incoterms-quick-reference",
    category: "trade",
    kind: "Reference",
    title: "Incoterms 2020 Quick Reference",
    description: "EXW, FOB, CFR and CIF at a glance — responsibility matrix, risk transfer points, selection guide and the naming rules that prevent disputes.",
    length: "3 reference tables",
  },
  {
    id: 12,
    slug: "export-documentation-checklist",
    category: "trade",
    kind: "Checklist",
    title: "Export Documentation Checklist",
    description: "Every document a shipment needs and what to verify on each — commercial set, origin preferences, compliance certificates and pre-arrival actions.",
    length: "25+ check items",
  },
  // ── Bath Linen ──────────────────────────────────────────────────────────────
  {
    id: 13,
    slug: "towel-specification-sheet",
    category: "technical",
    kind: "Template",
    title: "Towel Specification & Order Sheet",
    description: "Complete specification and order template for bath towels — GSM, construction, colour, certifications, packing and logistics fields. For hotel, retail and institutional programmes.",
    length: "8 sections",
    popular: true,
  },
  {
    id: 14,
    slug: "institutional-towel-tech-pack",
    category: "technical",
    kind: "Template",
    title: "Institutional Towel Tech Pack Template",
    description: "Specification template for hospital, hotel and gym towel programmes — laundry performance requirements, certification compliance and packing fields for institutional buyers.",
    length: "6 sections",
  },
  {
    id: 15,
    slug: "bathrobe-customisation-checklist",
    category: "technical",
    kind: "Checklist",
    title: "Bathrobe Customisation & Order Checklist",
    description: "Specification and customisation checklist for hotel, spa and retail bathrobe programmes — construction, collar, GSM, sizing, embroidery, packing and certification fields.",
    length: "40+ check items",
  },
  {
    id: 16,
    slug: "bath-mat-size-weight-reference",
    category: "technical",
    kind: "Reference",
    title: "Bath Mat Size & Weight Reference Chart",
    description: "Standard sizes by market, GSM grades by application, anti-slip backing comparison, OEKO-TEX scope requirements and a specification order template for bath mat sourcing.",
    length: "4 reference tables",
  },
  {
    id: 17,
    slug: "beach-towel-artwork-spec-template",
    category: "technical",
    kind: "Template",
    title: "Beach Towel Artwork Specification Template",
    description: "Complete artwork brief and order specification for custom beach and pool towels — print technique, design brief, size, chlorine fastness requirements, certification and packing fields.",
    length: "8 sections",
  },
  // ───────────────────────────────────────── Bed Linen
  {
    id: 18,
    slug: "bedsheet-size-chart-international",
    category: "technical",
    kind: "Reference",
    title: "International Bedsheet Size Chart (UK, US, EU, AU)",
    description: "Finished flat bedsheet dimensions across UK, USA, EU, Middle East and Australia — all standard size-runs with hem allowance guidance. For use with RFQ submissions and Tech Packs.",
    length: "5 market size tables",
  },
  {
    id: 19,
    slug: "fitted-sheet-measurement-template",
    category: "technical",
    kind: "Template",
    title: "Fitted Sheet Measurement & Specification Template",
    description: "Complete specification form for fitted sheet programmes — mattress depth, pocket depth, elastic type, corner construction, certification and programme volume. For hotel and institutional sourcing.",
    length: "7 sections",
  },
  {
    id: 20,
    slug: "duvet-cover-spec-order-sheet",
    category: "technical",
    kind: "Template",
    title: "Duvet Cover Specification & Order Sheet",
    description: "Fill-in specification template for duvet cover programmes — fabric, thread count, closure type, button and zip specification, size range table, certification and logistics fields.",
    length: "6 sections",
  },
  {
    id: 21,
    slug: "pillow-cover-size-reference",
    category: "technical",
    kind: "Reference",
    title: "Pillow Cover Size Reference Chart (Standard, King, EU, Body)",
    description: "International pillow cover finished dimensions across UK, USA, EU, Middle East and Australia — including Oxford flange sizes and ease allowance guidance by fill type.",
    length: "6 market size tables",
  },
  {
    id: 22,
    slug: "cushion-cover-artwork-brief-template",
    category: "technical",
    kind: "Template",
    title: "Cushion Cover Artwork Brief Template",
    description: "Artwork, print and order brief for decorative cushion cover programmes — fabric, print technique, artwork specs, closure, size range table, certification and packing fields.",
    length: "7 sections",
  },
  {
    id: 23,
    slug: "curtain-measurement-order-template",
    category: "technical",
    kind: "Template",
    title: "Curtain Measurement & Order Template",
    description: "Complete curtain specification form — fabric, blackout and lining spec, heading type, eyelet spec, drop and width table, fire retardancy and certification requirements.",
    length: "8 sections",
  },
  {
    id: 24,
    slug: "institutional-bedding-spec-template",
    category: "technical",
    kind: "Template",
    title: "Institutional Bedding Specification Template",
    description: "Complete specification form for hotel, hospital and airline bedding programmes — laundry standard, thread count, fibre blend, size range table, certification and performance test requirements.",
    length: "8 sections",
  },
  {
    id: 25,
    slug: "kitchen-towel-spec-template",
    category: "technical",
    kind: "Template",
    title: "Kitchen Towel Specification Template",
    description: "Fill-in specification template for retail and hospitality kitchen towel programmes — construction, GSM, size, print method, certification scope and packing format.",
    length: "7 sections",
  },
  {
    id: 26,
    slug: "bar-mop-spec-reference",
    category: "technical",
    kind: "Reference",
    title: "Bar Mop Specification & Weight Reference Sheet",
    description: "GSM grades by application, standard USA and EU sizes, HACCP stripe colour coding and packing formats for commercial bar mop procurement.",
    length: "6 tables",
  },
  {
    id: 27,
    slug: "apron-spec-template",
    category: "technical",
    kind: "Template",
    title: "Apron Specification Template",
    description: "Complete specification form for foodservice, hospitality and retail apron programmes — fabric, style, pocket configuration, branding method and certification scope.",
    length: "9 sections",
  },
  {
    id: 28,
    slug: "pot-holder-spec-template",
    category: "technical",
    kind: "Template",
    title: "Pot Holder Specification Template",
    description: "Fill-in specification template for pot holder programmes — layer construction, batting material, heat performance, size, custom print and OEKO-TEX certification scope.",
    length: "7 sections",
  },
  {
    id: 29,
    slug: "table-cover-size-reference",
    category: "technical",
    kind: "Reference",
    title: "Table Cover Size Reference Chart",
    description: "Standard sizes for round, rectangular and banquet table covers — USA, UK/EU and Middle East formats with drop calculation guide and napkin/runner sizes.",
    length: "6 tables",
  },
  {
    id: 30,
    slug: "cellular-blanket-spec-template",
    category: "technical",
    kind: "Template",
    title: "Cellular Blanket Specification Template",
    description: "Complete specification form for NHS, hospital, institutional and airline cellular blanket programmes — GSM, fibre content, wash standard, compliance and packing.",
    length: "7 sections",
  },
  {
    id: 31,
    slug: "fleece-blanket-spec-template",
    category: "technical",
    kind: "Template",
    title: "Fleece Blanket Specification Template",
    description: "Fill-in specification template for retail and institutional fleece blanket programmes — fleece type, GSM, pilling resistance, sublimation print and OEKO-TEX certification.",
    length: "8 sections",
  },
  {
    id: 32,
    slug: "surgical-gown-spec-template",
    category: "technical",
    kind: "Template",
    title: "Surgical Gown Specification Template",
    description: "Document AAMI PB70 protection level, SMS or woven fabric construction, sterilisation compatibility, size distribution and certification requirements for surgical gown orders.",
    length: "7 sections",
  },
  {
    id: 33,
    slug: "scrubs-size-spec-template",
    category: "technical",
    kind: "Template",
    title: "Medical Scrubs Size & Specification Template (XS–5XL)",
    description: "Document fabric construction, wash standard, colour programme (with Pantone references), embroidery specification and size distribution for medical scrubs procurement.",
    length: "7 sections",
  },
  {
    id: 34,
    slug: "patient-gown-spec-template",
    category: "technical",
    kind: "Template",
    title: "Patient Gown Specification Template",
    description: "Document closure type, fabric, wash standard, size range (including bariatric and paediatric) and certification requirements for patient gown orders from Pakistan.",
    length: "6 sections",
  },
  {
    id: 35,
    slug: "huck-towel-spec-reference",
    category: "technical",
    kind: "Reference",
    title: "Huck Towel Specification & Size Reference",
    description: "Clinical GSM grades, USA and UK/EU size formats, sterilisation compatibility by method and colour specification reference for surgical huck towel procurement.",
    length: "5 sections",
  },
  {
    id: 36,
    slug: "shop-towel-spec-template",
    category: "technical",
    kind: "Template",
    title: "Shop Towel Specification Template",
    description: "Document construction, GSM, USA and EU size standards, custom print specification, packing format and certification requirements for industrial shop towel orders.",
    length: "6 sections",
  },
  {
    id: 37,
    slug: "fender-cover-spec-template",
    category: "technical",
    kind: "Template",
    title: "Fender Cover Specification Template",
    description: "Document construction, backing type, size, custom print or embroidery branding specification and packing format for fender cover orders for automotive programmes.",
    length: "6 sections",
  },
  {
    id: 38,
    slug: "ihram-spec-template",
    category: "technical",
    kind: "Template",
    title: "Ihram Specification & Order Template",
    description: "Religious compliance checklist, GSM by Hajj season, size specification (Ridaa + Izaar), hem details, packing format and Hajj season timing reference for pilgrimage supply.",
    length: "7 sections",
  },
  {
    id: 39,
    slug: "tshirt-size-spec-template",
    category: "technical",
    kind: "Template",
    title: "T-Shirt Size Spec & Measurement Template (S–5XL)",
    description: "Fabric GSM, construction (jersey/piqué/rib), neck style, sleeve type, decoration method and size grading for custom T-shirt OEM orders from Pakistan. Covers S through 5XL with key points of measure.",
    length: "6 sections",
  },
  {
    id: 40,
    slug: "polo-shirt-spec-template",
    category: "technical",
    kind: "Template",
    title: "Polo Shirt Specification Template",
    description: "Piqué construction type, collar style and length, placket specification, button material and count, branding placement and size grading S to 5XL for polo shirt OEM orders from Pakistan.",
    length: "6 sections",
  },
  {
    id: 41,
    slug: "henley-shirt-measurement-sheet",
    category: "technical",
    kind: "Template",
    title: "Henley Shirt Measurement Sheet",
    description: "Placket style (clean-finished/overlapping/pocket), button count and type, neckline finish, fabric GSM and size grading S to 5XL with key points of measure for Henley shirt OEM orders.",
    length: "5 sections",
  },
  {
    id: 42,
    slug: "hoodie-spec-template",
    category: "technical",
    kind: "Template",
    title: "Hoodie & Sweatshirt Specification Template",
    description: "Fleece type and GSM, hood style and lining, zip or pullover configuration, drawstring and cuff specification, decoration method and size grading XS to 5XL for hoodie OEM orders from Pakistan.",
    length: "6 sections",
  },
  {
    id: 43,
    slug: "jogger-size-spec-template",
    category: "technical",
    kind: "Template",
    title: "Jogger & Sweatpant Size Specification Template",
    description: "Fleece GSM, waistband style (elastic/drawstring/combination), cuff type, pocket configuration and size grading XS to 5XL with all key points of measure for jogger OEM orders.",
    length: "6 sections",
  },
  {
    id: 44,
    slug: "tank-top-measurement-template",
    category: "technical",
    kind: "Template",
    title: "Tank Top Measurement Template",
    description: "Fabric type and GSM, armhole depth, strap width, neckline style, decoration method and size grading XS to 5XL with key points of measure for tank top OEM orders from Pakistan.",
    length: "5 sections",
  },
  {
    id: 45,
    slug: "denim-jeans-spec-template",
    category: "technical",
    kind: "Template",
    title: "Denim Jeans Specification Template",
    description: "Denim weight (6–14 oz), stretch content, wash type and distressing spec, fit profile, hardware details and size grading W28 to W44 for denim jeans OEM orders from Pakistan.",
    length: "7 sections",
  },
  {
    id: 46,
    slug: "shirt-spec-grading-template",
    category: "technical",
    kind: "Template",
    title: "Shirt Specification & Grading Template",
    description: "Woven fabric construction (poplin/Oxford/twill), collar style and interlining, cuff type, placket detail, easy-iron finish and size grading neck 14\" to 19\" for formal and casual shirt orders.",
    length: "6 sections",
  },
  {
    id: 47,
    slug: "trouser-measurement-template",
    category: "technical",
    kind: "Template",
    title: "Trouser Measurement & Grading Template",
    description: "Fabric construction (chino/stretch twill/linen), waistband style, pleat and fit selection, pocket configuration and size grading W28 to W44 for woven trouser OEM orders from Pakistan.",
    length: "6 sections",
  },
  {
    id: 48,
    slug: "cargo-pants-spec-template",
    category: "technical",
    kind: "Template",
    title: "Cargo Pants Specification Template",
    description: "Fabric type (ripstop/canvas/twill), pocket count and placement, knee pad and seat reinforcement, hardware specification and size grading W28 to W48 for cargo pants orders — fashion and workwear grade.",
    length: "6 sections",
  },
  {
    id: 49,
    slug: "shorts-size-spec-template",
    category: "technical",
    kind: "Template",
    title: "Shorts Size Specification Template",
    description: "Fabric and category (chino/linen/swim/active), inseam length, waistband style, pocket configuration and size grading XS/W28 to 5XL/W44 for shorts OEM orders from Pakistan.",
    length: "5 sections",
  },
  {
    id: 50,
    slug: "kids-size-chart-template",
    category: "technical",
    kind: "Reference",
    title: "Kids Apparel Size Chart (3M–14Y, US/EU/UK)",
    description: "International size conversion table covering US, EU and UK sizing from 3 months to 14 years with key body measurements, mandatory safety label requirements and choking hazard compliance checklist.",
    length: "5 sections",
    popular: true,
  },
  {
    id: 51,
    slug: "swaddle-blanket-spec-template",
    category: "technical",
    kind: "Template",
    title: "Swaddle Blanket Specification Template",
    description: "Muslin construction (single/double gauze), GSM, print method (reactive/pigment), hem finish, finished dimensions by size category, OEKO-TEX Class 1 and GOTS certification checklist for baby swaddle orders.",
    length: "6 sections",
  },
  {
    id: 52,
    slug: "baby-overalls-size-spec-template",
    category: "technical",
    kind: "Template",
    title: "Baby Overalls Size & Specification Template",
    description: "Fabric type, snap count and material, adjustable strap system, bib pocket style, size grading 0M to 5Y and OEKO-TEX Class 1 safety compliance checklist for baby overalls OEM orders.",
    length: "6 sections",
  },
  {
    id: 53,
    slug: "baby-romper-spec-template",
    category: "technical",
    kind: "Template",
    title: "Baby Romper Specification Template",
    description: "Fabric type (rib/interlock/muslin), neckline opening style, snap count and material, sleeve type, size grading newborn to 24M and OEKO-TEX Class 1 and GOTS compliance checklist for infant romper orders.",
    length: "5 sections",
  },
  {
    id: 54,
    slug: "baby-bib-spec-template",
    category: "technical",
    kind: "Template",
    title: "Baby Bib Specification Template",
    description: "Bib style (drool/feeding/bandana), absorbency layer construction, closure type (snap/velcro/tie), print specification, finished dimensions and OEKO-TEX Class 1 and GOTS certification checklist.",
    length: "6 sections",
  },
  {
    id: 55,
    slug: "baby-hooded-towel-spec-template",
    category: "technical",
    kind: "Template",
    title: "Baby Hooded Towel Specification Template",
    description: "Terry GSM, hood style (triangle/animal ear/peaked), embroidery placement, border construction, finished dimensions 70×70 cm to 100×100 cm and OEKO-TEX Class 1 compliance checklist for baby hooded towel orders.",
    length: "6 sections",
  },
  {
    id: 56,
    slug: "workwear-spec-template",
    category: "technical",
    kind: "Template",
    title: "Workwear Specification Template",
    description: "Workwear category and application, fabric standard (hi-vis/FR/general duty), reflective tape specification, pocket configuration, size grading XS to 5XL and EN ISO certification documentation checklist.",
    length: "7 sections",
  },
  {
    id: 57,
    slug: "socks-spec-template",
    category: "technical",
    kind: "Template",
    title: "Socks Specification & Size Template",
    description: "Sock style and category, fibre blend ratios, knit gauge, cushioning zone, toe closure, compression class (if applicable), jacquard pattern and colour count, international size reference and packing specification.",
    length: "7 sections",
  },
  {
    id: 58,
    slug: "apparel-fabric-reference-sheet",
    category: "technical",
    kind: "Reference",
    title: "Apparel Fabric Reference Sheet: Common Types, GSM & Uses",
    description: "Quick reference covering 18 common apparel fabric types — knitted and woven — with GSM ranges, fibre options, primary end use and certification compatibility. For buyers sourcing garments from Pakistan.",
    length: "4 reference tables",
    popular: true,
  },
  {
    id: 59,
    slug: "home-textile-fabric-reference",
    category: "technical",
    kind: "Reference",
    title: "Home Textile Fabric Reference Sheet",
    description: "Quick reference covering terry, percale, sateen, muslin and woven home textile fabrics — construction, GSM, thread count, end use and OEKO-TEX/GOTS certification compatibility. For bath, bed, kitchen and table linen buyers.",
    length: "5 reference tables",
  },
];

const kindStyles: Record<DocKind, { pill: string; icon: string }> = {
  Reference: { pill: "bg-blue-50 text-blue-700 border border-blue-100", icon: "bg-blue-100 text-blue-700" },
  Checklist: { pill: "bg-emerald-50 text-emerald-700 border border-emerald-100", icon: "bg-emerald-100 text-emerald-700" },
  Template: { pill: "bg-amber-50 text-amber-700 border border-amber-100", icon: "bg-amber-100 text-amber-700" },
  Policy: { pill: "bg-violet-50 text-violet-700 border border-violet-100", icon: "bg-violet-100 text-violet-700" },
};

function KindIcon({ kind, className }: { kind: DocKind; className?: string }) {
  switch (kind) {
    case "Checklist":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      );
    case "Template":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      );
    case "Policy":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DownloadsContent() {
  const [activeCategory, setActiveCategory] = useState<DocCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = documents.filter((d) => {
    const matchesCat = activeCategory === "all" || d.category === activeCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const popularDocs = documents.filter((d) => d.popular);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-our-process.webp"
        imageAlt="MZ Global Trading document library — inspection checklists, templates and trade references for textile buyers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Corporate" },
          { label: "Downloads" },
        ]}
        label="Resources"
        title="Document"
        titleGold="Library"
        description="Inspection checklists, Tech Pack templates, AQL tables and trade references — read online, then print or save any document as a branded PDF."
        pills={["59 Documents", "4 Categories", "Print or Save as PDF"]}
      />

      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                How It Works
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-4 leading-tight">
                Every Document, Instantly — No Email Required
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Each document opens as a full page on this site — checklists, reference tables and
                fill-in templates included. Open any document and use{" "}
                <strong className="text-navy-900">Print / Save as PDF</strong> to get a branded,
                watermarked copy for your records, your QC team or your stakeholders.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                All documents are free to use. Need something product-specific — a size chart, a
                compliance summary for your market, a custom checklist? Ask us via the contact page
                and we&apos;ll prepare it.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { num: "59", label: "Documents", sub: "Across 4 categories" },
                { num: "0", label: "Wait Time", sub: "Read instantly online" },
                { num: "PDF", label: "Print Ready", sub: "Branded & watermarked" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={staggerItemVariants}
                  className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-bold text-navy-900 leading-none mb-1">{s.num}</p>
                  <p className="text-gold text-[9px] font-bold uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-gray-500 text-xs leading-snug">{s.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Popular section ───────────────────────────────────────────────────── */}
      <section className="py-10 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-white font-bold text-sm shrink-0">Most Used:</p>
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-wrap gap-3"
            >
              {popularDocs.map((doc) => (
                <motion.div key={doc.id} variants={staggerItemVariants}>
                  <Link
                    href={`/downloads/${doc.slug}/`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white text-xs font-medium transition-colors"
                  >
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${kindStyles[doc.kind].icon}`}
                    >
                      <KindIcon kind={doc.kind} className="w-3.5 h-3.5" />
                    </span>
                    {doc.title}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Document library ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search + category filter */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-10 flex flex-col gap-3"
          >
            {/* Search input */}
            <div className="w-full lg:w-96">
              <label htmlFor="doc-search" className="sr-only">Search documents</label>
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="doc-search"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search checklists, templates, references..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                />
              </div>
            </div>
            {/* Category pills — horizontal scroll on mobile, wraps on desktop */}
            <div className="-mx-4 sm:-mx-6 lg:mx-0 overflow-x-auto">
              <div className="flex gap-2 px-4 sm:px-6 lg:px-0 pb-1 flex-nowrap lg:flex-wrap" role="group" aria-label="Filter documents by category">
                {docCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-navy-900 text-white shadow-xs"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-navy-900 hover:text-navy-900"
                    }`}
                  >
                    {cat.label}
                    <span className={`ml-2 text-xs ${activeCategory === cat.id ? "text-gold" : "text-gray-400"}`}>
                      {cat.id === "all"
                        ? documents.length
                        : documents.filter((d) => d.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cards grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${kindStyles[doc.kind].icon}`}
                      >
                        <KindIcon kind={doc.kind} className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {doc.popular && (
                          <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Popular
                          </span>
                        )}
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${kindStyles[doc.kind].pill}`}>
                          {doc.kind}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-navy-900 font-bold text-base mb-2 leading-snug group-hover:text-gold transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                      {doc.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <span className="text-gray-400 text-xs">{doc.length}</span>
                      <Link
                        href={`/downloads/${doc.slug}/`}
                        className="inline-flex items-center gap-1.5 text-navy-900 text-xs font-bold hover:text-gold transition-colors group/btn"
                        aria-label={`View and print ${doc.title}`}
                      >
                        View &amp; Print
                        <svg
                          className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="border border-dashed border-gray-200 rounded-2xl px-6 py-12 text-center">
              <p className="text-gray-400 text-sm">No document matches — try a different search or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Need Something Specific?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Request a Custom Document
            </h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
              Size charts, market-specific compliance summaries, custom QC checklists — tell us what
              your team needs and we&apos;ll prepare it for your program.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact-us/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Contact Us →
              </Link>
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Submit an RFQ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
