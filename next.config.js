/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
    })
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ['@monaco-editor/react']
  }
}

module.exports = nextConfig
