import Summary from './Summary'
import { LanguageAndTools } from './LanguageAndTools'
import { WorkExperiences } from './WorkExperiences'
import { RecentRepositories } from './RecentRepositories'
import { Metadata } from 'next'
import { config } from '@/config/common'
import logo from '../../../public/logo.webp'
import { createTranslator } from 'next-intl'
import { getProjectsMetadata } from '@/lib/projects'
import { Projects } from './Projects'

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
    title: `${t('HomePage.pageTitle')} - ${config.siteName}`,
    description: t('HomePage.description'),
    openGraph: {
      title: t('HomePage.pageTitle'),
      description: t('HomePage.description'),
      url: '/',
      type: 'website',
      images: [logo.src],
      locale,
      siteName: config.siteName,
    },
    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        id: '/id',
      },
    },
  }
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: 'en' | 'id' }
}) {
  const projectsMetadata = (await getProjectsMetadata(locale))
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
    .slice(0, 3)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
      }}
    >
      <Summary />
      <LanguageAndTools />
      <WorkExperiences />
      <Projects projects={projectsMetadata} />
      <RecentRepositories />
    </div>
  )
}
