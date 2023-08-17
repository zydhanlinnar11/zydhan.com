import ProjectsPage from './ProjectsPage'
import { Metadata } from 'next'
import logo from '../../../../public/logo.webp'
import { createTranslator } from 'next-intl'
import { config } from '@/config/common'
import { getProjectsMetadata } from '@/lib/projects'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const messages = (await import(`@/messages/${locale}.json`)).default
  const t = createTranslator({ locale, messages })

  return {
    metadataBase: new URL(config.baseUrl),
    title: `${t('ProjectsPage.title')} - ${config.siteName}`,
    description: t('ProjectsPage.subtitle'),
    openGraph: {
      title: t('ProjectsPage.title'),
      description: t('ProjectsPage.subtitle'),
      url: '/',
      type: 'website',
      images: [logo.src],
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
