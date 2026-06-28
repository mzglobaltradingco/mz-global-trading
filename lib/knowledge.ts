/* CONTENT: add one import line here when adding a new article to /content/knowledge/ */

import type { KnowledgePost, KnowledgeCategory } from "@/types/knowledge";

// ─── Explicit imports — reliable in dev + build mode; webpack cache-safe ──────
import postGsm from "../content/knowledge/understanding-gsm-fabric-weight-sourcing";
import postIncoterms from "../content/knowledge/incoterms-fob-cif-pakistan-textile-exports";
import postSialkot from "../content/knowledge/mz-global-expands-sialkot-technical-textiles";
import postIso from "../content/knowledge/iso-9001-certification-quality-management";
import postInspection from "../content/knowledge/pre-shipment-inspection-checklist-textile-buyers";
import postTechPack from "../content/knowledge/how-to-read-textile-tech-pack-international-buyers";
import postTerry from "../content/knowledge/terry-towel-gsm-guide";
import postInstitutionalTowel from "../content/knowledge/institutional-towel-standards";
import postBathrobe from "../content/knowledge/bathrobe-fabric-types";
import postBathMat from "../content/knowledge/bath-mat-construction-guide";
import postBeach from "../content/knowledge/beach-towel-print-techniques";
import postBedsheet from "../content/knowledge/bedsheet-thread-count-guide";
import postFitted from "../content/knowledge/fitted-sheet-pocket-depth-guide";
import postDuvet from "../content/knowledge/duvet-cover-closure-types";
import postPillow from "../content/knowledge/pillow-cover-fabric-guide";
import postCushion from "../content/knowledge/cushion-cover-filling-guide";
import postCurtain from "../content/knowledge/curtain-fabric-guide";
import postInstitutionalBedding from "../content/knowledge/institutional-bedding-spec-guide";
import postKitchenTowel from "../content/knowledge/kitchen-towel-fabric-guide";
import postBarMop from "../content/knowledge/bar-mop-towel-guide";
import postApron from "../content/knowledge/apron-fabric-guide";
import postPotHolder from "../content/knowledge/pot-holder-heat-rating-guide";
import postTableLinen from "../content/knowledge/table-linen-fabric-guide";
import postCellularBlanket from "../content/knowledge/cellular-blanket-guide";
import postFleeceBlanket from "../content/knowledge/fleece-blanket-gsm-guide";
import postSurgicalGown from "../content/knowledge/surgical-gown-standards";
import postMedicalScrubs from "../content/knowledge/medical-scrubs-fabric-guide";
import postPatientGown from "../content/knowledge/patient-gown-construction-guide";
import postHuckTowel from "../content/knowledge/huck-towel-guide";
import postShopTowel from "../content/knowledge/shop-towel-industrial-guide";
import postFenderCover from "../content/knowledge/fender-cover-fabric-guide";
import postIhram from "../content/knowledge/ihram-fabric-requirements";
import postTshirtFabric from "../content/knowledge/tshirt-fabric-weight-guide";
import postPoloPique from "../content/knowledge/polo-shirt-pique-guide";
import postHenleyConstruction from "../content/knowledge/henley-shirt-construction-guide";
import postFleeceFabric from "../content/knowledge/fleece-fabric-guide";
import postJoggerWaistband from "../content/knowledge/jogger-waistband-guide";
import postTankTopFabric from "../content/knowledge/tank-top-fabric-guide";
import postDenimWeight from "../content/knowledge/denim-weight-guide";
import postDressShirtFabric from "../content/knowledge/dress-shirt-fabric-guide";
import postTrouserFabric from "../content/knowledge/trouser-fabric-guide";
import postCargoPantsConstruction from "../content/knowledge/cargo-pants-construction-guide";
import postShortsFabric from "../content/knowledge/shorts-fabric-guide";
import postKidsApparelSafety from "../content/knowledge/kids-apparel-safety-standards";
import postMuslinSwaddle from "../content/knowledge/muslin-swaddle-fabric-guide";
import postBabyOveralls from "../content/knowledge/baby-overalls-construction-guide";
import postBabyRomper from "../content/knowledge/baby-romper-fabric-guide";
import postBabyBib from "../content/knowledge/baby-bib-construction-guide";
import postBabyHoodedTowel from "../content/knowledge/baby-hooded-towel-guide";
import postWorkwearFabric from "../content/knowledge/workwear-fabric-standards";
import postSocksFabric from "../content/knowledge/socks-fabric-guide";
import postApparelFabricTypes from "../content/knowledge/apparel-fabric-types-guide";
import postHomeTextileFabric from "../content/knowledge/home-textile-fabric-guide";
import postSourcingOperations from "../content/knowledge/textile-sourcing-operations-guide";

export const posts: KnowledgePost[] = [
  postGsm, postIncoterms, postSialkot, postIso, postInspection, postTechPack,
  postTerry, postInstitutionalTowel, postBathrobe, postBathMat, postBeach,
  postBedsheet, postFitted, postDuvet, postPillow, postCushion, postCurtain,
  postInstitutionalBedding,
  postKitchenTowel, postBarMop, postApron, postPotHolder,
  postTableLinen, postCellularBlanket, postFleeceBlanket,
  postSurgicalGown, postMedicalScrubs, postPatientGown, postHuckTowel,
  postShopTowel, postFenderCover, postIhram,
  postTshirtFabric, postPoloPique, postHenleyConstruction, postFleeceFabric,
  postJoggerWaistband, postTankTopFabric,
  postDenimWeight, postDressShirtFabric, postTrouserFabric, postCargoPantsConstruction, postShortsFabric,
  postKidsApparelSafety, postMuslinSwaddle, postBabyOveralls, postBabyRomper,
  postBabyBib, postBabyHoodedTowel,
  postWorkwearFabric, postSocksFabric, postApparelFabricTypes, postHomeTextileFabric,
  postSourcingOperations,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getAllPosts(): KnowledgePost[] {
  return posts;
}

export function getPostBySlug(slug: string): KnowledgePost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): KnowledgePost | undefined {
  return posts.find((p) => p.featured);
}

export function getRelatedPosts(
  currentSlug: string,
  category: KnowledgeCategory,
  max = 3
): KnowledgePost[] {
  return posts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, max);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Markdown Renderer ────────────────────────────────────────────────────────
// Handles: h2, h3, bold, italic, inline code, links, blockquote, unordered lists, tables, paragraphs

function inlineStyles(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold hover:text-yellow-500 underline underline-offset-2 transition-colors">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function isTableRow(line: string): boolean {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function isSeparatorRow(line: string): boolean {
  return /^\|[\s\-:|]+\|$/.test(line.trim());
}

function parseTableRow(line: string): string[] {
  return line.trim().slice(1, -1).split("|").map((cell) => cell.trim());
}

export function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inUl = false;
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  function flushTable() {
    if (!inTable || tableHeaders.length === 0) return;
    const head = `<thead><tr>${tableHeaders.map((h) => `<th>${inlineStyles(h)}</th>`).join("")}</tr></thead>`;
    const body = `<tbody>${tableRows.map((r) => `<tr>${r.map((c) => `<td>${inlineStyles(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
    out.push(`<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse">${head}${body}</table></div>`);
    inTable = false;
    tableHeaders = [];
    tableRows = [];
  }

  for (const line of lines) {
    if (isTableRow(line)) {
      if (isSeparatorRow(line)) continue;
      if (!inTable) {
        if (inUl) { out.push("</ul>"); inUl = false; }
        inTable = true;
        tableHeaders = parseTableRow(line);
      } else {
        tableRows.push(parseTableRow(line));
      }
      continue;
    }

    if (inTable) flushTable();

    if (line.startsWith("### ")) {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<h3>${inlineStyles(line.slice(4))}</h3>`);
    } else if (line.startsWith("## ")) {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<h2>${inlineStyles(line.slice(3))}</h2>`);
    } else if (line.startsWith("> ")) {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<blockquote>${inlineStyles(line.slice(2))}</blockquote>`);
    } else if (line.startsWith("- ")) {
      if (!inUl) { out.push("<ul>"); inUl = true; }
      out.push(`<li>${inlineStyles(line.slice(2))}</li>`);
    } else if (line.trim() === "") {
      if (inUl) { out.push("</ul>"); inUl = false; }
    } else {
      if (inUl) { out.push("</ul>"); inUl = false; }
      out.push(`<p>${inlineStyles(line)}</p>`);
    }
  }

  if (inTable) flushTable();
  if (inUl) out.push("</ul>");
  return out.join("\n");
}
