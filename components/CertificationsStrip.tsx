"use client";

import Image from "next/image";

const row1 = [
  { src: "/images/certs/cert-oeko-tex.webp",  alt: "OEKO-TEX Standard 100" },
  { src: "/images/certs/cert-gots.webp",       alt: "GOTS" },
  { src: "/images/certs/cert-bsci.webp",       alt: "BSCI" },
  { src: "/images/certs/cert-sedex.webp",      alt: "Sedex" },
  { src: "/images/certs/cert-iso-9001.webp",   alt: "ISO 9001" },
];

const row2 = [
  { src: "/images/certs/cert-grs.webp",        alt: "GRS" },
  { src: "/images/certs/cert-wrap.webp",        alt: "WRAP" },
  { src: "/images/certs/cert-bci.webp",         alt: "BCI" },
  { src: "/images/certs/cert-sa8000.webp",      alt: "SA8000" },
  { src: "/images/certs/cert-bluesign.webp",    alt: "Bluesign" },
];

function MarqueeRow({
  items,
  direction,
}: {
  items: { src: string; alt: string }[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-12 w-max items-center"
        style={{
          animation: `${direction === "left" ? "marqueeLeft" : "marqueeRight"} 22s linear infinite`,
        }}
      >
        {doubled.map((cert, i) => (
          <div
            key={`${cert.alt}-${i}`}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ height: 80 }}
          >
            <Image
              src={cert.src}
              alt={cert.alt}
              width={130}
              height={80}
              className="object-contain max-h-[80px] w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CertificationsStrip() {
  return (
    <section className="py-12 bg-white border-t border-gray-100 overflow-hidden">
      <p className="text-center text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-8">
        Our Factories Are Certified By
      </p>
      <div className="space-y-5">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
}
