import { StaticImageData } from 'next/image'

export type ProjectMetadata = {
  title: string
  subtitle: string
  startDate: string
  endDate: string
  slug: string
  appType: 'web_app'
  thumbnail: StaticImageData
}
