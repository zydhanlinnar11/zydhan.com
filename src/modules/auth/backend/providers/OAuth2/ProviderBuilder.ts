import { AbstractProvider } from './AbstractProvider'
import { GithubProvider } from './GithubProvider'
import { GoogleProvider } from './GoogleProvider'

export class ProviderBuilder {
  static build = (Provider: typeof AbstractProvider) => {
    // TODO: ngganti config
    if (Provider.id === GoogleProvider.id)
      return new GoogleProvider(
        process.env.GOOGLE_CLIENT_ID ?? '',
        process.env.GOOGLE_CLIENT_SECRET ?? '',
        process.env.GOOGLE_REDIRECT_URI ?? ''
      )
    if (Provider.id === GithubProvider.id)
      return new GithubProvider(
        process.env.GITHUB_CLIENT_ID ?? '',
        process.env.GITHUB_CLIENT_SECRET ?? '',
        process.env.GITHUB_REDIRECT_URI ?? ''
      )

    throw new Error('unknown provider')
  }
}
