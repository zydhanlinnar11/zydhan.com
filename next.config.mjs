import mdx from '@next/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'storage.googleapis.com',
      'cdn.discordapp.com',
      'avatars.dicebear.com',
      'media.discordapp.net',
      'dev.zydhan.xyz',
      'zydhan.xyz',
    ],
  },
  eslint: {
    dirs: ['src'],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
