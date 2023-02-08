import axios from 'axios'
import { OAuth2User } from '../../models/OAuth2User'
import { AbstractProvider } from './AbstractProvider'

export class GoogleProvider extends AbstractProvider {
  static id: string = 'google'
  static providerName: string = 'Google'

  protected scopeSeparator: string = ' '
  protected scopes: string[] = ['openid', 'profile', 'email']

  protected getId = () => GoogleProvider.id

  protected getAuthUrl: (state: string) => string = (state) =>
    this.buildAuthUrlFromBase(
      'https://accounts.google.com/o/oauth2/auth',
      state
    )

  protected getTokenUrl: () => string = () =>
    'https://www.googleapis.com/oauth2/v4/token'

  protected getUserByToken: (token: string) => Promise<object> = async (
    token
  ) =>
    (
      await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        params: { prettyPrint: false },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).data

  protected mapUserToClass: (user: any) => OAuth2User = (user) =>
    new OAuth2User(user.sub, user.name, user.email)
}
