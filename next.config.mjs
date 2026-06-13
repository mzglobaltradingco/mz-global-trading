/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    formats: ["image/webp", "image/avif"],
    unoptimized: true,
  },
};

export default nextConfig;
