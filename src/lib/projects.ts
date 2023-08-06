import { ProjectMetadata } from '@/types/ProjectMetadata'
import { readdirSync } from 'fs'

export const getProjectsMetadata = async (locale: 'en' | 'id') => {
  const basePath = `./src/projects/${locale}`
  try {
    const slugs = readdirSync(basePath)
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.replace('.mdx', ''))

    const metadatas: ProjectMetadata[] = []
    for (let i = 0; i < slugs.length; i++) {
      const slug = slugs[i]
      try {
        metadatas.push(await readProjectMetadata(slug, locale))
      } catch (e) {
        continue
      }
    }
    return metadatas
  } catch (e) {
    return []
  }
}

export const readProjectMetadata = async (
  slug: string,
  locale: 'en' | 'id'
) => {
  const metadata = (await import(`@/projects/${locale}/${slug}.mdx`)).meta

  return {
    ...metadata,
    slug,
  } as ProjectMetadata
}
