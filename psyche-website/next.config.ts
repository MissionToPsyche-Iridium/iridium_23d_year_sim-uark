import type { NextConfig } from 'next';

const isExport = process.env.EXPORT === 'true';

const nextConfig: NextConfig = {
  /* config options here */
  ...(isExport && {
    output: 'export',
  }),
  basePath: '/iridium_23d_year_sim-uark',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
