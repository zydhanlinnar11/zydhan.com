import { getProjectsMetadata } from '@/lib/projects'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectsMetadataEn = (await getProjectsMetadata('en')).sort((a, b) =>
    b.startDate.localeCompare(a.startDate)
  )
  const projectsMetadataId = (await getProjectsMetadata('id')).sort((a, b) =>
    b.startDate.localeCompare(a.startDate)
  )

  return [
    {
      url: 'https://zydhan.com',
    },
    {
      url: 'https://zydhan.com/id',
    },
    {
      url: 'https://zydhan.com/projects',
    },
    {
      url: 'https://zydhan.com/id/projects',
    },
    ...projectsMetadataEn.map((project) => ({
      url: `https://zydhan.com/projects/${project.slug}`,
    })),
    ...projectsMetadataId.map((project) => ({
      url: `https://zydhan.com/id/projects/${project.slug}`,
    })),
  ]
}
