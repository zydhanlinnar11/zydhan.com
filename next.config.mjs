import nextMDX from '@next/mdx'
import rehypeSlug from 'rehype-slug'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
}

const withMDX = nextMDX({
  options: {
    rehypePlugins: [rehypeSlug],
  },
})

export default withMDX(nextConfig)
