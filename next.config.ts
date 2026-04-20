import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  }
};
module.exports = {
  allowedDevOrigins: ['192.168.1.*'],
}
export default nextConfig;
