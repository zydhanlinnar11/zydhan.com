import { AbstractProvider } from '@/common/backend/providers/OAuth2/AbstractProvider'
import { GithubProvider } from '@/common/backend/providers/OAuth2/GithubProvider'
import { GoogleProvider } from '@/common/backend/providers/OAuth2/GoogleProvider'

export const oauth2Providers: typeof AbstractProvider[] = [
  GithubProvider,
  GoogleProvider,
]
