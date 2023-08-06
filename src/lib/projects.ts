import { ProjectMetadata } from '@/types/ProjectMetadata'
import { readdirSync } from 'fs'
import matter from 'gray-matter'

export const getProjectsMetadata = async (locale: 'en' | 'id') => {
  const basePath = './src/app/[locale]/projects'
  const projects = readdirSync(basePath, {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const projectsMetadata: ProjectMetadata[] = []
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i]
    const mdxFilePath = `${basePath}/${project}/page.mdx`
    const metadata = matter.read(mdxFilePath).data
    projectsMetadata.push({
      ...metadata,
      slug: project,
      subtitle: metadata.subtitle[locale],
    } as ProjectMetadata)
  }

  return projectsMetadata
}
