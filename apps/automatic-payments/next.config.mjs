/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@xero/xui', '@xero/xui-icon'],
  sassOptions: {
    silenceDeprecations: ['import', 'legacy-js-api'],
    quietDeps: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
