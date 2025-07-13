import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        minimumCacheTTL: 12 * 60 * 60
    }
};

export default nextConfig;
