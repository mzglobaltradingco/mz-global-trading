"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import PageHero from "@/components/PageHero";
import {
  fadeUpVariants,
  staggerContainerVariants,
  viewportOnce,
} from "@/lib/animations";

// ─── Local animation variants (new, site-unique) ──────────────────────────────

const numReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── Types ────────────────────────────────────────────────────────────────────

type GuideCategory = "all" | "sourcing" | "quality" | "compliance" | "logistics" | "technical" | "lifecycle" | "bestpractice" | "bathlinen" | "bedlinen" | "kitchenlinen" | "tablelinen" | "thermalblankets" | "hospitallinen" | "industriallinen" | "ihram" | "knittedgarments" | "wovengarments" | "babyandkids" | "workwear" | "socks" | "fabric";

const guideCategories: { id: GuideCategory; label: string }[] = [
  { id: "all", label: "All Guides" },
  { id: "sourcing", label: "Sourcing" },
  { id: "quality", label: "Quality" },
  { id: "compliance", label: "Compliance" },
  { id: "logistics", label: "Logistics" },
  { id: "technical", label: "Technical" },
  { id: "lifecycle", label: "Product Lifecycle" },
  { id: "bestpractice", label: "Best Practices" },
  { id: "bathlinen", label: "Bath Linen" },
  { id: "bedlinen", label: "Bed Linen" },
  { id: "kitchenlinen", label: "Kitchen Linen" },
  { id: "tablelinen", label: "Table Linen" },
  { id: "thermalblankets", label: "Thermal Blankets" },
  { id: "hospitallinen", label: "Hospital Linen" },
  { id: "industriallinen", label: "Industrial Linen" },
  { id: "ihram", label: "Ihram" },
  { id: "knittedgarments", label: "Knitted Garments" },
  { id: "wovengarments", label: "Woven Garments" },
  { id: "babyandkids", label: "Baby & Kids" },
  { id: "workwear", label: "Workwear" },
  { id: "socks", label: "Socks" },
  { id: "fabric", label: "Fabric" },
];

interface Guide {
  num: string;
  slug: string;
  catId: GuideCategory;
  featured?: boolean;
  category: string;
  categoryPill: string;
  accentBar: string;
  title: string;
  description: string;
  topics: string[];
  readTime: string;
  wide?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const guides: Guide[] = [
  {
    num: "01",
    slug: "pakistan-textile-sourcing-guide",
    catId: "sourcing",
    featured: true,
    category: "Sourcing Strategy",
    categoryPill: "bg-blue-50 text-blue-700 border border-blue-200",
    accentBar: "bg-gold",
    title: "The Complete Buyer's Guide to Sourcing Textiles from Pakistan",
    description:
      "Everything a procurement manager needs to evaluate Pakistan as a sourcing destination — factory selection, certifications, quality control, logistics and payment terms.",
    topics: ["Why Pakistan — advantages vs. alternatives", "The 4-stage ordering process", "Logistics, payment terms and risk management"],
    readTime: "18 min read",
    wide: true,
  },
  {
    num: "02",
    slug: "aql-pre-shipment-inspection",
    catId: "quality",
    category: "Quality",
    categoryPill: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    accentBar: "bg-emerald-400",
    title: "Understanding AQL: Pre-Shipment Inspection for Importers",
    description:
      "ISO 2859-1 AQL Level II explained in plain language — sample sizes, defect classifications, acceptance numbers and what a PASS and FAIL means for your shipment release.",
    topics: ["Critical vs Major vs Minor defects", "Sample size calculation by lot size", "How to read an inspection report"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "03",
    slug: "textile-certifications-explained",
    catId: "compliance",
    category: "Compliance",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-400",
    title: "GOTS, OEKO-TEX, BSCI and ISO 9001 Explained",
    description:
      "The key certifications that matter for textile buyers — what each covers, how to verify them and which you need for your market.",
    topics: ["Certification scope and what it verifies", "How to verify certificates independently", "Which certification suits your product"],
    readTime: "10 min read",
    wide: false,
  },
  {
    num: "04",
    slug: "incoterms-for-textile-buyers",
    catId: "logistics",
    category: "Logistics",
    categoryPill: "bg-amber-50 text-amber-700 border border-amber-200",
    accentBar: "bg-amber-400",
    title: "Incoterms 2020: EXW, FOB, CIF and CFR for Textile Buyers",
    description:
      "Visual walkthrough of the four incoterms most used in textile trade — cost split, risk transfer and the correct use case for each.",
    topics: ["Cost and risk responsibility per term", "Why FOB is preferred for textile orders", "Common errors first-time importers make"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "05",
    slug: "how-to-write-a-tech-pack",
    catId: "technical",
    category: "Technical",
    categoryPill: "bg-slate-100 text-slate-700 border border-slate-200",
    accentBar: "bg-slate-500",
    title: "How to Write a Tech Pack for Garment and Home Textile Manufacturing",
    description:
      "Step-by-step structure for a factory-ready Tech Pack — BOM, measurements, construction spec, print placement, finishing and packaging.",
    topics: ["Bill of materials and fabric spec", "Measurement tolerances by garment type", "Artwork and print placement standards"],
    readTime: "12 min read",
    wide: false,
  },
  {
    num: "06",
    slug: "gsm-fabric-weight-guide",
    catId: "technical",
    category: "Technical",
    categoryPill: "bg-slate-100 text-slate-700 border border-slate-200",
    accentBar: "bg-slate-500",
    title: "GSM Reference Guide: Choosing the Right Fabric Weight",
    description:
      "Quick-reference chart mapping GSM ranges to product applications — apparel, home textiles and fabric — with end-use recommendations.",
    topics: ["GSM ranges by product type", "How GSM affects cost and drape", "Thread count vs GSM for bed linen"],
    readTime: "6 min read",
    wide: false,
  },
  {
    num: "07",
    slug: "pakistan-vs-bangladesh-vs-china",
    catId: "sourcing",
    category: "Sourcing",
    categoryPill: "bg-blue-50 text-blue-700 border border-blue-200",
    accentBar: "bg-blue-400",
    title: "Pakistan vs Bangladesh vs China: Textile Sourcing Compared",
    description:
      "Objective comparison across cost, lead time, certification availability, MOQ and product specialisation — with a decision matrix for buyers.",
    topics: ["Cost comparison by category (2025)", "Certification depth comparison", "Product specialisation by country"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "08",
    slug: "first-shipment-checklist",
    catId: "sourcing",
    category: "Sourcing",
    categoryPill: "bg-blue-50 text-blue-700 border border-blue-200",
    accentBar: "bg-blue-400",
    title: "First Shipment Checklist: Step-by-Step for New Importers",
    description:
      "A complete pre-shipment preparation checklist for buyers placing their first bulk order — from Tech Pack sign-off to container seal confirmation.",
    topics: ["Pre-production sample approval checklist", "Inspection scheduling and timing", "Export document verification before shipment"],
    readTime: "5 min read",
    wide: false,
  },
  // ── Series 1: Textile Product Lifecycle ──────────────────────────────────
  {
    num: "09",
    slug: "textile-product-lifecycle-concept-trend-research",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 1: Concept & Trend Research",
    description:
      "The product lifecycle begins before any fabric is cut. How procurement teams research trends, set commercial objectives and make early decisions that define every downstream sourcing choice.",
    topics: ["Trend research inputs and sources", "Building a commercial brief", "Fibre and certification decisions at concept stage"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "10",
    slug: "textile-product-lifecycle-design-technical-development",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 2: Design & Technical Development",
    description:
      "Technical development converts a trend brief into a manufacturable specification. Tech Pack structure, material specification, construction decisions and common errors that create costly sampling revisions.",
    topics: ["Tech Pack structure and completeness", "Material specification with tolerances", "Revision control during development"],
    readTime: "9 min read",
    wide: false,
  },
  {
    num: "11",
    slug: "textile-product-lifecycle-raw-material-sourcing",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 3: Raw Material Sourcing",
    description:
      "Raw material quality and compliance set the ceiling for everything that follows. How factories source yarn, fabric, dyes and trims — and what buyers need to verify to protect product integrity.",
    topics: ["Raw material supply chain from gin to garment", "Certification requirements at fibre level", "What buyers should verify before cutting"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "12",
    slug: "textile-product-lifecycle-supplier-factory-selection",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 4: Supplier & Factory Selection",
    description:
      "Selecting the wrong factory is the most expensive sourcing mistake. Five-dimension evaluation criteria, social audit standards, capability matching and the red flags that rule out a factory.",
    topics: ["5-dimension factory evaluation", "Social audit standards compared", "Red flags that disqualify a factory"],
    readTime: "10 min read",
    wide: false,
  },
  {
    num: "13",
    slug: "textile-product-lifecycle-costing-moq-negotiation",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 5: Costing, MOQ & Negotiation",
    description:
      "Understanding how factories build FOB prices and set MOQs is the foundation of effective negotiation — including what buyers can and cannot reasonably push on.",
    topics: ["How factories build FOB prices", "Understanding MOQ constraints", "What to negotiate — and what not to"],
    readTime: "9 min read",
    wide: false,
  },
  {
    num: "14",
    slug: "textile-product-lifecycle-pre-production-sampling",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 6: Pre-Production Sampling",
    description:
      "Sampling is the quality gate between specification and bulk production. Each sampling stage, approval criteria, revision management and the PP sample's legal role as a production reference.",
    topics: ["Sampling sequence from proto to PP", "PP sample as a legal document", "Reducing sampling rounds with better specs"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "15",
    slug: "textile-product-lifecycle-manufacturing-production",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 7: Manufacturing & Production",
    description:
      "Bulk production is where weeks of specification and sampling hold together or fall apart. Production stages, quality control checkpoints and what buyers can monitor remotely.",
    topics: ["Production stages and QC checkpoints", "DHU benchmarks and in-line inspection", "Remote production monitoring protocols"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "16",
    slug: "textile-product-lifecycle-quality-control-compliance",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 8: Quality Control & Compliance",
    description:
      "Final quality inspection, AQL sampling, lab testing and certification verification before shipment is authorised — the last line of defence before goods leave the factory.",
    topics: ["AQL inspection methodology", "Lab testing by market requirement", "Verifying certification claims independently"],
    readTime: "9 min read",
    wide: false,
  },
  {
    num: "17",
    slug: "textile-product-lifecycle-packaging-labelling",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 9: Packaging & Labelling",
    description:
      "Compliance requirements for care labels, country of origin, barcodes and retail-ready packaging across USA, UK, EU, Canada and Australia — one error causes customs holds and retailer rejections.",
    topics: ["Care label requirements by market", "Country of origin and fibre content rules", "Barcode and DC compliance"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "18",
    slug: "textile-product-lifecycle-export-logistics",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 10: Export & Logistics",
    description:
      "Freight booking, export documentation from Pakistan, incoterm implications and coordinating customs clearance at destination — how shipments move from factory to port to buyer.",
    topics: ["Incoterm selection and risk transfer", "Export documentation from Pakistan", "FCL vs LCL freight comparison"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "19",
    slug: "textile-product-lifecycle-retail-distribution",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 11: Retail & Distribution",
    description:
      "How textile products move from port to retail shelf — import customs, DC compliance, allocation, sell-through analysis and re-order triggers for efficient inventory management.",
    topics: ["Import customs by destination market", "DC compliance requirements and charge-backs", "Re-order triggers and lead time planning"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "20",
    slug: "textile-product-lifecycle-end-of-life-circular-economy",
    catId: "lifecycle",
    category: "Product Lifecycle",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Textile Product Lifecycle — Phase 12: End-of-Life & Circular Economy",
    description:
      "How circularity principles apply to B2B textile sourcing — GRS certification, take-back programs, design for recyclability and how to build end-of-life thinking into procurement from Phase 1.",
    topics: ["Circular economy models for B2B buyers", "GRS certification and recycled content", "Design for recyclability principles"],
    readTime: "8 min read",
    wide: false,
  },
  // ── Series 2: Sourcing Best Practices ────────────────────────────────────
  {
    num: "21",
    slug: "sourcing-best-practices-design-technical-specification",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Design & Technical Specification",
    description:
      "A precise technical specification is the highest-leverage investment in the sourcing process — it prevents factory misunderstandings, reduces sampling rounds and produces consistent bulk quality.",
    topics: ["Define all specifications numerically with tolerances", "Revision control and version management", "Including lab test requirements in Tech Packs"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "22",
    slug: "sourcing-best-practices-fabric-raw-material-sourcing",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Fabric & Raw Material Sourcing",
    description:
      "Fabric is the largest cost driver and the most common source of quality problems. How professional buyers evaluate fabrics, prevent substitution and ensure lot-to-lot consistency across production runs.",
    topics: ["Specifying mill to prevent substitution", "Pre-production fabric testing protocols", "Dye lot consistency management"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "23",
    slug: "sourcing-best-practices-supplier-evaluation-factory-selection",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Supplier Evaluation & Factory Selection",
    description:
      "Supplier evaluation is not a one-time exercise — it is an ongoing process that protects quality, compliance and supply continuity. Structured RFI, evaluation scorecard and factory tiering.",
    topics: ["Structured RFI and evaluation scorecard", "Factory tiering by risk profile", "Red flags for automatic disqualification"],
    readTime: "9 min read",
    wide: false,
  },
  {
    num: "24",
    slug: "sourcing-best-practices-pre-production-sampling",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Pre-Production Sampling",
    description:
      "Sampling is the most time-intensive phase in the sourcing calendar. Best practices for managing sampling rounds efficiently, making decisive approvals and using the PP sample as an enforceable reference.",
    topics: ["Complete comments on the first review", "PP sample as enforceable reference document", "Tracking cumulative development time"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "25",
    slug: "sourcing-best-practices-inline-quality-control",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Inline Quality Control",
    description:
      "Inline QC catches defects when correction is cheapest — during production. DHU benchmarks, inspection frequency, escalation protocols and remote production quality monitoring.",
    topics: ["DHU benchmarks by product tier", "Four inline QC checkpoints explained", "Remote production quality monitoring"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "26",
    slug: "sourcing-best-practices-pre-shipment-inspection",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Pre-Shipment Inspection",
    description:
      "The final quality checkpoint before goods leave the factory. Selecting AQL levels, booking and briefing inspectors, interpreting results and managing the commercial decision on a FAIL.",
    topics: ["AQL parameters in purchase orders", "Briefing inspectors with complete information", "Managing PASS/FAIL decisions commercially"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "27",
    slug: "sourcing-best-practices-export-logistics-compliance",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Export Logistics & Compliance",
    description:
      "Export logistics errors are the most avoidable — and most expensive — sources of delay. Documents checklist, HS code classification, preference scheme selection and freight booking timing.",
    topics: ["Document checklist by destination market", "HS code classification for textiles", "Preference schemes for Pakistan exports"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "28",
    slug: "sourcing-best-practices-communication-documentation",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Communication & Documentation",
    description:
      "Poor communication is the root cause of more sourcing failures than poor manufacturing. The disciplines, protocols and change-control practices that prevent misunderstandings becoming disputes.",
    topics: ["Single-thread email discipline by PO", "Change control and PO amendment process", "Building a supplier communication archive"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "29",
    slug: "sourcing-best-practices-payment-terms-trade-finance",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Payment Terms & Trade Finance",
    description:
      "Payment terms structure the commercial risk between buyer and supplier. TT vs. LC, open account, advance payment, documentary collections and trade finance tools for importers.",
    topics: ["TT payment best practices and triggers", "Letters of credit for high-risk transactions", "Trade finance tools for importers"],
    readTime: "9 min read",
    wide: false,
  },
  {
    num: "30",
    slug: "sourcing-best-practices-sustainable-ethical-sourcing",
    catId: "bestpractice",
    category: "Sourcing Best Practices",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-400",
    title: "Sourcing Best Practices: Sustainable & Ethical Sourcing",
    description:
      "Sustainability is increasingly a market requirement, not a marketing choice. Building a credible, verifiable sustainable sourcing program — from certification selection to supplier auditing and greenwashing avoidance.",
    topics: ["Three pillars of sustainable sourcing", "Avoiding greenwashing under EU law", "Building a supplier sustainability scorecard"],
    readTime: "9 min read",
    wide: false,
  },
  // ── Bath Linen Sourcing Guides ────────────────────────────────────────────
  {
    num: "31",
    slug: "how-to-source-towels-pakistan",
    catId: "bathlinen",
    category: "Bath Linen Sourcing",
    categoryPill: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    accentBar: "bg-cyan-400",
    title: "Towel Sourcing from Pakistan: GSM, Certifications & Lead Times",
    description:
      "An 8-step sourcing guide for buyers importing bath towels from Pakistan — GSM selection, certification requirements by market, sampling, lead times, packing and incoterm selection for USA, UK, EU and Middle East buyers.",
    topics: ["GSM selection for hotel, retail and institutional", "Certification requirements by market (OEKO-TEX, BSCI, Sedex)", "8-step sourcing process from RFQ to delivery"],
    readTime: "10 min read",
    wide: false,
  },
  {
    num: "32",
    slug: "bulk-institutional-towel-sourcing",
    catId: "bathlinen",
    category: "Bath Linen Sourcing",
    categoryPill: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    accentBar: "bg-cyan-400",
    title: "Bulk Institutional Towel Sourcing: Hospital, Hotel & Gym Programmes",
    description:
      "How to structure a bulk institutional towel programme from Pakistan — specifying laundry performance, managing GPO and multi-property contracts, certification requirements and cost-efficient packing formats.",
    topics: ["Laundry performance specification for 150+ wash cycles", "GPO and multi-property contract structure", "Certification requirements for hospital and hotel supply"],
    readTime: "9 min read",
    wide: false,
  },
  {
    num: "33",
    slug: "hotel-bathrobe-sourcing-guide",
    catId: "bathlinen",
    category: "Bath Linen Sourcing",
    categoryPill: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    accentBar: "bg-cyan-400",
    title: "Hotel Bathrobe Sourcing from Pakistan: Construction, GSM & Custom Embroidery",
    description:
      "A complete sourcing guide for hotel and spa bathrobe programmes — terry vs. waffle vs. velour construction, GSM by star rating, collar styles, embroidery process and certification requirements.",
    topics: ["Construction comparison: terry, waffle, velour", "GSM guide by hotel star rating (3-star to 5-star)", "Embroidery and branding process for hotel programmes"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "34",
    slug: "sourcing-bath-mats-pakistan",
    catId: "bathlinen",
    category: "Bath Linen Sourcing",
    categoryPill: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    accentBar: "bg-cyan-400",
    title: "Sourcing Bath Mats from Pakistan: Construction, Anti-Slip & Hotel Specifications",
    description:
      "How to source bath mats from Pakistan — tufted vs. woven construction, GSM grading by application, anti-slip backing types, OEKO-TEX scope requirements and hotel programme specifications.",
    topics: ["Construction comparison and GSM grading by application", "Anti-slip backing types and hotel suitability", "OEKO-TEX scope for complete bath mats including backing"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "35",
    slug: "beach-pool-towel-sourcing-guide",
    catId: "bathlinen",
    category: "Bath Linen Sourcing",
    categoryPill: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    accentBar: "bg-cyan-400",
    title: "Beach & Pool Towel Sourcing: Print Techniques, Seasonal Planning & Chlorine Fastness",
    description:
      "A sourcing guide for beach and pool towel programmes — reactive vs. jacquard vs. velour print techniques, seasonal order timing, artwork approval sequence, chlorine fastness testing and certification by market.",
    topics: ["Print technique comparison: reactive, jacquard, velour", "Seasonal order planning and artwork approval timeline", "Chlorine fastness testing for pool programmes"],
    readTime: "8 min read",
    wide: false,
  },
  // ───────────────────────────────────────── Bed Linen
  {
    num: "36",
    slug: "sourcing-bedsheets-pakistan",
    catId: "bedlinen",
    category: "Bed Linen Sourcing",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-400",
    title: "Sourcing Bedsheets from Pakistan: Fabric Options, Certifications & Lead Times",
    description:
      "A complete 8-step sourcing guide for bedsheets from Pakistan — thread count tiers, percale vs. sateen weave selection, certification requirements by market, size ranges, and lead time planning for USA, UK, EU and Middle East buyers.",
    topics: ["Thread count and weave selection by market tier", "International size ranges: UK, USA, EU, Middle East, Australia", "8-step sourcing process from RFQ to delivery"],
    readTime: "10 min read",
    wide: false,
  },
  {
    num: "37",
    slug: "hotel-fitted-sheet-sourcing",
    catId: "bedlinen",
    category: "Bed Linen Sourcing",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-400",
    title: "Hotel Fitted Sheet Sourcing: Durability, Pocket Depth & Institutional Standards",
    description:
      "How to source fitted sheets for hotel and institutional programmes from Pakistan — measuring mattress depth, specifying pocket depth, elastic type, corner construction and laundry durability requirements.",
    topics: ["Pocket depth by mattress type and market", "Elastic specification for institutional laundry (60°C–95°C)", "Corner construction: box vs. mitred"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "38",
    slug: "sourcing-duvet-covers-pakistan",
    catId: "bedlinen",
    category: "Bed Linen Sourcing",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-400",
    title: "Sourcing Duvet Covers from Pakistan: Fabric, Construction & Custom Sizing",
    description:
      "A sourcing guide for hotel, retail and institutional duvet cover programmes — thread count, weave, closure type selection, international size ranges and certification requirements.",
    topics: ["Closure type selector: button, zip, envelope by programme type", "International size ranges by market", "Certification scope covering closure hardware"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "39",
    slug: "custom-pillow-cover-sourcing",
    catId: "bedlinen",
    category: "Bed Linen Sourcing",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-400",
    title: "Custom Pillow Cover Sourcing: Sizes, Closures & Embroidery Options from Pakistan",
    description:
      "How to source custom pillow covers from Pakistan — international size reference by market, closure options, embroidery and monogramming process, fabric matching to the full bed linen set, and certification requirements.",
    topics: ["Pillow sizes: UK, USA, EU, Middle East, Australia", "Embroidery and monogramming for hotel programmes", "Ease allowance by fill type"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "40",
    slug: "decorative-cushion-cover-sourcing",
    catId: "bedlinen",
    category: "Bed Linen Sourcing",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-400",
    title: "Decorative Cushion Cover Sourcing from Pakistan: Fabrics, Prints & MOQ",
    description:
      "A sourcing guide for decorative cushion cover programmes — fabric selection, reactive digital vs. rotary screen print technique, closure specification, seasonal planning and MOQ structure for retail and hospitality.",
    topics: ["Fabric comparison: canvas, linen blend, velvet, jacquard", "Print technique MOQ and seasonal order windows", "Closure specification: concealed zip, envelope, button"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "41",
    slug: "sourcing-curtains-pakistan",
    catId: "bedlinen",
    category: "Bed Linen Sourcing",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-400",
    title: "Sourcing Curtains from Pakistan: Fabric, Lining & Custom Heading Types",
    description:
      "A complete sourcing guide for retail and contract curtain programmes from Pakistan — blackout vs. sheer vs. linen blend selection, eyelet and pencil pleat heading specifications, lining options and lead times.",
    topics: ["Blackout fabric types: foam-backed, triple-weave, separate lining", "Heading type by market: eyelet (UK), pencil pleat (EU), rod pocket (USA)", "Fire retardancy requirements for hotel contract supply"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "42",
    slug: "sourcing-institutional-bedding-pakistan",
    catId: "bedlinen",
    category: "Bed Linen Sourcing",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-400",
    title: "Sourcing Institutional Bedding from Pakistan: Hotels, Hospitals & Airlines",
    description:
      "A complete guide for institutional bedding programmes — thread count by sector, wash-cycle durability standards, fibre blends, certification for NHS/GPO/hotel tenders and lead times for hotel, hospital and airline supply.",
    topics: ["Thread count by sector: budget hotel to 5-star and NHS healthcare", "Wash-cycle durability standards: 60°C, 71°C and chemical programme compatibility", "Certification for UK NHS, US GPO, EU hotel and airline contracts"],
    readTime: "9 min read",
    wide: false,
  },
  {
    num: "43",
    slug: "sourcing-kitchen-towels-pakistan",
    catId: "kitchenlinen",
    category: "Kitchen Linen Sourcing",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Sourcing Kitchen Towels from Pakistan: Sizes, Absorbency & Custom Print",
    description:
      "Complete sourcing guide for kitchen towels from Pakistan — waffle, terry, flat weave and linen constructions, GSM ranges, custom print methods (reactive, screen, digital) and OEKO-TEX certification for retail and hospitality buyers.",
    topics: ["Construction selection by end use: waffle vs terry vs flat weave vs linen", "Custom print specification: reactive, screen print and digital methods", "Certification scope including print dyes for EU, UK and USA retail"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "44",
    slug: "sourcing-bar-mops-pakistan",
    catId: "kitchenlinen",
    category: "Kitchen Linen Sourcing",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Sourcing Bar Mops from Pakistan: Bulk Orders & Hospitality-Grade Standards",
    description:
      "Procurement guide for commercial bar mop towels from Pakistan — GSM grades by application, HACCP stripe colour coding, loop vs cut end construction and institutional packing for restaurant, hotel and foodservice chains.",
    topics: ["GSM grade selection: 350 to 650+ GSM by application tier", "HACCP stripe colour coding: blue, red, yellow, green zone standards", "Institutional packing: dozen format and mixed-colour carton HACCP risk"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "45",
    slug: "sourcing-aprons-pakistan",
    catId: "kitchenlinen",
    category: "Kitchen Linen Sourcing",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Sourcing Aprons from Pakistan: Chef, Bib & Waist Styles with Custom Branding",
    description:
      "Complete sourcing guide for aprons from Pakistan — canvas, denim and poly-cotton fabrics, bib, waist and cross-back styles, custom embroidery and screen print, commercial laundry performance and OEKO-TEX certification.",
    topics: ["Fabric by application: canvas for chef, poly-cotton for high-volume foodservice", "Style selection: bib, waist, cobbler cross-back, industrial", "Branding: embroidery vs screen print — durability through commercial laundry"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "46",
    slug: "sourcing-pot-holders-pakistan",
    catId: "kitchenlinen",
    category: "Kitchen Linen Sourcing",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-400",
    title: "Sourcing Pot Holders from Pakistan: Heat Resistance, Sizes & Custom Print",
    description:
      "Buyer's guide for pot holders from Pakistan — 3-layer vs 5-layer construction, batting specification (never polyester), EN 407 heat protection levels, coordinated kitchen linen set programmes and OEKO-TEX certification.",
    topics: ["Layer construction: 3-layer standard vs 5-layer for professional kitchen", "Batting specification: 100% cotton only — polyester batting is unsafe", "EN 407 heat protection levels and OEKO-TEX scope for complete article"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "47",
    slug: "sourcing-table-covers-pakistan",
    catId: "tablelinen",
    category: "Table Linen Sourcing",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-500",
    title: "Sourcing Table Covers from Pakistan: Hospitality Grade, Sizes & Custom Print",
    description:
      "Complete sourcing guide for table covers from Pakistan — damask, poly-cotton, linen and jacquard fabrics, fire retardancy standards by market, banquet and restaurant standard sizes, custom embroidery and woven jacquard programmes.",
    topics: ["Fabric by tier: damask for fine dining, poly-cotton for high-volume foodservice", "Fire retardancy: BS 5867 (UK), EN 13773 (EU), civil defence codes (GCC)", "Custom programmes: embroidery on damask vs woven jacquard for branded linen"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "48",
    slug: "sourcing-cellular-blankets-pakistan",
    catId: "thermalblankets",
    category: "Thermal Blankets Sourcing",
    categoryPill: "bg-sky-50 text-sky-700 border border-sky-200",
    accentBar: "bg-sky-500",
    title: "Sourcing Cellular Thermal Blankets from Pakistan: Healthcare & Hospitality Grade",
    description:
      "Complete sourcing guide for cellular blankets from Pakistan — open-weave construction, NHS HTM 01-04 71°C wash durability, 100% cotton specification, GSM grades, healthcare certification (OEKO-TEX, Sedex SMETA) and institutional packing.",
    topics: ["NHS specification: 100% cotton, 71°C wash durability, ≤3% shrinkage after 5 cycles", "GSM by application: 150–220 GSM airline to 300–380 GSM long-term care", "Certification for NHS UK supply: OEKO-TEX + Sedex SMETA Level 2 + ISO 9001"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "49",
    slug: "sourcing-fleece-blankets-pakistan",
    catId: "thermalblankets",
    category: "Thermal Blankets Sourcing",
    categoryPill: "bg-sky-50 text-sky-700 border border-sky-200",
    accentBar: "bg-sky-500",
    title: "Sourcing Fleece Thermal Blankets from Pakistan: Anti-Pill, Sherpa & Custom Print",
    description:
      "Complete sourcing guide for fleece blankets from Pakistan — anti-pill, sherpa, polar and coral fleece constructions, ISO 12945-2 pilling resistance specification, sublimation print requirements and OEKO-TEX certification.",
    topics: ["Construction selection: anti-pill vs sherpa vs polar vs coral fleece by market", "Pilling resistance: ISO 12945-2 Grade 4 minimum — how to specify correctly", "Sublimation print: 100% polyester, white base, flat face — three non-negotiables"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "50",
    slug: "sourcing-surgical-gowns-pakistan",
    catId: "hospitallinen",
    category: "Hospital Linen Sourcing",
    categoryPill: "bg-rose-50 text-rose-700 border border-rose-200",
    accentBar: "bg-rose-500",
    title: "Sourcing Surgical Gowns from Pakistan: AAMI Levels, SMS & Woven Construction",
    description:
      "AAMI PB70 Level 1–4 framework, SMS disposable vs reusable woven selection, sterilisation compatibility by method, EN 13795 EU standard and certification requirements for hospital and NGO buyers globally.",
    topics: ["AAMI PB70 Level 1–4 — clinical selection guide", "SMS disposable vs reusable woven cotton", "Sterilisation compatibility and size distribution"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "51",
    slug: "sourcing-medical-scrubs-pakistan",
    catId: "hospitallinen",
    category: "Hospital Linen Sourcing",
    categoryPill: "bg-rose-50 text-rose-700 border border-rose-200",
    accentBar: "bg-rose-500",
    title: "Sourcing Medical Scrubs from Pakistan: Fabric, Colours & Custom Embroidery",
    description:
      "Poly-cotton and 4-way stretch fabric selection, anti-microbial treatment options, NHS 71°C wash compliance, hospital colour-coding programmes, custom embroidery and size distribution for bulk hospital supply.",
    topics: ["Poly-cotton vs 4-way stretch vs anti-microbial", "Hospital colour-coding programme specification", "Size distribution and embroidery programmes"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "52",
    slug: "sourcing-patient-gowns-pakistan",
    catId: "hospitallinen",
    category: "Hospital Linen Sourcing",
    categoryPill: "bg-rose-50 text-rose-700 border border-rose-200",
    accentBar: "bg-rose-500",
    title: "Sourcing Patient Gowns from Pakistan: Closure Types, Fabric & Hospital Standards",
    description:
      "Tie, snap, magnetic and wrap/kimono closure systems, 100% cotton and poly-cotton fabrics, NHS HTM 01-04 wash compliance, bariatric and paediatric sizing, and certification requirements.",
    topics: ["Closure system selection by ward type", "NHS HTM 01-04 compliance requirements", "Size range including bariatric and paediatric"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "53",
    slug: "sourcing-huck-towels-pakistan",
    catId: "hospitallinen",
    category: "Hospital Linen Sourcing",
    categoryPill: "bg-rose-50 text-rose-700 border border-rose-200",
    accentBar: "bg-rose-500",
    title: "Sourcing Surgical Huck Towels from Pakistan: Lint-Free Standards & Bulk Orders",
    description:
      "Huck weave lint-free construction, clinical GSM grades, autoclave sterilisation compatibility, USA 17×27 in and UK/EU 40×60 cm size formats, colour coding and certification for hospital and surgical facility buyers.",
    topics: ["How huck weave eliminates lint in clinical settings", "USA and UK/EU size standards", "Sterilisation compatibility and colour specification"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "54",
    slug: "sourcing-shop-towels-pakistan",
    catId: "industriallinen",
    category: "Industrial Linen Sourcing",
    categoryPill: "bg-zinc-100 text-zinc-700 border border-zinc-300",
    accentBar: "bg-zinc-500",
    title: "Sourcing Industrial Shop Towels from Pakistan: Bulk Supply & Custom Print",
    description:
      "100% cotton, poly-cotton and terry construction selection, USA and EU size standards, custom colour print and logo programmes, packing formats for distribution and certification requirements.",
    topics: ["Cotton vs poly-cotton vs terry — construction guide", "USA and EU size standards", "Custom print and logo programmes for distribution"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "55",
    slug: "sourcing-fender-covers-pakistan",
    catId: "industriallinen",
    category: "Industrial Linen Sourcing",
    categoryPill: "bg-zinc-100 text-zinc-700 border border-zinc-300",
    accentBar: "bg-zinc-500",
    title: "Sourcing Fender Covers from Pakistan: Automotive Grade & Custom Branding",
    description:
      "Terry, fleece and canvas construction selection, vinyl and rubber backing specification, standard and extended automotive sizing, custom screen-print and embroidery branding for dealer programmes.",
    topics: ["Terry vs fleece vs canvas — workshop selection guide", "Backing type specification — vinyl and rubber", "Dealership branding — screen print and embroidery"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "56",
    slug: "sourcing-ihram-pakistan",
    catId: "ihram",
    category: "Ihram Sourcing",
    categoryPill: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    accentBar: "bg-emerald-600",
    title: "Sourcing Ihram from Pakistan: White Terry, Sizing & Hajj/Umrah Bulk Supply",
    description:
      "Religious compliance requirements (white-only, unsewn construction), white terry and woven cotton GSM by Hajj season, standard and extended sizing, Hajj tour operator packing and seasonal lead time calendar.",
    topics: ["Religious compliance — white-only, unsewn construction", "GSM by Hajj season — summer vs winter Hajj", "Tour operator packing and Hajj season lead times"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "57",
    slug: "custom-tshirt-sourcing-pakistan",
    catId: "knittedgarments",
    category: "Knitted Garments Sourcing",
    categoryPill: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    accentBar: "bg-indigo-500",
    title: "Custom T-Shirt Sourcing from Pakistan: Fabric, Fit & Decoration Options",
    description:
      "GSM selection by product category (fashion vs promo vs workwear), single jersey and piqué construction, neck and sleeve options, decoration methods (screen print, embroidery, DTG), OEM grading from S to 5XL and size-assorted carton packing.",
    topics: ["GSM selection — 130gsm to 280gsm for different buyer categories", "Neck style, sleeve and hem options for OEM orders", "Decoration methods — screen print, embroidery, DTG comparison"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "58",
    slug: "polo-shirt-sourcing-pakistan",
    catId: "knittedgarments",
    category: "Knitted Garments Sourcing",
    categoryPill: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    accentBar: "bg-indigo-500",
    title: "Polo Shirt Sourcing from Pakistan: Collar Types, Placket Options & Branding",
    description:
      "Single, double and waffle piqué construction comparison, collar style selection (ribbed, self-fabric, tipped), placket construction options, button material and branding methods for corporate, sportswear and retail programmes.",
    topics: ["Piqué fabric selection — single vs double vs waffle for different end uses", "Collar and placket construction — the defining polo quality indicators", "Branding: embroidery stitch count, screen print and woven label options"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "59",
    slug: "sourcing-henley-shirts-pakistan",
    catId: "knittedgarments",
    category: "Knitted Garments Sourcing",
    categoryPill: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    accentBar: "bg-indigo-500",
    title: "Sourcing Henley Shirts from Pakistan: OEM, Seasonal Collections & Lead Times",
    description:
      "Placket style options (clean-finished, overlapping, pocket), button count and material, fabric construction (jersey, waffle, thermal), OEM seasonal development process and indicative lead times for buyers in USA, UK and Europe.",
    topics: ["Placket styles — clean-finish vs overlapping vs with pocket", "Button type and count — shell, poly, horn-look selection", "OEM seasonal collection process and indicative lead times"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "60",
    slug: "hoodie-sweatshirt-sourcing-pakistan",
    catId: "knittedgarments",
    category: "Knitted Garments Sourcing",
    categoryPill: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    accentBar: "bg-indigo-500",
    title: "Hoodie & Sweatshirt Sourcing from Pakistan: GSM, Lining & Custom Print Options",
    description:
      "French terry vs brushed fleece vs polar fleece construction comparison, GSM selection by retail segment, hood lining options, zip vs pullover configuration, drawstring and ribbing specification, decoration methods and OEM development.",
    topics: ["Fleece type selection — French terry, brushed fleece, polar, sherpa", "GSM by retail segment — 240gsm to 420gsm construction guide", "Hood, zip, drawstring and ribbing specification for OEM development"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "61",
    slug: "sourcing-joggers-sweatpants-pakistan",
    catId: "knittedgarments",
    category: "Knitted Garments Sourcing",
    categoryPill: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    accentBar: "bg-indigo-500",
    title: "Sourcing Joggers & Sweatpants from Pakistan: Fabric, Fit & OEM Options",
    description:
      "French terry and brushed fleece GSM by use case, waistband construction (elastic, drawstring, combination), cuff styles, pocket configuration, fit grading from XS to 5XL and OEM customisation options for fashion and activewear buyers.",
    topics: ["Fleece GSM — 240gsm to 400gsm for fashion, activewear and premium segments", "Waistband and cuff specification — elastic, drawstring and rib options", "Pocket configuration — side, rear and coin pocket combinations"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "62",
    slug: "tank-top-sourcing-pakistan",
    catId: "knittedgarments",
    category: "Knitted Garments Sourcing",
    categoryPill: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    accentBar: "bg-indigo-500",
    title: "Sourcing Tank Tops from Pakistan: Fabric Options, Sizing & Custom Branding",
    description:
      "Cotton jersey, rib and performance mesh construction comparison, GSM by end use, armhole depth and strap width options, neckline styles (crew, scoop, racerback), OEM size grading XS to 5XL and screen print or DTG decoration.",
    topics: ["Fabric type — jersey vs rib vs performance mesh for fashion vs activewear", "Style options — classic, racerback, muscle and spaghetti strap", "OEM grading XS to 5XL with armhole and strap specification"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "63",
    slug: "sourcing-denim-jeans-pakistan",
    catId: "wovengarments",
    category: "Woven Garments Sourcing",
    categoryPill: "bg-sky-50 text-sky-700 border border-sky-200",
    accentBar: "bg-sky-600",
    title: "Sourcing Denim Jeans from Pakistan: Wash Types, Fits & Certification",
    description:
      "Denim weight selection (6oz to 14oz), stretch content options, wash type specification (enzyme, stone, acid, raw), fit profile (slim, straight, relaxed, skinny), hardware sourcing and OEKO-TEX and GOTS certification for export buyers.",
    topics: ["Denim weight — 6oz to 14oz for fashion, mid-weight and premium construction", "Wash specification — enzyme, stone, acid, distressing and raw options", "Stretch content and fit profile — rigid to super-stretch for market positioning"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "64",
    slug: "formal-casual-shirt-sourcing-pakistan",
    catId: "wovengarments",
    category: "Woven Garments Sourcing",
    categoryPill: "bg-sky-50 text-sky-700 border border-sky-200",
    accentBar: "bg-sky-600",
    title: "Formal & Casual Shirt Sourcing from Pakistan: Collar Styles, Fabric & MOQ",
    description:
      "Poplin, Oxford, twill and end-on-end fabric comparison, collar style selection (classic, spread, button-down, cutaway), cuff and placket options, easy-iron finish specification and size grading for corporate, retail and hospitality buyers.",
    topics: ["Fabric construction — poplin, Oxford, twill and end-on-end for different markets", "Collar style guide — classic, spread, button-down, cutaway and mandarin", "Cuff, placket and button specification for OEM formal and casual shirts"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "65",
    slug: "pants-trousers-sourcing-pakistan",
    catId: "wovengarments",
    category: "Woven Garments Sourcing",
    categoryPill: "bg-sky-50 text-sky-700 border border-sky-200",
    accentBar: "bg-sky-600",
    title: "Pants & Trousers Sourcing from Pakistan: Fabric, Fit & Construction",
    description:
      "Chino twill, stretch twill, ponte and linen-cotton construction comparison, GSM by use case, waistband options (standard, extended, partially elasticated), pleat and fit selection and pocket configuration for fashion and corporate buyers.",
    topics: ["Fabric construction — chino, stretch twill, ponte and linen-cotton", "Waistband types — standard, extended, elasticated and combination", "Fit and pleat selection — slim, straight, relaxed, flat front and pleated"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "66",
    slug: "sourcing-cargo-pants-pakistan",
    catId: "wovengarments",
    category: "Woven Garments Sourcing",
    categoryPill: "bg-sky-50 text-sky-700 border border-sky-200",
    accentBar: "bg-sky-600",
    title: "Sourcing Cargo Pants from Pakistan: Workwear Grade, Fabric & Custom Options",
    description:
      "Ripstop, canvas and stretch twill fabric selection, pocket count and placement specification, knee pad and seat reinforcement options, bartack stress-point reinforcement, hardware sourcing and size grading W28 to W48 for fashion and workwear buyers.",
    topics: ["Fabric — ripstop vs canvas vs stretch twill for fashion vs workwear", "Pocket configuration — cargo pocket count, closure and dimensions", "Reinforcement — knee pad, seat reinforcement and bartack at stress points"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "67",
    slug: "sourcing-shorts-pakistan",
    catId: "wovengarments",
    category: "Woven Garments Sourcing",
    categoryPill: "bg-sky-50 text-sky-700 border border-sky-200",
    accentBar: "bg-sky-600",
    title: "Sourcing Shorts from Pakistan: Inseam Lengths, Fabric & Custom Branding",
    description:
      "Chino, linen, denim, swim and active shorts fabric comparison, inseam length selection by market (USA vs EU vs Australia), waistband and drawstring specification, pocket configuration and OEM branding options for retail and brand buyers.",
    topics: ["Fabric selection — chino, linen, denim, swim and performance mesh", "Inseam length by market — USA 7–9\", EU 5–7\", active 2–3\" standards", "Waistband and pocket specification for fashion and swim categories"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "68",
    slug: "kids-tshirt-sourcing-pakistan",
    catId: "babyandkids",
    category: "Baby & Kids Sourcing",
    categoryPill: "bg-pink-50 text-pink-700 border border-pink-200",
    accentBar: "bg-pink-500",
    title: "Kids T-Shirt Sourcing from Pakistan: Fabric Safety, Sizing & Compliance",
    description:
      "OEKO-TEX Standard 100 Product Class 1 and GOTS requirements for children's apparel, fabric safety for ages 0–14, international size conversion (US/EU/UK, 3M–14Y), choking hazard and drawstring compliance for EU, USA and Australia retail buyers.",
    topics: ["OEKO-TEX Class 1 and GOTS requirements for children's apparel", "International size conversion — US, EU and UK from 3 months to 14 years", "Choking hazard, drawstring and small part compliance for EU and USA"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "69",
    slug: "sourcing-swaddle-muslin-pakistan",
    catId: "babyandkids",
    category: "Baby & Kids Sourcing",
    categoryPill: "bg-pink-50 text-pink-700 border border-pink-200",
    accentBar: "bg-pink-500",
    title: "Sourcing Swaddle Muslin Fabric from Pakistan: GOTS Certification & Custom Print",
    description:
      "Single vs double-gauze muslin construction, GSM and thread count selection, reactive dye and pigment print compatibility, GOTS and OEKO-TEX Product Class 1 certification, finished dimensions by size category and hem finishing for baby product buyers.",
    topics: ["Single vs double-gauze — GSM, softness and heat regulation comparison", "GOTS and OEKO-TEX Class 1 — mandatory certification for baby market entry", "Reactive dye print compatibility, rub fastness and azo-free dye compliance"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "70",
    slug: "sourcing-baby-overalls-pakistan",
    catId: "babyandkids",
    category: "Baby & Kids Sourcing",
    categoryPill: "bg-pink-50 text-pink-700 border border-pink-200",
    accentBar: "bg-pink-500",
    title: "Sourcing Baby Overalls from Pakistan: OEKO-TEX Certified Fabric & Custom Sizing",
    description:
      "Denim, twill and corduroy fabric selection for baby overalls, snap type and count specification (plastic vs metal), adjustable strap systems, bib pocket options, size grading 0M–5Y and OEKO-TEX and GOTS certification requirements for EU and USA retail.",
    topics: ["Fabric selection — denim, canvas and corduroy for baby overalls", "Snap specification — plastic vs metal, count and pull-off test requirements", "Strap adjustment systems — clip, button hole and D-ring options for sizing"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "71",
    slug: "sourcing-baby-rompers-pakistan",
    catId: "babyandkids",
    category: "Baby & Kids Sourcing",
    categoryPill: "bg-pink-50 text-pink-700 border border-pink-200",
    accentBar: "bg-pink-500",
    title: "Sourcing Baby Rompers from Pakistan: Snap Closures, Sizing & Safety Standards",
    description:
      "Rib knit, interlock and muslin fabric comparison for infant rompers, envelope neck vs overlap shoulder opening for ease of dressing, snap count and material specification, size grading newborn to 24M and OEKO-TEX Class 1 and GOTS compliance.",
    topics: ["Fabric — rib knit vs interlock vs muslin for different price and care profiles", "Neckline and shoulder opening — envelope neck vs overlap for infant dressing ease", "Snap count, material (plastic vs metal) and EN 71-1 pull-off test requirements"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "72",
    slug: "sourcing-baby-bibs-pakistan",
    catId: "babyandkids",
    category: "Baby & Kids Sourcing",
    categoryPill: "bg-pink-50 text-pink-700 border border-pink-200",
    accentBar: "bg-pink-500",
    title: "Sourcing Baby Bibs from Pakistan: Absorbency, Closure Types & Custom Print",
    description:
      "Drool bib, feeding bib and bandana bib style selection, absorbency layer construction (single, double cotton flannel interlining, PUL waterproof backing), snap vs velcro closure, reactive dye print options and OEKO-TEX and GOTS certification.",
    topics: ["Bib style guide — drool vs feeding vs bandana for different retail programmes", "Absorbency construction — interlining count, face fabric and PUL waterproof backing", "Closure options — KAM snap, velcro and tie, with safety pull-off compliance"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "73",
    slug: "sourcing-baby-hooded-towels-pakistan",
    catId: "babyandkids",
    category: "Baby & Kids Sourcing",
    categoryPill: "bg-pink-50 text-pink-700 border border-pink-200",
    accentBar: "bg-pink-500",
    title: "Sourcing Baby Hooded Towels from Pakistan: Certified Fabric & Custom Embroidery",
    description:
      "Terry GSM selection for baby hooded towels (350–550 GSM), hood style options (triangle, animal ear, peaked), embroidery placement and thread colour specification, border construction, size range 70×70 cm to 100×100 cm and OEKO-TEX Class 1 compliance.",
    topics: ["Terry GSM — 350gsm vs 450gsm vs 550gsm for different retail positions", "Hood styles — standard triangle, animal ear and peaked hood construction", "Embroidery placement, personalisation options and OEKO-TEX Class 1 requirements"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "74",
    slug: "sourcing-workwear-pakistan",
    catId: "workwear",
    category: "Workwear Sourcing",
    categoryPill: "bg-orange-50 text-orange-700 border border-orange-200",
    accentBar: "bg-orange-500",
    title: "Sourcing Workwear from Pakistan: EN ISO Standards, Fabric & Custom Branding",
    description:
      "Hi-visibility (EN ISO 20471 Class 1/2/3), flame-resistant (EN ISO 11612) and general-duty cotton drill fabric selection, reflective tape specification, pocket configuration for industrial and construction use, size grading XS to 5XL and certification documentation.",
    topics: ["Hi-vis and FR fabric selection — EN ISO 20471 and EN ISO 11612 standards", "Reflective tape specification — width, class (RT1/RT2) and placement", "Pocket configuration for industrial, construction and service workwear"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "75",
    slug: "sourcing-socks-pakistan",
    catId: "socks",
    category: "Socks Sourcing",
    categoryPill: "bg-violet-50 text-violet-700 border border-violet-200",
    accentBar: "bg-violet-500",
    title: "Sourcing Socks from Pakistan: Knit Types, Custom Jacquard & MOQ",
    description:
      "Cotton, combed cotton, nylon blend, wool blend and compression sock construction comparison, knit gauge selection (120 to 400 needle), cushioning zone specification, toe closure options (seamless vs standard), jacquard pattern capability and size range reference.",
    topics: ["Fibre blend — cotton, combed cotton, nylon, wool and bamboo options", "Knit gauge and cushioning zone — needle count and terry sole specification", "Jacquard pattern capability, colour count limits and size chart reference"],
    readTime: "7 min read",
    wide: false,
  },
  {
    num: "76",
    slug: "sourcing-apparel-fabric-pakistan",
    catId: "fabric",
    category: "Fabric Sourcing",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-600",
    title: "Sourcing Apparel Fabric from Pakistan: GSM, Width & Certification Options",
    description:
      "Knitted and woven apparel fabric construction types (single jersey, piqué, twill, poplin, denim, ripstop), GSM ranges by end use, standard fabric width specifications (44\"/60\"/72\"), certification options (OEKO-TEX, GOTS, GRS) and minimum order considerations.",
    topics: ["Knitted vs woven — construction type selection by garment end use", "GSM and width specification for fabric roll orders from Pakistan", "OEKO-TEX, GOTS and GRS certification options for apparel fabric"],
    readTime: "8 min read",
    wide: false,
  },
  {
    num: "77",
    slug: "sourcing-home-textile-fabric-pakistan",
    catId: "fabric",
    category: "Fabric Sourcing",
    categoryPill: "bg-teal-50 text-teal-700 border border-teal-200",
    accentBar: "bg-teal-600",
    title: "Sourcing Home Textile Fabric from Pakistan: GSM, Width & Certification",
    description:
      "Terry, percale, sateen, muslin and woven home textile fabric construction, GSM and thread count by product category, fabric width standards (44\"/60\"/90\"), converting fabric roll orders to finished product yield calculations and certification requirements.",
    topics: ["Terry fabric types — standard loop, velour, waffle and dobby border", "Percale vs sateen — thread count, hand-feel and market positioning", "Fabric roll-to-finished-product yield calculation method"],
    readTime: "8 min read",
    wide: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GuidesContent() {
  const [activeCategory, setActiveCategory] = useState<GuideCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = guides.filter((g) => {
    const matchesCat = activeCategory === "all" || g.catId === activeCategory;
    const term = searchTerm.trim().toLowerCase();
    const matchesTerm =
      !term ||
      g.title.toLowerCase().includes(term) ||
      g.description.toLowerCase().includes(term) ||
      g.topics.some((t) => t.toLowerCase().includes(term));
    return matchesCat && matchesTerm;
  });

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-knowledge.webp"
        imageAlt="MZ Global Trading textile sourcing guides — in-depth reference guides for international buyers"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Corporate" },
          { label: "Guides" },
        ]}
        label="Resources"
        title="Sourcing"
        titleGold="Guides"
        description="77 comprehensive reference guides — AQL inspection, certifications, incoterms, Tech Packs, sourcing best practices, bath linen, bed linen, kitchen linen, table linen, thermal blankets, hospital linen, industrial linen, Ihram, knitted garments, woven garments, baby & kids, workwear, socks and fabric. Free to read online."
        pills={["77 Guides", "Free to Read Online", "B2B Reference Quality"]}
      />

      {/* ── Stats bar ─────────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden"
          >
            {[
              { val: "77", label: "Guides", delay: 0 },
              { val: "250+", label: "Minutes of Content", delay: 0.08 },
              { val: "22", label: "Topic Areas", delay: 0.16 },
              { val: "Free", label: "Read Online", delay: 0.24 },
            ].map((s) => (
              <motion.div
                key={s.label}
                custom={s.delay}
                variants={numReveal}
                className="bg-white px-6 py-6 text-center"
              >
                <p className="text-3xl font-bold text-navy-900 leading-none mb-1">{s.val}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bento grid ────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px flex-1 max-w-[60px] bg-gold" />
              <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
                Guide Library
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              All 77 Guides
            </h2>

            <div className="flex flex-col gap-3">
              {/* Search — always first on mobile so it's never buried under pills */}
              <div className="w-full lg:w-72 lg:ml-auto">
                <label htmlFor="guide-search" className="sr-only">Search guides</label>
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    id="guide-search"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search AQL, GSM, incoterms..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-navy-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  />
                </div>
              </div>
              {/* Category pills — horizontal scroll on mobile, wraps on desktop */}
              <div className="-mx-4 sm:-mx-6 lg:mx-0 overflow-x-auto">
                <div className="flex gap-2 px-4 sm:px-6 lg:px-0 pb-1 flex-nowrap lg:flex-wrap" role="group" aria-label="Filter guides by category">
                  {guideCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        activeCategory === cat.id
                          ? "bg-navy-900 text-white shadow-xs"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-navy-900 hover:text-navy-900"
                      }`}
                    >
                      {cat.label}
                      <span className={`ml-2 text-xs ${activeCategory === cat.id ? "text-gold" : "text-gray-500"}`}>
                        {cat.id === "all" ? guides.length : guides.filter((g) => g.catId === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento grid — 3 cols desktop, filterable */}
          <motion.div layout className="grid lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
            {filtered.map((guide, i) => (
              <motion.article
                key={guide.num}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: (i % 3) * 0.06 }}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 340, damping: 24 } }}
                className={`group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-lg transition-shadow flex flex-col ${
                  guide.wide ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                {/* Accent bar top */}
                <motion.div
                  className={`h-1 w-full ${guide.accentBar}`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 + (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${guide.categoryPill}`}>
                        {guide.category}
                      </span>
                      {guide.featured && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20">
                          Featured
                        </span>
                      )}
                    </span>
                    <span className="text-gray-500 text-xs shrink-0">{guide.readTime}</span>
                  </div>

                  <div className={`flex ${guide.wide ? "lg:flex-row lg:gap-8 lg:items-start" : "flex-col"} flex-1`}>
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 + (i % 3) * 0.08 }}
                          className="text-3xl font-bold text-gray-200 group-hover:text-gold/30 leading-none shrink-0 transition-colors duration-300 select-none"
                          aria-hidden="true"
                        >
                          {guide.num}
                        </motion.span>
                        <h3 className="text-navy-900 font-bold text-[15px] leading-snug group-hover:text-gold transition-colors">
                          {guide.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3">{guide.description}</p>
                    </div>

                    <div className={`shrink-0 ${guide.wide ? "lg:w-64" : ""}`}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                        What You&apos;ll Learn
                      </p>
                      <ul className="space-y-1.5 mb-3">
                        {guide.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2.5">
                            <span className="mt-1 shrink-0 w-3.5 h-3.5 rounded-full bg-gray-100 group-hover:bg-gold/15 flex items-center justify-center transition-colors">
                              <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-gold transition-colors" aria-hidden="true" />
                            </span>
                            <span className="text-gray-500 text-xs leading-snug">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-gray-50">
                    <Link
                      href={`/guides/${guide.slug}/`}
                      className="inline-flex items-center gap-1.5 text-navy-900 text-xs font-bold hover:text-gold transition-colors group/link"
                      aria-label={`Read ${guide.title}`}
                    >
                      Read Guide
                      <svg
                        className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform"
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
              </motion.article>
            ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="border border-dashed border-gray-200 rounded-2xl px-6 py-12 text-center">
              <p className="text-gray-500 text-sm">No guide matches that search — try a different term or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── More coming ───────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <div className="flex-1">
              <p className="text-navy-900 font-bold text-sm mb-1">More guides in development</p>
              <p className="text-gray-500 text-sm">
                Upcoming: Hospital Linen Compliance, Denim Washing Guide, Sustainable Fibre Selection, Bed Linen Sourcing.
              </p>
            </div>
            <Link
              href="/contact-us/"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
            >
              Request a Specific Topic
            </Link>
          </motion.div>
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
              Apply the Knowledge
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Place Your First Order?
            </h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto mb-8">
              Submit a structured RFQ and receive a formal quotation within 3–5 business days — with factory selection, certifications and inspection built in.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/faqs/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Read FAQs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
