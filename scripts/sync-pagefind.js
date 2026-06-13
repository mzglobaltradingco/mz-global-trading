// Copies the generated pagefind index from out/_pagefind/ to public/_pagefind/
// so that `npm run dev` can serve it at /_pagefind/pagefind.js.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(root, "out", "_pagefind");
const dst = path.join(root, "public", "_pagefind");

if (!fs.existsSync(src)) {
  console.warn("sync-pagefind: out/_pagefind not found — skipping.");
  process.exit(0);
}

fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
console.log("sync-pagefind: index copied to public/_pagefind/ (available in dev mode).");
