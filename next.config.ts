import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'oxp8pbedietshmu8.public.blob.vercel-storage.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
