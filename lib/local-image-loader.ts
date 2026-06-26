const GENERATED_SIZES = [375, 640, 750, 828, 1080, 1200, 1920];

// Only these directories have pre-generated responsive sizes
const RESPONSIVE_PATHS = [
  "/images/hero/",
  "/images/cards/",
  "/images/menu/",
  "/images/thumbnails/",
  "/images/team/",
];

export default function localImageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const isResponsive = RESPONSIVE_PATHS.some((p) => src.includes(p));
  if (!isResponsive) return src;

  const size =
    GENERATED_SIZES.find((s) => s >= width) ??
    GENERATED_SIZES[GENERATED_SIZES.length - 1];

  const dot = src.lastIndexOf(".");
  const base = src.slice(0, dot);
  const ext = src.slice(dot + 1);
  return `${base}@${size}w.${ext}`;
}
