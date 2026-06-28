import { buildMetadata } from "@/lib/metadata";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import TableCoversContent from "./TableCoversContent";

export const metadata = buildMetadata({
  title: "Table Covers Manufacturer Pakistan | MZ Global Trading",
  description:
    "Pakistan table cover manufacturer supplying hotels, banquets and event companies. Damask, jacquard, satin, poly-cotton. Custom sizes. OEKO-TEX, BSCI certified export.",
  canonical: "/hometextile/tablelinen/tablecovers/",
  ogImage: "/images/og/table-covers-og.webp",
  ogImageAlt: "Pakistan table cover manufacturer — custom damask and jacquard tablecloths for hotels, restaurants and events worldwide",
  keywords: [
    "table covers manufacturer Pakistan",
    "tablecloth wholesale Pakistan",
    "hotel tablecloth supplier",
    "damask table cover manufacturer",
    "banquet tablecloth Pakistan",
    "custom tablecloth OEM Pakistan",
    "table linen export Pakistan",
    "BSCI table covers Pakistan",
    "restaurant tablecloth supplier",
  ],
});

export default function TableCoversPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Table Covers — Pakistan Hospitality Linen Export",
            description:
              "Custom table covers manufactured in Pakistan's certified linen facilities. Cotton damask, jacquard, satin weave, plain weave and poly-cotton easy-care. Standard and custom dimensions. OEKO-TEX Standard 100, BSCI certified. FOB / CIF export.",
            image:
              "https://www.mzglobaltrading.com/images/og/table-covers-og.webp",
            brand: { "@type": "Brand", name: "MZ Global Trading" },
            primaryImageOfPage: {
              "@type": "ImageObject",
              contentUrl:
                "https://www.mzglobaltrading.com/images/og/table-covers-og.webp",
              name: "Pakistan table cover manufacturer — custom damask and jacquard tablecloths for hotels worldwide",
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.mzglobaltrading.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Home Textiles",
                  item: "https://www.mzglobaltrading.com/hometextile/",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Table Linen",
                  item: "https://www.mzglobaltrading.com/hometextile/tablelinen/",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Table Covers",
                  item: "https://www.mzglobaltrading.com/hometextile/tablelinen/tablecovers/",
                },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What fabric constructions are available for table covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We supply table covers in six primary constructions: Cotton Damask or Jacquard (formal dining and banqueting), Plain Weave or Poplin (everyday restaurant and café use), Satin Weave (premium reception and gala events), Dobby or Waffle texture (contemporary bistro and boutique hospitality), Linen or Linen-Look cotton-linen blend (natural aesthetic for lifestyle brands), and Poly-Cotton easy-care (high-turnover food service where laundering frequency demands dimensional stability). Construction selection depends on service environment, laundering frequency, aesthetic brief and budget tier.",
                },
              },
              {
                "@type": "Question",
                name: "Can you produce table covers in custom dimensions?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Custom dimensions are standard practice for hospitality procurement — most hotel and banqueting programmes require sizes specific to their table inventory. We produce rectangular, round and square table covers to your specified cut dimensions. Standard tolerance is ±2 cm on finished dimensions after washing and pressing. For event rental companies managing multiple table sizes, we can produce a full range within a single order. Include your required cut dimensions and drop length (from table edge to floor or hem) in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What GSM is recommended for hotel banquet table covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For formal hotel banqueting, 220–280 GSM in cotton damask or jacquard construction is the industry standard. This weight range delivers sufficient drape for elegant table presentation while maintaining dimensional stability through industrial laundering cycles. For casual dining and café environments where lighter, faster-drying covers are preferred, 150–180 GSM plain weave or poly-cotton performs well. Event rental operations frequently specify 250 GSM poly-cotton for durability across heavy laundering and ironing cycles.",
                },
              },
              {
                "@type": "Question",
                name: "Are wrinkle-resistant and stain-repellent finishes available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Wrinkle-resistant (easy-iron) finish reduces pressing time after laundering — particularly valuable for high-turnover food service operations. Water and stain repellent finish (DWR-based) provides initial resistance to liquid spills, reducing immediate staining in service environments. Both finishes are available individually or combined. Note that stain-repellent finish degrades gradually with repeated laundering; re-treatment is available as a service from commercial laundry operators. Specify your finish requirements in the RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "Can you add embroidery or woven branding to table covers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Embroidered logos and monograms are available on all woven constructions — chest placement (corner, edge or centre) with thread colour matched to your brand specification. Jacquard-woven all-over patterns can incorporate branded motifs, borders or repeat patterns woven directly into the fabric structure — no applied decoration that can peel or fade. Printed designs using reactive printing are available on plain weave and poly-cotton constructions. Share your brand guidelines and decoration brief in your RFQ.",
                },
              },
              {
                "@type": "Question",
                name: "What certifications apply to your table cover supply?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "OEKO-TEX Standard 100 is the baseline certification across our table linen supply network, certifying the absence of harmful substances in all fabric components — required by EU hotel groups and sustainability-committed buyers. BSCI (Business Social Compliance Initiative) covers ethical production and labour standards. ISO 9001 covers quality management systems. For organic cotton programmes, GOTS (Global Organic Textile Standard) is available. Sedex and SA8000 audit compliance is available for buyers whose procurement policies require ethical supply chain verification.",
                },
              },
              {
                "@type": "Question",
                name: "What is the lead time for a hotel table linen programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lead times are indicative and depend on construction, quantity and factory capacity. As a general guide: sample production takes 10–15 days from specification confirmation; bulk production typically takes 30–50 days from purchase order placement. Custom jacquard orders with woven branding require 10–15 additional days for loom setup. Sea freight adds 20–35 days depending on destination. For hotel pre-opening programmes with fixed opening dates, we recommend allowing a minimum of 90 days from RFQ to arrival at destination.",
                },
              },
              {
                "@type": "Question",
                name: "Do you supply table covers for airline catering and corporate dining?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Airline catering and corporate dining are established sectors within our table linen supply. Airline programmes typically specify tray covers and seat-back table covers to precise cut dimensions determined by aircraft configuration — we produce these to custom specification. Corporate dining programmes range from premium executive dining room linen in cotton damask to high-turnover cafeteria covers in poly-cotton easy-care construction. Supply chain documentation for airline procurement (factory audits, material certifications, test reports) is provided as standard.",
                },
              },
            ],
          }),
        }}
      />
      <MegaMenu />
      <main id="main-content">
        <TableCoversContent />
      </main>
      <Footer />
    </>
  );
}
