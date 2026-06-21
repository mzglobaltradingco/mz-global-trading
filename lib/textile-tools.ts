// Textile Tools Calculator — single source of truth for all tool definitions.
// Each tool is pure data + pure functions so the UI stays fully data-driven.

export type StatusTone = "ok" | "check" | "fail";
export type BarColor = "gold" | "navy" | "green" | "red" | "amber" | "blue";
export type UnitGroupId = "length" | "weight" | "area" | "volume" | "yarn";
export type Values = Record<string, number>;

export interface Metric {
  label: string;
  value: string;
}

export interface ChartBar {
  label: string;
  value: number;
  color: BarColor;
  suffix?: string;
}

export interface ChartDef {
  title: string;
  note?: string;
  bars: ChartBar[];
  max?: number;
}

export interface ToolField {
  id: string;
  label: string;
  unit?: string;
  def: number;
  help: string;
  group?: UnitGroupId;
  allowNeg?: boolean;
}

export interface ToolDef {
  phase: string;
  blurb: string;
  resultLabel: string;
  resultUnit: string;
  resultGroup?: UnitGroupId;
  formula: string;
  note: string;
  fields: ToolField[];
  calc: (v: Values) => number;
  display?: (v: Values, r: number) => string;
  detail?: (v: Values, r: number) => string;
  metrics?: (v: Values, r: number) => Metric[];
  chart?: (v: Values, r: number) => ChartDef | null;
  status?: (v: Values, r: number) => [string, StatusTone];
  validate?: (v: Values) => string;
  isNew?: boolean;
}

export interface Phase {
  id: string;
  label: string;
  short: string;
  role: string;
  desc: string;
}

// ─── Formatting ───────────────────────────────────────────────────────────────

export function fmt(num: number): string {
  if (!isFinite(num)) return "—";
  const abs = Math.abs(num);
  return num.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: abs < 10 && num % 1 !== 0 ? 2 : 0,
  });
}

// ─── Unit conversion groups ───────────────────────────────────────────────────

export interface UnitGroup {
  base: string;
  units: string[];
  toBase: (v: number, u: string) => number;
  fromBase: (v: number, u: string) => number;
}

export const UNIT_GROUPS: Record<UnitGroupId, UnitGroup> = {
  length: {
    base: "m",
    units: ["mm", "cm", "m", "inch", "ft", "yd"],
    toBase: (v, u) =>
      u === "mm" ? v / 1000 : u === "cm" ? v / 100 : u === "inch" ? v * 0.0254 : u === "ft" ? v * 0.3048 : u === "yd" ? v * 0.9144 : v,
    fromBase: (v, u) =>
      u === "mm" ? v * 1000 : u === "cm" ? v * 100 : u === "inch" ? v / 0.0254 : u === "ft" ? v / 0.3048 : u === "yd" ? v / 0.9144 : v,
  },
  weight: {
    base: "kg",
    units: ["g", "kg", "lb", "oz"],
    toBase: (v, u) => (u === "g" ? v / 1000 : u === "lb" ? v * 0.45359237 : u === "oz" ? v * 0.0283495231 : v),
    fromBase: (v, u) => (u === "g" ? v * 1000 : u === "lb" ? v / 0.45359237 : u === "oz" ? v / 0.0283495231 : v),
  },
  area: {
    base: "m2",
    units: ["cm2", "m2", "inch2", "yd2"],
    toBase: (v, u) => (u === "cm2" ? v / 10000 : u === "inch2" ? v * 0.00064516 : u === "yd2" ? v * 0.83612736 : v),
    fromBase: (v, u) => (u === "cm2" ? v * 10000 : u === "inch2" ? v / 0.00064516 : u === "yd2" ? v / 0.83612736 : v),
  },
  volume: {
    base: "CBM",
    units: ["CBM", "CFT"],
    toBase: (v, u) => (u === "CFT" ? v / 35.3146667 : v),
    fromBase: (v, u) => (u === "CFT" ? v * 35.3146667 : v),
  },
  yarn: {
    base: "tex",
    units: ["tex", "denier", "Ne", "Nm"],
    toBase: (v, u) => (u === "denier" ? v / 9 : u === "Ne" ? 590.5 / v : u === "Nm" ? 1000 / v : v),
    fromBase: (v, u) => (u === "denier" ? v * 9 : u === "Ne" ? 590.5 / v : u === "Nm" ? 1000 / v : v),
  },
};

export const CONVERTER_UNITS = ["mm", "cm", "m", "inch", "ft", "yd", "g", "kg", "lb", "oz", "CBM", "CFT", "tex", "denier", "Ne", "Nm"];

export function groupForUnit(unit: string): UnitGroupId | "" {
  const ids: UnitGroupId[] = ["length", "weight", "area", "volume", "yarn"];
  for (const id of ids) if (UNIT_GROUPS[id].units.includes(unit)) return id;
  return "";
}

// ─── Phases ───────────────────────────────────────────────────────────────────

export const PHASES: Phase[] = [
  { id: "business", label: "Business & Costing", short: "Business", role: "Owners & Directors", desc: "Order value, margin, break-even and risk — the numbers behind every order sheet." },
  { id: "merchandising", label: "Merchandising", short: "Merchandising", role: "Merchandisers", desc: "Fabric booking, lead-time planning, CM costing and price ladders." },
  { id: "yarn", label: "Spinning & Yarn", short: "Yarn", role: "Spinning Experts", desc: "Count conversion, twist, strength, blends and yarn store maths." },
  { id: "fabric", label: "Fabric Development", short: "Fabric", role: "Knitting & Weaving", desc: "GSM, thread count, cover factor, loom output and warp planning." },
  { id: "processing", label: "Dyeing & Finishing", short: "Dyeing", role: "Processing Teams", desc: "Shrinkage, dye-house loss, recipes, liquor ratio and process cost." },
  { id: "production", label: "Cutting & Sewing", short: "Production", role: "Production & IE", desc: "Consumption, markers, SMV, labour cost and line capacity." },
  { id: "qa", label: "Quality Control", short: "QA / QC", role: "QA Inspectors", desc: "AQL, DHU, 4-point inspection, tolerances and the cost of poor quality." },
  { id: "packing", label: "Packing", short: "Packing", role: "Packing Teams", desc: "Carton capacity, weights, polybags, rolls and pack ratios." },
  { id: "logistics", label: "Shipping & Logistics", short: "Logistics", role: "Export & Shipping", desc: "CBM, container fit, chargeable weight, freight and landed cost." },
];

// ─── Shared calculation helpers ───────────────────────────────────────────────

function f(id: string, label: string, unit: string, def: number, help: string, group?: UnitGroupId, allowNeg?: boolean): ToolField {
  return { id, label, unit: unit || undefined, def, help, group, allowNeg };
}

function orderCostData(v: Values) {
  const fabricReq = v.qty * v.cons * (1 + v.waste / 100);
  const material = fabricReq * v.rate;
  const processCost = v.qty * v.process;
  const packingCost = v.qty * v.packing;
  const totalCost = material + processCost + packingCost;
  const marginValue = (totalCost * v.margin) / 100;
  const sellingTotal = totalCost + marginValue;
  return { fabricReq, material, processCost, packingCost, totalCost, marginValue, sellingTotal, sellingUnit: sellingTotal / v.qty };
}

function fabricBookingData(v: Values) {
  const net = v.qty * v.cons;
  const shrinkAdd = (net * v.shrink) / 100;
  const wasteAdd = (net * v.waste) / 100;
  const total = net + shrinkAdd + wasteAdd;
  return { net, shrinkAdd, wasteAdd, total, value: total * v.rate };
}

function packingShipmentData(v: Values) {
  const cartons = Math.ceil(v.qty / v.per);
  const cbm = v.length * v.width * v.height * cartons;
  return { cartons, cbm, grossWeight: cartons * v.gross, ft20: (cbm / 28) * 100, ft40: (cbm / 58) * 100, hqUse: (cbm / 68) * 100 };
}

function productionData(v: Values) {
  const availableMinutes = (v.operators * v.hours * 60 * v.eff) / 100;
  const daily = availableMinutes / v.smv;
  return { availableMinutes, daily, days: Math.ceil(v.qty / daily), perOperator: daily / v.operators };
}

function profitImpactData(v: Values) {
  const sellingValue = v.qty * v.sell;
  const grossProfit = (v.sell - v.cost) * v.qty;
  const rejectedUnits = (v.qty * v.reject) / 100;
  const netLoss = rejectedUnits * v.cost * (1 - v.recovery / 100);
  const revisedProfit = grossProfit - netLoss;
  return { sellingValue, grossProfit, rejectedUnits, netLoss, revisedProfit, revisedMargin: sellingValue ? (revisedProfit / sellingValue) * 100 : 0 };
}

function landedData(v: Values) {
  const dutyUnit = (v.fob * v.duty) / 100;
  const freightUnit = v.freight / v.qty;
  const clearUnit = v.clearance / v.qty;
  const landed = v.fob + dutyUnit + freightUnit + clearUnit;
  return { dutyUnit, freightUnit, clearUnit, landed, uplift: ((landed - v.fob) / v.fob) * 100 };
}

function copqData(v: Values) {
  const rejectLoss = (v.qty * v.reject) / 100 * v.cost;
  const reworkLoss = (v.qty * v.rework) / 100 * v.reworkCost;
  const copq = rejectLoss + reworkLoss;
  const revenue = v.qty * v.sell;
  return { rejectLoss, reworkLoss, copq, share: revenue ? (copq / revenue) * 100 : 0 };
}

// ─── Tool definitions ─────────────────────────────────────────────────────────

// ─── ISO 2859-1 AQL lookup (Table I + Table II-A) ────────────────────────────

const AQL_CODE_DATA: Record<string, { n: number; acre: Record<string, [number, number]> }> = {
  A: { n: 2,    acre: { "1.0": [0,1], "1.5": [0,1], "2.5": [0,1], "4.0": [0,1], "6.5": [0,1] } },
  B: { n: 3,    acre: { "1.0": [0,1], "1.5": [0,1], "2.5": [0,1], "4.0": [0,1], "6.5": [0,1] } },
  C: { n: 5,    acre: { "1.0": [0,1], "1.5": [0,1], "2.5": [0,1], "4.0": [0,1], "6.5": [1,2] } },
  D: { n: 8,    acre: { "1.0": [0,1], "1.5": [0,1], "2.5": [0,1], "4.0": [1,2], "6.5": [1,2] } },
  E: { n: 13,   acre: { "1.0": [0,1], "1.5": [0,1], "2.5": [1,2], "4.0": [1,2], "6.5": [2,3] } },
  F: { n: 20,   acre: { "1.0": [0,1], "1.5": [1,2], "2.5": [1,2], "4.0": [2,3], "6.5": [3,4] } },
  G: { n: 32,   acre: { "1.0": [1,2], "1.5": [1,2], "2.5": [2,3], "4.0": [3,4], "6.5": [5,6] } },
  H: { n: 50,   acre: { "1.0": [1,2], "1.5": [2,3], "2.5": [3,4], "4.0": [5,6], "6.5": [7,8] } },
  J: { n: 80,   acre: { "1.0": [2,3], "1.5": [3,4], "2.5": [5,6], "4.0": [7,8], "6.5": [10,11] } },
  K: { n: 125,  acre: { "1.0": [3,4], "1.5": [5,6], "2.5": [7,8], "4.0": [10,11], "6.5": [14,15] } },
  L: { n: 200,  acre: { "1.0": [5,6], "1.5": [7,8], "2.5": [10,11], "4.0": [14,15], "6.5": [21,22] } },
  M: { n: 315,  acre: { "1.0": [7,8], "1.5": [10,11], "2.5": [14,15], "4.0": [21,22], "6.5": [21,22] } },
  N: { n: 500,  acre: { "1.0": [10,11], "1.5": [14,15], "2.5": [21,22], "4.0": [21,22], "6.5": [21,22] } },
  P: { n: 800,  acre: { "1.0": [14,15], "1.5": [21,22], "2.5": [21,22], "4.0": [21,22], "6.5": [21,22] } },
  Q: { n: 1250, acre: { "1.0": [21,22], "1.5": [21,22], "2.5": [21,22], "4.0": [21,22], "6.5": [21,22] } },
  R: { n: 2000, acre: { "1.0": [21,22], "1.5": [21,22], "2.5": [21,22], "4.0": [21,22], "6.5": [21,22] } },
};

const AQL_LOT_TABLE: [number, string[]][] = [
  [8,        ["A","A","B"]],
  [15,       ["A","B","C"]],
  [25,       ["B","C","D"]],
  [50,       ["C","D","E"]],
  [90,       ["C","E","F"]],
  [150,      ["D","F","G"]],
  [280,      ["E","G","H"]],
  [500,      ["F","H","J"]],
  [1200,     ["G","J","K"]],
  [3200,     ["H","K","L"]],
  [10000,    ["J","L","M"]],
  [35000,    ["K","M","N"]],
  [150000,   ["L","N","P"]],
  [500000,   ["M","P","Q"]],
  [Infinity, ["N","Q","R"]],
];

function aqlLookup(lot: number, aqlLevel: number, inspLevel: number) {
  const lvl = Math.min(Math.max(Math.round(inspLevel), 1), 3) - 1;
  const row = AQL_LOT_TABLE.find(([max]) => lot <= max);
  if (!row) return null;
  const code = row[1][lvl];
  const codeData = AQL_CODE_DATA[code];
  if (!codeData) return null;
  const stdLevels = [1.0, 1.5, 2.5, 4.0, 6.5];
  const closest = stdLevels.reduce((a, b) => (Math.abs(b - aqlLevel) < Math.abs(a - aqlLevel) ? b : a));
  const aqlKey = closest.toFixed(1);
  return { code, n: codeData.n, acRe: codeData.acre[aqlKey] ?? null, aqlKey };
}

export const TOOLS: Record<string, ToolDef> = {
  // ════════ BUSINESS & COSTING ════════
  "Order Costing Dashboard": {
    phase: "business",
    blurb: "Fabric, process, packing and margin in one quote",
    resultLabel: "Selling Target",
    resultUnit: "per unit",
    formula: "Selling target = total cost × (1 + margin%) ÷ quantity",
    note: "Use for quotation planning when fabric, process and packing costs are known. Keep all cost inputs in the same currency.",
    fields: [
      f("qty", "Order quantity", "pcs", 5000, "Confirmed or planned order quantity."),
      f("cons", "Fabric consumption / unit", "m", 1.25, "Approved or estimated consumption.", "length"),
      f("waste", "Fabric wastage", "%", 4, "Cutting and process allowance."),
      f("rate", "Fabric rate / m", "USD", 2.4, "Fabric price per metre."),
      f("process", "Process cost / unit", "USD", 0.65, "Cut, sew, dye, finish or making cost."),
      f("packing", "Packing cost / unit", "USD", 0.18, "Polybag, carton and packing material."),
      f("margin", "Target margin", "%", 15, "Commercial margin on total cost."),
    ],
    calc: (v) => orderCostData(v).sellingUnit,
    detail: (v) => {
      const d = orderCostData(v);
      return `Fabric required: ${fmt(d.fabricReq)} m. Total cost: ${fmt(d.totalCost)}. Selling target: ${fmt(d.sellingTotal)}.`;
    },
    metrics: (v) => {
      const d = orderCostData(v);
      return [
        { label: "Fabric required", value: `${fmt(d.fabricReq)} m` },
        { label: "Material cost", value: fmt(d.material) },
        { label: "Process cost", value: fmt(d.processCost) },
        { label: "Packing cost", value: fmt(d.packingCost) },
        { label: "Total cost", value: fmt(d.totalCost) },
        { label: "Selling total", value: fmt(d.sellingTotal) },
      ];
    },
    chart: (v) => {
      const d = orderCostData(v);
      return {
        title: "Cost Breakdown",
        note: "Shows which cost head is driving the quote.",
        bars: [
          { label: "Material", value: d.material, color: "green" },
          { label: "Process", value: d.processCost, color: "blue" },
          { label: "Packing", value: d.packingCost, color: "gold" },
          { label: "Margin", value: d.marginValue, color: "amber" },
        ],
      };
    },
  },
  "Break-Even Quantity": {
    phase: "business",
    blurb: "Minimum pieces before an order makes money",
    resultLabel: "Break-Even Point",
    resultUnit: "pcs",
    formula: "Break-even = fixed costs ÷ (selling price − variable cost per unit)",
    note: "Fixed costs include sampling, lab dips, tooling, certifications and dedicated overheads for this order or program.",
    isNew: true,
    fields: [
      f("fixed", "Fixed costs", "USD", 3500, "Sampling, approvals, setup and order-specific overheads."),
      f("sell", "Selling price / unit", "USD", 5.1, "Agreed or target FOB price."),
      f("varcost", "Variable cost / unit", "USD", 4.2, "Material + process + packing per unit."),
    ],
    calc: (v) => v.fixed / (v.sell - v.varcost),
    validate: (v) => (v.sell <= v.varcost ? "Selling price must be higher than the variable cost — there is no break-even point at these numbers." : ""),
    detail: (v, r) => `Every unit above ${fmt(Math.ceil(r))} pcs contributes ${fmt(v.sell - v.varcost)} to profit.`,
    metrics: (v, r) => [
      { label: "Contribution / unit", value: fmt(v.sell - v.varcost) },
      { label: "Break-even units", value: fmt(Math.ceil(r)) },
      { label: "Break-even revenue", value: fmt(Math.ceil(r) * v.sell) },
    ],
  },
  "Payment Terms Cost": {
    phase: "business",
    blurb: "What 30/60/90-day credit really costs you",
    resultLabel: "Financing Cost",
    resultUnit: "USD",
    formula: "Cost = order value × annual rate% × credit days ÷ 365",
    note: "Use your real working-capital or LC discounting rate. Compare against an early-payment discount before agreeing to longer terms.",
    isNew: true,
    fields: [
      f("value", "Order value", "USD", 50000, "Total invoice value."),
      f("rate", "Annual finance rate", "%", 22, "Bank markup / working capital rate."),
      f("days", "Credit days", "days", 60, "Days from shipment to payment receipt."),
    ],
    calc: (v) => (v.value * (v.rate / 100) * v.days) / 365,
    detail: (v, r) => `This is ${fmt((r / v.value) * 100)}% of the order value — price it into the quote or negotiate shorter terms.`,
    metrics: (v, r) => [
      { label: "Cost of credit", value: fmt(r) },
      { label: "% of order value", value: `${fmt((r / v.value) * 100)}%` },
      { label: "Cost per 30 days", value: fmt((v.value * (v.rate / 100) * 30) / 365) },
    ],
    chart: (v) => ({
      title: "Financing Cost by Terms",
      note: "The same order at 30 / 60 / 90 / 120 day terms.",
      bars: [
        { label: "30 days", value: (v.value * (v.rate / 100) * 30) / 365, color: "green" },
        { label: "60 days", value: (v.value * (v.rate / 100) * 60) / 365, color: "gold" },
        { label: "90 days", value: (v.value * (v.rate / 100) * 90) / 365, color: "amber" },
        { label: "120 days", value: (v.value * (v.rate / 100) * 120) / 365, color: "red" },
      ],
    }),
  },
  "Currency Impact Calculator": {
    phase: "business",
    blurb: "Exchange-rate movement vs your quoted margin",
    resultLabel: "Gain / Loss",
    resultUnit: "local currency",
    formula: "Impact = order value (USD) × (settlement rate − quoted rate)",
    note: "Positive result = currency gain, negative = loss. If the local currency strengthens after quoting, your margin shrinks in local terms.",
    isNew: true,
    fields: [
      f("value", "Order value", "USD", 50000, "Invoice value in USD."),
      f("quoted", "Rate when quoted", "", 278, "Local currency per USD on quote date."),
      f("settle", "Rate at settlement", "", 282, "Expected or actual rate at payment."),
    ],
    calc: (v) => v.value * (v.settle - v.quoted),
    detail: (v, r) => `${fmt(((v.settle - v.quoted) / v.quoted) * 100)}% rate movement = ${r >= 0 ? "gain" : "loss"} of ${fmt(Math.abs(r))} in local currency.`,
    status: (v, r) => (r >= 0 ? ["GAIN", "ok"] : Math.abs(r) / (v.value * v.quoted) > 0.03 ? ["LOSS", "fail"] : ["LOSS", "check"]),
    metrics: (v) => [
      { label: "Value at quoted rate", value: fmt(v.value * v.quoted) },
      { label: "Value at settlement", value: fmt(v.value * v.settle) },
      { label: "Rate movement", value: `${fmt(((v.settle - v.quoted) / v.quoted) * 100)}%` },
    ],
  },
  "Claim & Discount Impact": {
    phase: "business",
    blurb: "Revised margin after a buyer claim or discount",
    resultLabel: "Revised Margin",
    resultUnit: "%",
    formula: "Revised margin = original margin% − claim% of order value",
    note: "Use before accepting a claim or a late-delivery discount. Compare the claim against air-freight or re-work alternatives.",
    isNew: true,
    fields: [
      f("value", "Order value", "USD", 50000, "Total invoice value."),
      f("margin", "Original margin", "%", 15, "Planned margin on this order."),
      f("claim", "Claim / discount", "%", 5, "Buyer claim or discount as % of order value."),
    ],
    calc: (v) => v.margin - v.claim,
    status: (v, r) => (r >= 10 ? ["HEALTHY", "ok"] : r >= 0 ? ["THIN", "check"] : ["LOSS-MAKING", "fail"]),
    detail: (v, r) => `Profit drops from ${fmt((v.value * v.margin) / 100)} to ${fmt((v.value * r) / 100)}.`,
    metrics: (v, r) => [
      { label: "Original profit", value: fmt((v.value * v.margin) / 100) },
      { label: "Claim value", value: fmt((v.value * v.claim) / 100) },
      { label: "Revised profit", value: fmt((v.value * r) / 100) },
    ],
    chart: (v, r) => ({
      title: "Margin Before and After",
      bars: [
        { label: "Original", value: v.margin, color: "green", suffix: "%" },
        { label: "Claim", value: v.claim, color: "red", suffix: "%" },
        { label: "Revised", value: Math.max(r, 0), color: r >= 0 ? "gold" : "red", suffix: "%" },
      ],
    }),
  },
  "Profit & Rejection Impact": {
    phase: "business",
    blurb: "How rejection and rework eat the order margin",
    resultLabel: "Revised Margin",
    resultUnit: "%",
    formula: "Revised margin = (gross profit − net rejection loss) ÷ selling value × 100",
    note: "Use to see whether rejection, repair and recovery are damaging the commercial margin before shipment closure.",
    fields: [
      f("qty", "Order quantity", "pcs", 5000, "Order quantity."),
      f("cost", "Cost / unit", "USD", 4.2, "Total cost per unit."),
      f("sell", "Selling price / unit", "USD", 5.1, "Selling price per unit."),
      f("reject", "Rejected quantity", "%", 2, "Rejected or downgraded percentage."),
      f("recovery", "Recovery", "%", 40, "Expected recovery from repair, rework or resale."),
    ],
    calc: (v) => profitImpactData(v).revisedMargin,
    status: (v, r) => (r >= 10 ? ["OK", "ok"] : r >= 0 ? ["CHECK", "check"] : ["FAIL", "fail"]),
    detail: (v) => {
      const d = profitImpactData(v);
      return `Gross profit: ${fmt(d.grossProfit)}. Net rejection loss: ${fmt(d.netLoss)}. Revised profit: ${fmt(d.revisedProfit)}.`;
    },
    metrics: (v) => {
      const d = profitImpactData(v);
      return [
        { label: "Gross profit", value: fmt(d.grossProfit) },
        { label: "Rejected units", value: fmt(d.rejectedUnits) },
        { label: "Net rejection loss", value: fmt(d.netLoss) },
        { label: "Revised profit", value: fmt(d.revisedProfit) },
      ];
    },
    chart: (v) => {
      const d = profitImpactData(v);
      return {
        title: "Profit Impact",
        note: "Shows how rejection loss reduces the expected order profit.",
        bars: [
          { label: "Profit", value: Math.max(d.grossProfit, 0), color: "green" },
          { label: "Loss", value: Math.max(d.netLoss, 0), color: "red" },
          { label: "Revised", value: Math.max(d.revisedProfit, 0), color: "blue" },
        ],
      };
    },
  },
  "Cost Per Unit Calculator": {
    phase: "business",
    blurb: "Material + process + packing + overhead",
    resultLabel: "Unit Cost",
    resultUnit: "per unit",
    formula: "Unit cost = (material + process + packing) × (1 + overhead%)",
    note: "Use the same currency across all fields. Overhead should reflect your real factory loading, not a guess.",
    fields: [
      f("material", "Material cost", "USD", 2.4, "Fabric, yarn and trims."),
      f("process", "Process cost", "USD", 0.65, "Cut, sew, dye, finish."),
      f("packing", "Packing cost", "USD", 0.18, "Packing materials."),
      f("overhead", "Overhead", "%", 18, "Overhead and admin loading."),
    ],
    calc: (v) => (v.material + v.process + v.packing) * (1 + v.overhead / 100),
    metrics: (v) => [
      { label: "Material", value: fmt(v.material) },
      { label: "Process", value: fmt(v.process) },
      { label: "Packing", value: fmt(v.packing) },
      { label: "Overhead value", value: fmt(((v.material + v.process + v.packing) * v.overhead) / 100) },
    ],
    chart: (v) => ({
      title: "Unit Cost Breakdown",
      bars: [
        { label: "Material", value: v.material, color: "green" },
        { label: "Process", value: v.process, color: "blue" },
        { label: "Packing", value: v.packing, color: "gold" },
        { label: "Overhead", value: ((v.material + v.process + v.packing) * v.overhead) / 100, color: "amber" },
      ],
    }),
  },

  // ════════ MERCHANDISING ════════
  "Fabric Booking Dashboard": {
    phase: "merchandising",
    blurb: "Net + shrinkage + wastage = booking quantity",
    resultLabel: "Total Booking",
    resultUnit: "m",
    resultGroup: "length",
    formula: "Booking = quantity × consumption × (1 + shrinkage% + wastage%)",
    note: "Use for fabric reservation before bulk. Final booking should follow approved marker, shrinkage report and factory wastage history.",
    fields: [
      f("qty", "Order quantity", "pcs", 5000, "Order quantity."),
      f("cons", "Consumption / unit", "m", 1.25, "Fabric per piece or unit.", "length"),
      f("shrink", "Shrinkage allowance", "%", 3, "Process shrinkage allowance."),
      f("waste", "Wastage allowance", "%", 4, "Cutting, defect and process wastage."),
      f("rate", "Fabric rate / m", "USD", 2.4, "Optional costing rate per metre."),
    ],
    calc: (v) => fabricBookingData(v).total,
    detail: (v) => {
      const d = fabricBookingData(v);
      return `Net fabric: ${fmt(d.net)} m. Allowance added: ${fmt(d.shrinkAdd + d.wasteAdd)} m. Estimated value: ${fmt(d.value)}.`;
    },
    metrics: (v) => {
      const d = fabricBookingData(v);
      return [
        { label: "Net fabric", value: `${fmt(d.net)} m` },
        { label: "Shrinkage add", value: `${fmt(d.shrinkAdd)} m` },
        { label: "Wastage add", value: `${fmt(d.wasteAdd)} m` },
        { label: "Fabric value", value: fmt(d.value) },
      ];
    },
    chart: (v) => {
      const d = fabricBookingData(v);
      return {
        title: "Fabric Booking Build-Up",
        bars: [
          { label: "Net", value: d.net, color: "green" },
          { label: "Shrink", value: d.shrinkAdd, color: "gold" },
          { label: "Waste", value: d.wasteAdd, color: "amber" },
        ],
      };
    },
  },
  "Lead Time (TNA) Planner": {
    phase: "merchandising",
    blurb: "Will the order ship on time? Stage-by-stage check",
    resultLabel: "Days Required",
    resultUnit: "days",
    formula: "Required days = sampling + fabric + production + finishing/packing + buffer",
    note: "Compare against the days available between order confirmation and the agreed ship date. Buffer of 5–7 days is realistic for first orders.",
    isNew: true,
    fields: [
      f("available", "Days available", "days", 75, "Order confirmation to agreed ship date."),
      f("sampling", "Sampling & approvals", "days", 12, "PP sample and approvals."),
      f("fabricDays", "Fabric in-house", "days", 25, "Greige, dyeing, finishing, delivery."),
      f("prodDays", "Cutting to sewing", "days", 20, "Bulk production days."),
      f("packDays", "Finishing & packing", "days", 7, "Final QC, pressing, packing."),
      f("buffer", "Buffer", "days", 5, "Contingency for approvals and rework."),
    ],
    calc: (v) => v.sampling + v.fabricDays + v.prodDays + v.packDays + v.buffer,
    status: (v, r) => (r <= v.available - 3 ? ["ON TIME", "ok"] : r <= v.available ? ["TIGHT", "check"] : ["WILL DELAY", "fail"]),
    detail: (v, r) => {
      const slack = v.available - r;
      return slack >= 0 ? `${fmt(slack)} day(s) of slack remain in the critical path.` : `Plan exceeds the ship date by ${fmt(-slack)} day(s) — re-sequence or negotiate.`;
    },
    metrics: (v, r) => [
      { label: "Days available", value: fmt(v.available) },
      { label: "Days required", value: fmt(r) },
      { label: "Slack / overrun", value: fmt(v.available - r) },
    ],
    chart: (v) => ({
      title: "Critical Path by Stage",
      note: "The longest bars are where compression buys the most time.",
      bars: [
        { label: "Sampling", value: v.sampling, color: "blue" },
        { label: "Fabric", value: v.fabricDays, color: "gold" },
        { label: "Production", value: v.prodDays, color: "green" },
        { label: "Packing", value: v.packDays, color: "navy" },
        { label: "Buffer", value: v.buffer, color: "amber" },
      ],
    }),
  },
  "CM (Cost of Making) Calculator": {
    phase: "merchandising",
    blurb: "Sewing line cost per garment",
    resultLabel: "CM",
    resultUnit: "per unit",
    formula: "CM = daily line cost ÷ daily line output × (1 + overhead%)",
    note: "Daily line cost should include operator wages, helpers, line supervision and allocated utilities for one line.",
    isNew: true,
    fields: [
      f("lineCost", "Daily line cost", "USD", 320, "All-in cost of running the line for one day."),
      f("output", "Daily line output", "pcs", 850, "Realistic output at current efficiency."),
      f("overhead", "Factory overhead", "%", 15, "Admin, compliance and building loading."),
    ],
    calc: (v) => (v.lineCost / v.output) * (1 + v.overhead / 100),
    metrics: (v, r) => [
      { label: "Base CM", value: fmt(v.lineCost / v.output) },
      { label: "Overhead add", value: fmt(r - v.lineCost / v.output) },
      { label: "Cost / minute (60 min)", value: fmt(v.lineCost / (v.output * 60) * v.output) },
    ],
  },
  "Retail Price Ladder": {
    phase: "merchandising",
    blurb: "From your FOB to the shelf price — see the full chain",
    resultLabel: "Retail Price",
    resultUnit: "USD",
    formula: "Retail = FOB × (1 + freight & duty%) × wholesale markup × retail markup",
    note: "Useful in negotiations: if a buyer targets a $19.99 retail, work backwards to check whether their FOB target is realistic.",
    isNew: true,
    fields: [
      f("fob", "FOB price", "USD", 4.5, "Your selling price per unit."),
      f("fd", "Freight + duty", "%", 18, "Landing cost on top of FOB."),
      f("wm", "Wholesale markup", "×", 1.4, "Importer / wholesaler multiplier."),
      f("rm", "Retail markup", "×", 2.2, "Retailer multiplier on wholesale."),
    ],
    calc: (v) => v.fob * (1 + v.fd / 100) * v.wm * v.rm,
    detail: (v, r) => `Your FOB is ${fmt((v.fob / r) * 100)}% of the shelf price — typical for this trade is 20–30%.`,
    metrics: (v, r) => [
      { label: "Landed cost", value: fmt(v.fob * (1 + v.fd / 100)) },
      { label: "Wholesale price", value: fmt(v.fob * (1 + v.fd / 100) * v.wm) },
      { label: "Retail price", value: fmt(r) },
      { label: "FOB share of retail", value: `${fmt((v.fob / r) * 100)}%` },
    ],
    chart: (v, r) => ({
      title: "Price Build-Up",
      bars: [
        { label: "FOB", value: v.fob, color: "gold" },
        { label: "Landed", value: v.fob * (1 + v.fd / 100), color: "blue" },
        { label: "Wholesale", value: v.fob * (1 + v.fd / 100) * v.wm, color: "green" },
        { label: "Retail", value: r, color: "navy" },
      ],
    }),
  },
  "Fabric Width Optimization": {
    phase: "merchandising",
    blurb: "Savings from switching to a wider fabric",
    resultLabel: "Fabric Saved",
    resultUnit: "m",
    formula: "New consumption ≈ old consumption × (current width ÷ new width)",
    note: "Approximation — real saving depends on marker re-making. Always confirm with a trial marker before committing the booking.",
    isNew: true,
    fields: [
      f("qty", "Order quantity", "pcs", 5000, "Order quantity."),
      f("cons", "Current consumption", "m", 1.25, "Per unit on current width.", "length"),
      f("curW", "Current width", "cm", 150, "Usable width now.", "length"),
      f("newW", "New width", "cm", 160, "Proposed usable width.", "length"),
      f("rate", "Fabric rate / m", "USD", 2.4, "Price per metre (assumed same)."),
    ],
    calc: (v) => v.qty * (v.cons - v.cons * (v.curW / v.newW)),
    validate: (v) => (v.newW <= v.curW ? "New width must be wider than the current width for a saving." : ""),
    detail: (v, r) => `New consumption ≈ ${fmt(v.cons * (v.curW / v.newW))} m/unit. Value saved ≈ ${fmt(r * v.rate)}.`,
    metrics: (v, r) => [
      { label: "New consumption / unit", value: `${fmt(v.cons * (v.curW / v.newW))} m` },
      { label: "Fabric saved", value: `${fmt(r)} m` },
      { label: "Value saved", value: fmt(r * v.rate) },
      { label: "Saving", value: `${fmt((1 - v.curW / v.newW) * 100)}%` },
    ],
  },
  "Size Ratio Calculator": {
    phase: "merchandising",
    blurb: "Units per size from ratio breakdown",
    resultLabel: "Total Quantity",
    resultUnit: "pcs",
    formula: "Each size = total qty × (ratio% ÷ 100)",
    note: "Ratios must total 100%. Typical fashion ratio: XS 10%, S 25%, M 35%, L 20%, XL 10%. Adjust to buyer's size run.",
    isNew: true,
    fields: [
      f("qty", "Total quantity", "pcs", 5000, "Order quantity."),
      f("xs", "XS ratio", "%", 10, "Percentage for XS."),
      f("sm", "S ratio", "%", 20, "Percentage for S."),
      f("md", "M ratio", "%", 35, "Percentage for M."),
      f("lg", "L ratio", "%", 25, "Percentage for L."),
      f("xl", "XL ratio", "%", 10, "Percentage for XL."),
    ],
    calc: (v) => v.qty,
    validate: (v) => {
      const total = v.xs + v.sm + v.md + v.lg + v.xl;
      return Math.abs(total - 100) > 0.01 ? `Ratios total ${fmt(total)}% — must equal 100%.` : "";
    },
    display: (v) => {
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      return sizes.map((s) => Math.round((v.qty * v[s]) / 100)).join(" / ");
    },
    detail: (v) => {
      const sizes = ["XS", "S", "M", "L", "XL"];
      const keys = ["xs", "sm", "md", "lg", "xl"];
      return sizes.map((s, i) => `${s}: ${Math.round((v.qty * v[keys[i]]) / 100)} pcs`).join(" · ");
    },
    metrics: (v) => {
      const keys = ["xs", "sm", "md", "lg", "xl"];
      const labels = ["XS", "S", "M", "L", "XL"];
      return keys.map((k, i) => ({ label: labels[i], value: `${Math.round((v.qty * v[k]) / 100)} pcs` }));
    },
  },
  "Trim & Accessories Qty": {
    phase: "merchandising",
    blurb: "Total trim needed including waste allowance",
    resultLabel: "Trim Required",
    resultUnit: "pcs / m",
    formula: "Total = quantity × per unit × (1 + waste%)",
    note: "Add 5–10% waste for trim items (buttons, zippers, labels). Minimum order quantities from trim suppliers may require rounding up.",
    isNew: true,
    fields: [
      f("qty", "Garment quantity", "pcs", 5000, "Order quantity."),
      f("perUnit", "Trim per garment", "", 3, "Units or metres per garment (e.g. 3 buttons)."),
      f("waste", "Waste allowance", "%", 5, "Breakage, loss and minimum cut wastage."),
    ],
    calc: (v) => v.qty * v.perUnit * (1 + v.waste / 100),
    detail: (v, r) => `Net requirement: ${fmt(v.qty * v.perUnit)} · Waste addition: ${fmt(r - v.qty * v.perUnit)}.`,
  },
  "Price Revision Calculator": {
    phase: "merchandising",
    blurb: "FOB impact from material or cost change",
    resultLabel: "Revised FOB",
    resultUnit: "USD",
    formula: "New FOB = FOB × (1 + material share% × change% ÷ 100)",
    note: "Use to negotiate or explain a FOB revision to the buyer. Transparent shared-cost adjustment is better received than a blanket price increase.",
    isNew: true,
    fields: [
      f("fob", "Current FOB", "USD", 8.5, "Existing FOB per unit."),
      f("share", "Material cost share", "%", 55, "Fabric as % of total FOB."),
      f("change", "Material price change", "%", 12, "% rise (+) or fall (−) in material price.", undefined, true),
    ],
    calc: (v) => v.fob * (1 + (v.share / 100) * (v.change / 100)),
    detail: (v, r) => {
      const delta = r - v.fob;
      return `FOB moves by ${delta >= 0 ? "+" : ""}${fmt(delta)} USD (${fmt((delta / v.fob) * 100)}% change).`;
    },
    status: (v, r) => {
      const pct = ((r - v.fob) / v.fob) * 100;
      return Math.abs(pct) <= 3 ? ["MINIMAL IMPACT", "ok"] : Math.abs(pct) <= 8 ? ["MODERATE IMPACT", "check"] : ["SIGNIFICANT IMPACT", "fail"];
    },
  },

  // ════════ SPINNING & YARN ════════
  "Yarn Count Converter": {
    phase: "yarn",
    blurb: "Ne, Nm, tex and denier in one place",
    resultLabel: "Converted Count",
    resultUnit: "Ne",
    resultGroup: "yarn",
    formula: "All values are converted through tex as the base unit",
    note: "Use for yarn comparison across Ne, Nm, tex and denier systems.",
    fields: [f("value", "Yarn value", "tex", 20, "Enter the known yarn value.", "yarn")],
    calc: (v) => v.value,
  },
  "Yarn Twist (TPI) Calculator": {
    phase: "yarn",
    blurb: "Twist per inch from twist multiplier and count",
    resultLabel: "Twist",
    resultUnit: "TPI",
    formula: "TPI = twist multiplier (TM) × √Ne",
    note: "Typical TM: knitting yarn 3.2–3.6, weaving warp 3.8–4.2, weft 3.3–3.8. Higher twist = stronger but harsher hand-feel.",
    isNew: true,
    fields: [
      f("tm", "Twist multiplier (TM)", "", 3.6, "Per yarn end-use, e.g. 3.6 for hosiery."),
      f("ne", "Yarn count", "Ne", 30, "English cotton count."),
    ],
    calc: (v) => v.tm * Math.sqrt(v.ne),
    detail: (v, r) => `Equivalent TPM (twist per metre): ${fmt(r * 39.37)}.`,
  },
  "Yarn Strength (CSP)": {
    phase: "yarn",
    blurb: "Count strength product from lea strength",
    resultLabel: "CSP",
    resultUnit: "index",
    formula: "CSP = lea strength (lbs) × count (Ne)",
    note: "Reference: carded yarn CSP 1800–2200, combed 2200–2600+. Below ~1700 expect breakage problems in weaving.",
    isNew: true,
    fields: [
      f("strength", "Lea strength", "lbs", 78, "Tested lea strength."),
      f("ne", "Yarn count", "Ne", 30, "English cotton count."),
    ],
    calc: (v) => v.strength * v.ne,
    status: (v, r) => (r >= 2200 ? ["STRONG", "ok"] : r >= 1800 ? ["AVERAGE", "check"] : ["WEAK", "fail"]),
  },
  "Yarn Requirement Calculator": {
    phase: "yarn",
    blurb: "Yarn booking with process waste",
    resultLabel: "Yarn Required",
    resultUnit: "kg",
    resultGroup: "weight",
    formula: "Yarn = quantity × consumption × (1 + waste%)",
    note: "Book yarn using approved consumption and a realistic process waste from factory history.",
    fields: [
      f("qty", "Quantity", "pcs", 5000, "Order quantity."),
      f("cons", "Consumption / unit", "g", 180, "Yarn per piece or unit.", "weight"),
      f("waste", "Waste", "%", 5, "Knitting/processing allowance."),
    ],
    calc: (v) => v.qty * v.cons * (1 + v.waste / 100),
  },
  "Blend Ratio Calculator": {
    phase: "yarn",
    blurb: "Component weights for a fibre blend",
    resultLabel: "Primary Component",
    resultUnit: "kg",
    resultGroup: "weight",
    formula: "Primary component = total weight × primary%",
    note: "Use for fibre and yarn blend planning, e.g. 60/40 CVC or 52/48 poly-cotton.",
    fields: [
      f("total", "Total batch weight", "kg", 1000, "Total batch weight.", "weight"),
      f("primary", "Primary share", "%", 60, "Primary component percentage."),
    ],
    calc: (v) => (v.total * v.primary) / 100,
    detail: (v) => `Secondary component: ${fmt((v.total * (100 - v.primary)) / 100)} kg.`,
  },
  "Cone Net Weight Calculator": {
    phase: "yarn",
    blurb: "Invoice check for yarn receiving",
    resultLabel: "Net Yarn",
    resultUnit: "kg",
    resultGroup: "weight",
    formula: "Net weight = cones × (gross cone weight − tare)",
    note: "Useful for yarn receiving and supplier invoice checks.",
    fields: [
      f("cones", "Cones", "pcs", 240, "Total cones received."),
      f("gross", "Gross / cone", "kg", 1.95, "Cone plus yarn.", "weight"),
      f("tare", "Cone tare", "kg", 0.08, "Empty cone weight.", "weight"),
    ],
    calc: (v) => v.cones * Math.max(v.gross - v.tare, 0),
  },
  "Moisture Regain Calculator": {
    phase: "yarn",
    blurb: "Conditioned vs oven-dry weight",
    resultLabel: "Moisture Regain",
    resultUnit: "%",
    formula: "Regain = (conditioned − dry) ÷ dry × 100",
    note: "Commercial standard regain: cotton 8.5%, viscose 13%, wool 16%, polyester 0.4%, nylon 4.5%. Invoicing above standard means paying for water.",
    fields: [
      f("conditioned", "Conditioned weight", "kg", 1000, "As-received weight.", "weight"),
      f("dry", "Oven-dry weight", "kg", 930, "Dried weight.", "weight"),
      f("fiber", "Fiber type", "", 1, "1=Cotton(8.5%) 2=Viscose(13%) 3=Wool(16%) 4=Polyester(0.4%) 5=Nylon(4.5%)"),
    ],
    calc: (v) => ((v.conditioned - v.dry) / v.dry) * 100,
    status: (v, r) => {
      const std = [8.5, 13, 16, 0.4, 4.5][Math.min(Math.max(Math.round(v.fiber), 1), 5) - 1];
      const fiberName = ["Cotton", "Viscose", "Wool", "Polyester", "Nylon"][Math.min(Math.max(Math.round(v.fiber), 1), 5) - 1];
      return r <= std ? [`WITHIN ${fiberName.toUpperCase()} STD (${std}%)`, "ok"] : r <= std * 1.15 ? ["CHECK — ABOVE STANDARD", "check"] : ["OVER-CONDITIONED", "fail"];
    },
  },

  // ════════ FABRIC DEVELOPMENT ════════
  "Sample GSM Calculator": {
    phase: "fabric",
    blurb: "GSM from cutter sample weight and area",
    resultLabel: "Fabric Weight",
    resultUnit: "GSM",
    formula: "GSM = sample weight (g) ÷ sample area (m²)",
    note: "Cut the sample with a GSM cutter where possible and compare against buyer tolerance (commonly ±5%).",
    fields: [
      f("weight", "Sample weight", "g", 5, "Sample weight.", "weight"),
      f("area", "Sample area", "cm2", 100, "Sample area (GSM cutter = 100 cm²).", "area"),
    ],
    calc: (v) => (v.weight * 1000) / v.area,
  },
  "Knit GSM Estimator": {
    phase: "fabric",
    blurb: "Predict single-jersey GSM before knitting",
    resultLabel: "Estimated GSM",
    resultUnit: "GSM",
    formula: "GSM = courses/cm × wales/cm × stitch length (cm) × tex ÷ 10",
    note: "Greige estimate for plain structures — finished GSM shifts with dyeing and compacting. Confirm with a knitted lab sample.",
    isNew: true,
    fields: [
      f("cpc", "Courses / cm", "", 16, "Course density."),
      f("wpc", "Wales / cm", "", 12, "Wale density."),
      f("sl", "Stitch length", "mm", 2.7, "Loop length per stitch."),
      f("ne", "Yarn count", "Ne", 30, "English cotton count."),
    ],
    calc: (v) => (v.cpc * v.wpc * (v.sl / 10) * (590.5 / v.ne)) / 10,
  },
  "Woven GSM Calculator": {
    phase: "fabric",
    blurb: "GSM estimate from EPI, PPI and counts",
    resultLabel: "Estimated GSM",
    resultUnit: "GSM",
    formula: "GSM ≈ ((EPI ÷ warp Ne) + (PPI ÷ weft Ne)) × 23.25 × (1 + crimp%)",
    note: "Estimate only — confirm after finishing. Crimp/sizing allowance is typically 8–12% for cotton.",
    fields: [
      f("epi", "EPI", "", 76, "Ends per inch."),
      f("ppi", "PPI", "", 68, "Picks per inch."),
      f("warp", "Warp count", "Ne", 30, "Warp count."),
      f("weft", "Weft count", "Ne", 30, "Weft count."),
      f("crimp", "Crimp / sizing", "%", 10, "Allowance."),
    ],
    calc: (v) => (v.epi / v.warp + v.ppi / v.weft) * 23.25 * (1 + v.crimp / 100),
  },
  "Fabric Yield Calculator": {
    phase: "fabric",
    blurb: "Kg-to-metre conversion for fabric lots",
    resultLabel: "Yield",
    resultUnit: "m/kg",
    formula: "Metres per kg = 1000 ÷ (GSM × width in metres)",
    note: "Useful when fabric is invoiced in kg but consumed in metres — towelling, jersey and fleece deals especially.",
    fields: [
      f("gsm", "GSM", "", 180, "Fabric weight."),
      f("width", "Usable width", "cm", 160, "Usable width.", "length"),
    ],
    calc: (v) => 1000 / (v.gsm * v.width),
  },
  "Stretch Percentage Calculator": {
    phase: "fabric",
    blurb: "Elasticity from relaxed vs stretched length",
    resultLabel: "Stretch",
    resultUnit: "%",
    formula: "Stretch = (stretched − relaxed) ÷ relaxed × 100",
    note: "Recovery must be checked separately — high stretch with poor recovery causes baggy garments.",
    fields: [
      f("relaxed", "Relaxed length", "cm", 10, "Original length.", "length"),
      f("stretched", "Stretched length", "cm", 13, "Under standard load.", "length"),
    ],
    calc: (v) => ((v.stretched - v.relaxed) / v.relaxed) * 100,
  },
  "Thread Count Calculator": {
    phase: "fabric",
    blurb: "TC for sheeting and bedding",
    resultLabel: "Thread Count",
    resultUnit: "TC",
    formula: "Thread count = EPI + PPI",
    note: "Standard for percale, sateen and bedding specifications. Multi-ply yarns are sometimes counted per ply — confirm the buyer's counting method.",
    fields: [
      f("epi", "EPI", "", 120, "Ends per inch."),
      f("ppi", "PPI", "", 80, "Picks per inch."),
    ],
    calc: (v) => v.epi + v.ppi,
  },
  "Cover Factor Calculator": {
    phase: "fabric",
    blurb: "Construction tightness index",
    resultLabel: "Cover Factor",
    resultUnit: "index",
    formula: "Cover factor = EPI ÷ √(warp Ne) + PPI ÷ √(weft Ne)",
    note: "Comparative construction index, not a universal pass/fail. Use to compare two constructions of the same fabric type.",
    fields: [
      f("epi", "EPI", "", 76, "Ends per inch."),
      f("ppi", "PPI", "", 68, "Picks per inch."),
      f("warp", "Warp count", "Ne", 30, "Warp count."),
      f("weft", "Weft count", "Ne", 30, "Weft count."),
    ],
    calc: (v) => v.epi / Math.sqrt(v.warp) + v.ppi / Math.sqrt(v.weft),
  },
  "Loom Production Calculator": {
    phase: "fabric",
    blurb: "Metres per loom per day",
    resultLabel: "Daily Output",
    resultUnit: "m/day",
    formula: "Output = RPM × 60 × hours × efficiency% ÷ (PPI × 39.37)",
    note: "Use for weaving capacity and delivery planning. Efficiency 80–90% is realistic for airjet on standard constructions.",
    isNew: true,
    fields: [
      f("rpm", "Loom speed", "RPM", 650, "Picks inserted per minute."),
      f("ppi", "PPI", "", 68, "Picks per inch."),
      f("hours", "Running hours / day", "hrs", 22, "Hours minus planned stops."),
      f("eff", "Loom efficiency", "%", 85, "From loom data system."),
    ],
    calc: (v) => (v.rpm * 60 * v.hours * (v.eff / 100)) / (v.ppi * 39.37),
    detail: (v, r) => `Weekly output ≈ ${fmt(r * 7)} m per loom. For 10 looms: ${fmt(r * 70)} m/week.`,
  },
  "Warp Requirement Calculator": {
    phase: "fabric",
    blurb: "Warp yarn weight for a weaving order",
    resultLabel: "Warp Yarn",
    resultUnit: "kg",
    resultGroup: "weight",
    formula: "Warp kg = total ends × warp length × (1 + crimp%) ÷ (1693.6 × Ne)",
    note: "Add beam waste and sizing add-on separately. Total ends = EPI × width in inches.",
    isNew: true,
    fields: [
      f("ends", "Total ends", "", 7600, "EPI × reed width in inches."),
      f("length", "Warp length", "m", 3000, "Set length on the beam.", "length"),
      f("crimp", "Warp crimp", "%", 8, "Crimp allowance."),
      f("ne", "Warp count", "Ne", 30, "English cotton count."),
    ],
    calc: (v) => (v.ends * v.length * (1 + v.crimp / 100)) / (1693.6 * v.ne),
  },

  "Terry Pile Calculator": {
    phase: "fabric",
    blurb: "Ground vs pile GSM split and towel weight",
    resultLabel: "Pile GSM",
    resultUnit: "GSM",
    formula: "Pile GSM = total GSM × pile ratio%; towel weight = total GSM × width × length",
    note: "Typical pile ratio: 60–75% of total GSM. Higher pile = softer and heavier towel. Always confirm with a lab cut before bulk production.",
    isNew: true,
    fields: [
      f("totalGsm", "Total GSM", "", 450, "Terry towel total weight."),
      f("pileRatio", "Pile ratio", "%", 68, "Pile as % of total GSM (typically 60–75%)."),
      f("width", "Towel width (finished)", "cm", 70, "Finished towel width.", "length"),
      f("length", "Towel length (finished)", "cm", 140, "Finished towel length.", "length"),
    ],
    calc: (v) => (v.totalGsm * v.pileRatio) / 100,
    detail: (v, r) => {
      const groundGsm = v.totalGsm - r;
      const towelGrams = v.totalGsm * (v.width * v.length);
      return `Ground GSM: ${fmt(groundGsm)} · Pile GSM: ${fmt(r)} · Single towel weight ≈ ${fmt(towelGrams)} g.`;
    },
    metrics: (v, r) => {
      const groundGsm = v.totalGsm - r;
      const towelGrams = v.totalGsm * (v.width * v.length);
      return [
        { label: "Ground GSM", value: fmt(groundGsm) },
        { label: "Pile GSM", value: fmt(r) },
        { label: "Towel weight", value: `${fmt(towelGrams)} g` },
        { label: "Pile ratio", value: `${fmt((r / v.totalGsm) * 100)}%` },
      ];
    },
  },

  // ════════ DYEING & FINISHING ════════
  "Shrinkage Calculator": {
    phase: "processing",
    blurb: "Dimensional change before vs after",
    resultLabel: "Shrinkage",
    resultUnit: "%",
    formula: "Shrinkage = (before − after) ÷ before × 100",
    note: "Pass/fail depends on the buyer's test method (wash cycles, temperature) and tolerance — commonly ±5% woven, ±7% knits.",
    fields: [
      f("before", "Before wash", "cm", 100, "Marked length before.", "length"),
      f("after", "After wash", "cm", 96, "Measured after process.", "length"),
    ],
    calc: (v) => ((v.before - v.after) / v.before) * 100,
    status: (v, r) => (Math.abs(r) <= 5 ? ["WITHIN ±5%", "ok"] : Math.abs(r) <= 8 ? ["CHECK TOLERANCE", "check"] : ["HIGH", "fail"]),
  },
  "Dyeing Loss Calculator": {
    phase: "processing",
    blurb: "Process weight loss input vs output",
    resultLabel: "Process Loss",
    resultUnit: "%",
    formula: "Loss = (input − output) ÷ input × 100",
    note: "Typical dye-house loss is 3–6% for cotton knits. Persistent high loss destroys repeat-order margins — track it per shade and per machine.",
    fields: [
      f("input", "Input weight", "kg", 500, "Greige weight in.", "weight"),
      f("output", "Output weight", "kg", 485, "Finished weight out.", "weight"),
    ],
    calc: (v) => ((v.input - v.output) / v.input) * 100,
    status: (v, r) => (r <= 6 ? ["NORMAL", "ok"] : r <= 9 ? ["HIGH", "check"] : ["EXCESSIVE", "fail"]),
  },
  "Chemical Dosage Calculator": {
    phase: "processing",
    blurb: "Recipe quantity on weight of goods",
    resultLabel: "Chemical Required",
    resultUnit: "kg",
    resultGroup: "weight",
    formula: "Chemical = batch weight × dosage% ÷ 100",
    note: "For o.w.g. (on weight of goods) recipes. For g/l recipes use the liquor ratio calculator first to get total liquor.",
    fields: [
      f("weight", "Batch weight", "kg", 500, "Goods weight.", "weight"),
      f("dosage", "Dosage", "% owg", 1.5, "Percent on weight of goods."),
    ],
    calc: (v) => (v.weight * v.dosage) / 100,
  },
  "Liquor Ratio Calculator": {
    phase: "processing",
    blurb: "Water volume for a dye batch",
    resultLabel: "Liquor Volume",
    resultUnit: "litres",
    formula: "Water = batch kg × liquor ratio",
    note: "Actual water use depends on machine type and loading. Lower ratios save water, steam and effluent cost.",
    fields: [
      f("weight", "Batch weight", "kg", 500, "Goods weight.", "weight"),
      f("ratio", "Liquor ratio", ": 1", 8, "Enter 8 for a 1:8 ratio."),
    ],
    calc: (v) => v.weight * v.ratio,
  },
  "Finishing Pickup Calculator": {
    phase: "processing",
    blurb: "Wet pickup % for padding control",
    resultLabel: "Pickup",
    resultUnit: "%",
    formula: "Pickup = (wet − dry) ÷ dry × 100",
    note: "Controls finish add-on consistency in padding. Target pickup varies by finish — typically 60–80% for cotton.",
    fields: [
      f("wet", "Wet weight", "kg", 118, "After padding.", "weight"),
      f("dry", "Dry weight", "kg", 100, "Before padding.", "weight"),
    ],
    calc: (v) => ((v.wet - v.dry) / v.dry) * 100,
  },
  "Dyeing Cost per Kg": {
    phase: "processing",
    blurb: "All-in dye-house cost per kilogram",
    resultLabel: "Dyeing Cost",
    resultUnit: "per kg",
    formula: "Cost/kg = (dyes + chemicals + utilities + labour) ÷ batch weight",
    note: "Compare across shades: dark and turquoise shades cost significantly more than pastels. Use for shade-wise quotation surcharges.",
    isNew: true,
    fields: [
      f("dyes", "Dyes cost", "USD", 210, "Dyestuff for the batch."),
      f("chems", "Chemicals & auxiliaries", "USD", 95, "Salt, soda, softener, etc."),
      f("utilities", "Utilities", "USD", 130, "Steam, water, power, effluent."),
      f("labour", "Labour & overhead", "USD", 80, "Batch share of dye-house labour."),
      f("weight", "Batch weight", "kg", 500, "Goods weight.", "weight"),
    ],
    calc: (v) => (v.dyes + v.chems + v.utilities + v.labour) / v.weight,
    chart: (v) => ({
      title: "Dye-House Cost Split",
      bars: [
        { label: "Dyes", value: v.dyes, color: "blue" },
        { label: "Chemicals", value: v.chems, color: "gold" },
        { label: "Utilities", value: v.utilities, color: "amber" },
        { label: "Labour", value: v.labour, color: "green" },
      ],
    }),
  },

  // ════════ CUTTING & SEWING ════════
  "Fabric Consumption Calculator": {
    phase: "production",
    blurb: "Total fabric for the cut plan",
    resultLabel: "Total Fabric",
    resultUnit: "m",
    resultGroup: "length",
    formula: "Fabric = quantity × consumption × (1 + waste%)",
    note: "Use approved marker consumption, not a sample estimate, for bulk booking.",
    fields: [
      f("qty", "Quantity", "pcs", 5000, "Order quantity."),
      f("cons", "Consumption / unit", "m", 1.25, "Marker consumption.", "length"),
      f("waste", "Waste", "%", 4, "End loss and defect allowance."),
    ],
    calc: (v) => v.qty * v.cons * (1 + v.waste / 100),
    metrics: (v, r) => [
      { label: "Net fabric", value: `${fmt(v.qty * v.cons)} m` },
      { label: "Waste fabric", value: `${fmt((v.qty * v.cons * v.waste) / 100)} m` },
      { label: "Total fabric", value: `${fmt(r)} m` },
    ],
  },
  "Marker Efficiency Calculator": {
    phase: "production",
    blurb: "Pattern area vs marker area",
    resultLabel: "Marker Efficiency",
    resultUnit: "%",
    formula: "Efficiency = pattern area ÷ marker area × 100",
    note: "Every 1% of marker efficiency lost goes straight into fabric cost. 80–85% is good for mixed-size garment markers.",
    fields: [
      f("garment", "Pattern area", "m2", 82, "Total pattern pieces area.", "area"),
      f("marker", "Marker area", "m2", 100, "Full marker area.", "area"),
    ],
    calc: (v) => (v.garment / v.marker) * 100,
    validate: (v) => (v.garment > v.marker ? "Pattern area cannot be larger than the marker area." : ""),
    status: (v, r) => (r >= 82 ? ["GOOD", "ok"] : r >= 75 ? ["IMPROVE", "check"] : ["POOR", "fail"]),
  },
  "Lay Plan Calculator": {
    phase: "production",
    blurb: "Fabric and garments from a spreading lay",
    resultLabel: "Garments from Lay",
    resultUnit: "pcs",
    formula: "Garments = plies × garments per marker; fabric = lay length × plies",
    note: "Check the spreading table length and the fabric's maximum ply height (knits crush, denim is stable) before finalizing plies.",
    isNew: true,
    fields: [
      f("layLength", "Lay / marker length", "m", 8.5, "Length of one marker.", "length"),
      f("plies", "Number of plies", "", 60, "Fabric layers in the lay."),
      f("gpm", "Garments per marker", "pcs", 7, "Garments in one marker."),
    ],
    calc: (v) => v.plies * v.gpm,
    detail: (v, r) => `Fabric used: ${fmt(v.layLength * v.plies)} m. Effective consumption: ${fmt((v.layLength * v.plies) / r)} m per garment.`,
    metrics: (v, r) => [
      { label: "Fabric in lay", value: `${fmt(v.layLength * v.plies)} m` },
      { label: "Garments cut", value: fmt(r) },
      { label: "Consumption / garment", value: `${fmt((v.layLength * v.plies) / r)} m` },
    ],
  },
  "SMV Calculator": {
    phase: "production",
    blurb: "Standard minute value from time study",
    resultLabel: "SMV",
    resultUnit: "minutes",
    formula: "SMV = observed seconds × rating% × (1 + allowance%) ÷ 60",
    note: "Use for CM costing and line capacity. Rating and allowance must come from a proper IE study, not assumption.",
    fields: [
      f("cycle", "Observed cycle time", "sec", 52, "Stopwatch observed time."),
      f("rating", "Operator rating", "%", 90, "Pace rating vs standard."),
      f("allowance", "Allowance", "%", 15, "Fatigue and contingency."),
    ],
    calc: (v) => (v.cycle * (v.rating / 100) * (1 + v.allowance / 100)) / 60,
  },
  "Labour Cost per Garment": {
    phase: "production",
    blurb: "Direct sewing labour from SMV",
    resultLabel: "Labour Cost",
    resultUnit: "per unit",
    formula: "Cost = SMV × cost per minute ÷ (efficiency% ÷ 100)",
    note: "Cost per minute = operator monthly salary ÷ (working days × hours × 60). Efficiency below 50% doubles your effective labour cost.",
    isNew: true,
    fields: [
      f("smv", "Garment SMV", "min", 12, "Total garment SMV."),
      f("cpm", "Cost per minute", "USD", 0.035, "Operator cost per working minute."),
      f("eff", "Line efficiency", "%", 55, "Actual line efficiency."),
    ],
    calc: (v) => (v.smv * v.cpm) / (v.eff / 100),
    detail: (v, r) => `At 100% efficiency this garment would cost ${fmt(v.smv * v.cpm)} — efficiency is adding ${fmt(r - v.smv * v.cpm)} per unit.`,
  },
  "Operator Requirement": {
    phase: "production",
    blurb: "Operators needed for a daily target",
    resultLabel: "Operators Needed",
    resultUnit: "operators",
    formula: "Operators = (daily target × SMV) ÷ (hours × 60 × efficiency%)",
    note: "Add 8–10% absenteeism allowance on top for real-line manning.",
    isNew: true,
    fields: [
      f("target", "Daily target", "pcs", 800, "Required output per day."),
      f("smv", "Garment SMV", "min", 12, "Total SMV."),
      f("hours", "Working hours", "hrs", 8, "Production hours per day."),
      f("eff", "Expected efficiency", "%", 55, "Realistic line efficiency."),
    ],
    calc: (v) => (v.target * v.smv) / (v.hours * 60 * (v.eff / 100)),
    detail: (v, r) => `With 9% absenteeism allowance, man the line with ${fmt(Math.ceil(r * 1.09))} operators.`,
  },
  "Production Capacity Dashboard": {
    phase: "production",
    blurb: "Daily output and days-to-complete",
    resultLabel: "Daily Capacity",
    resultUnit: "pcs/day",
    formula: "Daily capacity = operators × hours × 60 × efficiency% ÷ SMV",
    note: "Use for line planning and delivery checking. Efficiency and SMV must come from actual line history or an approved IE study.",
    fields: [
      f("qty", "Order quantity", "pcs", 5000, "Quantity to produce."),
      f("operators", "Operators", "", 25, "Operators on the line."),
      f("hours", "Working hours / day", "hrs", 8, "Available production hours."),
      f("smv", "SMV", "min", 6.5, "Standard minute value."),
      f("eff", "Efficiency", "%", 55, "Expected line efficiency."),
    ],
    calc: (v) => productionData(v).daily,
    detail: (v) => {
      const d = productionData(v);
      return `Estimated days required: ${fmt(d.days)}. Available minutes/day: ${fmt(d.availableMinutes)}.`;
    },
    metrics: (v) => {
      const d = productionData(v);
      return [
        { label: "Daily capacity", value: `${fmt(d.daily)} pcs` },
        { label: "Days required", value: fmt(d.days) },
        { label: "Output / operator / day", value: fmt(d.perOperator) },
        { label: "Available minutes", value: fmt(d.availableMinutes) },
      ];
    },
  },
  "Thread Consumption Calculator": {
    phase: "production",
    blurb: "Sewing thread for the full order",
    resultLabel: "Thread Required",
    resultUnit: "m",
    resultGroup: "length",
    formula: "Thread = seam length × thread ratio × quantity",
    note: "Ratios: lockstitch ~2.5×, 3-thread overlock ~14×, 5-thread safety ~20× seam length. Use stitch-specific ratios for final costing.",
    fields: [
      f("seam", "Seam length / unit", "m", 3.2, "Total seam length.", "length"),
      f("ratio", "Thread ratio", "×", 3.5, "Stitch-type multiplier."),
      f("qty", "Quantity", "pcs", 5000, "Order quantity."),
      f("cone", "Cone size", "m", 5000, "Thread metres per cone."),
    ],
    calc: (v) => v.seam * v.ratio * v.qty,
    detail: (v, r) => `≈ ${Math.ceil(r / Math.max(v.cone, 1)).toLocaleString("en-US")} cones of ${v.cone.toLocaleString("en-US")} m thread (before wastage).`,
  },
  "Garment Weight Calculator": {
    phase: "production",
    blurb: "Packed piece weight estimate",
    resultLabel: "Garment Weight",
    resultUnit: "g",
    resultGroup: "weight",
    formula: "Weight = fabric area × GSM + trim weight",
    note: "Feeds directly into carton weight and freight planning — small errors multiply over thousands of pieces.",
    fields: [
      f("area", "Fabric area / unit", "m2", 0.75, "Fabric area per garment.", "area"),
      f("gsm", "GSM", "", 180, "Fabric weight."),
      f("trim", "Trim weight", "g", 18, "Buttons, labels, zippers.", "weight"),
    ],
    calc: (v) => (v.area * v.gsm) / 1000 + v.trim,
  },

  // ════════ QUALITY CONTROL ════════
  "AQL Sample Size": {
    phase: "qa",
    blurb: "ISO 2859-1 sample size from lot quantity",
    resultLabel: "Sample Size",
    resultUnit: "pcs",
    formula: "ISO 2859-1 Table I (lot → code letter) → Table II-A (code + AQL → n, Ac, Re)",
    note: "Standard inspection levels: I (reduced), II (normal, most common), III (tightened). AQL 2.5 is the buyer default for general merchandise; 1.5 for higher-risk apparel.",
    isNew: true,
    fields: [
      f("lot", "Lot size", "pcs", 5000, "Total units in the inspection lot."),
      f("insp", "Inspection level", "", 2, "1=Level I  2=Level II (normal)  3=Level III"),
      f("aql", "AQL value", "", 2.5, "Acceptance quality limit: 1.0, 1.5, 2.5, 4.0 or 6.5"),
    ],
    calc: (v) => {
      const r = aqlLookup(v.lot, v.aql, v.insp);
      return r ? r.n : 0;
    },
    display: (v) => {
      const r = aqlLookup(v.lot, v.aql, v.insp);
      return r ? `${r.n} pcs (Code ${r.code})` : "—";
    },
    detail: (v) => {
      const r = aqlLookup(v.lot, v.aql, v.insp);
      if (!r) return "Lot size out of table range.";
      const acRe = r.acRe ? `Accept ≤ ${r.acRe[0]} defect(s) · Reject ≥ ${r.acRe[1]} defect(s)` : "See expanded table";
      return `Code letter ${r.code} · AQL ${r.aqlKey} · ${acRe}.`;
    },
    status: (v) => {
      const r = aqlLookup(v.lot, v.aql, v.insp);
      return r ? ["READY", "ok"] : ["CHECK TABLE", "check"];
    },
  },
  "AQL Defect Check": {
    phase: "qa",
    blurb: "Pass/fail against the acceptance number",
    resultLabel: "Defect Margin",
    resultUnit: "defects",
    formula: "Margin = major defects − allowed major; critical defects should be zero",
    note: "Use the acceptance number from the buyer's AQL table (ISO 2859-1). Critical defects are zero-tolerance under all standards.",
    fields: [
      f("major", "Major defects found", "", 5, "Major defects in the sample."),
      f("allowed", "Allowed major (Ac)", "", 7, "Acceptance number from AQL table."),
      f("critical", "Critical defects", "", 0, "Safety/legal defects found."),
    ],
    calc: (v) => (v.critical > 0 ? v.critical * 999 : v.major - v.allowed),
    status: (v, r) => (v.critical > 0 ? ["FAIL — CRITICAL", "fail"] : r <= 0 ? ["PASS", "ok"] : ["FAIL", "fail"]),
    detail: (v, r) => (v.critical > 0 ? "Any critical defect is an automatic fail unless the buyer explicitly allows otherwise." : r <= 0 ? `Pass with ${fmt(-r)} defect(s) of headroom.` : `Exceeds allowance by ${fmt(r)} defect(s).`),
    chart: (v) => ({
      title: "Defects Against Allowance",
      bars: [
        { label: "Found", value: v.major, color: v.major > v.allowed ? "red" : "green" },
        { label: "Allowed", value: v.allowed, color: "blue" },
        { label: "Critical", value: v.critical, color: v.critical > 0 ? "red" : "gold" },
      ],
    }),
  },
  "DHU Calculator": {
    phase: "qa",
    blurb: "Defects per hundred units — inline tracking",
    resultLabel: "DHU",
    resultUnit: "defects/100",
    formula: "DHU = defects ÷ checked pieces × 100",
    note: "Track DHU daily by line and operation. World-class endline DHU is below 5; above 15 signals a process out of control.",
    fields: [
      f("defects", "Total defects", "", 18, "Defects found."),
      f("checked", "Checked pieces", "pcs", 200, "Pieces inspected."),
    ],
    calc: (v) => (v.defects / v.checked) * 100,
    status: (v, r) => (r <= 5 ? ["EXCELLENT", "ok"] : r <= 10 ? ["ACCEPTABLE", "check"] : ["HIGH", "fail"]),
  },
  "4-Point Fabric Inspection": {
    phase: "qa",
    blurb: "Points per 100 square yards",
    resultLabel: "Inspection Score",
    resultUnit: "pts/100 yd²",
    formula: "Points/100 yd² = penalty points × 3600 ÷ (yards × width in inches)",
    note: "Many buyers accept ≤28 points/100 yd² for first quality; ≤40 with negotiation. Always use the buyer's own limit if specified.",
    fields: [
      f("points", "Penalty points", "", 24, "Total 4-point penalties."),
      f("yards", "Inspected length", "yd", 100, "Length inspected.", "length"),
      f("width", "Fabric width", "inch", 60, "Fabric width.", "length"),
    ],
    calc: (v) => (v.points * 3600) / ((v.yards / 0.9144) * (v.width / 0.0254)),
    status: (v, r) => (r <= 28 ? ["FIRST QUALITY", "ok"] : r <= 40 ? ["NEGOTIABLE", "check"] : ["REJECT", "fail"]),
    chart: (v, r) => ({
      title: "4-Point Inspection Level",
      note: "28 and 40 points shown as common reference limits.",
      bars: [
        { label: "Result", value: r, color: r <= 28 ? "green" : r <= 40 ? "gold" : "red" },
        { label: "Ref 28", value: 28, color: "blue" },
        { label: "Ref 40", value: 40, color: "amber" },
      ],
    }),
  },
  "Measurement Tolerance Checker": {
    phase: "qa",
    blurb: "Spec vs actual measurement variance",
    resultLabel: "Variance",
    resultUnit: "%",
    formula: "Variance = (actual − standard) ÷ standard × 100",
    note: "Pass/fail depends on the buyer's point-of-measure tolerance — chest and length usually ±1–2 cm, small points tighter.",
    fields: [
      f("standard", "Standard (spec)", "cm", 72, "Approved spec measurement.", "length"),
      f("actual", "Actual measured", "cm", 73, "Measured value.", "length"),
    ],
    calc: (v) => ((v.actual - v.standard) / v.standard) * 100,
    status: (v, r) => (Math.abs(r) <= 2 ? ["WITHIN ±2%", "ok"] : Math.abs(r) <= 5 ? ["CHECK TOLERANCE", "check"] : ["OUT OF SPEC", "fail"]),
    detail: (v) => `Absolute difference: ${fmt(Math.abs(v.actual - v.standard) * 100)} cm-equivalent in base units — compare against the PoM tolerance, not just %.`,
  },
  "GSM Tolerance Checker": {
    phase: "qa",
    blurb: "Bulk GSM vs approved standard",
    resultLabel: "GSM Variance",
    resultUnit: "%",
    formula: "Variance = (actual GSM − standard GSM) ÷ standard GSM × 100",
    note: "Common commercial tolerance is ±5%. Light GSM = buyer claim risk; heavy GSM = silent fabric cost overrun.",
    fields: [
      f("standard", "Standard GSM", "", 180, "Approved GSM."),
      f("actual", "Actual GSM", "", 188, "Bulk measured GSM."),
    ],
    calc: (v) => ((v.actual - v.standard) / v.standard) * 100,
    status: (v, r) => (Math.abs(r) <= 5 ? ["WITHIN ±5%", "ok"] : ["OUT OF TOLERANCE", "check"]),
  },
  "Color Fastness Pass Check": {
    phase: "qa",
    blurb: "Lab grade vs required grade",
    resultLabel: "Grade Margin",
    resultUnit: "grades",
    formula: "Margin = actual grade − required grade",
    note: "Use the buyer's required ISO/AATCC method and minimum grade. Grade 4 is the usual commercial minimum for washing and rubbing.",
    fields: [
      f("actual", "Actual grade", "", 4, "Lab test result (1–5)."),
      f("required", "Required grade", "", 4, "Buyer minimum grade."),
    ],
    calc: (v) => v.actual - v.required,
    status: (v, r) => (r >= 0 ? ["PASS", "ok"] : r >= -0.5 ? ["BORDERLINE", "check"] : ["FAIL", "fail"]),
  },
  "Cost of Poor Quality": {
    phase: "qa",
    blurb: "What defects actually cost this order",
    resultLabel: "COPQ",
    resultUnit: "USD",
    formula: "COPQ = (rejects × unit cost) + (rework units × rework cost)",
    note: "The owner's QA metric: COPQ above 2–3% of order revenue usually justifies investing in inline inspection and training.",
    isNew: true,
    fields: [
      f("qty", "Order quantity", "pcs", 5000, "Order quantity."),
      f("cost", "Unit cost", "USD", 4.2, "Full cost per unit."),
      f("sell", "Selling price / unit", "USD", 5.1, "For revenue share calc."),
      f("reject", "Reject rate", "%", 2, "Unsellable rejects."),
      f("rework", "Rework rate", "%", 6, "Units needing repair."),
      f("reworkCost", "Rework cost / unit", "USD", 0.4, "Labour + handling per reworked unit."),
    ],
    calc: (v) => copqData(v).copq,
    status: (v) => {
      const d = copqData(v);
      return d.share <= 2 ? ["UNDER CONTROL", "ok"] : d.share <= 4 ? ["WATCH", "check"] : ["BLEEDING MARGIN", "fail"];
    },
    detail: (v) => {
      const d = copqData(v);
      return `COPQ is ${fmt(d.share)}% of order revenue. Reject loss ${fmt(d.rejectLoss)} + rework loss ${fmt(d.reworkLoss)}.`;
    },
    metrics: (v) => {
      const d = copqData(v);
      return [
        { label: "Reject loss", value: fmt(d.rejectLoss) },
        { label: "Rework loss", value: fmt(d.reworkLoss) },
        { label: "Total COPQ", value: fmt(d.copq) },
        { label: "% of revenue", value: `${fmt(d.share)}%` },
      ];
    },
    chart: (v) => {
      const d = copqData(v);
      return {
        title: "Where Quality Cost Sits",
        bars: [
          { label: "Rejects", value: d.rejectLoss, color: "red" },
          { label: "Rework", value: d.reworkLoss, color: "amber" },
        ],
      };
    },
  },

  // ════════ PACKING ════════
  "Carton Capacity Calculator": {
    phase: "packing",
    blurb: "Max pieces per carton by weight limit",
    resultLabel: "Pieces per Carton",
    resultUnit: "pcs",
    formula: "Pieces = floor((max carton kg − tare kg) ÷ piece kg)",
    note: "Also confirm the physical fit — weight capacity and volume capacity are different limits.",
    fields: [
      f("max", "Max carton weight", "kg", 18, "Allowed gross weight.", "weight"),
      f("piece", "Packed piece weight", "g", 450, "Garment + polybag.", "weight"),
      f("tare", "Carton tare", "kg", 1.2, "Empty carton weight.", "weight"),
    ],
    calc: (v) => Math.floor((v.max - v.tare) / v.piece),
    validate: (v) => (v.max <= v.tare ? "Max carton weight must be higher than the carton tare." : ""),
  },
  "Carton Weight Calculator": {
    phase: "packing",
    blurb: "Gross weight from pack ratio",
    resultLabel: "Gross Carton Weight",
    resultUnit: "kg",
    resultGroup: "weight",
    formula: "Gross = pieces × piece weight + tare",
    note: "Most buyers cap cartons at 20–23 kg for manual handling. Confirm the buyer's carton standard before bulk packing.",
    fields: [
      f("pieces", "Pieces / carton", "pcs", 24, "Approved pack ratio."),
      f("piece", "Packed piece weight", "g", 450, "Garment + polybag.", "weight"),
      f("tare", "Carton tare", "kg", 1.2, "Empty carton.", "weight"),
    ],
    calc: (v) => v.pieces * v.piece + v.tare,
    status: (v, r) => (r <= 20 ? ["OK", "ok"] : r <= 25 ? ["HEAVY", "check"] : ["OVER LIMIT", "fail"]),
  },
  "Polybag Size Calculator": {
    phase: "packing",
    blurb: "Bag dimensions from folded garment",
    resultLabel: "Bag Size",
    resultUnit: "cm",
    formula: "Bag size = folded size + allowance",
    note: "Confirm the final bag with a packed sample. Increase allowance for bulky folding, inserts or hangtags.",
    fields: [
      f("length", "Folded length", "cm", 32, "Folded garment length.", "length"),
      f("width", "Folded width", "cm", 24, "Folded garment width.", "length"),
      f("allowance", "Allowance", "cm", 4, "Packing ease.", "length"),
    ],
    calc: () => 0,
    display: (v) => `${fmt(UNIT_GROUPS.length.fromBase(v.length + v.allowance, "cm"))} × ${fmt(UNIT_GROUPS.length.fromBase(v.width + v.allowance, "cm"))}`,
    detail: () => "Displayed in cm (length × width).",
  },
  "Roll Weight Calculator": {
    phase: "packing",
    blurb: "Fabric roll weight for shipping",
    resultLabel: "Roll Weight",
    resultUnit: "kg",
    resultGroup: "weight",
    formula: "Roll kg = length × width × GSM ÷ 1000 + core",
    note: "Use for fabric roll packing and shipment weight planning.",
    fields: [
      f("length", "Roll length", "m", 100, "Fabric length on roll.", "length"),
      f("width", "Fabric width", "cm", 160, "Full width.", "length"),
      f("gsm", "GSM", "", 180, "Fabric weight."),
      f("core", "Core weight", "kg", 1.2, "Tube or core.", "weight"),
    ],
    calc: (v) => (v.length * v.width * v.gsm) / 1000 + v.core,
  },
  "Packing Ratio Calculator": {
    phase: "packing",
    blurb: "Carton count for the shipment",
    resultLabel: "Cartons Needed",
    resultUnit: "cartons",
    formula: "Cartons = ceil(quantity ÷ pieces per carton)",
    note: "Use after the pack ratio (solid size / ratio pack) is approved by the buyer.",
    fields: [
      f("qty", "Quantity", "pcs", 5000, "Total pieces."),
      f("per", "Pieces / carton", "pcs", 24, "Approved pack ratio."),
    ],
    calc: (v) => Math.ceil(v.qty / v.per),
  },
  "Packing & Shipment Dashboard": {
    phase: "packing",
    blurb: "Cartons, CBM, weight and container fit",
    resultLabel: "Total Volume",
    resultUnit: "CBM",
    resultGroup: "volume",
    formula: "Cartons = ceil(qty ÷ pcs per carton); CBM = carton L × W × H × cartons",
    note: "Use outer carton dimensions and approved pack ratio. Container fit is a volume guide, not a loading guarantee.",
    fields: [
      f("qty", "Shipment quantity", "pcs", 5000, "Pieces to ship."),
      f("per", "Pieces / carton", "pcs", 24, "Approved pack ratio."),
      f("length", "Carton length", "cm", 60, "Outer length.", "length"),
      f("width", "Carton width", "cm", 40, "Outer width.", "length"),
      f("height", "Carton height", "cm", 35, "Outer height.", "length"),
      f("gross", "Gross / carton", "kg", 16, "Gross weight per carton.", "weight"),
    ],
    calc: (v) => packingShipmentData(v).cbm,
    status: (v, r) => (r <= 28 ? ["FITS 20FT / LCL", "ok"] : r <= 68 ? ["FITS 40HQ", "ok"] : ["MULTI-CONTAINER", "check"]),
    detail: (v) => {
      const d = packingShipmentData(v);
      return `Cartons: ${fmt(d.cartons)}. Gross weight: ${fmt(d.grossWeight)} kg. 40HQ volume use: ${fmt(d.hqUse)}%.`;
    },
    metrics: (v) => {
      const d = packingShipmentData(v);
      return [
        { label: "Cartons", value: fmt(d.cartons) },
        { label: "Total CBM", value: `${fmt(d.cbm)} CBM` },
        { label: "Gross weight", value: `${fmt(d.grossWeight)} kg` },
        { label: "40HQ use", value: `${fmt(d.hqUse)}%` },
      ];
    },
    chart: (v) => {
      const d = packingShipmentData(v);
      return {
        title: "Container Volume Usage",
        note: "Reference capacities: 20ft 28 CBM, 40ft 58 CBM, 40HQ 68 CBM.",
        bars: [
          { label: "20ft", value: d.ft20, color: d.ft20 > 100 ? "red" : "blue", suffix: "%" },
          { label: "40ft", value: d.ft40, color: d.ft40 > 100 ? "red" : "green", suffix: "%" },
          { label: "40HQ", value: d.hqUse, color: d.hqUse > 100 ? "red" : "gold", suffix: "%" },
        ],
        max: 100,
      };
    },
  },

  // ════════ SHIPPING & LOGISTICS ════════
  "CBM Calculator": {
    phase: "logistics",
    blurb: "Shipment volume from carton dimensions",
    resultLabel: "Total Volume",
    resultUnit: "CBM",
    resultGroup: "volume",
    formula: "CBM = L × W × H × carton quantity",
    note: "Use outer carton dimensions, not inner.",
    fields: [
      f("length", "Carton length", "cm", 60, "Outer length.", "length"),
      f("width", "Carton width", "cm", 40, "Outer width.", "length"),
      f("height", "Carton height", "cm", 35, "Outer height.", "length"),
      f("qty", "Cartons", "", 100, "Carton quantity."),
    ],
    calc: (v) => v.length * v.width * v.height * v.qty,
    metrics: (v, r) => [
      { label: "Total CBM", value: `${fmt(r)} CBM` },
      { label: "20ft use", value: `${fmt((r / 28) * 100)}%` },
      { label: "40HQ use", value: `${fmt((r / 68) * 100)}%` },
    ],
    chart: (v, r) => ({
      title: "Container Volume Reference",
      note: "Reference capacities: 20ft 28 CBM, 40ft 58 CBM, 40HQ 68 CBM.",
      bars: [
        { label: "20ft", value: (r / 28) * 100, color: r > 28 ? "red" : "blue", suffix: "%" },
        { label: "40ft", value: (r / 58) * 100, color: r > 58 ? "red" : "green", suffix: "%" },
        { label: "40HQ", value: (r / 68) * 100, color: r > 68 ? "red" : "gold", suffix: "%" },
      ],
      max: 100,
    }),
  },
  "Container Loading Calculator": {
    phase: "logistics",
    blurb: "Cartons that fit at real loading efficiency",
    resultLabel: "Cartons Loadable",
    resultUnit: "cartons",
    formula: "Cartons = floor(usable CBM × efficiency% ÷ carton CBM)",
    note: "Volume estimate only — confirm with a physical loading plan. 85–90% efficiency is realistic for uniform cartons.",
    fields: [
      f("container", "Usable volume", "CBM", 58, "Container volume.", "volume"),
      f("carton", "Carton volume", "CBM", 0.084, "One carton CBM.", "volume"),
      f("eff", "Loading efficiency", "%", 88, "Realistic stacking efficiency."),
    ],
    calc: (v) => Math.floor((v.container * v.eff) / 100 / v.carton),
  },
  "Air Chargeable Weight": {
    phase: "logistics",
    blurb: "Volumetric vs actual — what air freight bills",
    resultLabel: "Chargeable Weight",
    resultUnit: "kg",
    formula: "Chargeable = max(actual weight, L × W × H ÷ 6000 per carton × cartons)",
    note: "IATA divisor 6000 (cm³/kg). Light bulky goods (puffer jackets, towels) get billed on volume — compress or vacuum-pack where the buyer allows.",
    isNew: true,
    fields: [
      f("cartons", "Cartons", "", 40, "Carton count."),
      f("length", "Carton length", "cm", 60, "Outer length.", "length"),
      f("width", "Carton width", "cm", 40, "Outer width.", "length"),
      f("height", "Carton height", "cm", 35, "Outer height.", "length"),
      f("gross", "Gross / carton", "kg", 12, "Actual gross per carton.", "weight"),
    ],
    calc: (v) => {
      const volumetric = ((v.length * 100 * (v.width * 100) * (v.height * 100)) / 6000) * v.cartons;
      return Math.max(v.cartons * v.gross, volumetric);
    },
    detail: (v) => {
      const volumetric = ((v.length * 100 * (v.width * 100) * (v.height * 100)) / 6000) * v.cartons;
      const actual = v.cartons * v.gross;
      return volumetric > actual
        ? `Billed on VOLUME: volumetric ${fmt(volumetric)} kg vs actual ${fmt(actual)} kg — you pay for ${fmt(volumetric - actual)} kg of air.`
        : `Billed on ACTUAL weight (${fmt(actual)} kg). Volumetric is only ${fmt(volumetric)} kg.`;
    },
    metrics: (v, r) => {
      const volumetric = ((v.length * 100 * (v.width * 100) * (v.height * 100)) / 6000) * v.cartons;
      return [
        { label: "Actual weight", value: `${fmt(v.cartons * v.gross)} kg` },
        { label: "Volumetric weight", value: `${fmt(volumetric)} kg` },
        { label: "Chargeable", value: `${fmt(r)} kg` },
      ];
    },
  },
  "Freight Cost Per Unit": {
    phase: "logistics",
    blurb: "Logistics cost spread over the order",
    resultLabel: "Freight / Unit",
    resultUnit: "per unit",
    formula: "Cost/unit = (freight + local charges) ÷ quantity",
    note: "Use the same currency across all cost fields. Include both origin and destination local charges for a true figure.",
    fields: [
      f("freight", "Freight cost", "USD", 1800, "Ocean/air freight."),
      f("local", "Local charges", "USD", 250, "THC, documentation, clearance."),
      f("qty", "Quantity", "pcs", 10000, "Shipped quantity."),
    ],
    calc: (v) => (v.freight + v.local) / v.qty,
  },
  "FOB to CIF / CFR": {
    phase: "logistics",
    blurb: "Convert FOB to CIF or CFR for buyer quoting",
    resultLabel: "CIF / CFR",
    resultUnit: "USD per unit",
    formula: "CIF = FOB + (freight ÷ qty) + FOB × insurance%",
    note: "CFR excludes insurance — set insurance to 0 for a CFR quote. Use CIF when the buyer requests insurance in the shipment terms.",
    isNew: true,
    fields: [
      f("fob", "FOB per unit", "USD", 8.5, "FOB price per piece."),
      f("freight", "Total freight cost", "USD", 1800, "Full ocean or air freight charge."),
      f("qty", "Quantity", "pcs", 5000, "Units in the shipment."),
      f("ins", "Insurance rate", "%", 0.15, "Typically 0.1–0.2% of FOB for general cargo."),
    ],
    calc: (v) => v.fob + v.freight / Math.max(v.qty, 1) + (v.fob * v.ins) / 100,
    detail: (v, r) => {
      const freightPerUnit = v.freight / Math.max(v.qty, 1);
      const insPerUnit = (v.fob * v.ins) / 100;
      const uplift = ((r - v.fob) / v.fob) * 100;
      return `Freight/unit: ${fmt(freightPerUnit)} + Insurance/unit: ${fmt(insPerUnit)} → Uplift: ${fmt(uplift)}% over FOB.`;
    },
    metrics: (v, r) => {
      const freightPerUnit = v.freight / Math.max(v.qty, 1);
      const insPerUnit = (v.fob * v.ins) / 100;
      return [
        { label: "FOB / unit", value: `${fmt(v.fob)} USD` },
        { label: "Freight / unit", value: `${fmt(freightPerUnit)} USD` },
        { label: "Insurance / unit", value: `${fmt(insPerUnit)} USD` },
        { label: "CIF / unit", value: `${fmt(r)} USD` },
      ];
    },
  },
  "Landed Cost Calculator": {
    phase: "logistics",
    blurb: "FOB to door — duty, freight and clearance",
    resultLabel: "Landed Cost",
    resultUnit: "per unit",
    formula: "Landed = FOB + duty% + (freight + clearance) ÷ quantity",
    note: "Simplified — many customs regimes apply duty on CIF, not FOB. Check the HS-code duty rate for the destination market before quoting DDP.",
    isNew: true,
    fields: [
      f("fob", "FOB price / unit", "USD", 4.5, "Your unit price."),
      f("qty", "Quantity", "pcs", 10000, "Shipped quantity."),
      f("duty", "Import duty", "%", 12, "Destination duty rate on this HS code."),
      f("freight", "Total freight", "USD", 2200, "Ocean/air freight for the lot."),
      f("clearance", "Clearance & delivery", "USD", 600, "Destination charges."),
    ],
    calc: (v) => landedData(v).landed,
    detail: (v) => {
      const d = landedData(v);
      return `Landing adds ${fmt(d.uplift)}% on top of FOB. Duty ${fmt(d.dutyUnit)}/unit, freight ${fmt(d.freightUnit)}/unit, clearance ${fmt(d.clearUnit)}/unit.`;
    },
    metrics: (v) => {
      const d = landedData(v);
      return [
        { label: "Duty / unit", value: fmt(d.dutyUnit) },
        { label: "Freight / unit", value: fmt(d.freightUnit) },
        { label: "Clearance / unit", value: fmt(d.clearUnit) },
        { label: "Uplift over FOB", value: `${fmt(d.uplift)}%` },
      ];
    },
    chart: (v) => {
      const d = landedData(v);
      return {
        title: "Landed Cost Build-Up",
        bars: [
          { label: "FOB", value: v.fob, color: "gold" },
          { label: "Duty", value: d.dutyUnit, color: "amber" },
          { label: "Freight", value: d.freightUnit, color: "blue" },
          { label: "Clearance", value: d.clearUnit, color: "navy" },
        ],
      };
    },
  },
  "Shipment Gross Weight": {
    phase: "logistics",
    blurb: "Document weight for the packing list",
    resultLabel: "Gross Weight",
    resultUnit: "kg",
    resultGroup: "weight",
    formula: "Gross kg = cartons × gross per carton + pallet/extra weight",
    note: "Use the final packing list for shipping documents — estimates here are for planning only.",
    fields: [
      f("cartons", "Cartons", "", 100, "Total cartons."),
      f("gross", "Gross / carton", "kg", 16, "Gross per carton.", "weight"),
      f("extra", "Pallet / extra", "kg", 80, "Pallets, straps, dunnage.", "weight"),
    ],
    calc: (v) => v.cartons * v.gross + v.extra,
  },
  "Pallet Loading Calculator": {
    phase: "logistics",
    blurb: "Cartons per pallet footprint",
    resultLabel: "Cartons per Pallet",
    resultUnit: "cartons",
    formula: "Cartons = floor(pallet L ÷ carton L) × floor(pallet W ÷ carton W) × layers",
    note: "Check pallet height limits, carton compression strength and the buyer's pallet specification (Euro 120×80 vs Standard 120×100).",
    fields: [
      f("palletL", "Pallet length", "cm", 120, "Pallet length.", "length"),
      f("palletW", "Pallet width", "cm", 100, "Pallet width.", "length"),
      f("cartonL", "Carton length", "cm", 60, "Carton length.", "length"),
      f("cartonW", "Carton width", "cm", 40, "Carton width.", "length"),
      f("layers", "Layers", "", 4, "Stacking layers."),
    ],
    calc: (v) => Math.floor(v.palletL / v.cartonL) * Math.floor(v.palletW / v.cartonW) * v.layers,
  },
};

// ─── Derived lookups ──────────────────────────────────────────────────────────

export const TOOL_NAMES = Object.keys(TOOLS);

export function toolsForPhase(phaseId: string): string[] {
  return TOOL_NAMES.filter((name) => TOOLS[name].phase === phaseId);
}

export const TOTAL_TOOL_COUNT = TOOL_NAMES.length;
export const NEW_TOOL_COUNT = TOOL_NAMES.filter((n) => TOOLS[n].isNew).length;

// ─── Generic validation ───────────────────────────────────────────────────────

const PERCENT_CAP_FIELDS = new Set(["eff", "reject", "recovery", "rating", "primary", "margin", "rework"]);

export function validateValues(tool: ToolDef, v: Values): string {
  for (const fl of tool.fields) {
    const val = v[fl.id];
    if (!isFinite(val)) return "Enter valid numbers only.";
    if (!fl.allowNeg && val < 0) return "Enter valid positive numbers only.";
    if (PERCENT_CAP_FIELDS.has(fl.id) && val > 100) return "Percentage values above 100% are not practical here — check the input.";
  }
  if (tool.validate) {
    const msg = tool.validate(v);
    if (msg) return msg;
  }
  return "";
}

// ─── Status fallback ──────────────────────────────────────────────────────────

export function statusFor(tool: ToolDef, v: Values, r: number): [string, StatusTone] {
  if (tool.status) return tool.status(v, r);
  return ["PLANNING", "ok"];
}
