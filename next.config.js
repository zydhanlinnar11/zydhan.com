const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      'storage.googleapis.com',
      'cdn.discordapp.com',
      'avatars.dicebear.com',
      'media.discordapp.net',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://zydhan.xyz/blog',
        permanent: true,
      },
      {
        source: '/post/:slug*',
        destination: 'https://zydhan.xyz/blog/posts/:slug*',
        permanent: true,
      },
      {
        source: '/login',
        destination: 'https://zydhan.xyz/auth/login',
        permanent: true,
      },
      {
        source: '/register',
        destination: 'https://zydhan.xyz/auth/register',
        permanent: true,
      },
      {
        source: '/admin/:path*',
        destination: 'https://zydhan.xyz/blog/admin/:path*',
        permanent: true,
      },
    ]
  },
})
