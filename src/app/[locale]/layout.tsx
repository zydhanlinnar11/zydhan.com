import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import Navbar from './Navbar'
import { Providers } from './providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientLayout from './ClientLayout'
import Footer from './Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }]
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body
        className={inter.className}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Navbar locale={locale as 'id' | 'en'} />
            <ClientLayout>{children}</ClientLayout>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
