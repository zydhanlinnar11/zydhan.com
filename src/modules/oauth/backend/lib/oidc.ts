import { IncomingMessage } from 'http'
import Provider, { Configuration } from 'oidc-provider'
import { uuid } from 'uuidv4'
import FirestoreAdapter from '../adapters/FirestoreAdapter'
import { cookieKeyRepository, jwkRepository } from '../providers/dependencies'

export const getProvider = async (req: IncomingMessage) => {
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
      url: async (ctx, interaction) =>
        interaction.prompt.name === 'login' ? `/oauth/login` : `/oauth/consent`,
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
