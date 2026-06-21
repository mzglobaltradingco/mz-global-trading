"use client";

import Image from "next/image";

const certs = [
  { src: "/images/certs/cert-oeko-tex.webp",  alt: "OEKO-TEX Standard 100 certified — safe for humans textile manufacturing" },
  { src: "/images/certs/cert-gots.webp",       alt: "GOTS Global Organic Textile Standard certified — organic fiber processing and manufacturing" },
  { src: "/images/certs/cert-bsci.webp",       alt: "BSCI Business Social Compliance Initiative — ethical supply chain audit certification" },
  { src: "/images/certs/cert-sedex.webp",      alt: "Sedex Members Ethical Trade Audit — responsible sourcing verification" },
  { src: "/images/certs/cert-iso-9001.webp",   alt: "ISO 9001 quality management system certified textile manufacturer" },
  { src: "/images/certs/cert-grs.webp",        alt: "GRS Global Recycled Standard certified — recycled content textile certification" },
  { src: "/images/certs/cert-wrap.webp",       alt: "WRAP Worldwide Responsible Accredited Production — ethical manufacturing certification" },
  { src: "/images/certs/cert-bci.webp",        alt: "BCI Better Cotton Initiative member — sustainable cotton sourcing program" },
  { src: "/images/certs/cert-sa8000.webp",     alt: "SA8000 Social Accountability Standard — fair labor and workers rights certification" },
  { src: "/images/certs/cert-bluesign.webp",   alt: "Bluesign system certified — sustainable textile production and chemical safety" },
];

// Duplicate for seamless infinite loop
const track = [...certs, ...certs];

export default function CertificationsStrip() {
  return (
    <section className="py-12 bg-white border-t border-gray-100 overflow-hidden">
      <p className="text-center text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-8">
        Our Factories Are Certified By
      </p>
      <div className="overflow-hidden">
        <div className="flex items-center gap-10 w-max" style={{ animation: "marqueeLeft 28s linear infinite" }}>
          {track.map((cert, i) => (
            <div
              key={`${cert.alt}-${i}`}
              className="shrink-0 flex items-center justify-center"
              style={{ width: 140, height: 80 }}
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                width={140}
                height={80}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
