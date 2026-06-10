"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";

// ─── Constants ────────────────────────────────────────────────────────────────

const RECIPIENT = "info@mzglobaltrading.com";

const STEPS = ["Your Details", "Product", "Logistics", "Review"];

const APPAREL_TYPES = [
  "T-Shirts", "Polo Shirts", "Henley Shirts", "Sweatshirts & Hoodies",
  "Sweatpants & Joggers", "Tank Tops", "Denim Jeans", "Formal & Casual Shirts",
  "Pants & Trousers", "Cargo Pants", "Shorts", "Baby & Kids Apparel",
  "Workwear Apparel", "Socks", "Other / Multiple",
];

const HOME_TEXTILE_TYPES = [
  "Towels", "Institutional Towels", "Bathrobes", "Bath Mats", "Beach & Pool Towels",
  "Bedsheets", "Fitted Sheets", "Duvet Covers", "Pillow Covers", "Cushion Covers",
  "Curtains", "Kitchen Towels", "Bar Mops", "Aprons", "Pot Holders", "Table Covers",
  "Cellular Thermal Blanket", "Fleece Thermal Blankets", "Doctor Surgical Gowns",
  "Medical Scrubs", "Patient Gowns", "Surgical Huck Towels", "Shop Towels",
  "Fender Covers", "Ihram", "Other / Multiple",
];

const FABRIC_TYPES = [
  "Apparel Fabric", "Home Textile Fabric", "Other / Multiple",
];

const CERTIFICATIONS = [
  "GOTS", "OEKO-TEX", "BSCI", "Sedex", "ISO 9001",
  "GRS", "WRAP", "BCI", "SA8000", "Bluesign", "None required",
];

const INCOTERMS = [
  "FOB – Free on Board (Karachi)",
  "CIF – Cost, Insurance & Freight",
  "CFR – Cost & Freight",
  "DDP – Delivered Duty Paid",
  "EXW – Ex Works",
  "To be discussed",
];

const COUNTRIES = [
  // Primary markets
  "United States", "United Kingdom", "Canada", "Germany", "France",
  "Netherlands", "Italy", "Spain", "Belgium", "Sweden", "Norway", "Denmark",
  "Finland", "Switzerland", "Austria", "Poland", "Portugal", "Ireland",
  "Czech Republic", "Hungary", "Romania", "Greece", "Brazil", "Argentina",
  "Chile", "Colombia", "Peru", "Mexico",
  // Rest of world — alphabetical
  "Afghanistan", "Albania", "Algeria", "Angola", "Armenia", "Australia",
  "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belize", "Benin",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bulgaria", "Burkina Faso",
  "Cambodia", "Cameroon", "China", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia",
  "Ethiopia", "Georgia", "Ghana", "Guatemala", "Honduras", "India", "Indonesia",
  "Iran", "Iraq", "Israel", "Ivory Coast", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Latvia", "Lebanon", "Libya",
  "Lithuania", "Luxembourg", "Madagascar", "Malaysia", "Mali", "Malta",
  "Morocco", "Mozambique", "Myanmar", "New Zealand", "Nicaragua", "Nigeria",
  "Oman", "Pakistan", "Panama", "Paraguay", "Philippines", "Qatar", "Russia",
  "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia",
  "Slovenia", "South Africa", "South Korea", "Sri Lanka", "Syria", "Taiwan",
  "Tanzania", "Thailand", "Tunisia", "Turkey", "Uganda", "Ukraine",
  "United Arab Emirates", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam",
  "Yemen", "Zimbabwe",
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface RFQData {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  category: string;
  productType: string;
  fabricComposition: string;
  gsm: string;
  specifications: string;
  quantity: string;
  targetPrice: string;
  certifications: string[];
  samplesRequired: string;
  destinationCountry: string;
  incoterm: string;
  portOfDestination: string;
  deliveryDate: string;
  notes: string;
}

const INITIAL: RFQData = {
  name: "", jobTitle: "", company: "", email: "", phone: "", country: "",
  category: "", productType: "", fabricComposition: "", gsm: "",
  specifications: "", quantity: "", targetPrice: "", certifications: [],
  samplesRequired: "", destinationCountry: "", incoterm: "",
  portOfDestination: "", deliveryDate: "", notes: "",
};

type Status = "idle" | "ready" | "sent";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getProductTypes(category: string): string[] {
  if (category === "Apparel") return APPAREL_TYPES;
  if (category === "Home Textiles") return HOME_TEXTILE_TYPES;
  if (category === "Fabric") return FABRIC_TYPES;
  return [];
}

function getSpecConfig(category: string): { label: string; placeholder: string } {
  if (category === "Apparel")
    return { label: "Size Range", placeholder: "e.g. XS, S, M, L, XL — or specify custom sizing" };
  if (category === "Home Textiles")
    return { label: "Dimensions", placeholder: "e.g. 70×140cm for bath towels, King size for bedsheets" };
  if (category === "Fabric")
    return { label: "Width & Roll Weight", placeholder: "e.g. 150cm wide, 200gsm" };
  return { label: "Specifications", placeholder: "Select a category first" };
}

function focusFirstError(errorMap: Record<string, string>) {
  const firstKey = Object.keys(errorMap)[0];
  if (!firstKey) return;
  setTimeout(() => {
    const el = document.getElementById(firstKey);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.focus(); }
  }, 50);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  id, label, required, error, children,
}: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-navy-900">
        {label}
        {required && <span className="text-gold ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1" role="alert">
          <span aria-hidden="true">↑</span> {error}
        </p>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">
      {children}
    </p>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-gray-400 text-sm w-40 flex-shrink-0">{label}</span>
      <span className="text-navy-900 text-sm font-medium">{value || "—"}</span>
    </div>
  );
}

// input class helper — red border when field has error
const ic = (err?: string) =>
  `w-full px-4 py-3 border rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors bg-white disabled:bg-gray-50 disabled:text-gray-400 ${
    err
      ? "border-red-400 focus:ring-red-300/40 focus:border-red-400"
      : "border-gray-200 focus:ring-gold/40 focus:border-gold"
  }`;

const stepAnim = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.22 },
};

// ─── Category icons ───────────────────────────────────────────────────────────

function IconApparel() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}

function IconHomeTextile() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
      <path d="M2 11v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-4 0v1H6v-1a2 2 0 0 0-4 0z" />
    </svg>
  );
}

function IconFabric() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RFQContent() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RFQData>(INITIAL);
  const [techPackName, setTechPackName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLDivElement>(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function toggleCategory(cat: string) {
    setFormData((prev) => ({ ...prev, category: cat, productType: "", specifications: "" }));
    if (errors.category) setErrors((prev) => ({ ...prev, category: "" }));
  }

  function toggleCert(cert: string) {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setTechPackName(f.name);
  }

  // ── Validation ───────────────────────────────────────────────────────────────

  function validateStep1(): boolean {
    const e: Record<string, string> = {};
    if (!formData.name.trim())
      e.name = "Full name is required";
    if (!formData.jobTitle.trim())
      e.jobTitle = "Job title is required";
    if (!formData.company.trim())
      e.company = "Company name is required";
    if (!formData.email.trim())
      e.email = "Business email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      e.email = "Enter a valid email address (e.g. name@company.com)";
    if (!formData.phone.trim())
      e.phone = "Phone number is required";
    else if (formData.phone.replace(/\D/g, "").length < 7)
      e.phone = "Enter a valid phone number including country code";
    if (!formData.country)
      e.country = "Please select your country";
    setErrors(e);
    focusFirstError(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: Record<string, string> = {};
    if (!formData.category)
      e.category = "Please select a product category";
    if (formData.category && !formData.productType)
      e.productType = "Please select a product type";
    if (!formData.quantity.trim())
      e.quantity = "Quantity is required";
    setErrors(e);
    focusFirstError(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3(): boolean {
    const e: Record<string, string> = {};
    if (!formData.destinationCountry.trim())
      e.destinationCountry = "Destination country is required";
    if (formData.incoterm.startsWith("CIF") && !formData.portOfDestination.trim())
      e.portOfDestination = "Port of destination is required for CIF";
    if (!formData.deliveryDate)
      e.deliveryDate = "Required delivery date is required";
    else if (new Date(formData.deliveryDate) <= new Date())
      e.deliveryDate = "Delivery date must be in the future";
    setErrors(e);
    focusFirstError(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    const valid =
      step === 1 ? validateStep1() :
      step === 2 ? validateStep2() :
      step === 3 ? validateStep3() : true;
    if (valid) {
      setErrors({});
      setStep((s) => s + 1);
      scrollToForm();
    }
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
    scrollToForm();
  }

  // ── Mailto submission ─────────────────────────────────────────────────────────

  function handleSubmit() {
    const specConf = getSpecConfig(formData.category);
    const lines = [
      "RFQ SUBMISSION — MZ GLOBAL TRADING",
      "====================================",
      "",
      "CONTACT DETAILS",
      "---------------",
      `Name:          ${formData.name}`,
      `Job Title:     ${formData.jobTitle}`,
      `Company:       ${formData.company}`,
      `Email:         ${formData.email}`,
      `Phone:         ${formData.phone}`,
      `Country:       ${formData.country}`,
      "",
      "PRODUCT REQUIREMENTS",
      "--------------------",
      `Category:      ${formData.category}`,
      `Product Type:  ${formData.productType}`,
      `Composition:   ${formData.fabricComposition || "Not specified"}`,
      `GSM / Weight:  ${formData.gsm || "Not specified"}`,
      `${specConf.label.padEnd(14)} ${formData.specifications || "Not specified"}`,
      `Quantity:      ${formData.quantity}`,
      `Target Price:  ${formData.targetPrice ? `USD ${formData.targetPrice} per unit` : "To be discussed"}`,
      `Certifications:${formData.certifications.length > 0 ? " " + formData.certifications.join(", ") : " None specified"}`,
      `Samples:       ${formData.samplesRequired || "Not specified"}`,
      `Tech Pack:     ${techPackName ? `${techPackName} — please attach to this email` : "None — email separately if available"}`,
      "",
      "LOGISTICS & TIMELINE",
      "--------------------",
      `Destination:   ${formData.destinationCountry}`,
      `Incoterm:      ${formData.incoterm || "To be discussed"}`,
      ...(formData.incoterm.startsWith("CIF") ? [`Port:          ${formData.portOfDestination}`] : []),
      `Delivery Date: ${formData.deliveryDate}`,
      `Notes:         ${formData.notes || "None"}`,
      "",
      "====================================",
      "Submitted via mzglobaltrading.com/rfq/",
    ];

    const subject = encodeURIComponent(
      `[RFQ] ${formData.category} — ${formData.productType} — ${formData.company}`
    );
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
    setStatus("sent");
    scrollToForm();
  }

  // ── Step indicator ────────────────────────────────────────────────────────────

  const stepIndicator = (
    <div className="flex items-center mb-10">
      {STEPS.map((label, idx) => {
        const num = idx + 1;
        const done = num < step;
        const active = num === step;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                done || active ? "bg-gold text-navy-900" : "bg-gray-100 text-gray-400"
              }`}>
                {done ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : num}
              </div>
              <span className={`text-xs mt-1.5 hidden sm:block whitespace-nowrap transition-colors ${
                active ? "text-navy-900 font-semibold" : done ? "text-gold" : "text-gray-400"
              }`}>
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-5 sm:mb-[26px] transition-colors ${done ? "bg-gold" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Step 1 — Your Details ─────────────────────────────────────────────────────

  function renderStep1() {
    return (
      <motion.div key="step1" {...stepAnim}>
        <SectionLabel>Step 1 — Your Details</SectionLabel>
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="name" label="Full Name" required error={errors.name}>
              <input id="name" name="name" type="text" required autoComplete="name"
                aria-invalid={!!errors.name}
                placeholder="Jane Smith" value={formData.name} onChange={handleChange}
                className={ic(errors.name)} />
            </Field>
            <Field id="jobTitle" label="Job Title" required error={errors.jobTitle}>
              <input id="jobTitle" name="jobTitle" type="text" required
                aria-invalid={!!errors.jobTitle}
                placeholder="Procurement Manager" value={formData.jobTitle} onChange={handleChange}
                className={ic(errors.jobTitle)} />
            </Field>
          </div>
          <Field id="company" label="Company Name" required error={errors.company}>
            <input id="company" name="company" type="text" required autoComplete="organization"
              aria-invalid={!!errors.company}
              placeholder="Acme Retail Ltd." value={formData.company} onChange={handleChange}
              className={ic(errors.company)} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="email" label="Business Email" required error={errors.email}>
              <input id="email" name="email" type="email" required autoComplete="email"
                aria-invalid={!!errors.email}
                placeholder="jane@acmeretail.com" value={formData.email} onChange={handleChange}
                className={ic(errors.email)} />
            </Field>
            <Field id="phone" label="Phone Number" required error={errors.phone}>
              <input id="phone" name="phone" type="tel" required autoComplete="tel"
                aria-invalid={!!errors.phone}
                placeholder="+1 212 555 0100" value={formData.phone} onChange={handleChange}
                className={ic(errors.phone)} />
            </Field>
          </div>
          <Field id="country" label="Country" required error={errors.country}>
            <select id="country" name="country" required
              aria-invalid={!!errors.country}
              value={formData.country} onChange={handleChange} className={ic(errors.country)}>
              <option value="">Select your country…</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
      </motion.div>
    );
  }

  // ── Step 2 — Product Requirements ────────────────────────────────────────────

  function renderStep2() {
    const specConf = getSpecConfig(formData.category);
    const productTypes = getProductTypes(formData.category);

    const categories = [
      { id: "Apparel", icon: <IconApparel /> },
      { id: "Home Textiles", icon: <IconHomeTextile /> },
      { id: "Fabric", icon: <IconFabric /> },
    ];

    return (
      <motion.div key="step2" {...stepAnim}>
        <SectionLabel>Step 2 — Product Requirements</SectionLabel>
        <div className="space-y-6">

          <div>
            <p className="text-sm font-medium text-navy-900 mb-2">
              Product Category <span className="text-gold" aria-hidden="true">*</span>
            </p>
            <div className="grid grid-cols-3 gap-3">
              {categories.map(({ id, icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleCategory(id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
                    formData.category === id
                      ? "border-gold bg-gold/5 text-navy-900"
                      : errors.category
                        ? "border-red-300 hover:border-red-400 text-gray-500"
                        : "border-gray-200 hover:border-gray-300 text-gray-500"
                  }`}
                >
                  <span className={formData.category === id ? "text-gold" : "text-gray-400"}>
                    {icon}
                  </span>
                  <span className="text-xs font-semibold leading-tight">{id}</span>
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1" role="alert">
                <span aria-hidden="true">↑</span> {errors.category}
              </p>
            )}
          </div>

          {formData.category && (
            <Field id="productType" label="Product Type" required error={errors.productType}>
              <select id="productType" name="productType"
                aria-invalid={!!errors.productType}
                value={formData.productType} onChange={handleChange} className={ic(errors.productType)}>
                <option value="">Select product type…</option>
                {productTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="fabricComposition" label="Fabric Composition">
              <input id="fabricComposition" name="fabricComposition" type="text"
                placeholder="e.g. 100% Cotton, 60/40 Cotton-Polyester"
                value={formData.fabricComposition} onChange={handleChange} className={ic()} />
            </Field>
            <Field id="gsm" label="GSM / Weight">
              <input id="gsm" name="gsm" type="text"
                placeholder="e.g. 180gsm, 400gsm"
                value={formData.gsm} onChange={handleChange} className={ic()} />
            </Field>
          </div>

          <Field id="specifications" label={specConf.label}>
            <input id="specifications" name="specifications" type="text"
              placeholder={specConf.placeholder} disabled={!formData.category}
              value={formData.specifications} onChange={handleChange} className={ic()} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="quantity" label="Quantity Required" required error={errors.quantity}>
              <input id="quantity" name="quantity" type="text" required
                aria-invalid={!!errors.quantity}
                placeholder="e.g. 5,000 pieces, 500 sets, 200kg"
                value={formData.quantity} onChange={handleChange} className={ic(errors.quantity)} />
            </Field>
            <Field id="targetPrice" label="Target Price per Unit (USD)">
              <input id="targetPrice" name="targetPrice" type="text"
                placeholder="e.g. 3.50 — leave blank to discuss"
                value={formData.targetPrice} onChange={handleChange} className={ic()} />
            </Field>
          </div>

          <div>
            <p className="text-sm font-medium text-navy-900 mb-3">Certifications Required</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CERTIFICATIONS.map((cert) => {
                const checked = formData.certifications.includes(cert);
                return (
                  <label
                    key={cert}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors select-none ${
                      checked
                        ? "border-gold bg-gold/5 text-navy-900"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-[#D4A017] w-3.5 h-3.5 flex-shrink-0"
                      checked={checked}
                      onChange={() => toggleCert(cert)}
                    />
                    <span className="text-xs font-medium">{cert}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <Field id="samplesRequired" label="Samples Required">
            <select id="samplesRequired" name="samplesRequired"
              value={formData.samplesRequired} onChange={handleChange} className={ic()}>
              <option value="">Select…</option>
              <option value="Yes — before order confirmation">Yes — before order confirmation</option>
              <option value="Yes — after quotation">Yes — after quotation</option>
              <option value="No — proceed to production">No — proceed to production</option>
              <option value="To be discussed">To be discussed</option>
            </select>
          </Field>

          <div>
            <p className="text-sm font-medium text-navy-900 mb-1">
              Tech Pack / Spec Sheet{" "}
              <span className="text-gray-400 font-normal">(recommended)</span>
            </p>
            <label
              htmlFor="techpack"
              className={`flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed rounded-xl px-6 py-8 cursor-pointer transition-colors ${
                techPackName
                  ? "border-gold bg-gold/5"
                  : "border-gray-200 hover:border-gold/40 hover:bg-gray-50"
              }`}
            >
              {techPackName ? (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm font-medium text-navy-900">{techPackName}</span>
                  <span className="text-xs text-gray-400">Click to change</span>
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-sm text-gray-500">Click to select your file</span>
                  <span className="text-xs text-gray-400">PDF, Word, Excel, PNG, ZIP</span>
                </>
              )}
            </label>
            <input id="techpack" type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp,.zip"
              onChange={handleFileChange} className="hidden" />
            <p className="text-gray-400 text-xs mt-2">
              Your filename will be noted in the email. Attach the file directly when your email client opens.
            </p>
          </div>

        </div>
      </motion.div>
    );
  }

  // ── Step 3 — Logistics & Timeline ─────────────────────────────────────────────

  function renderStep3() {
    return (
      <motion.div key="step3" {...stepAnim}>
        <SectionLabel>Step 3 — Logistics &amp; Timeline</SectionLabel>
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="destinationCountry" label="Destination Country" required error={errors.destinationCountry}>
              <input id="destinationCountry" name="destinationCountry" type="text" required
                aria-invalid={!!errors.destinationCountry}
                placeholder="e.g. United States, Germany"
                value={formData.destinationCountry} onChange={handleChange}
                className={ic(errors.destinationCountry)} />
            </Field>
            <Field id="incoterm" label="Preferred Incoterm">
              <select id="incoterm" name="incoterm"
                value={formData.incoterm} onChange={handleChange} className={ic()}>
                <option value="">Select or discuss later…</option>
                {INCOTERMS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          {formData.incoterm.startsWith("CIF") && (
            <Field id="portOfDestination" label="Port of Destination" required error={errors.portOfDestination}>
              <input id="portOfDestination" name="portOfDestination" type="text" required
                aria-invalid={!!errors.portOfDestination}
                placeholder="e.g. Port of Los Angeles, Port of Hamburg, Felixstowe"
                value={formData.portOfDestination} onChange={handleChange}
                className={ic(errors.portOfDestination)} />
            </Field>
          )}

          <Field id="deliveryDate" label="Required Delivery Date" required error={errors.deliveryDate}>
            <input id="deliveryDate" name="deliveryDate" type="date" required
              aria-invalid={!!errors.deliveryDate}
              value={formData.deliveryDate} onChange={handleChange}
              className={ic(errors.deliveryDate)}
              min={new Date().toISOString().split("T")[0]} />
          </Field>

          <Field id="notes" label="Additional Requirements">
            <textarea id="notes" name="notes" rows={5}
              placeholder="Labelling requirements, packaging specs, brand guidelines, compliance notes, or anything else we should know…"
              value={formData.notes} onChange={handleChange}
              className={`${ic()} resize-none`} />
          </Field>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
            Review your details on the next step before your email client opens.
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Step 4 — Review ───────────────────────────────────────────────────────────

  function renderStep4() {
    const specConf = getSpecConfig(formData.category);
    return (
      <motion.div key="step4" {...stepAnim}>
        <SectionLabel>Step 4 — Review &amp; Submit</SectionLabel>
        <p className="text-gray-500 text-sm mb-7">
          Review your details below. Clicking <strong>Submit RFQ</strong> will open your default email app with everything pre-filled — just attach your tech pack if needed, then send.
        </p>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-navy-900 font-semibold text-sm">Your Details</h3>
              <button type="button" onClick={() => { setStep(1); scrollToForm(); }}
                className="text-gold text-xs hover:underline">Edit</button>
            </div>
            <div className="bg-gray-50 rounded-xl px-5 py-1">
              <ReviewRow label="Name" value={formData.name} />
              <ReviewRow label="Job Title" value={formData.jobTitle} />
              <ReviewRow label="Company" value={formData.company} />
              <ReviewRow label="Email" value={formData.email} />
              <ReviewRow label="Phone" value={formData.phone} />
              <ReviewRow label="Country" value={formData.country} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-navy-900 font-semibold text-sm">Product Requirements</h3>
              <button type="button" onClick={() => { setStep(2); scrollToForm(); }}
                className="text-gold text-xs hover:underline">Edit</button>
            </div>
            <div className="bg-gray-50 rounded-xl px-5 py-1">
              <ReviewRow label="Category" value={formData.category} />
              <ReviewRow label="Product Type" value={formData.productType} />
              <ReviewRow label="Fabric Composition" value={formData.fabricComposition} />
              <ReviewRow label="GSM / Weight" value={formData.gsm} />
              <ReviewRow label={specConf.label} value={formData.specifications} />
              <ReviewRow label="Quantity" value={formData.quantity} />
              <ReviewRow label="Target Price" value={formData.targetPrice ? `USD ${formData.targetPrice} / unit` : ""} />
              <ReviewRow label="Certifications" value={formData.certifications.join(", ")} />
              <ReviewRow label="Samples" value={formData.samplesRequired} />
              <ReviewRow label="Tech Pack" value={techPackName || "None selected"} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-navy-900 font-semibold text-sm">Logistics &amp; Timeline</h3>
              <button type="button" onClick={() => { setStep(3); scrollToForm(); }}
                className="text-gold text-xs hover:underline">Edit</button>
            </div>
            <div className="bg-gray-50 rounded-xl px-5 py-1">
              <ReviewRow label="Destination" value={formData.destinationCountry} />
              <ReviewRow label="Incoterm" value={formData.incoterm} />
              {formData.incoterm.startsWith("CIF") && (
                <ReviewRow label="Port of Destination" value={formData.portOfDestination} />
              )}
              <ReviewRow label="Delivery Date" value={formData.deliveryDate} />
              <ReviewRow label="Notes" value={formData.notes} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Sent confirmation ─────────────────────────────────────────────────────────

  if (status === "sent") {
    return (
      <>
        <PageHero
          image="/images/hero/hero-about.webp"
          imageAlt="MZ Global Trading — request a quote for B2B textile sourcing from Pakistan"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
          label="Request a Quote"
          title="Start Your"
          titleGold="Sourcing Request"
          description="Your email client has been opened with your RFQ pre-filled."
          pills={["Response Within 3–5 Business Days", "No Obligation", "All Categories"]}
        />
        <div className="bg-gray-50 py-20">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-navy-900 font-bold text-2xl mb-3">Almost done</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Your email app should now be open with your RFQ pre-filled and addressed to{" "}
                <strong>info@mzglobaltrading.com</strong>.
                {techPackName && (
                  <> Please attach <strong>{techPackName}</strong> before sending.</>
                )}{" "}
                Review the email and click <strong>Send</strong> to submit your request.
              </p>
              <div className="bg-gold/8 border border-gold/20 rounded-xl p-4 text-sm text-gray-700 mb-7 text-left">
                <strong className="text-navy-900">Email did not open?</strong> Compose an email to{" "}
                <a href={`mailto:${RECIPIENT}`} className="text-gold hover:underline font-medium">
                  {RECIPIENT}
                </a>{" "}
                with your requirements, or{" "}
                <button
                  type="button"
                  onClick={() => { setStatus("idle"); setStep(4); scrollToForm(); }}
                  className="text-gold hover:underline font-medium"
                >
                  go back and try again
                </button>
                .
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────────

  return (
    <>
      <PageHero
        image="/images/hero/hero-about.webp"
        imageAlt="MZ Global Trading — request a quote for B2B textile sourcing from Pakistan"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
        label="Request a Quote"
        title="Start Your"
        titleGold="Sourcing Request"
        description="Tell us what you need — product type, quantity, certifications, and timeline. We match your requirements with the right factory and respond within 3–5 business days."
        pills={["Response Within 3–5 Business Days", "No Obligation", "All Categories"]}
      />

      <section className="bg-gray-50 py-14 sm:py-20" ref={formRef}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {stepIndicator}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-7 py-8 sm:px-10 sm:py-10">
            <AnimatePresence mode="wait">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
            </AnimatePresence>

            <div className={`flex items-center mt-8 pt-6 border-t border-gray-100 ${step > 1 ? "justify-between" : "justify-end"}`}>
              {step > 1 && (
                <button type="button" onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:border-gray-300 hover:text-navy-900 transition-colors">
                  ← Back
                </button>
              )}
              {step < 4 ? (
                <button type="button" onClick={handleNext}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">
                  Next →
                </button>
              ) : (
                <button type="button" onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-navy-900 font-bold text-sm rounded-lg hover:bg-yellow-400 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Submit RFQ — Open Email
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs mt-5">
            Step {step} of {STEPS.length} · Submitting opens your email app with all details pre-filled.
          </p>
        </div>
      </section>

      {/* ── What happens next ─────────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">After You Submit</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">What happens next?</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 relative">
            <div className="absolute top-7 left-[20%] right-[20%] h-0.5 bg-gray-100 hidden sm:block" aria-hidden="true" />
            {[
              {
                step: "01",
                title: "Requirements Review",
                time: "1–3 Business Days",
                description: "Our sourcing team reviews your submission in detail and identifies suitable factories from our vetted network. We may reach out for clarification if required.",
              },
              {
                step: "02",
                title: "Quote or Clarifications",
                time: "3–5 Business Days",
                description: "Once requirements are confirmed, we provide an initial quotation covering factory profile, unit pricing, MOQ, lead times, and payment terms.",
              },
              {
                step: "03",
                title: "Samples",
                time: "Upon Confirmation",
                description: "Pre-production samples are arranged once the quotation is accepted. Sample costs and courier charges are borne by the buyer and credited against the confirmed order.",
              },
            ].map(({ step: s, title, time, description }) => (
              <div key={s} className="flex flex-col items-center text-center relative">
                <div className="w-14 h-14 rounded-full bg-navy-900 flex items-center justify-center mb-5 relative z-10">
                  <span className="text-gold font-bold text-sm">{s}</span>
                </div>
                <p className="text-xs text-gold font-semibold tracking-wider uppercase mb-1">{time}</p>
                <h3 className="text-navy-900 font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
