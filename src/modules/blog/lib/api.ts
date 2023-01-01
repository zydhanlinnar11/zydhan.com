import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Post } from '@/blog/types/Post'
import { getPostFeaturedImage } from '@/blog/lib/featured-image'

const postsDirectory = join(process.cwd(), 'src/pages/blog/posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((name) => /\.mdx$/.test(name))
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  // @ts-ignore
  const post: Post = data
  post.slug = realSlug
  post.featuredImage = getPostFeaturedImage(realSlug)

  return post
}

export function getAllPosts() {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.createdAt > post2.createdAt ? -1 : 1))
  return posts
}
