import { FeaturedImage } from './FeaturedImage'

export type Post = {
  author: string
  description: string
  createdAt: string
  title: string
  slug: string
  featuredImage: FeaturedImage
}
