import { ProjectMetadata } from '@/types/ProjectMetadata'
import { readdirSync } from 'fs'

const basePath = './src/app/[locale]/projects'

export const getProjectsMetadata = async (locale: 'en' | 'id') => {
  const slugs = readdirSync(basePath)
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace('.mdx', ''))

  const metadatas: ProjectMetadata[] = []
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i]
    metadatas.push(await readProjectMetadata(slug, locale))
  }

  return metadatas
}

export const readProjectMetadata = async (
  slug: string,
  locale: 'en' | 'id'
) => {
  const metadata = (await import(`@/app/[locale]/projects/${slug}.mdx`)).meta

  return {
    ...metadata,
    slug,
    subtitle: metadata.subtitle[locale],
  } as ProjectMetadata
}
