import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Locale, defaultLocale, locales } from '@/i18n'
import { getTranslations } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'] })

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: Locale }
}) => {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  const languages: {
    [key: string]: string
  } = {}
  locales.forEach((locale) => {
    languages[locale] = `/${locale}`
  })

  const metadata: Metadata = {
    title: {
      default: process.env.DEFAULT_TITLE ?? '',
      template: process.env.TITLE_TEMPLATE ?? '',
    },
    description: t('description'),

    // Metadata Base
    metadataBase: new URL(process.env.BASE_URL ?? 'http://localhost:3000'),
    alternates: {
      canonical: `/${defaultLocale}`,
      languages,
    },

    // OpenGraph
    openGraph: {
      type: 'website',
      alternateLocale: locales.map((locale) => locale),
      siteName: process.env.SITE_NAME,
    },
  }

  return metadata
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: {
    locale: Locale
  }
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
