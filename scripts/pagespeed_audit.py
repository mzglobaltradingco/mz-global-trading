"""
PageSpeed Insights full audit — MZ Global Trading
Captures complete issue details per page, not just scores.

Usage:
    python scripts/pagespeed_audit.py --key YOUR_API_KEY
    python scripts/pagespeed_audit.py --key YOUR_API_KEY --strategy mobile
    python scripts/pagespeed_audit.py --key YOUR_API_KEY --limit 10
    python scripts/pagespeed_audit.py --key YOUR_API_KEY --strategy both

Output:
    pagespeed_results.json    — full raw Lighthouse JSON per page
    pagespeed_issues.json     — structured issues per page (scores + all failed audits with details)
    pagespeed_issues.csv      — one row per issue per page — sort/filter in Excel
    pagespeed_report.txt      — ranked summary + top issues list
"""

import argparse
import csv
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

BASE_URL = "https://mzglobaltrading.com"
OUT_DIR = Path(__file__).parent.parent / "out"
API_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
CATEGORIES = ["performance", "accessibility", "seo", "best-practices"]
DELAY_SECONDS = 1.2

# Audit scores below this are flagged as issues
SCORE_THRESHOLD = 0.9  # 0–1 scale (0.9 = 90)

# Impact ordering
IMPACT_ORDER = {"error": 0, "warning": 1, "informative": 2, "notApplicable": 3, None: 4}


def discover_urls() -> list[str]:
    skip = {"404", "_not-found", "_next", "_pagefind"}
    urls = []
    for path in sorted(OUT_DIR.rglob("index.html")):
        rel = path.parent.relative_to(OUT_DIR)
        parts = rel.parts
        if parts and parts[0] in skip:
            continue
        if str(rel) == ".":
            urls.append(f"{BASE_URL}/")
        else:
            slug = "/".join(parts)
            urls.append(f"{BASE_URL}/{slug}/")
    return urls


def call_api(url: str, strategy: str, api_key: str) -> dict:
    qs = urllib.parse.urlencode(
        [("url", url), ("strategy", strategy), ("key", api_key)]
        + [("category", c) for c in CATEGORIES]
    )
    req_url = f"{API_ENDPOINT}?{qs}"
    try:
        with urllib.request.urlopen(req_url, timeout=90) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        return {"_error": f"HTTP {e.code}", "_detail": body[:500], "url": url}
    except Exception as e:
        return {"_error": str(e), "url": url}


def extract_scores(data: dict) -> dict:
    cats = data.get("lighthouseResult", {}).get("categories", {})
    audits = data.get("lighthouseResult", {}).get("audits", {})

    def score(key):
        val = cats.get(key, {}).get("score")
        return round(val * 100) if val is not None else None

    def ms(key):
        val = audits.get(key, {}).get("numericValue")
        return round(val) if val is not None else None

    def display(key):
        return audits.get(key, {}).get("displayValue", None)

    return {
        "performance": score("performance"),
        "accessibility": score("accessibility"),
        "seo": score("seo"),
        "best_practices": score("best-practices"),
        "lcp_ms": ms("largest-contentful-paint"),
        "lcp": display("largest-contentful-paint"),
        "cls": display("cumulative-layout-shift"),
        "inp_ms": ms("interaction-to-next-paint"),
        "inp": display("interaction-to-next-paint"),
        "fcp_ms": ms("first-contentful-paint"),
        "fcp": display("first-contentful-paint"),
        "tbt_ms": ms("total-blocking-time"),
        "tbt": display("total-blocking-time"),
        "speed_index": display("speed-index"),
    }


def extract_issues(data: dict) -> list[dict]:
    """Extract all failed/warning audits with full details."""
    if "_error" in data:
        return []

    lhr = data.get("lighthouseResult", {})
    audits = lhr.get("audits", {})
    cats = lhr.get("categories", {})

    # Build map: audit_id → category name
    audit_to_cat = {}
    cat_labels = {
        "performance": "Performance",
        "accessibility": "Accessibility",
        "seo": "SEO",
        "best-practices": "Best Practices",
    }
    for cat_key, cat_data in cats.items():
        label = cat_labels.get(cat_key, cat_key)
        for ref in cat_data.get("auditRefs", []):
            audit_to_cat[ref["id"]] = label

    issues = []
    for audit_id, audit in audits.items():
        score = audit.get("score")
        score_display_mode = audit.get("scoreDisplayMode", "")

        # Skip passed audits, manual checks, and non-applicable
        if score_display_mode in ("notApplicable", "manual"):
            continue
        if score is not None and score >= SCORE_THRESHOLD:
            continue
        if score_display_mode == "informative" and score is None:
            # include informative ones that surface issues
            pass

        title = audit.get("title", "")
        description = audit.get("description", "").split("[")[0].strip()  # strip markdown links
        display_value = audit.get("displayValue", "")
        category = audit_to_cat.get(audit_id, "Other")

        # Numeric impact
        numeric_value = audit.get("numericValue")
        savings_ms = None
        if "overallSavingsMs" in audit.get("details", {}):
            savings_ms = round(audit["details"]["overallSavingsMs"])
        elif numeric_value and audit_id in (
            "render-blocking-resources",
            "unused-javascript",
            "unused-css-rules",
            "uses-optimized-images",
            "uses-webp-images",
            "uses-responsive-images",
            "efficient-animated-content",
            "uses-text-compression",
        ):
            savings_ms = round(numeric_value)

        # Affected items (URLs, elements, nodes)
        items = []
        details = audit.get("details", {})
        if details.get("type") == "table":
            for item in details.get("items", [])[:10]:  # cap at 10 per audit
                row = {}
                for k, v in item.items():
                    if isinstance(v, dict):
                        # node/url type
                        if v.get("type") == "url":
                            row[k] = v.get("value", "")
                        elif v.get("type") == "node":
                            row[k] = v.get("snippet", v.get("nodeLabel", ""))
                        elif v.get("type") == "code":
                            row[k] = v.get("value", "")
                        elif v.get("type") == "link":
                            row[k] = v.get("text", "") + " " + v.get("url", "")
                        else:
                            row[k] = str(v.get("value", v))
                    elif isinstance(v, (str, int, float)):
                        row[k] = v
                if row:
                    items.append(row)
        elif details.get("type") == "list":
            for item in details.get("items", [])[:10]:
                if isinstance(item, dict) and item.get("type") == "url":
                    items.append({"url": item.get("value", "")})

        issues.append({
            "audit_id": audit_id,
            "category": category,
            "title": title,
            "description": description,
            "score": round(score * 100) if score is not None else None,
            "score_mode": score_display_mode,
            "display_value": display_value,
            "savings_ms": savings_ms,
            "items": items,
        })

    # Sort: errors first, then by savings_ms desc
    issues.sort(key=lambda x: (
        1 if x["score"] is not None and x["score"] >= 50 else 0,
        -(x["savings_ms"] or 0),
    ))
    return issues


def run_audit(urls, strategies, api_key, limit):
    if limit:
        urls = urls[:limit]

    total = len(urls) * len(strategies)
    print(f"\n  Pages: {len(urls)}  |  Strategies: {', '.join(strategies)}  |  Total API calls: {total}")
    print(f"  Estimated time: ~{round(total * DELAY_SECONDS / 60, 1)} min\n")

    raw_results = []
    structured = []
    done = 0

    for url in urls:
        for strategy in strategies:
            done += 1
            slug = url.replace(BASE_URL, "") or "/"
            print(f"  [{done}/{total}] {strategy:7s}  {slug}", end="", flush=True)

            data = call_api(url, strategy, api_key)

            if "_error" in data:
                print(f"  ERROR: {data['_error']}")
                structured.append({"url": url, "strategy": strategy, "error": data["_error"]})
                raw_results.append({"url": url, "strategy": strategy, "error": data})
                if done < total:
                    time.sleep(DELAY_SECONDS)
                continue

            scores = extract_scores(data)
            issues = extract_issues(data)

            p = scores["performance"]
            a = scores["accessibility"]
            s = scores["seo"]
            bp = scores["best_practices"]
            print(f"  Perf:{p}  A11y:{a}  SEO:{s}  BP:{bp}  Issues:{len(issues)}  LCP:{scores['lcp']}  CLS:{scores['cls']}")

            structured.append({
                "url": url,
                "strategy": strategy,
                "scores": scores,
                "issues": issues,
            })
            raw_results.append({"url": url, "strategy": strategy, "data": data})

            if done < total:
                time.sleep(DELAY_SECONDS)

    return raw_results, structured


def save_json(obj, path):
    with open(path, "w", encoding="utf-8") as f:
        json.dump({"generated": datetime.now().isoformat(), "results": obj}, f, indent=2)
    print(f"  Saved: {path}")


def save_issues_csv(structured, path):
    rows = []
    for page in structured:
        if "error" in page:
            continue
        url = page["url"]
        strategy = page["strategy"]
        scores = page.get("scores", {})
        for issue in page.get("issues", []):
            rows.append({
                "url": url,
                "strategy": strategy,
                "category": issue["category"],
                "audit_id": issue["audit_id"],
                "title": issue["title"],
                "score": issue["score"],
                "display_value": issue["display_value"],
                "savings_ms": issue["savings_ms"] or "",
                "description": issue["description"],
                "affected_items": " | ".join(
                    str(list(item.values())[0]) if item else ""
                    for item in issue["items"][:5]
                ),
                "perf_score": scores.get("performance"),
                "a11y_score": scores.get("accessibility"),
                "seo_score": scores.get("seo"),
                "bp_score": scores.get("best_practices"),
            })

    if not rows:
        return

    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)
    print(f"  Saved: {path}  ({len(rows)} issue rows)")


def save_report(structured, path):
    lines = []
    lines.append("=" * 100)
    lines.append("  PAGESPEED INSIGHTS FULL AUDIT — MZ GLOBAL TRADING")
    lines.append(f"  Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append("=" * 100)

    for strategy in ["mobile", "desktop"]:
        pages = [p for p in structured if p.get("strategy") == strategy and "error" not in p]
        if not pages:
            continue

        lines.append(f"\n{'='*100}")
        lines.append(f"  {strategy.upper()}  —  {len(pages)} pages")
        lines.append(f"{'='*100}")

        # Scores table
        lines.append(f"\n  {'URL':<60} {'Perf':>5} {'A11y':>5} {'SEO':>4} {'BP':>4}  {'LCP':<9} {'CLS':<7} {'Issues':>6}")
        lines.append(f"  {'-'*60} {'----':>5} {'----':>5} {'---':>4} {'--':>4}  {'-'*9} {'-'*7} {'-'*6}")

        pages_sorted = sorted(pages, key=lambda p: (p["scores"].get("performance") or 0))
        for p in pages_sorted:
            s = p["scores"]
            slug = p["url"].replace(BASE_URL, "") or "/"
            lines.append(
                f"  {slug:<60} {str(s.get('performance','?')):>5} {str(s.get('accessibility','?')):>5}"
                f" {str(s.get('seo','?')):>4} {str(s.get('best_practices','?')):>4}"
                f"  {str(s.get('lcp','?')):<9} {str(s.get('cls','?')):<7} {len(p.get('issues',[])): >6}"
            )

        def avg(key):
            vals = [p["scores"].get(key) for p in pages if p["scores"].get(key) is not None]
            return round(sum(vals) / len(vals)) if vals else "N/A"

        lines.append(f"  {'-'*100}")
        lines.append(f"  {'AVERAGE':<60} {str(avg('performance')):>5} {str(avg('accessibility')):>5} {str(avg('seo')):>4} {str(avg('best_practices')):>4}")

        # Top recurring issues across all pages
        from collections import Counter
        issue_counter = Counter()
        issue_titles = {}
        for p in pages:
            seen = set()
            for issue in p.get("issues", []):
                aid = issue["audit_id"]
                if aid not in seen:
                    issue_counter[aid] += 1
                    issue_titles[aid] = (issue["title"], issue["category"], issue.get("description", ""))
                    seen.add(aid)

        lines.append(f"\n  TOP RECURRING ISSUES (by number of pages affected):")
        lines.append(f"  {'-'*100}")
        lines.append(f"  {'Pages':>5}  {'Category':<16} {'Issue Title':<45} Description")
        lines.append(f"  {'-----':>5}  {'-'*16} {'-'*45} {'-'*30}")
        for aid, count in issue_counter.most_common(30):
            title, cat, desc = issue_titles[aid]
            desc_short = desc[:50] + "..." if len(desc) > 50 else desc
            lines.append(f"  {count:>5}  {cat:<16} {title:<45} {desc_short}")

        # Per-page issue breakdown
        lines.append(f"\n\n  PER-PAGE ISSUE BREAKDOWN:")
        for p in pages_sorted:
            if not p.get("issues"):
                continue
            slug = p["url"].replace(BASE_URL, "") or "/"
            s = p["scores"]
            lines.append(f"\n  {'─'*100}")
            lines.append(f"  {slug}   Perf:{s.get('performance')}  A11y:{s.get('accessibility')}  SEO:{s.get('seo')}  BP:{s.get('best_practices')}")
            lines.append(f"  {'─'*100}")
            for issue in p["issues"]:
                score_str = f"score:{issue['score']}" if issue["score"] is not None else "informative"
                savings_str = f"  saves:{issue['savings_ms']}ms" if issue["savings_ms"] else ""
                lines.append(f"  [{issue['category']}] {issue['title']}  ({score_str}{savings_str})")
                if issue["display_value"]:
                    lines.append(f"    Value: {issue['display_value']}")
                if issue["description"]:
                    lines.append(f"    Info:  {issue['description'][:120]}")
                if issue["items"]:
                    lines.append(f"    Affected ({len(issue['items'])}):")
                    for item in issue["items"][:5]:
                        lines.append(f"      • {json.dumps(item)[:120]}")

    lines.append("\n" + "=" * 100)
    report = "\n".join(lines)
    print("\n" + report)
    with open(path, "w", encoding="utf-8") as f:
        f.write(report)
    print(f"\n  Saved: {path}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--key", required=True)
    parser.add_argument("--strategy", default="both", choices=["mobile", "desktop", "both"])
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--url", default=None, help="Audit a single specific URL instead of all pages")
    args = parser.parse_args()

    strategies = ["mobile", "desktop"] if args.strategy == "both" else [args.strategy]

    if args.url:
        urls = [args.url]
        print(f"\n  Single-URL mode: {args.url}")
    else:
        print("\n  Discovering pages from out/ directory...")
        urls = discover_urls()
        if not urls:
            print("  ERROR: No pages found in out/. Run `npm run build` first.")
            sys.exit(1)
        print(f"  Found {len(urls)} pages.")

    raw_results, structured = run_audit(urls, strategies, args.key, args.limit)

    root = Path(__file__).parent.parent
    print("\n  Saving results...")
    save_json(raw_results, root / "pagespeed_results.json")
    save_json(structured, root / "pagespeed_issues.json")
    save_issues_csv(structured, root / "pagespeed_issues.csv")
    save_report(structured, root / "pagespeed_report.txt")

    print("\n  Done.\n")


if __name__ == "__main__":
    main()
