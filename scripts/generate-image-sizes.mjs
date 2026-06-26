import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join, extname, basename, dirname } from "path";

const SIZES = [375, 640, 750, 828, 1080, 1200, 1920];
const IMAGE_DIR = "public/images";
const QUALITY = 75;

// These directories have no content images — skip them
const SKIP_DIRS = new Set(["og", "logo", "certs", "icons", "social"]);

async function collectFiles(dir, isRoot = false) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        files.push(...(await collectFiles(fullPath)));
      }
    } else if (!isRoot && extname(entry.name).toLowerCase() === ".webp") {
      // Skip root-level files — they have no RESPONSIVE_PATHS match in the loader
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const start = Date.now();
  const allFiles = await collectFiles(IMAGE_DIR, true);

  // Split into originals and previously-generated sized files
  const originals = allFiles.filter((f) => !basename(f).includes("@"));
  const stale = allFiles.filter((f) => basename(f).includes("@"));

  // Remove stale sized files so updated originals don't leave orphans
  if (stale.length) {
    await Promise.all(stale.map((f) => unlink(f)));
    console.log(`  Removed ${stale.length} stale sized files`);
  }

  let generated = 0;

  for (const src of originals) {
    const dir = dirname(src);
    const name = basename(src, ".webp");

    // withoutEnlargement: true means if target > original, Sharp outputs at
    // original resolution — so all 7 sizes always exist and none will 404.
    const tasks = SIZES.map((size) =>
      sharp(src)
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(join(dir, `${name}@${size}w.webp`))
    );

    await Promise.all(tasks);
    generated += tasks.length;
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(
    `  Generated ${generated} sized images from ${originals.length} originals in ${elapsed}s`
  );
}

main().catch((err) => {
  console.error("generate-image-sizes failed:", err);
  process.exit(1);
});
