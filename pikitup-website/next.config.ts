import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/pikitup",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/pikitup",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pikitup.co.za" },
      { protocol: "https", hostname: "ui-avatars.com" },
    ],
  },
};

export default nextConfig;
