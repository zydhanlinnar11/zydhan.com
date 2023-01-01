import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getPostFeaturedImage } from '@/blog/lib/featured-image'
import { PostMetadata } from '@/blog/types/PostMetadata'

const postsDirectory = join(process.cwd(), 'src/pages/blog/posts')

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => /\.mdx$/.test(name))
    .map((slug) => slug.replace(/\.mdx$/, ''))
}

const readFile = (slug: string) => {
  const fullPath = join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  return fileContents
}

export function getPostMetadataBySlug(slug: string) {
  const { data } = matter(readFile(slug))
  // @ts-ignore
  const post: PostMetadata = data
  post.slug = slug
  post.featuredImage = getPostFeaturedImage(slug)

  return post
}

export function getMetadataAllPosts() {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostMetadataBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.createdAt > post2.createdAt ? -1 : 1))
  return posts
}
