import { IncomingMessage } from 'http'
import Provider, { Configuration } from 'oidc-provider'
import { uuid } from 'uuidv4'
import FirestoreAdapter from '../adapters/FirestoreAdapter'
import { cookieKeyRepository, jwkRepository } from '../providers/dependencies'
import { parse } from 'node-html-parser'
import { EndSessionResponse } from '@/oauth/types/EndSessionResponse'

export const getOidcProviderConfig = async () => {
  const latestKey = (await cookieKeyRepository.getLatest())?.getKey()
  const jwks = await jwkRepository.getAll()

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
      rpInitiatedLogout: {
        enabled: true,
        logoutSource: (ctx, form) => {
          ctx.set('Content-Type', 'application/json')
          const parsed = parse(form)
          const formElement = parsed.querySelector('form')
          const xsrfInputElement = parsed.querySelector('input[name="xsrf"]')
          if (!formElement || !xsrfInputElement)
            throw new Error('malformed form')

          const data: EndSessionResponse = {
            action: formElement.getAttribute('action'),
            xsrf: xsrfInputElement.getAttribute('value'),
          }
          ctx.body = JSON.stringify(data)
        },
        postLogoutSuccessSource: (ctx) => {
          ctx.redirect('/')
        },
      },
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
    renderError: async function (ctx, out, error) {
      ctx.type = 'application/json'
      ctx.body = JSON.stringify(out)
    },
    routes: {
      authorization: '/api/oauth/auth',
      end_session: '/oauth/logout',
      jwks: '/api/oauth/jwks',
      registration: '/api/oauth/reg',
      token: '/api/oauth/token',
      userinfo: '/api/oauth/userinfo',
    },
  }

  return configuration
}

export const getProvider = async (
  req: IncomingMessage,
  configuration?: Configuration
) => {
  const baseUrl = `${
    process.env.NODE_ENV === 'production' ? 'https' : 'http'
  }://${req.headers.host}`

  const config = configuration ?? (await getOidcProviderConfig())

  const provider = new Provider(`${baseUrl}`, config)

  provider.use(async (ctx, next) => {
    await next()

    if (ctx.oidc.route === 'end_session_confirm') req.session.destroy()
  })

  return provider
}
