import { OAuth2User } from '@/auth/backend/models/OAuth2User'
import { NextApiRequest, NextApiResponse } from 'next'

export abstract class AbstractProvider {
  static id: string
  static providerName: string

  protected scopes: string[] = []
  protected scopeSeparator: string = ','

  constructor(
    protected request: NextApiRequest,
    protected response: NextApiResponse,
    protected clientId: string,
    protected clientSecret: string,
    protected redirectUri: string
  ) {}

  protected abstract getAuthUrl: (state: string) => string
  protected abstract getTokenUrl: () => string
  protected abstract getUserByToken: (token: string) => Promise<object>
  protected abstract mapUserToClass: (user: any) => OAuth2User

  public getRedirectUrl = () => {
    // TODO: implement State and/or PKCE verification

    return this.getAuthUrl('')
  }

  protected buildAuthUrlFromBase = (url: string, state: string) => {
    const searchParams = new URLSearchParams()
    const codeFields = this.getCodeFields(state)
    // @ts-ignore
    for (let key in codeFields) searchParams.append(key, codeFields[key])
    return `${url}?${searchParams.toString()}`
  }

  protected getCodeFields = (state: string) => {
    // TODO: implement State and/or PKCE verification
    return {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.formatScopes(),
      response_type: 'code',
    }
  }

  protected formatScopes = () => {
    return this.scopes.join(this.scopeSeparator)
  }
}
