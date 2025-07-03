/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    //config.externals.push({ })
    return config;
  },
};

module.exports = nextConfig;
