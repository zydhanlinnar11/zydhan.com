import { StaticImageData } from 'next/image'

type HomePost = {
  title: string
  cover: StaticImageData
  slug: string
  created_at: string
  description?: string
}

export default HomePost
