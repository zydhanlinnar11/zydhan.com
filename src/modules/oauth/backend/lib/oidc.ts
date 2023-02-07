import { NextApiRequest } from 'next'
import Provider, { Configuration } from 'oidc-provider'
import { cookieKeyRepository } from '../providers/dependencies'

export const getProvider = async (req: NextApiRequest) => {
  const latestKey = (await cookieKeyRepository.getLatest())?.getKey()
  const baseUrl = `${
    process.env.NODE_ENV === 'production' ? 'https' : 'http'
  }://${req.headers.host}`

  const configuration: Configuration = {
    pkce: {
      methods: ['S256'],
      required: function pkceRequired(ctx, client) {
        return false
      },
    },
    interactions: {
      url: async (ctx, interaction) => {
        return `/api/oauth/interactions/${interaction.uid}?redirect=true`
      },
    },
    features: {
      devInteractions: { enabled: false },
    },
    cookies: {
      keys: latestKey ? [latestKey] : [],
    },
  }

  return new Provider(`${baseUrl}/api/oauth`, configuration)
}
