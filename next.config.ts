import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // output: "export",
    env: {
        NEXT_API_URL: process.env.NEXT_API_URL,
    },
};

export default nextConfig;
