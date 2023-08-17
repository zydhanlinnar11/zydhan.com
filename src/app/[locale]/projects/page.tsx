import ProjectsPage from './ProjectsPage'
import { Metadata, ResolvingMetadata } from 'next'
import { createTranslator } from 'next-intl'
import { config } from '@/config/common'
import { getProjectsMetadata } from '@/lib/projects'

type Props = {
  params: { locale: string }
}

export async function generateMetadata(
  { params: { locale } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const messages = (await import(`@/messages/${locale}.json`)).default
  const t = createTranslator({ locale, messages })
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent)?.openGraph?.images || []
  const projectsMetadata = (await getProjectsMetadata(locale as any)).sort(
    (a, b) => b.startDate.localeCompare(a.startDate)
  )

  return {
    metadataBase: new URL(config.baseUrl),
    title: `${t('ProjectsPage.title')} - ${config.siteName}`,
    description: t('ProjectsPage.subtitle'),
    openGraph: {
      title: t('ProjectsPage.title'),
      description: t('ProjectsPage.subtitle'),
      url: '/',
      type: 'website',
      images: [
        ...(projectsMetadata.map((metadata) => ({
          url: metadata.thumbnail.src,
          width: metadata.thumbnail.width,
          height: metadata.thumbnail.height,
          alt: metadata.title,
        })) as any[]),
        ...previousImages,
      ],
      locale,
      siteName: config.siteName,
    },
    alternates: {
      canonical: '/',
      languages: {
        en: '/en/projects',
        id: '/id/projects',
      },
    },
  }
}

const ProjectsPageServerWrapper = async ({
  params: { locale },
}: {
  params: { locale: 'en' | 'id' }
}) => {
  const projectsMetadata = (await getProjectsMetadata(locale)).sort((a, b) =>
    b.startDate.localeCompare(a.startDate)
  )

  return <ProjectsPage metadatas={projectsMetadata} />
}

export default ProjectsPageServerWrapper
