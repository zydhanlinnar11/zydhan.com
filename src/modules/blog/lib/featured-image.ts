import defaultFeaturedImage from '@/blog/assets/images/default-featured-image.jpg'
import { FeaturedImage } from '@/blog/types/FeaturedImage'

const postFeaturedImages: { [key: string]: FeaturedImage } = {}

export const getPostFeaturedImage: GetPostFeaturedImage = (slug) => {
  if (slug in postFeaturedImages) return postFeaturedImages[slug]
  return { image: defaultFeaturedImage, alt: 'A picture of sofa' }
}

type GetPostFeaturedImage = (slug: string) => FeaturedImage
