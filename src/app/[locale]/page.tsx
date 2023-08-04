import Summary from './Summary'
import { LanguageAndTools } from './LanguageAndTools'
import { WorkExperiences } from './WorkExperiences'
import { RecentRepositories } from './RecentRepositories'
import { Suspense } from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import { config } from '@/config/common'
import logo from '../../../public/logo.webp'

type Props = {
  params: { locale: string }
}

export async function generateMetadata(
  { params: { locale } }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const message = (await import(`@/messages/${locale}.json`)).default

  return {
    metadataBase: new URL(config.baseUrl),
    title: `${message.HomePage.pageTitle} - ${config.siteName}`,
    description: message.HomePage.description,
    openGraph: {
      title: message.HomePage.pageTitle,
      description: message.HomePage.description,
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

export default function Home() {
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
      <Suspense fallback={<div>Loading...</div>}>
        <RecentRepositories />
      </Suspense>
    </div>
  )
}
