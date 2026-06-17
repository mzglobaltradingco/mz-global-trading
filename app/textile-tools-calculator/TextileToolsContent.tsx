"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import PageHero from "@/components/PageHero";
import ShareBar from "@/components/ShareBar";
import { fadeUpVariants, viewportOnce } from "@/lib/animations";
import {
  PHASES,
  TOOLS,
  TOTAL_TOOL_COUNT,
  toolsForPhase,
  UNIT_GROUPS,
  CONVERTER_UNITS,
  groupForUnit,
  validateValues,
  statusFor,
  fmt,
  type Values,
  type StatusTone,
  type BarColor,
} from "@/lib/textile-tools";

// ─── Local animation variants ─────────────────────────────────────────────────

const workspaceVariant: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

const fieldsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const fieldItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const BAR_COLORS: Record<BarColor, string> = {
  gold: "#D4A017",
  navy: "#41587a",
  green: "#059669",
  red: "#dc2626",
  amber: "#d97706",
  blue: "#3b82f6",
};

const STATUS_STYLES: Record<StatusTone, string> = {
  ok: "bg-emerald-50 text-emerald-700 border-emerald-200",
  check: "bg-amber-50 text-amber-700 border-amber-200",
  fail: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_DOT: Record<StatusTone, string> = {
  ok: "bg-emerald-400",
  check: "bg-amber-400",
  fail: "bg-red-400",
};

interface RecentEntry {
  name: string;
  result: string;
  time: string;
}

const RECENT_KEY = "ttx_recent_v2";

const darkInput =
  "w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all";
const darkSelect =
  "px-2 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold";

// ─── Component ────────────────────────────────────────────────────────────────

export default function TextileToolsContent() {
  const [phaseId, setPhaseId] = useState(PHASES[0].id);
  const [toolName, setToolName] = useState(toolsForPhase(PHASES[0].id)[0]);
  const [search, setSearch] = useState("");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [units, setUnits] = useState<Record<string, string>>({});
  const [resultUnit, setResultUnit] = useState("");
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Quick converter state
  const [convValue, setConvValue] = useState("1");
  const [convFrom, setConvFrom] = useState("cm");
  const [convTo, setConvTo] = useState("inch");

  const consoleRef = useRef<HTMLDivElement>(null);
  const consoleInView = useInView(consoleRef, { margin: "-120px 0px -120px 0px" });

  const tool = TOOLS[toolName];

  // Initialise field state whenever the tool changes
  useEffect(() => {
    const nextInputs: Record<string, string> = {};
    const nextUnits: Record<string, string> = {};
    tool.fields.forEach((fl) => {
      nextInputs[fl.id] = String(fl.def);
      if (fl.group) nextUnits[fl.id] = fl.unit ?? UNIT_GROUPS[fl.group].base;
    });
    setInputs(nextInputs);
    setUnits(nextUnits);
    setResultUnit(tool.resultGroup ? tool.resultUnit : "");
    setCopied(false);
    setSaved(false);
  }, [toolName, tool]);

  // Load recent calculations once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw) as RecentEntry[]);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  // ── Live calculation ─────────────────────────────────────────────────────────

  const computed = useMemo(() => {
    const values: Values = {};
    for (const fl of tool.fields) {
      const raw = parseFloat(inputs[fl.id] ?? "");
      values[fl.id] = fl.group ? UNIT_GROUPS[fl.group].toBase(raw, units[fl.id] ?? UNIT_GROUPS[fl.group].base) : raw;
    }
    const error = validateValues(tool, values);
    if (error) return { error, values, result: 0, shown: "", unit: "", status: ["", "ok"] as [string, StatusTone] };

    const result = tool.calc(values);
    if (!isFinite(result) && !tool.display) {
      return { error: "A required value is zero or invalid — correct the inputs to calculate.", values, result: 0, shown: "", unit: "", status: ["", "ok"] as [string, StatusTone] };
    }

    let shown: string;
    let unit: string;
    if (tool.display) {
      shown = tool.display(values, result);
      unit = tool.resultUnit;
    } else if (tool.resultGroup && resultUnit) {
      shown = fmt(UNIT_GROUPS[tool.resultGroup].fromBase(result, resultUnit));
      unit = resultUnit;
    } else {
      shown = fmt(result);
      unit = tool.resultUnit;
    }

    return { error: "", values, result, shown, unit, status: statusFor(tool, values, result) };
  }, [tool, inputs, units, resultUnit]);

  const buyerNote = useMemo(() => {
    if (computed.error) return "";
    const inputLines = tool.fields
      .map((fl) => `${fl.label}: ${inputs[fl.id] ?? ""}${fl.group ? ` ${units[fl.id] ?? ""}` : fl.unit ? ` ${fl.unit}` : ""}`)
      .join("; ");
    const detail = tool.detail ? tool.detail(computed.values, computed.result) : "";
    return [
      `Calculator: ${toolName} — MZ Global Trading (mzglobaltrading.com)`,
      `Result: ${computed.shown} ${computed.unit}${computed.status[0] ? ` (${computed.status[0]})` : ""}`,
      `Formula: ${tool.formula}`,
      `Inputs: ${inputLines}`,
      detail ? `Detail: ${detail}` : "",
      `Note: ${tool.note}`,
      "Action: Verify against buyer specification, approved sample, lab report or shipment terms before final commitment.",
    ]
      .filter(Boolean)
      .join("\n");
  }, [tool, toolName, inputs, units, computed]);

  // ── Actions ──────────────────────────────────────────────────────────────────

  const selectTool = useCallback((name: string) => {
    setToolName(name);
    setPhaseId(TOOLS[name].phase);
    setSearch("");
  }, []);

  const copyNote = useCallback(() => {
    if (!buyerNote) return;
    navigator.clipboard.writeText(buyerNote).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [buyerNote]);

  const saveResult = useCallback(() => {
    if (computed.error) return;
    const entry: RecentEntry = {
      name: toolName,
      result: `${computed.shown} ${computed.unit}`,
      time: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };
    setRecent((prev) => {
      const next = [entry, ...prev].slice(0, 6);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [computed, toolName]);

  // ── Search across all phases ─────────────────────────────────────────────────

  const sidebarTools = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return toolsForPhase(phaseId);
    return Object.keys(TOOLS).filter(
      (name) => name.toLowerCase().includes(term) || TOOLS[name].blurb.toLowerCase().includes(term)
    );
  }, [phaseId, search]);

  // ── Quick converter ──────────────────────────────────────────────────────────

  const convResult = useMemo(() => {
    const val = parseFloat(convValue);
    const fromGroup = groupForUnit(convFrom);
    const toGroup = groupForUnit(convTo);
    if (!isFinite(val) || !fromGroup || fromGroup !== toGroup) return "Select compatible units";
    const base = UNIT_GROUPS[fromGroup].toBase(val, convFrom);
    return `${fmt(UNIT_GROUPS[fromGroup].fromBase(base, convTo))} ${convTo}`;
  }, [convValue, convFrom, convTo]);

  const detailText = !computed.error && tool.detail ? tool.detail(computed.values, computed.result) : "";
  const metricsList = !computed.error && tool.metrics ? tool.metrics(computed.values, computed.result) : [];
  const chartDef = !computed.error && tool.chart ? tool.chart(computed.values, computed.result) : null;
  const chartMax = chartDef ? chartDef.max ?? Math.max(...chartDef.bars.map((b) => Math.abs(b.value)), 1) : 1;
  const activePhase = PHASES.find((p) => p.id === phaseId) ?? PHASES[0];

  const scrollToWorkspace = () => {
    document.getElementById("ttx-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <PageHero
        image="/images/hero/hero-textile-tools-calculator.webp"
        imageAlt="MZ Global Trading textile tools calculator — costing, GSM, AQL, CBM and planning tools for textile buyers and factory teams"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Corporate" },
          { label: "Textile Tools Calculator" },
        ]}
        label="Resources"
        title="Textile Tools"
        titleGold="Calculator"
        description="Costing, GSM, yarn, QA, packing, CBM and shipment calculators — built for buyers, merchandisers and every desk in the textile supply chain."
        pills={[`${TOTAL_TOOL_COUNT} Calculators`, "9 Workflow Phases", "Free to Use"]}
      />

      {/* ── Console workspace ─────────────────────────────────────────────────── */}
      <section id="ttx-workspace" className="py-10 sm:py-12 bg-gray-50 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={consoleRef}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-navy-950 border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* ── Console top bar: phase pills + search ── */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 px-4 sm:px-5 py-4 border-b border-white/10">
              <div
                className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 -mx-1 px-1"
                role="tablist"
                aria-label="Calculator phases"
              >
                {PHASES.map((p) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={phaseId === p.id}
                    onClick={() => selectTool(toolsForPhase(p.id)[0])}
                    className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors min-h-[40px] ${
                      phaseId === p.id ? "text-navy-900" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {phaseId === p.id && (
                      <motion.span
                        layoutId="phase-pill"
                        className="absolute inset-0 bg-gold rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{p.short}</span>
                  </button>
                ))}
              </div>
              <div className="lg:w-72 flex-shrink-0">
                <label htmlFor="tool-search" className="sr-only">Search all calculators</label>
                <div className="relative">
                  <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    id="tool-search"
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Search ${TOTAL_TOOL_COUNT} calculators...`}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ── Mobile tool picker ── */}
            <div className="lg:hidden px-4 sm:px-5 pt-4">
              <label htmlFor="mobile-tool" className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                {activePhase.label} — {toolsForPhase(phaseId).length} calculators
              </label>
              <select
                id="mobile-tool"
                value={toolName}
                onChange={(e) => selectTool(e.target.value)}
                className={`${darkSelect} w-full`}
              >
                {toolsForPhase(phaseId).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            {/* ── Console body: sidebar + workspace ── */}
            <div className="grid lg:grid-cols-[290px,1fr] lg:h-[calc(100vh-240px)] lg:min-h-[540px]">

              {/* Sidebar */}
              <div className="hidden lg:flex lg:flex-col lg:min-h-0 border-r border-white/10 p-3">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  {search.trim()
                    ? `${sidebarTools.length} result${sidebarTools.length === 1 ? "" : "s"} — all phases`
                    : `${activePhase.label} · ${sidebarTools.length} tools`}
                </p>
                <div className="flex flex-col gap-1 lg:flex-1 lg:min-h-0 overflow-y-auto pr-1 [scrollbar-width:thin]">
                  {sidebarTools.map((name) => {
                    const isActive = name === toolName;
                    return (
                      <button
                        key={name}
                        onClick={() => selectTool(name)}
                        className={`relative text-left pl-5 pr-3 py-3 rounded-xl transition-colors min-h-[44px] ${
                          isActive ? "bg-white/10" : "hover:bg-white/5"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="tool-indicator"
                            className="absolute left-1.5 top-3 bottom-3 w-1 rounded-full bg-gold"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          />
                        )}
                        <span className={`flex items-center gap-2 font-semibold text-sm leading-tight ${isActive ? "text-white" : "text-gray-300"}`}>
                          {name}
                          {TOOLS[name].isNew && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold/15 text-gold">New</span>
                          )}
                        </span>
                        <span className={`block text-xs mt-0.5 leading-tight ${isActive ? "text-gray-400" : "text-gray-500"}`}>
                          {TOOLS[name].blurb}
                        </span>
                      </button>
                    );
                  })}
                  {sidebarTools.length === 0 && (
                    <p className="text-sm text-gray-500 px-4 py-6 text-center">No calculator matches that search.</p>
                  )}
                </div>
              </div>

              {/* Workspace */}
              <div className="p-4 sm:p-5 lg:h-full lg:min-h-0 lg:overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div key={toolName} variants={workspaceVariant} initial="hidden" animate="visible" exit="exit" className="grid lg:grid-cols-5 gap-4 items-start lg:items-stretch lg:h-full lg:min-h-0">

                    {/* Inputs panel — dark */}
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4 lg:min-h-0 lg:overflow-y-auto [scrollbar-width:thin]">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="text-white font-bold text-base leading-tight">{toolName}</h3>
                        {tool.isNew && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gold/15 text-gold flex-shrink-0">New</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs mb-4">{tool.blurb}</p>

                      <motion.div variants={fieldsContainer} initial="hidden" animate="visible" className="space-y-3">
                        {tool.fields.map((fl) => (
                          <motion.div key={fl.id} variants={fieldItem}>
                            <label htmlFor={`fld-${fl.id}`} className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                              {fl.label}
                              {fl.unit && !fl.group && <span className="text-gray-600 normal-case font-normal"> ({fl.unit})</span>}
                            </label>
                            <div className={fl.group ? "grid grid-cols-[1fr,92px] gap-2" : ""}>
                              <input
                                id={`fld-${fl.id}`}
                                type="number"
                                step="any"
                                min={0}
                                value={inputs[fl.id] ?? ""}
                                onChange={(e) => setInputs((prev) => ({ ...prev, [fl.id]: e.target.value }))}
                                className={darkInput}
                              />
                              {fl.group && (
                                <select
                                  aria-label={`Unit for ${fl.label}`}
                                  value={units[fl.id] ?? ""}
                                  onChange={(e) => setUnits((prev) => ({ ...prev, [fl.id]: e.target.value }))}
                                  className={darkSelect}
                                >
                                  {UNIT_GROUPS[fl.group].units.map((u) => (
                                    <option key={u} value={u}>{u}</option>
                                  ))}
                                </select>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-500 mt-1 leading-snug">{fl.help}</p>
                          </motion.div>
                        ))}

                        {tool.resultGroup && (
                          <motion.div variants={fieldItem} className="pt-3 border-t border-white/10">
                            <label htmlFor="result-unit" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Result unit</label>
                            <select
                              id="result-unit"
                              value={resultUnit}
                              onChange={(e) => setResultUnit(e.target.value)}
                              className={`${darkSelect} w-full`}
                            >
                              {UNIT_GROUPS[tool.resultGroup].units.map((u) => (
                                <option key={u} value={u}>{u}</option>
                              ))}
                            </select>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>

                    {/* Results panel — bright focal card */}
                    <div className="lg:col-span-3 bg-white rounded-2xl p-4 sm:p-5 lg:min-h-0 lg:overflow-y-auto [scrollbar-width:thin]">
                      {computed.error ? (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-8 text-center">
                          <p className="text-amber-700 text-sm font-medium">{computed.error}</p>
                        </div>
                      ) : (
                        <>
                          {/* Hero result strip */}
                          <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-xl px-5 py-4 mb-4 relative overflow-hidden">
                            <div
                              className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold/10 blur-2xl pointer-events-none"
                              aria-hidden="true"
                            />
                            <p
                              className="absolute -right-3 bottom-2 text-white/5 font-black text-3xl tracking-widest -rotate-12 pointer-events-none select-none"
                              aria-hidden="true"
                            >
                              MZ GLOBAL
                            </p>
                            <div className="flex flex-wrap items-center justify-between gap-4 relative">
                              <div>
                                <p className="text-gold text-[10px] font-bold uppercase tracking-widest mb-1.5">{tool.resultLabel}</p>
                                <div className="flex items-baseline gap-2 flex-wrap">
                                  <motion.span
                                    key={computed.shown}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-white font-black text-3xl sm:text-4xl leading-none tracking-tight"
                                  >
                                    {computed.shown}
                                  </motion.span>
                                  <span className="text-gray-400 text-sm font-semibold">{computed.unit}</span>
                                </div>
                              </div>
                              <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${STATUS_STYLES[computed.status[1]]}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[computed.status[1]]}`} aria-hidden="true" />
                                {computed.status[0]}
                              </span>
                            </div>
                          </div>

                          {/* KPI metrics */}
                          {metricsList.length > 0 && (
                            <motion.div variants={fieldsContainer} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                              {metricsList.map((m) => (
                                <motion.div key={m.label} variants={fieldItem} className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1 leading-tight">{m.label}</p>
                                  <p className="text-navy-900 font-bold text-sm leading-tight break-words">{m.value}</p>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}

                          {/* Chart */}
                          {chartDef && (
                            <div className="border border-gray-100 rounded-xl p-4 mb-4">
                              <p className="text-navy-900 font-bold text-sm mb-3">{chartDef.title}</p>
                              <div className="space-y-2.5">
                                {chartDef.bars.map((bar, i) => {
                                  const pct = Math.min((Math.abs(bar.value) / chartMax) * 100, 100);
                                  return (
                                    <div key={bar.label} className="grid grid-cols-[80px,1fr,76px] sm:grid-cols-[104px,1fr,84px] items-center gap-3">
                                      <span className="text-gray-500 text-xs font-semibold truncate">{bar.label}</span>
                                      <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${pct}%` }}
                                          transition={{ type: "spring", stiffness: 110, damping: 20, delay: i * 0.07 }}
                                          className="h-full rounded-full"
                                          style={{ backgroundColor: BAR_COLORS[bar.color] }}
                                        />
                                      </div>
                                      <span className="text-navy-900 text-xs font-bold text-right tabular-nums">
                                        {fmt(bar.value)}{bar.suffix ?? ""}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                              {chartDef.note && <p className="text-gray-400 text-xs mt-3.5">{chartDef.note}</p>}
                            </div>
                          )}

                          {/* Detail */}
                          {detailText && (
                            <div className="bg-gold/5 border border-gold/20 rounded-xl px-4 py-3 mb-4">
                              <p className="text-navy-900 text-xs sm:text-sm leading-relaxed">{detailText}</p>
                            </div>
                          )}

                          {/* Formula + note */}
                          <div className="grid sm:grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">Formula</p>
                              <p className="text-navy-900 text-xs sm:text-sm font-medium leading-relaxed">{tool.formula}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                              <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-1.5">Practical Note</p>
                              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{tool.note}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={copyNote}
                              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 text-white font-bold text-sm rounded-lg hover:bg-navy-900/90 transition-colors min-h-[44px]"
                            >
                              {copied ? (
                                <>
                                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Copied
                                </>
                              ) : (
                                "Copy Buyer / QA Note"
                              )}
                            </button>
                            <button
                              onClick={saveResult}
                              className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 text-navy-900 font-semibold text-sm rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]"
                            >
                              {saved ? "Saved ✓" : "Save to Recent"}
                            </button>
                            <button
                              onClick={() => window.print()}
                              className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 text-navy-900 font-semibold text-sm rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]"
                            >
                              Print / PDF
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Console footer: disclaimer ── */}
            <div className="px-4 sm:px-6 py-4 border-t border-white/10">
              <p className="text-gray-500 text-xs leading-relaxed">
                <strong className="text-gray-400">Planning tools only.</strong> Final pass/fail, tolerances, AQL acceptance,
                test methods, carton limits and commercial terms must follow the buyer specification, approved sample, lab
                report, factory standard or shipment contract.
              </p>
            </div>
          </motion.div>

          {/* ── Converter + recent ── */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <h3 className="text-navy-900 font-bold text-lg mb-4">Quick Unit Converter</h3>
              <div className="grid grid-cols-[1fr,90px,90px] gap-2 items-end">
                <div>
                  <label htmlFor="conv-value" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Value</label>
                  <input
                    id="conv-value"
                    type="number"
                    step="any"
                    value={convValue}
                    onChange={(e) => setConvValue(e.target.value)}
                    className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="conv-from" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">From</label>
                  <select
                    id="conv-from"
                    value={convFrom}
                    onChange={(e) => setConvFrom(e.target.value)}
                    className="w-full px-2 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                  >
                    {CONVERTER_UNITS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="conv-to" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">To</label>
                  <select
                    id="conv-to"
                    value={convTo}
                    onChange={(e) => setConvTo(e.target.value)}
                    className="w-full px-2 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                  >
                    {CONVERTER_UNITS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 bg-navy-900 rounded-xl px-5 py-4 text-center">
                <p className="text-gold text-[10px] font-bold uppercase tracking-widest mb-1">Converted Result</p>
                <p className="text-white font-bold text-xl">{convResult}</p>
              </div>
              <p className="text-gray-400 text-xs mt-3">Length, weight, volume and yarn count (Ne / Nm / tex / denier) systems supported.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <h3 className="text-navy-900 font-bold text-lg mb-4">Recent Calculations</h3>
              {recent.length === 0 ? (
                <div className="border border-dashed border-gray-200 rounded-xl px-5 py-8 text-center">
                  <p className="text-gray-400 text-sm">No saved calculations yet — use &quot;Save to Recent&quot; on any result.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {recent.map((entry, i) => (
                    <button
                      key={`${entry.name}-${i}`}
                      onClick={() => {
                        selectTool(entry.name);
                        scrollToWorkspace();
                      }}
                      className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-gold transition-colors min-h-[44px]"
                    >
                      <div className="min-w-0">
                        <p className="text-navy-900 font-semibold text-sm truncate">{entry.name}</p>
                        <p className="text-gray-400 text-xs">{entry.time}</p>
                      </div>
                      <span className="text-gold font-bold text-sm flex-shrink-0">{entry.result}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Share */}
          <div className="mt-8 flex justify-center">
            <ShareBar
              path="/textile-tools-calculator/"
              title={`Free Textile Tools Calculator — ${TOTAL_TOOL_COUNT} calculators for buyers, merchandisers and factory teams`}
              label="Share these tools"
            />
          </div>
        </div>
      </section>

      {/* ── Sticky live result bar (mobile) ───────────────────────────────────── */}
      <AnimatePresence>
        {consoleInView && !computed.error && (
          <motion.div
            initial={{ y: 88 }}
            animate={{ y: 0 }}
            exit={{ y: 88 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-navy-950/95 backdrop-blur-sm border-t border-white/10 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-gold text-[9px] font-bold uppercase tracking-widest">{tool.resultLabel}</p>
                <p className="text-white font-bold text-lg leading-tight truncate">
                  {computed.shown} <span className="text-gray-400 text-xs font-semibold">{computed.unit}</span>
                </p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold flex-shrink-0 ${STATUS_STYLES[computed.status[1]]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[computed.status[1]]}`} aria-hidden="true" />
                {computed.status[0]}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Why these tools ───────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "Formula-Backed Outputs",
                desc: "Every calculator shows its working formula and a practical note, so merchandisers can defend the number in costing, QA and shipment reviews.",
              },
              {
                title: "Buyer-Ready Notes",
                desc: "One click copies a structured result note — calculator, inputs, formula and caveats — ready to paste into an email or tech-pack comment.",
              },
              {
                title: "Owner-Level Visibility",
                desc: "Break-even, payment-terms cost, currency impact, claim impact and cost of poor quality turn factory numbers into business decisions.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6"
              >
                <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">0{i + 1}</p>
                <h3 className="text-navy-900 font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">From Numbers to Orders</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Put These Calculations Into a Real Quote</h2>
            <p className="text-gray-400 text-base max-w-lg mx-auto mb-8">
              Send us your GSM, consumption and target costs — our team matches them to the right certified Pakistani factory and
              responds within 3–5 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/rfq/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-navy-900 font-bold text-sm rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-gold/20"
              >
                Request a Quote →
              </Link>
              <Link
                href="/guides/"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-semibold text-sm rounded hover:border-gold hover:text-gold transition-colors"
              >
                Browse Sourcing Guides
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
