/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'storage.googleapis.com',
      'cdn.discordapp.com',
      'avatars.dicebear.com',
      'media.discordapp.net',
    ],
  },
  eslint: {
    dirs: ['src'],
  },
}

module.exports = nextConfig
