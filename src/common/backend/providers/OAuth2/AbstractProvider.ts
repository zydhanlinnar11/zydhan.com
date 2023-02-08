import { OAuth2User } from '@/common/backend/models/OAuth2User'
import axios from 'axios'
import { IncomingMessage } from 'http'
import { NextApiRequest } from 'next'
import randomstring from 'randomstring'

export abstract class AbstractProvider {
  static id: string
  static providerName: string

  protected scopes: string[] = []
  protected scopeSeparator: string = ','
  protected user: OAuth2User | null = null

  protected isStateless = false
  protected usePKCE = false

  constructor(
    protected clientId: string,
    protected clientSecret: string,
    protected redirectUri: string
  ) {}

  protected abstract getAuthUrl: (state: string) => string
  protected abstract getTokenUrl: () => string
  protected abstract getUserByToken: (token: string) => Promise<object>
  protected abstract mapUserToClass: (user: any) => OAuth2User

  protected abstract getId: () => string

  public getRedirectUrl = async (req: NextApiRequest) => {
    const state = this.getState()

    if (!this.isStateless) req.session.state = { state, id: this.getId() }

    await req.session.save().then()

    return this.getAuthUrl(state)
  }

  protected getState = () => randomstring.generate(40)

  protected buildAuthUrlFromBase = (url: string, state: string) => {
    const searchParams = new URLSearchParams()
    const codeFields = this.getCodeFields(state)
    // @ts-ignore
    for (let key in codeFields) searchParams.append(key, codeFields[key])
    return `${url}?${searchParams.toString()}`
  }

  protected getCodeFields = (state: string) => {
    return {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.formatScopes(),
      response_type: 'code',
      state: this.isStateless ? undefined : state,
    }
  }

  protected formatScopes = () => {
    return this.scopes.join(this.scopeSeparator)
  }

  protected hasInvalidState = (req: IncomingMessage, state: string) => {
    if (this.isStateless) return false

    const sessionState = req.session.state?.state

    return sessionState === undefined || sessionState !== state
  }

  public getUser = async (
    req: IncomingMessage,
    code: string,
    state: string
  ) => {
    if (this.user) return this.user

    if (this.hasInvalidState(req, state)) throw new Error('invalid_state')

    const response = await this.getAccessTokenResponse(code)
    this.user = this.mapUserToClass(
      await this.getUserByToken(response.access_token)
    )

    return this.user
  }

  public getAccessTokenResponse = async (code: string) => {
    return (
      await axios.post(this.getTokenUrl(), this.getTokenFields(code), {
        headers: { Accept: 'application/json' },
      })
    ).data
  }

  protected getTokenFields = (code: string) => {
    return {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code,
      redirect_uri: this.redirectUri,
    }
  }
}
