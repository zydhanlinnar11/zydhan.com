import { NextApiRequest } from 'next'
import Provider, { Configuration } from 'oidc-provider'

export const getProvider = (req: NextApiRequest) => {
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
  }

  return new Provider(`${baseUrl}/api/oauth`, configuration)
}
