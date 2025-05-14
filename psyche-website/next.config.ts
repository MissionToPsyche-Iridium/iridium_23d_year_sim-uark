import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/iridium_23d_year_sim-uark',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
