import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone',
    async redirects() {
        return [
            {
                source: '/server/:id*',
                destination: '/servers/:id*',
                permanent: true,
            },
        ];
    },
    images: {
        minimumCacheTTL: 12 * 60 * 60,
    },
};

export default nextConfig;
