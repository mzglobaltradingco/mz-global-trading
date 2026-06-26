import type { KnowledgePost } from "@/types/knowledge";

const post: KnowledgePost = {
  id: "6",
  slug: "how-to-read-textile-tech-pack-international-buyers",
  title: "How to Read a Textile Tech Pack: A Guide for International Buyers",
  excerpt:
    "A tech pack is the single source of truth between buyer and manufacturer. Understanding its sections — BOM, measurement spec, construction details — prevents the most common and costly sourcing errors.",
  category: "Resources",
  tags: ["Tech Pack", "Specifications", "Sourcing", "Guide"],
  readTime: 5,
  date: "2023-12-05",
  author: "M. Muzammil",
  featured: false,
  image: "/knowledge/how-to-read-textile-tech-pack-international-buyers.webp",
  content: `## What Is a Tech Pack?

A tech pack (technical package) is the complete specification document for a textile product. It is the single source of truth between buyer and manufacturer — containing every measurement, material, construction detail and finish requirement needed to produce the product correctly.

A well-written tech pack eliminates ambiguity. A poorly written one — or the absence of one — is the most common cause of production errors in international textile sourcing.

## The Key Sections

### Cover Sheet

The first page identifies the product: style name, style number, season, target market, fabric description and any relevant certifications required. This is also where the tech pack version number and revision history live.

### Bill of Materials (BOM)

The BOM lists every component: main fabric (with GSM, composition and construction), lining, interlining, thread, labels, trims, buttons, zips, packaging materials. Each item has a specified supplier or an "as sourced" note.

### Measurement Specification

The most critical section. Contains:

- A size chart with all measurement points
- Tolerance per measurement (typically ±1–2cm depending on the point)
- A technical flat sketch showing where each measurement is taken

### Construction Details

Seam types, stitch counts per inch, seam allowances, topstitch distances, pocket placement — anything that affects how the garment is assembled.

### Colour and Print Specifications

Pantone references for all colourways, placement coordinates for prints or embroidery, approved lab dip or strike-off references where available.

### Care and Label Specifications

Wash instructions, fibre content declaration, country of origin, size label content and placement — all must comply with the regulations of your destination market.

## What to Do If You Don't Have a Tech Pack

If you are developing a new product, share a physical sample, a reference garment or detailed photographs with measurements marked. MZ Global Trading can help scope the specification at enquiry stage — a complete tech pack is ideal, but is not required to begin a sourcing conversation.`,
};

export default post;
