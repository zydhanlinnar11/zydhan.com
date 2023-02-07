import { NextApiRequest } from 'next'
import Provider, { Configuration } from 'oidc-provider'
import { uuid } from 'uuidv4'
import FirestoreAdapter from '../adapters/FirestoreAdapter'
import { cookieKeyRepository, jwkRepository } from '../providers/dependencies'

export const getProvider = async (req: NextApiRequest) => {
  const latestKey = (await cookieKeyRepository.getLatest())?.getKey()
  const jwks = await jwkRepository.getAll()

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
      rpInitiatedLogout: { enabled: false },
      pushedAuthorizationRequests: {
        enabled: false,
        requirePushedAuthorizationRequests: false,
      },
      // TODO: harus login sebelum register
      registration: {
        enabled: true,
        idFactory: function (ctx) {
          return uuid()
        },
      },
    },
    cookies: {
      keys: latestKey ? [latestKey] : [],
    },
    jwks: { keys: jwks.map((jwk) => JSON.parse(jwk.getKey())) },
    adapter: FirestoreAdapter,
  }

  return new Provider(`${baseUrl}/api/oauth`, configuration)
}
