/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile all @carmaconcierge packages in the monorepo
  transpilePackages: ['@carmaconcierge/shared'],
};

module.exports = nextConfig;
