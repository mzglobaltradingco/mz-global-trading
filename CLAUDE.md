# MZ Global Trading — Master Project Reference

## Company

- **Name:** MZ Global Trading
- **Owner:** M. Muzammil
- **Business email:** info@mzglobaltrading.com
- **Personal email:** mzglobaltradingco@gmail.com
- **Phone:** +92 300 8256203
- **Address:** Office G20, Ground Floor, Columbus Tower, Main Clifton Road, Karachi 75600, Pakistan
- **Domain:** https://mzglobaltrading.com
- **Business:** Pakistan-based B2B textile sourcing — apparel, home textiles, fabric
- **Customers:** Procurement managers, import directors, brand owners, retail buyers in USA, UK, Canada, Europe, South America, Middle East, Southeast Asia, Australia, East Asia (Japan, South Korea), Russia and CIS
- **NOT targeting:** Pakistan domestic only
- **Facebook:** https://www.facebook.com/mzglobaltradingco/
- **LinkedIn:** https://www.linkedin.com/company/mzglobaltrading

---

## Hard Rules — Never Violate

1. **No "private label" anywhere** — never write "private label" in any copy, description, JSON-LD, meta tag, component, comment, or page. Use "OEM", "custom development", "custom specifications", or "branded programs" instead. MZ Global Trading does NOT offer private label. Grep for "private label" before completing any page.

2. **Cloudflare Pages only** — no Netlify references anywhere in code, config, comments, or documentation. Security headers live in `public/_headers`. No `netlify.toml`. Build command: `npm run build`. Output dir: `out/`.

3. **WebP for all content images** — product images, hero images, OG images, menu images, card images must be `.webp`. Exception: favicons (`favicon-*.png`, `apple-touch-icon.png`) must remain PNG — browsers and iOS require PNG for system icons.

4. **SEO primary targets: USA, Canada, UK, Europe, South America, Middle East, Southeast Asia, Australia, East Asia, Russia/CIS** — all keyword strategy, copy, and metadata must address international procurement buyers in these markets. Never write content targeting Pakistan-domestic buyers. "Pakistan" appears only as the manufacturing origin, never as the target audience.

5. **No scope changes without approval** — never alter navigation structure, page hierarchy, section names, or URL patterns without explicit user instruction.

6. **All changes apply to all platforms** — every layout, visual, or functional change covers desktop, tablet, and mobile without exception. Never make a single-breakpoint change and call it done. The user should never need to say "apply to mobile too."

---

## Priority Order

1. **SEO** — every page fully optimised before marking complete
2. **Performance** — Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms. Lighthouse targets: Desktop 98+, Mobile 95+
3. **Accessibility** — WCAG 2.1 AA
4. **Mobile** — functional at 320px minimum, test at 320/375/768/1024/1280px
5. **Security** — no secrets in client code, CSP headers, noopener on external links
6. **Code quality** — server components by default, no TypeScript `any`, no inline styles

---

## Tech Stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom colour config
- **Animations:** Framer Motion
- **Output:** Static export — `output: "export"` in `next.config.ts` — no SSR, no API routes, no server actions
- **Deployment:** Cloudflare Pages
- **Font:** Geist Sans via `localFont` with `display: "swap"`
- **Node:** 24.x

---

## Design System

### Colours
```
Navy:      #0D1B2A  (navy-900)  — primary bg, text headings on white
Deep navy: #08111f             — sourcing cards gradient, mega menu panel bg
Gold:      #D4A017  (gold)     — accent, CTAs, highlights
```

### Header and Footer — Both White
Both the header (MegaMenu) and footer are `bg-white`. This is intentional:
- `mz-global-trading-logo-header.webp` has dark navy text — it renders correctly only on white
- `Master_Logo.webp` in the footer also needs white background
- Never change either back to dark navy without explicit instruction

### Logo Files
| Location | File | Display size |
|---|---|---|
| Header | `/images/logo/mz-global-trading-logo-header.webp` (695×335px) | `w-[160px] md:w-[190px] lg:w-[220px] h-auto` |
| Footer | `/images/logo/Master_Logo.webp` | `w-[180px] md:w-[200px] h-auto` |
| JSON-LD | `/images/logo/Master_Logo.webp` | n/a |

Never use `.png` logo files in `<img>` or `<Image>` tags (except favicons).

### Header Dimensions — All Three Must Match
- Nav div class: `h-32` (128px)
- Spacer below header: `<div className="h-32" />`
- Backdrop overlay top offset: `style={{ top: 128 }}`
- If you change header height, update all three values simultaneously.

### Typography
- Headings: Geist Sans bold, `text-navy-900` on white, `text-white` on dark
- Body: `text-gray-600` on white backgrounds, `text-gray-300` on dark
- Gold label pattern: `text-gold text-xs font-semibold tracking-[0.2em] uppercase`
- Section heading pattern: gold label → h2 bold navy (`text-3xl sm:text-4xl font-bold text-navy-900`)

---

## URL Pattern

- **All internal URLs use trailing slash:** `/apparel/`, `/hometextile/bathlinen/towels/`, `/rfq/`
- **Never omit** the trailing slash on any `<Link href>`, `canonical`, `sitemap.xml`, or JSON-LD URL
- **Base URL:** `https://mzglobaltrading.com`

---

## Internal Link Targets

| Action | Destination |
|---|---|
| Request a Quote CTA | `/rfq/` |
| Contact link | `/contact-us/` |
| Explore Products (secondary CTA) | `/hometextile/bathlinen/towels/` |
| Apparel category | `/apparel/` |
| Home Textiles category | `/hometextile/` |
| Fabric category | `/fabric/` |
| Breadcrumb home | `/` |

## External Links

Always: `target="_blank" rel="noopener noreferrer"`

---

## Page File Structure

Every page follows this two-file pattern:
```
app/section/page-name/
  page.tsx              ← metadata export + layout shell (MegaMenu + main + Footer)
  PageNameContent.tsx   ← content component — add "use client" here if needed
```

### page.tsx Template
```tsx
import type { Metadata } from "next";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import PageNameContent from "./PageNameContent";

export const metadata: Metadata = {
  title: "Page Name | MZ Global Trading",          // ≤60 chars — check length before saving
  description: "130–160 chars for international buyers with primary keyword front-loaded.",
  keywords: ["keyword1", "keyword2"],
  alternates: {
    canonical: "/section/page-name/",              // relative, trailing slash required
    languages: {
      "en": "https://mzglobaltrading.com/section/page-name/",
      "x-default": "https://mzglobaltrading.com/section/page-name/",
    },
  },
  openGraph: {
    title: "Page Name | MZ Global Trading",
    description: "OG description — can be up to 200 chars.",
    url: "https://mzglobaltrading.com/section/page-name/",
    images: [{ url: "/images/og/page-name-og.webp", width: 1200, height: 630, alt: "Alt text 80–140 chars" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Name | MZ Global Trading",
    description: "Twitter description.",
  },
};

export default function PageNamePage() {
  return (
    <>
      <MegaMenu />
      <main id="main-content">
        <PageNameContent />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",                    // swap for CollectionPage / AboutPage etc as needed
            name: "Product Name — Pakistan Export",
            description: "...",
            image: "https://mzglobaltrading.com/images/og/page-name-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "MZ Global Trading" },
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl: "https://mzglobaltrading.com/images/og/page-name-og.webp",
              name: "Descriptive image name",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://mzglobaltrading.com/" },
                { "@type": "ListItem", position: 2, name: "Section", item: "https://mzglobaltrading.com/section/" },
                { "@type": "ListItem", position: 3, name: "Page Name", item: "https://mzglobaltrading.com/section/page-name/" },
              ],
            },
          }),
        }}
      />
      {/* FAQPage schema — add below Product schema if page has an FAQ section */}
      {/*
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Question text?",
                acceptedAnswer: { "@type": "Answer", text: "Answer text." },
              },
            ],
          }),
        }}
      />
      */}
    </>
  );
}
```

---

## Mandatory Checklist — Every Page Before Marking Complete

### SEO
- [ ] Unique `title` — format: `"Specific Page Name | MZ Global Trading"`, **max 60 chars** — count before saving
- [ ] Unique `description` — **130–160 chars**, primary keyword front-loaded, written for international buyers — count before saving
- [ ] `alternates.canonical` — relative URL with trailing slash
- [ ] `alternates.languages` — **both `"en"` and `"x-default"` pointing to absolute URL** — required on every page, not just layout.tsx
- [ ] `openGraph` block: title, description, url (absolute), images array with `.webp` OG image
- [ ] `twitter` block: `card: "summary_large_image"`, title, description
- [ ] **Product/BreadcrumbList JSON-LD** — use page.tsx template; include `primaryImageOfPage`
- [ ] **FAQPage JSON-LD** — add whenever the page has an FAQ section; questions must exactly match on-page FAQ text
- [ ] Single `<h1>` per page containing primary keyword
- [ ] Heading hierarchy h1 → h2 → h3 only — no skips
- [ ] Every `<Image>` has descriptive 80–140 char `alt` text — pattern: `"Pakistan [product] manufacturer — [descriptor] for [buyer type] in [markets]"`
- [ ] `<main id="main-content">` on every page
- [ ] Internal links use `<Link>` from `next/link`
- [ ] No mention of "private label" — grep before completing
- [ ] Run `python scripts/check-page.py app/section/page-name/page.tsx` — zero issues before marking done

### Performance
- [ ] `<Image>` component for ALL content images — `<img>` only for logo in MegaMenu
- [ ] Above-the-fold hero image has `priority` prop
- [ ] Every `<Image>` has appropriate `sizes` prop
- [ ] `"use client"` only on components that need browser APIs, hooks, or event listeners
- [ ] No unused imports
- [ ] Heavy components not needed at first paint use `dynamic()` with `ssr: false`

### Accessibility (WCAG 2.1 AA)
- [ ] Every `<button>` has visible text or `aria-label`
- [ ] Icon-only interactive elements have `aria-label`
- [ ] Decorative SVGs have `aria-hidden="true"`
- [ ] Form inputs always have `<label htmlFor="...">`
- [ ] Link text is descriptive — never "click here"
- [ ] Focus rings visible — never `outline-none` without replacement
- [ ] Touch targets minimum 44×44px on mobile
- [ ] All text on navy-900 meets 4.5:1 contrast minimum

### Mobile
- [ ] Layout functional at 320px — no horizontal scroll
- [ ] Font size minimum `text-sm` (14px) on mobile
- [ ] Test at 320px, 375px, 768px, 1024px, 1280px

### Security
- [ ] No secrets in client-side code
- [ ] External links: `rel="noopener noreferrer"` and `target="_blank"`
- [ ] No `dangerouslySetInnerHTML` with user-supplied content

### Code Quality
- [ ] Server component by default
- [ ] No TypeScript `any`
- [ ] No inline `style={{}}` — Tailwind only (exception: dynamic values like clip-path, flex ratios, animation delays)
- [ ] No commented-out code blocks

---

## Animation System (Framer Motion)

### Spring Presets
```tsx
// Mega menu panel entrance
panelVariants: { stiffness: 280, damping: 26, staggerChildren: 0.07 }

// Category rows in mega menu
rowVariants: { stiffness: 340, damping: 28 }

// Sub-items in mega menu
itemVariants: { stiffness: 420, damping: 32 }

// Left brand panel in mega menu
leftPanelVariants: { stiffness: 300, damping: 26 }

// Preview zone crossfade in mega menu
previewZoneVariants: { stiffness: 300, damping: 26 }
```

### Standard Scroll-Triggered Entrance
```tsx
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: i * 0.1 }}
```

### Card Hover
```tsx
whileHover={{ scale: 1.02 }}
transition={{ type: "spring", stiffness: 400, damping: 25 }}
```

### Accordion — SourcingCapabilities (CSS flex, not Framer)
```tsx
// Width transition: CSS flex ratio
style={{ flex: isActive ? 3 : 1, transition: "flex 0.55s cubic-bezier(0.34, 1.15, 0.64, 1)" }}

// Image scale
style={{ transform: isActive ? "scale(1.06)" : "scale(1)", transition: "transform 0.6s ease-out" }}

// Content reveal (Framer)
contentVariants: {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.08, when: "beforeChildren", staggerChildren: 0.05 } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.12 } },
}
itemVariants: {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.18 } },
}
```

### Hero Combined Slide — Diagonal Panel Entrance
```tsx
// Left panel
initial={{ x: -60, scale: 1, opacity: 0 }} → spring stiffness:240 damping:28 delay:0

// Middle panel
initial={{ x: 0, scale: 1.07, opacity: 0 }} → spring delay:0.15

// Right panel
initial={{ x: 60, scale: 1, opacity: 0 }} → spring delay:0.3

// Panel labels
initial={{ opacity: 0, y: 14 }} → transition: duration:0.4 delay: (panel.delay + 0.38)
```

### Rules
- `"use client"` only on components that need browser APIs, hooks, or event listeners
- Always wrap conditionally rendered animated elements in `<AnimatePresence>`
- All `whileInView` animations use `viewport={{ once: true }}`
- `AnimatePresence mode="wait"` for slide transitions

---

## JSON-LD Patterns

**Global (layout.tsx only):** Organization schema — do NOT repeat on pages.

**Product category page:**
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "url": "https://mzglobaltrading.com/section/",
  "name": "Category Name | MZ Global Trading",
  "description": "...",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mzglobaltrading.com/" },
      { "@type": "ListItem", "position": 2, "name": "Category", "item": "https://mzglobaltrading.com/section/" },
    ],
  },
}) }} />
```

**Individual product page:**
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "...",
  "image": "https://mzglobaltrading.com/images/products/...",
  "brand": { "@type": "Brand", "name": "MZ Global Trading" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "MZ Global Trading" },
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mzglobaltrading.com/" },
      { "@type": "ListItem", "position": 2, "name": "Section", "item": "https://mzglobaltrading.com/section/" },
      { "@type": "ListItem", "position": 3, "name": "Product", "item": "https://mzglobaltrading.com/section/product/" },
    ],
  },
}) }} />
```

**Corporate/about page:**
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "url": "https://mzglobaltrading.com/our-company/",
  "name": "About MZ Global Trading",
  "mainEntity": { "@id": "https://mzglobaltrading.com/#organization" },
}) }} />
```

---

## Image Standards

| Context | Component | `sizes` prop |
|---|---|---|
| Hero / full-width | `<Image priority>` | `"100vw"` |
| Half-width content | `<Image>` | `"(max-width: 768px) 100vw, 50vw"` |
| 3-column card grid | `<Image>` | `"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` |
| Menu preview zone | `<Image>` | `"200px"` |
| Diagonal hero panel | `<Image>` | `"34vw"` |
| SourcingCapabilities card | `<Image>` | `"(max-width: 1280px) 50vw, 40vw"` |
| OG images | Static file | 1200×630px `.webp` |

- All content images: `.webp` format only
- Favicons: remain PNG — required by browsers/iOS
- Menu images in `/public/images/menu/` — naming: `menu-[product-name].webp`

### Alt Text Rules (Google-confirmed best practice)

**Content images (heroes, product cards, banners):**
- Length: **80–140 characters** — enough detail without overwhelming
- Front-load the primary keyword: "Pakistan towel manufacturer —..." not "...manufacturer in Pakistan"
- Describe WHY the image exists on the page, not just what it shows
- Include manufacturing origin (Pakistan) + product type + target market (USA, UK, Europe) where natural
- Pattern: `"Pakistan [product] manufacturer — [descriptor] for [buyer type] in [markets]"`
- Never keyword-stuff: "towel Pakistan wholesale export B2B manufacturer" is spam

**Functional/icon images (process icons, stat icons, why-us icons):**
- Use the element's title/label as alt — e.g., "Quality Assurance", "Requirement Analysis"
- These describe the icon's PURPOSE, not visual appearance

**Decorative images (background patterns, ornamental borders):**
- Use `alt=""` (empty string) — tells screen readers to skip
- NEVER omit the `alt` attribute entirely

**Logos:**
- Header/footer logos: `alt="MZ Global Trading"` — brand name only, correct
- Certification logos: Full certification name + purpose, e.g., "GOTS Global Organic Textile Standard certified"

### File Naming (Google-confirmed ranking signal)
- Use **hyphens**, never underscores: `pakistan-towel-manufacturer.webp` ✓ / `pakistan_towel_manufacturer.webp` ✗
- 3–5 descriptive words maximum — pattern: `pakistan-[product]-manufacturer-[descriptor].webp`
- Current hero/banner file names are acceptable; apply the naming pattern when adding new images

### Image Sitemap (Google-confirmed, `public/sitemap.xml`)
- Namespace: `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` (added to `<urlset>`)
- Only `<image:loc>` is required — all other image sitemap tags (`<image:title>`, `<image:caption>`, `<image:geo_location>`) have been **deprecated by Google since May 2022**
- Add `<image:image><image:loc>URL</image:loc></image:image>` for every hero and key content image on built pages
- Built pages already have image entries: homepage (6 images), About Us (5 images), Towels (1 image)

### `primaryImageOfPage` JSON-LD (schema.org)
Every page with a hero image should include `primaryImageOfPage` in its JSON-LD:
```tsx
"primaryImageOfPage": {
  "@type": "ImageObject",
  "contentUrl": "https://mzglobaltrading.com/images/hero/hero-[page].webp",
  "name": "Descriptive name for the image",
}
```
Already added to: homepage (WebPage schema), About Us (AboutPage schema).

### CertificationsStrip Image Containers
Fixed `140×80px` containers per cert — `style={{ width: 140, height: 80 }}` with `className="object-contain w-full h-full"`. Never use `w-auto` on cert images; aspect ratio variation causes uneven spacing.

---

## Copy Standards

- **Audience:** procurement managers, brand owners, retail buyers in USA, UK, Canada, Europe, South America
- **Tone:** professional, direct, B2B — not consumer-facing
- **Never use:** "private label", "dropshipping", "low MOQ" as selling points
- **Use instead:** "OEM", "custom development", "bulk orders", "international shipping", "certified manufacturers"
- **Pakistan:** appears as manufacturing origin only — "manufactured in Pakistan's certified factories"
- **CTA destinations:** `Request a Quote` → `/rfq/` · `Contact` → `/contact-us/`
- **Explore Products** → `/hometextile/bathlinen/towels/`

---

## Deployment Workflow

1. `npm run build` — generates static export in `/out/`
2. Deploy `/out/` folder to Cloudflare Pages
3. `public/_headers` — Cloudflare applies security headers automatically
4. `public/_redirects` — Cloudflare handles redirects
5. No server-side rendering, no API routes, no server actions

### Cloudflare Pages Config
- Build command: `npm run build`
- Output directory: `out/`
- Node version: 20+

### Security Headers (`public/_headers`)
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```

---

## SEO Strategy

### Geographic Targeting
- **Primary:** USA, Canada, UK, all of Europe (EU + non-EU), South America (BR, AR, CL, CO, PE, MX), Middle East (AE, SA, QA, KW, BH, OM, EG, TR, JO), Southeast Asia (SG, MY, TH, ID, PH, VN), Australia, New Zealand, East Asia (JP, KR), Russia and CIS (RU, KZ, UA, UZ, AZ, GE)
- **Do not target:** Pakistan domestic only
- **Mechanism:** `areaServed: "Worldwide"` in Organization JSON-LD, meta descriptions referencing international buyers, English-language content

### `areaServed` Countries (Organization JSON-LD in layout.tsx)
Currently set to `"Worldwide"` — covers all target markets. Country-level breakdown for reference:
North America: US, CA | Europe: GB, DE, FR, NL, IT, ES, BE, SE, NO, DK, FI, CH, AT, PL, PT, IE, CZ, HU, RO, GR | South America: BR, AR, CL, CO, PE, MX | Middle East: AE, SA, QA, KW, BH, OM, EG, TR, JO | SE Asia: SG, MY, TH, ID, PH, VN | Oceania: AU, NZ | East Asia: JP, KR | Russia/CIS: RU, KZ, UA, UZ, AZ, GE

### Keyword Tiers
**Tier 1 — Category level:**
"apparel manufacturer Pakistan", "home textile supplier Pakistan", "towels manufacturer exporter", "OEM garment manufacturer"

**Tier 2 — Sub-category level:**
"bath towels wholesale supplier", "hotel towels bulk order", "bed linen wholesale UK", "custom polo shirts manufacturer"

**Tier 3 — Product level / high conversion:**
"GOTS certified towel manufacturer Pakistan", "terry cloth towels minimum order", "hospital scrubs manufacturer Pakistan"

### Content Pillar Architecture
```
PILLAR  (/apparel/,  /hometextile/,  /fabric/)
  ↓
CLUSTER (/apparel/knittedgarments/,  /hometextile/bathlinen/)
  ↓
LEAF    (/apparel/knittedgarments/tshirts/,  /hometextile/bathlinen/towels/)
```

### Content Build Sequence
1. Authority foundation: Homepage, About Us, Why Choose Us, Quality & Compliance
2. High-volume pillar pages: /apparel/, /hometextile/, /fabric/
3. High-intent cluster pages
4. Individual product leaf pages

### Technical SEO (Implemented)
- Canonical URLs on every page
- XML sitemap (78 pages, correct priorities)
- robots.txt
- Organization JSON-LD with social profiles and areaServed
- Twitter card + OpenGraph on all pages
- font-display: swap
- Security headers via Cloudflare
- Skip-to-content link

### Technical SEO (Pending)
- hreflang: add `<link rel="alternate" hreflang="en" href="...">` and `hreflang="x-default"` to layout.tsx
- Google Search Console: after launch, set preferred country to USA

### Sitemap Priorities
- Homepage: 1.0
- Category pages (/apparel/, /hometextile/, etc.): 0.9
- RFQ page: 0.9
- Product/section pages: 0.8
- Corporate pages: 0.7
- Legal pages: 0.3

---

## Multi-language Decision

**Decision: Do not implement i18n at this time.**

Reasons: new domain needs English authority first, maintenance burden (78 × N languages), quality risk with machine translation for B2B copy, Cloudflare Pages free tier 20,000 file limit would be approached with 6+ languages.

Revisit after launch when Google Search Console data shows which non-English markets are generating impressions.

If implemented in future: use `app/[locale]/` structure with `next-intl`, professional human translations, `hreflang` per page.

---

## Component Registry

| Component | File | Status | Notes |
|---|---|---|---|
| MegaMenu | `components/MegaMenu.tsx` | Complete | White header, h-32, all 78 URLs wired, hover preview zone |
| Footer | `components/Footer.tsx` | Complete | White, 5-column, certifications in bottom bar |
| Hero | `components/Hero.tsx` | Complete | 4 slides: combined + apparel + home textiles + fabric |
| SourcingCapabilities | `components/SourcingCapabilities.tsx` | Complete | Accordion desktop, stacked mobile |
| CertificationsStrip | `components/CertificationsStrip.tsx` | Complete | Marquee, fixed 140×80px containers |
| CTABanner | `components/CTABanner.tsx` | Complete | Compact centred, navy bg, gold CTA |
| WhyUs | `components/WhyUs.tsx` | Complete | "private label" removed |
| StatsBar | `components/StatsBar.tsx` | Exists | — |
| ProcessSteps | `components/ProcessSteps.tsx` | Exists | — |

### MegaMenu Architecture
- Left panel: content-aware brand panel (heading, bullets, CTA) — changes per nav item hover
- Centre: CategoryRow[] with sub-items as horizontal flex-wrap
- Right: preview zone — `AnimatePresence` crossfade on sub-item hover using `currentImg` state
- Mobile: 3-level spring accordion
- Spring values: panelVariants stiffness:280 damping:26, rowVariants stiffness:340, itemVariants stiffness:420

### Footer Architecture (5 Columns)
| Col | Content |
|---|---|
| 1 | Brand: `Master_Logo.webp`, description, Facebook + LinkedIn social icons |
| 2 | Apparel: 8 product links |
| 3 | Home Textiles (7 links) + divider + Fabric (2 links) |
| 4 | Company: 6 links |
| 5 | Support: gold RFQ button + 4 support links + divider + Contact (email, phone, address) |
| Bottom bar | Copyright + certifications (8, `hidden md:block`) + Privacy Policy · Terms of Use |

### Hero Architecture (4 Slides, 5s interval)
| Slide | ID | Background |
|---|---|---|
| 0 | combined | Parallelogram panels (desktop) / horizontal strips (mobile) — all 3 category images |
| 1 | apparel | `hero-apparel.webp` full-width with gradient |
| 2 | home-textiles | `hero-home-textiles.webp` full-width with gradient |
| 3 | fabric | `hero-fabric.webp` full-width with gradient |

Combined slide panel labels use frosted pill `bg-navy-950/60 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3` — this prevents text from blending into light-coloured imagery.

---

## Pages Built

- **Phase 1 — Authority Foundation:** Complete ✓ (20 pages — all corporate, quality, legal, RFQ, contact)
- **Phase 1 — First Product Leaf:** Complete ✓ (Towels)
- **Phase 2 — Pillar Pages:** Pending (/apparel/, /hometextile/, /fabric/)
- **Phase 3 — Cluster Pages:** /apparel/knittedgarments/, /apparel/wovengarments/, /apparel/babyandkids/, /hometextile/bathlinen/, /hometextile/bedlinen/ (Complete ✓), kitchen, table, thermal, hospital, industrial linen clusters
- **Phase 4 — Leaf Pages:** 13 built (knitted garments ×6, woven ×5, baby&kids ×6, workwear, socks, bath linen ×4, bed linen ×6, ihram); remainder pending
- **Fabric pages:** /fabric/apparelfabric/ and /fabric/hometextilefabric/ — Complete ✓

> File pattern: every page follows `app/section/name/page.tsx` + `NameContent.tsx`

---

## Full Sitemap (78 Pages)

> **Source of truth:** `public/sitemap.xml` — all 78 URLs with correct priorities.

**Structure:** `/` · `/our-company/` · `/rfq/` · `/contact-us/` · `/qualitycompliance/[page]/` · `/apparel/[cluster]/[product]/` · `/hometextile/[cluster]/[product]/` · `/hometextile/ihram/` · `/fabric/apparelfabric/` · `/fabric/hometextilefabric/`

## Mega Menu Structure

### Navigation Order
1. **Home** → `/`
2. **Corporate** (mega) — left panel: company overview CTA
3. **Apparel** (mega) — left panel: apparel sourcing pitch
4. **Home Textiles** (mega) — left panel: home textiles pitch
5. **Fabric** (mega) — left panel: fabric sourcing pitch
6. **Quality & Compliance** (mega) — left panel: quality overview
7. **Contact Us** → `/contact-us/`

### Corporate Rows
- **Company:** About Us `/our-company/`, Why Choose Us `/whychooseus/`, Our Process `/ourprocess/`, Careers `/careers/`, Blogs `/blog/`
- **Resources:** Textile Tools Calculator, FAQs `/faqs/`, Downloads `/downloads/`, Guides `/guides/`
- **Legal:** Privacy Policy `/privacypolicy/`, Terms of Use `/termsofuse/`

### Apparel Rows
- **Knitted Garments:** T-Shirts, Polo Shirts, Henley Shirts, Sweatshirts & Hoodies, Sweatpants & Joggers, Tank Tops
- **Woven Garments:** Denim Jeans, Formal & Casual Shirts, Pants & Trousers, Cargo Pants, Shorts
- **Baby & Kids:** T-Shirts for Kids, Swaddle Muslin Fabric, Overalls, Baby Rompers, Baby Bibs, Baby Hooded Towels
- **Workwear Apparel** (link only) → `/apparel/workwearapparel/`
- **Socks** (link only) → `/apparel/socks/`

### Home Textiles Rows
- **Bath Linen:** Towels, Institutional Towels, Bathrobes, Bath Mats, Beach & Pool Towels
- **Bed Linen:** Bedsheets, Fitted Sheets, Duvet Covers, Pillow Covers, Cushion Covers, Curtains
- **Kitchen Linen:** Kitchen Towels, Bar Mops, Aprons, Pot Holders
- **Table Linen:** Table Covers
- **Thermal Blankets:** Cellular Thermal Blanket, Fleece Thermal Blankets
- **Hospital Linen:** Doctor Surgical Gowns, Medical Scrubs, Patient Gowns, Surgical Huck Towels
- **Industrial Linen:** Shop Towels, Fender Covers
- **Ihram** (link only) → `/hometextile/ihram/`

### Fabric Rows
- **Fabric:** Apparel Fabric `/fabric/apparelfabric/`, Home Textile Fabric `/fabric/hometextilefabric/`

### Quality & Compliance Rows
- **Compliance:** Quality Policy, Supplier Evaluation, Quality Control, Inspection Process, Certifications

---

## Certifications

**Displayed in CertificationsStrip marquee (10):**
OEKO-TEX, GOTS, BSCI, Sedex, ISO 9001, GRS, WRAP, BCI, SA8000, Bluesign

**Displayed in Footer bottom bar (8):**
GOTS · OEKO-TEX · BSCI · ISO 9001 · Sedex · GRS · SA8000 · WRAP

Cert images: `/public/images/certs/cert-[name].webp`

---

## Public Assets Structure

```
public/
  _headers                   ← Cloudflare security headers
  _redirects                 ← Cloudflare URL redirects
  robots.txt
  sitemap.xml                ← 78 pages, correct priorities
  favicon-32.png             ← PNG required
  favicon-192.png            ← PNG required
  apple-touch-icon.png       ← PNG required
  images/
    logo/
      Master_Logo.webp                       ← Footer logo
      mz-global-trading-logo-header.webp     ← Header logo (695×335px)
    hero/
      hero-apparel.webp
      hero-home-textiles.webp
      hero-fabric.webp
    cards/
      cat-banner-apparel.webp
      cat-banner-home-textiles.webp
      cat-banner-fabric.webp
    menu/                    ← All mega menu preview images (menu-[name].webp)
    certs/                   ← Certification badge images (cert-[name].webp)
    og/                      ← OG images, 1200×630px .webp
    thumbnails/              ← Product thumbnail images
    team/
      Muhammad-Muzammil.webp
    icons/
      social/
        icon-social-facebook.svg
        icon-social-linkedin.svg
```

### Missing Menu Images (Awaiting User)
- `menu-doctorsurgicalgowns.webp` — Doctor Surgical Gowns currently uses parent Hospital Linen image
- `menu-shoptowels.webp` — Shop Towels currently uses parent Industrial Linen image

---

## Known Pending Items

- **hreflang tags:** Add `<link rel="alternate" hreflang="en">` and `hreflang="x-default"` to `app/layout.tsx`
- **Missing menu images:** Doctor Surgical Gowns, Shop Towels — awaiting user-supplied WebP files
- **Google Search Console:** After launch, set preferred country to USA
- **Remaining pages:** All sitemap pages except the 4 built so far
- **Build sequence:** Pillar pages first (/apparel/, /hometextile/, /fabric/, /rfq/, /contact-us/), then clusters, then product leaves

---

## RFQ Wizard — Architecture & Product Data Reference

**Status:** Approved for build. Research finalised 2026-06-11.

### File Locations
| File | Purpose |
|---|---|
| `app/rfq/page.tsx` | Metadata, JSON-LD, page shell |
| `app/rfq/RFQContent.tsx` | Full wizard UI — `"use client"` |
| `lib/rfq-product-options.ts` | All product-specific dropdown data (single source of truth) |

`lib/` is at the project root alongside `app/`. This is the standard Next.js 14 location for non-component library code.

---

### Wizard Structure — 4 Steps (approved 2026-06-11)

Previous wizard had 5 steps. **Rebuilt as 4 steps:**

```
STEP 1 — Product Requirements
  Product Category → Product Type → [All specs for that product]
  Certifications (product-aware multi-select + "Other" free text)

STEP 2 — Commercial & Logistics
  Quantity (numeric) + Unit of Measure (product-specific dropdown)
  Target Price (USD) · Delivery Date · Destination Country
  Incoterm · Port of Destination (conditional: CIF or CFR only)
  Additional Logistics Notes

STEP 3 — Your Details
  Full Name · Company · Email · Phone · Country (all mandatory)
  How Did You Hear About Us (optional dropdown)

STEP 4 — Review & Submit
  Full summary with edit buttons per section
  Submit opens mailto
```

**Key structural rules:**
- Single page, no URL changes between steps
- Back button at top AND bottom of each step
- Sticky progress bar: fixed, `top: 128px` (below 128px header), `h-[48px]`, colorful (gold = done, navy = active, gray = pending)
- Autosave: `localStorage` between steps so browser refresh does not lose data
- Validation before advancing — no progression on mandatory field errors
- Remove the text "Review your full submission on the next step before your email client opens." entirely
- `FinishCheckboxes` component for multi-select finishes (same visual pattern as Certifications grid)

---

### Field Validation Rules
| Field | Validation |
|---|---|
| Quantity | Numeric only — must contain at least one digit |
| Email | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Phone | Digits only ≥ 7 after stripping non-numeric |
| Delivery Date | Must be future date |
| Dropdowns | Placeholder value (`""`) not accepted as valid selection |
| Mandatory fields | Block progression; scroll to first error |
| Target Price | If provided, must contain at least one digit |

---

### Sticky Progress Bar Spec
- `position: fixed`, `top: 128px` (header is h-32 = 128px)
- `z-index` above page content, below MegaMenu (MegaMenu is `z-50`, bar is `z-40`)
- Height: `48px` total
- Background: white with bottom border `border-gray-100`
- Steps: number pill + label (md+) / number only (mobile)
- Colors: completed = `bg-gold text-navy-900`, active = `bg-navy-900 text-white`, pending = `bg-gray-100 text-gray-400`
- Connector line: gold when completed, gray when pending
- Shadow: `shadow-sm`

---

### Data File Architecture (`lib/rfq-product-options.ts`)

> Full `ProductOptions` interface and `PRODUCT_OPTIONS` record are defined in `lib/rfq-product-options.ts` — read that file directly. Key conditional flags (not obvious from field names):

| Flag | Effect |
|---|---|
| `isIhram` | Forces white-only colour, hides decoration fields |
| `isMedical` | Shows sterilisation options |
| `isFabricRoll` | Shows roll packing instead of unit packing |
| `showBorderField` | Terry products and bed linen only |
| `showPocketDepth` | Fitted sheets only |
| `showClosureType` | Duvet covers, pillow/cushion covers |
| `showCollarType` | Bathrobes only |
| `showHeatingRating` | Pot holders only |
| `showBackingType` | Bath mats only |
| `showHeadingType` / `showLiningType` | Curtains only |

---

### Complete Product Options Reference

> **Source of truth:** `lib/rfq-product-options.ts` — all product-specific dropdowns, construction options, finishing options, size ranges, unit-of-measure, and flags (isIhram, isMedical, isFabricRoll, etc.) live there. Read that file directly rather than maintaining a duplicate listing here.

---

### Certifications — "How Did You Hear About Us" Options
```
Google Search
LinkedIn
Trade Show / Exhibition
Referral from a Contact
Social Media (Facebook / Instagram)
Industry Directory
Other
```

---

### Multi-Select Finish Field — Implementation Rules
- Field name: `fabricFinish: string[]` (apparel), `htFinish: string[]` (home textile), `fabricFinishType: string[]` (fabric)
- UI: Checkbox grid — same visual pattern as Certifications (border-gold when checked, bg-gold/5)
- Email body: `.join(", ")` before inserting into body string
- Review step: `.join(", ")` for display
- When `productType` changes → reset finish array to `[]`
- When `category` changes → reset all spec fields including finish arrays

---

### localStorage Autosave — Implementation Rules
- Key: `"rfq_wizard_draft"`
- Save on every field change (debounced 500ms)
- Load on component mount (before INITIAL state)
- Clear on successful submit (after mailto opens)
- Clear when user explicitly clicks "Start Over" (if present)
- Do NOT save sensitive info warning — all data is typed by user intentionally

---

### Email Body Format (unchanged from prior implementation)
```
══════════════════════════════════════════════════════════════
  RFQ SUBMISSION — MZ GLOBAL TRADING
  Source:     mzglobaltrading.com/rfq/
  Submitted:  [date at time timezone]
══════════════════════════════════════════════════════════════

[1]  CONTACT DETAILS
──────────────────────────────────────────────────────────────
  Name: ...
  Job Title: ...
  ...

[2]  PRODUCT REQUIREMENTS & SPECIFICATIONS
──────────────────────────────────────────────────────────────
  Category: ...
  Product Type: ...
  [all spec sub-blocks]

[3]  COMMERCIAL & LOGISTICS
──────────────────────────────────────────────────────────────
  Quantity: ...
  Unit: ...
  Target Price: USD X.XX per unit
  Destination: ...
  Incoterm: ...
  [Port if CIF/CFR]
  Required Delivery: ...

══════════════════════════════════════════════════════════════
  The buyer confirms they have read and agreed to the Terms of Use
  at: mzglobaltrading.com/termsofuse/
══════════════════════════════════════════════════════════════
```

Section numbers shift from old 5-step: contact = [1], product+specs = [2], logistics = [3], notes = [4] if present.
