import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/career_load_map",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
