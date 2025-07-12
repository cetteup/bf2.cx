import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                hostname: 'bf2.tv'
            }
        ]
    }
};

export default nextConfig;
