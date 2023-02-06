import { AbstractProvider } from '../providers/OAuth2/AbstractProvider'
import { GithubProvider } from '../providers/OAuth2/GithubProvider'
import { GoogleProvider } from '../providers/OAuth2/GoogleProvider'

export const oauth2Providers: typeof AbstractProvider[] = [
  GithubProvider,
  GoogleProvider,
]
