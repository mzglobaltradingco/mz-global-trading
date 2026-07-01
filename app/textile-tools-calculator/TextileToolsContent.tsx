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

// ─── Animation variants ───────────────────────────────────────────────────────

const workspaceVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
};

const fieldsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
};

const fieldItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const BAR_COLORS: Record<BarColor, string> = {
  gold: "#D4A017", navy: "#41587a", green: "#059669",
  red: "#dc2626", amber: "#d97706", blue: "#3b82f6",
};

const STATUS_STYLES: Record<StatusTone, string> = {
  ok: "bg-emerald-50 text-emerald-700 border-emerald-200",
  check: "bg-amber-50 text-amber-700 border-amber-200",
  fail: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_DOT: Record<StatusTone, string> = {
  ok: "bg-emerald-400", check: "bg-amber-400", fail: "bg-red-400",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface RecentEntry {
  name: string;
  result: string;
  time: string;
  inputs: Record<string, string>;
  units: Record<string, string>;
  resultUnit: string;
}

const RECENT_KEY = "ttx_recent_v3";

// ─── Light theme form styles ──────────────────────────────────────────────────

const inputCls =
  "w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all";
const selectCls =
  "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold";
const selectSmCls =
  "w-full px-2 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold";

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
  const [convValue, setConvValue] = useState("1");
  const [convFrom, setConvFrom] = useState("cm");
  const [convTo, setConvTo] = useState("inch");

  const workspaceRef = useRef<HTMLDivElement>(null);
  const workspaceInView = useInView(workspaceRef, { margin: "-120px 0px -120px 0px" });
  const persistedRef = useRef<Record<string, string>>({});

  const tool = TOOLS[toolName];

  // URL hash deep-linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const name = decodeURIComponent(hash);
    if (TOOLS[name]) {
      setToolName(name);
      setPhaseId(TOOLS[name].phase);
    }
  }, []);

  // Init fields on tool change — carry over persisted values for matching field ids
  useEffect(() => {
    const nextInputs: Record<string, string> = {};
    const nextUnits: Record<string, string> = {};
    tool.fields.forEach((fl) => {
      nextInputs[fl.id] = persistedRef.current[fl.id] ?? String(fl.def);
      if (fl.group) nextUnits[fl.id] = fl.unit ?? UNIT_GROUPS[fl.group].base;
    });
    setInputs(nextInputs);
    setUnits(nextUnits);
    setResultUnit(tool.resultGroup ? tool.resultUnit : "");
    setCopied(false);
    setSaved(false);
  }, [toolName, tool]);

  // Load recent from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw) as RecentEntry[]);
    } catch { /* localStorage unavailable */ }
  }, []);

  // ── Live calculation ──────────────────────────────────────────────────────

  const computed = useMemo(() => {
    const values: Values = {};
    for (const fl of tool.fields) {
      const raw = parseFloat(inputs[fl.id] ?? "");
      values[fl.id] = fl.group
        ? UNIT_GROUPS[fl.group].toBase(raw, units[fl.id] ?? UNIT_GROUPS[fl.group].base)
        : raw;
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
    ].filter(Boolean).join("\n");
  }, [tool, toolName, inputs, units, computed]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const selectTool = useCallback((name: string) => {
    setToolName(name);
    setPhaseId(TOOLS[name].phase);
    setSearch("");
    if (typeof window !== "undefined") window.location.hash = encodeURIComponent(name);
  }, []);

  const handleInput = useCallback((id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
    persistedRef.current[id] = value;
  }, []);

  const resetToDefaults = useCallback(() => {
    const nextInputs: Record<string, string> = {};
    tool.fields.forEach((fl) => {
      nextInputs[fl.id] = String(fl.def);
      delete persistedRef.current[fl.id];
    });
    setInputs(nextInputs);
  }, [tool]);

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
      inputs: { ...inputs },
      units: { ...units },
      resultUnit,
    };
    setRecent((prev) => {
      const next = [entry, ...prev].slice(0, 12);
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [computed, toolName, inputs, units, resultUnit]);

  const loadRecent = useCallback((entry: RecentEntry) => {
    setToolName(entry.name);
    setPhaseId(TOOLS[entry.name].phase);
    if (entry.inputs) {
      setInputs(entry.inputs);
      Object.entries(entry.inputs).forEach(([k, v]) => { persistedRef.current[k] = v; });
    }
    if (entry.units) setUnits(entry.units);
    if (entry.resultUnit !== undefined) setResultUnit(entry.resultUnit);
    if (typeof window !== "undefined") window.location.hash = encodeURIComponent(entry.name);
    setTimeout(() => workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }, []);

  // ── Search ────────────────────────────────────────────────────────────────

  const sidebarTools = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return toolsForPhase(phaseId);
    return Object.keys(TOOLS).filter(
      (name) => name.toLowerCase().includes(term) || TOOLS[name].blurb.toLowerCase().includes(term)
    );
  }, [phaseId, search]);

  // ── Quick converter ───────────────────────────────────────────────────────

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
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Print-only result summary ─────────────────────────────────────── */}
      <div className="hidden print:block p-8 max-w-2xl mx-auto font-sans">
        <div className="border-b-2 border-navy-900 pb-4 mb-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
            MZ Global Trading · mzglobaltrading.com · Textile Tools Calculator
          </p>
          <h1 className="text-2xl font-bold text-navy-900">{toolName}</h1>
          <p className="text-gray-500 text-sm mt-1">{tool.blurb}</p>
        </div>
        {!computed.error && (
          <>
            <div className="border border-gray-200 rounded-xl p-5 mb-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{tool.resultLabel}</p>
              <p className="text-3xl font-black text-navy-900">
                {computed.shown}{" "}
                <span className="text-lg font-semibold text-gray-500">{computed.unit}</span>
              </p>
              {computed.status[0] && (
                <p className="text-sm font-semibold mt-2 text-gray-700">{computed.status[0]}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-5">
              {tool.fields.map((fl) => (
                <div key={fl.id} className="text-sm">
                  <span className="font-semibold text-gray-700">{fl.label}: </span>
                  <span className="text-gray-600">
                    {inputs[fl.id]}{fl.group ? ` ${units[fl.id] ?? ""}` : fl.unit ? ` ${fl.unit}` : ""}
                  </span>
                </div>
              ))}
            </div>
            {detailText && (
              <p className="text-sm text-gray-700 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 mb-4">
                {detailText}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4 mb-5 text-xs">
              <div>
                <p className="font-bold uppercase tracking-wider text-gray-500 mb-1">Formula</p>
                <p className="text-gray-700 leading-relaxed">{tool.formula}</p>
              </div>
              <div>
                <p className="font-bold uppercase tracking-wider text-gray-500 mb-1">Practical Note</p>
                <p className="text-gray-600 leading-relaxed">{tool.note}</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 border-t border-gray-100 pt-4 leading-relaxed">
              Planning tool only. Verify against buyer specification, approved sample, lab report or shipment contract
              before final commitment.
            </p>
          </>
        )}
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
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

      {/* ── Main workspace ────────────────────────────────────────────────── */}
      <section id="ttx-workspace" className="print:hidden py-10 sm:py-12 bg-gray-50 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search + mobile phase pills */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            {/* Mobile-only: horizontal phase pills */}
            <div
              className="lg:hidden flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-1 -mx-1 px-1"
              role="tablist"
              aria-label="Calculator phases"
            >
              {PHASES.map((p) => {
                const isActive = phaseId === p.id && !search.trim();
                return (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => { setPhaseId(p.id); setSearch(""); const first = toolsForPhase(p.id)[0]; if (first) selectTool(first); }}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] border ${
                      isActive ? "bg-gold text-navy-900 border-gold" : "bg-white text-gray-500 border-gray-200 hover:border-gold/50"
                    }`}
                  >
                    {p.short}
                    <span className={`text-[9px] font-bold px-1 py-0.5 rounded-full leading-none ${isActive ? "bg-navy-900/15 text-navy-900" : "bg-gray-100 text-gray-500"}`}>
                      {toolsForPhase(p.id).length}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Search */}
            <div className="sm:ml-auto w-full sm:w-64 shrink-0">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-navy-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                />
              </div>
            </div>
          </div>

          {/* 4-column grid: [phases | tools | inputs | output] */}
          <div className="lg:grid lg:grid-cols-[128px_210px_1fr_2fr] lg:gap-4 lg:items-start">

            {/* ── Col 1: Phase tabs — vertical, desktop only ── */}
            <div className="hidden lg:flex lg:flex-col lg:sticky lg:top-36 lg:self-start lg:gap-0.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-3 pb-2 pt-1">Phase</p>
              {PHASES.map((p) => {
                const isActive = phaseId === p.id && !search.trim();
                return (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => { setPhaseId(p.id); setSearch(""); const first = toolsForPhase(p.id)[0]; if (first) selectTool(first); }}
                    className={`w-full flex items-center justify-between gap-1 px-3 py-2.5 rounded-lg text-left min-h-[40px] transition-all ${
                      isActive
                        ? "bg-gold/10 border-l-2 border-gold text-navy-900 font-bold"
                        : "text-gray-500 hover:text-navy-900 hover:bg-white border-l-2 border-transparent"
                    }`}
                  >
                    <span className="text-sm leading-tight">{p.short}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none shrink-0 ${isActive ? "bg-gold/20 text-navy-900" : "bg-gray-100 text-gray-500"}`}>
                      {toolsForPhase(p.id).length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Col 2: Tool list — desktop only ── */}
            <div className="hidden lg:block lg:sticky lg:top-36 lg:self-start lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:[scrollbar-width:thin]">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50/80">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {search.trim()
                      ? `${sidebarTools.length} result${sidebarTools.length === 1 ? "" : "s"}`
                      : `${sidebarTools.length} tools`}
                  </p>
                </div>
                <div className="p-1.5">
                  {sidebarTools.map((name) => {
                    const isActive = name === toolName;
                    return (
                      <button
                        key={name}
                        onClick={() => selectTool(name)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all min-h-[44px] mb-0.5 ${
                          isActive
                            ? "bg-gold/10 border border-gold/30 border-l-[3px] border-l-gold"
                            : "border border-transparent hover:bg-gray-50 hover:border-gray-100"
                        }`}
                      >
                        <span className={`flex items-center gap-1.5 font-semibold text-xs leading-tight ${isActive ? "text-navy-900" : "text-gray-700"}`}>
                          {name}
                          {TOOLS[name].isNew && (
                            <span className="text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded bg-gold/15 text-gold leading-none shrink-0">New</span>
                          )}
                        </span>
                        <span className={`block text-[11px] mt-0.5 leading-tight ${isActive ? "text-gray-500" : "text-gray-500"}`}>
                          {TOOLS[name].blurb}
                        </span>
                      </button>
                    );
                  })}
                  {sidebarTools.length === 0 && (
                    <p className="text-xs text-gray-500 px-3 py-6 text-center">No match.</p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Col 3: Inputs ── */}
            <div
              ref={workspaceRef}
              className="scroll-mt-36 lg:sticky lg:top-36 lg:self-start lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:[scrollbar-width:thin]"
            >
              {/* Mobile: card grid */}
              <div className="lg:hidden mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5">
                  {search.trim() ? `${sidebarTools.length} result${sidebarTools.length === 1 ? "" : "s"}` : `${activePhase.label} · ${sidebarTools.length} tools`}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sidebarTools.map((name) => {
                    const isActive = name === toolName;
                    return (
                      <button
                        key={name}
                        onClick={() => { selectTool(name); setTimeout(scrollToWorkspace, 50); }}
                        className={`text-left p-3 rounded-xl border transition-all min-h-[60px] ${isActive ? "bg-gold/10 border-gold" : "bg-white border-gray-200 hover:border-gold/50 hover:bg-gray-50"}`}
                      >
                        <span className="flex items-start gap-1 flex-wrap mb-1">
                          <span className={`font-semibold text-xs leading-tight ${isActive ? "text-navy-900" : "text-gray-700"}`}>{name}</span>
                          {TOOLS[name].isNew && <span className="text-[8px] font-bold uppercase px-1 py-0.5 rounded bg-gold/15 text-gold leading-none shrink-0">New</span>}
                        </span>
                        <span className="block text-[11px] leading-tight text-gray-500 line-clamp-2">{TOOLS[name].blurb}</span>
                      </button>
                    );
                  })}
                  {sidebarTools.length === 0 && (
                    <p className="col-span-2 sm:col-span-3 text-sm text-gray-500 py-6 text-center">No calculator matches that search.</p>
                  )}
                </div>
              </div>

              {/* Inputs panel */}
              <AnimatePresence mode="wait">
                <motion.div key={`inputs-${toolName}`} variants={workspaceVariant} initial="hidden" animate="visible" exit="exit">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-sm font-bold text-navy-900 leading-tight">{toolName}</h2>
                          {tool.isNew && <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold/15 text-gold leading-none">New</span>}
                        </div>
                        <p className="text-gray-500 text-xs mt-0.5 leading-snug">{tool.blurb}</p>
                      </div>
                      <button
                        onClick={resetToDefaults}
                        aria-label="Reset all inputs to defaults"
                        className="shrink-0 text-xs text-gray-500 hover:text-navy-900 transition-colors underline underline-offset-2 whitespace-nowrap pt-0.5"
                      >
                        Reset
                      </button>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Inputs</p>
                    <motion.div variants={fieldsContainer} initial="hidden" animate="visible" className="space-y-3.5">
                      {tool.fields.map((fl) => (
                        <motion.div key={fl.id} variants={fieldItem}>
                          <label htmlFor={`fld-${fl.id}`} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                            {fl.label}
                            {fl.unit && !fl.group && <span className="text-gray-500 normal-case font-normal"> ({fl.unit})</span>}
                          </label>
                          <div className={fl.group ? "grid grid-cols-[1fr,80px] gap-1.5" : ""}>
                            <input
                              id={`fld-${fl.id}`}
                              type="number"
                              step="any"
                              min={fl.allowNeg ? undefined : 0}
                              value={inputs[fl.id] ?? ""}
                              onChange={(e) => handleInput(fl.id, e.target.value)}
                              className={inputCls}
                            />
                            {fl.group && (
                              <select
                                aria-label={`Unit for ${fl.label}`}
                                value={units[fl.id] ?? ""}
                                onChange={(e) => setUnits((prev) => ({ ...prev, [fl.id]: e.target.value }))}
                                className={selectSmCls}
                              >
                                {UNIT_GROUPS[fl.group].units.map((u) => <option key={u} value={u}>{u}</option>)}
                              </select>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1 leading-snug">{fl.help}</p>
                        </motion.div>
                      ))}
                      {tool.resultGroup && (
                        <motion.div variants={fieldItem} className="pt-3 border-t border-gray-100">
                          <label htmlFor="result-unit" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Result unit</label>
                          <select id="result-unit" value={resultUnit} onChange={(e) => setResultUnit(e.target.value)} className={selectCls}>
                            {UNIT_GROUPS[tool.resultGroup].units.map((u) => <option key={u} value={u}>{u}</option>)}
                          </select>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Col 4: Output / Results ── */}
            <div className="lg:sticky lg:top-36 lg:self-start lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:[scrollbar-width:thin]">
              <AnimatePresence mode="wait">
                <motion.div key={`results-${toolName}`} variants={workspaceVariant} initial="hidden" animate="visible" exit="exit">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5">
                    {computed.error ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-10 text-center">
                        <p className="text-amber-700 text-sm font-medium">{computed.error}</p>
                      </div>
                    ) : (
                      <>
                        {/* Hero result */}
                        <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-xl px-5 py-4 mb-4 relative overflow-hidden">
                          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold/10 blur-2xl pointer-events-none" aria-hidden="true" />
                          <p className="absolute -right-3 bottom-2 text-white/5 font-black text-3xl tracking-widest -rotate-12 pointer-events-none select-none" aria-hidden="true">MZ GLOBAL</p>
                          <div className="flex flex-wrap items-center justify-between gap-4 relative">
                            <div>
                              <p className="text-gold text-[10px] font-bold uppercase tracking-widest mb-1.5">{tool.resultLabel}</p>
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <motion.span key={computed.shown} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} className="text-white font-black text-3xl sm:text-4xl leading-none tracking-tight">
                                  {computed.shown}
                                </motion.span>
                                <span className="text-gray-500 text-sm font-semibold">{computed.unit}</span>
                              </div>
                            </div>
                            {computed.status[0] && (
                              <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${STATUS_STYLES[computed.status[1]]}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[computed.status[1]]}`} aria-hidden="true" />
                                {computed.status[0]}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* KPI metrics */}
                        {metricsList.length > 0 && (
                          <motion.div variants={fieldsContainer} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                            {metricsList.map((m) => (
                              <motion.div key={m.label} variants={fieldItem} className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                                <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1 leading-tight">{m.label}</p>
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
                                  <div key={bar.label} className="grid grid-cols-[80px_1fr_72px] items-center gap-2">
                                    <span className="text-gray-500 text-xs font-semibold truncate">{bar.label}</span>
                                    <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 110, damping: 20, delay: i * 0.07 }} className="h-full rounded-full" style={{ backgroundColor: BAR_COLORS[bar.color] }} />
                                    </div>
                                    <span className="text-navy-900 text-xs font-bold text-right tabular-nums">{fmt(bar.value)}{bar.suffix ?? ""}</span>
                                  </div>
                                );
                              })}
                            </div>
                            {chartDef.note && <p className="text-gray-500 text-xs mt-3">{chartDef.note}</p>}
                          </div>
                        )}

                        {/* Detail */}
                        {detailText && (
                          <div className="bg-gold/5 border border-gold/20 rounded-xl px-4 py-3 mb-4">
                            <p className="text-navy-900 text-xs leading-relaxed">{detailText}</p>
                          </div>
                        )}

                        {/* Formula + Practical Note */}
                        <div className="grid sm:grid-cols-2 gap-3 mb-4">
                          <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1.5">Formula</p>
                            <p className="text-navy-900 text-xs font-medium leading-relaxed">{tool.formula}</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1.5">Practical Note</p>
                            <p className="text-gray-600 text-xs leading-relaxed">{tool.note}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2.5">
                          <button onClick={copyNote} className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-900 text-white font-bold text-sm rounded-lg hover:bg-navy-900/90 transition-colors min-h-[44px]">
                            {copied ? (<><svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>Copied</>) : "Copy Buyer / QA Note"}
                          </button>
                          <button onClick={saveResult} className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 text-navy-900 font-semibold text-sm rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]">
                            {saved ? "Saved ✓" : "Save to Recent"}
                          </button>
                          <button onClick={() => window.print()} className="inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 text-navy-900 font-semibold text-sm rounded-lg hover:border-gold hover:text-gold transition-colors min-h-[44px]">
                            Print / PDF
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Disclaimer */}
                  <p className="text-gray-500 text-xs mt-3 leading-relaxed px-1">
                    <strong className="text-gray-500">Planning tools only.</strong> Final pass/fail, tolerances, AQL acceptance,
                    test methods, carton limits and commercial terms must follow the buyer specification, approved sample, lab
                    report, factory standard or shipment contract.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* ── Quick Converter + Recent ───────────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6"
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
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="conv-from" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">From</label>
                  <select
                    id="conv-from"
                    value={convFrom}
                    onChange={(e) => setConvFrom(e.target.value)}
                    className={selectSmCls}
                  >
                    {CONVERTER_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="conv-to" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">To</label>
                  <select
                    id="conv-to"
                    value={convTo}
                    onChange={(e) => setConvTo(e.target.value)}
                    className={selectSmCls}
                  >
                    {CONVERTER_UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4 bg-navy-900 rounded-xl px-5 py-4 text-center">
                <p className="text-gold text-[10px] font-bold uppercase tracking-widest mb-1">Converted Result</p>
                <p className="text-white font-bold text-xl">{convResult}</p>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                Length, weight, volume and yarn count (Ne / Nm / tex / denier) systems supported.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6"
            >
              <h3 className="text-navy-900 font-bold text-lg mb-4">Recent Calculations</h3>
              {recent.length === 0 ? (
                <div className="border border-dashed border-gray-200 rounded-xl px-5 py-8 text-center">
                  <p className="text-gray-500 text-sm">
                    No saved calculations yet — use &quot;Save to Recent&quot; on any result.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recent.map((entry, i) => (
                    <button
                      key={`${entry.name}-${i}`}
                      onClick={() => loadRecent(entry)}
                      className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-gold hover:bg-white transition-all min-h-[44px]"
                    >
                      <div className="min-w-0">
                        <p className="text-navy-900 font-semibold text-sm truncate">{entry.name}</p>
                        <p className="text-gray-500 text-xs">{entry.time}</p>
                      </div>
                      <span className="text-gold font-bold text-sm shrink-0">{entry.result}</span>
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

      {/* ── Sticky mobile result bar ──────────────────────────────────────── */}
      <AnimatePresence>
        {workspaceInView && !computed.error && (
          <motion.div
            initial={{ y: 88 }}
            animate={{ y: 0 }}
            exit={{ y: 88 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="lg:hidden print:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xs border-t border-gray-200 px-4 py-3 shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">{tool.resultLabel}</p>
                <p className="text-navy-900 font-bold text-lg leading-tight truncate">
                  {computed.shown}{" "}
                  <span className="text-gray-500 text-xs font-semibold">{computed.unit}</span>
                </p>
              </div>
              {computed.status[0] && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold shrink-0 ${STATUS_STYLES[computed.status[1]]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[computed.status[1]]}`} aria-hidden="true" />
                  {computed.status[0]}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Why these tools ───────────────────────────────────────────────── */}
      <section className="print:hidden py-14 sm:py-16 bg-white">
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

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="print:hidden py-16 sm:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center"
          >
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">From Numbers to Orders</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Put These Calculations Into a Real Quote</h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto mb-3">
              Send us your GSM, consumption and target costs — our team matches them to the right certified Pakistani factory and
              responds within 3–5 business days.
            </p>
            <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8">
              Need a quick reference?{" "}
              <Link href="/downloads/gsm-thread-count-reference/" className="text-gold hover:underline font-medium">Download the GSM & thread count reference card →</Link>
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
