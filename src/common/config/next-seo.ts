import { DefaultSeoProps } from 'next-seo'
import { config } from '.'
import { personalInfo } from './personal-info'
import logo from 'public/logo.webp'

const nextSeoConfig: DefaultSeoProps = {
  titleTemplate: `%s – ${personalInfo.name}`,
  defaultTitle: personalInfo.name,
  openGraph: {
    type: 'website',
    locale: 'en_ID',
    url: config.frontendUrl,
    siteName: personalInfo.name,
    images: [{ url: logo.src }],
    description: personalInfo.description,
    title: personalInfo.name,
  },
  twitter: personalInfo.twitter
    ? {
        handle: personalInfo.twitter,
        cardType: 'summary_large_image',
      }
    : undefined,
}

export default nextSeoConfig
