import axios from 'axios'
import { OAuth2User } from '../../models/OAuth2User'
import { AbstractProvider } from './AbstractProvider'

export class GithubProvider extends AbstractProvider {
  static id: string = 'github'
  static providerName: string = 'Github'

  protected scopes: string[] = ['user:email']

  protected getAuthUrl: (state: string) => string = (state) =>
    this.buildAuthUrlFromBase('https://github.com/login/oauth/authorize', state)

  protected getTokenUrl: () => string = () =>
    'https://github.com/login/oauth/access_token'

  protected getUserByToken: (token: string) => Promise<object> = async (
    token
  ) => {
    const userUrl = 'https://api.github.com/user'
    const response = await axios.get(userUrl, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${token}`,
      },
    })

    const user = response.data
    if (this.scopes.find((value) => value === 'user:email'))
      user.email = this.getEmailByToken(token)

    return user
  }

  protected getEmailByToken = async (token: string) => {
    const emailsUrl = 'https://api.github.com/user/emails'

    try {
      const response = await axios.get(emailsUrl, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${token}`,
        },
      })

      const emails = response.data
      for (let i = 0; i < emails.length; i++) {
        const email = emails[i]
        if (email.primary && email.verified) return email.email
      }
    } catch (e) {
      return
    }
  }

  protected mapUserToClass: (user: any) => OAuth2User = (user) =>
    new OAuth2User(user.id, user.name, user.email)
}
