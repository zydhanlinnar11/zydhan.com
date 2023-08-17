import { Metadata, ResolvingMetadata } from 'next'
import { createTranslator } from 'next-intl'
import { config } from '@/config/common'
import { readProjectMetadata } from '@/lib/projects'
import { notFound } from 'next/navigation'
import ProjectPage from './ProjectPage'

type Props = {
  params: { locale: 'en' | 'id'; slug: string }
}

export async function generateMetadata(
  { params: { locale, slug } }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const messages = (await import(`@/messages/${locale}.json`)).default
  const t = createTranslator({ locale, messages })
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent)?.openGraph?.images || []

  try {
    const metadata = await readProjectMetadata(slug, locale)
    return {
      metadataBase: new URL(config.baseUrl),
      title: `${metadata.title} | ${t('ProjectsPage.title')} - ${
        config.siteName
      }`,
      description: metadata.subtitle,
      openGraph: {
        title: `${metadata.title} | ${t('ProjectsPage.title')}`,
        description: metadata.subtitle,
        url: `/${locale}/projects/${metadata.slug}`,
        type: 'website',
        images: [
          {
            url: metadata.thumbnail.src,
            width: metadata.thumbnail.width,
            height: metadata.thumbnail.height,
          },
          ...previousImages,
        ],
        locale,
        siteName: config.siteName,
      },
      alternates: {
        canonical: '/',
        languages: {
          en: `/en/projects/${metadata.slug}`,
          id: `/id/projects/${metadata.slug}`,
        },
      },
    }
  } catch (e) {
    return {}
  }
}

const ProjectsPageServerWrapper = async ({
  params: { locale, slug },
}: {
  params: { locale: 'en' | 'id'; slug: string }
}) => {
  let MdxContent: any
  try {
    MdxContent = (await import(`@/projects/${locale}/${slug}.mdx`)).default
  } catch (e) {
    notFound()
  }

  return (
    <ProjectPage metadata={await readProjectMetadata(slug, locale)}>
      <MdxContent />
    </ProjectPage>
  )
}

export default ProjectsPageServerWrapper
