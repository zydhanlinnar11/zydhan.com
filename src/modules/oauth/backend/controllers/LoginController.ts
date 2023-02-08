import { BaseController } from '@/common/backend/controllers/BaseController'
import { IncomingMessage, ServerResponse } from 'http'
import Provider, { PromptDetail } from 'oidc-provider'
import { GetStaticPropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { oauth2Providers } from '@/common/config/oauth2-providers'
import { ProviderBuilder } from '@/common/backend/providers/OAuth2/ProviderBuilder'
import { userRepository } from '../providers/dependencies'
import { uuid } from 'uuidv4'
import { LoginPageProps } from 'src/pages/oauth/login'

export type Interaction = {
  prompt: PromptDetail
  params: {
    [key: string]: any
  }
}

export class LoginController extends BaseController {
  constructor(private provider: Provider, private interaction: Interaction) {
    super()
  }

  public show: () => Promise<GetStaticPropsResult<LoginPageProps>> =
    async () => {
      const { params, prompt } = this.interaction

      const client = await this.provider.Client.find(`${params.client_id}`)
      if (!client)
        return { redirect: { destination: '/400', permanent: false } }

      const data: LoginPageProps = {
        client: { name: client.clientName ?? null },
        dbg:
          process.env.NODE_ENV === 'development'
            ? {
                params,
                prompt,
              }
            : null,
      }

      return { props: data }
    }

  public login: (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    query: ParsedUrlQuery
  ) => Promise<GetStaticPropsResult<{}>> = async (req, res, query) => {
    const Provider = oauth2Providers.find(
      ({ id }) => id === req.session.state?.id
    )
    if (!Provider)
      return { redirect: { destination: '/400', permanent: false } }
    const socialProvider = ProviderBuilder.build(Provider)

    if (typeof query.code !== 'string' || typeof query.state !== 'string')
      return { redirect: { destination: '/400', permanent: false } }

    const socialUser = await socialProvider.getUser(
      req,
      query.code,
      query.state
    )
    let user = await userRepository.getByProvider(Provider, socialUser.getId())

    if (!user) {
      const isUserWithSameEmailExist =
        (await userRepository.getByEmail(socialUser.getEmail())) !== null
      if (isUserWithSameEmailExist) {
        BaseController.writeJson(
          res,
          { message: 'user_with_same_email_exist' },
          401
        )
        return { props: {} }
      }

      const userId = uuid()
      await userRepository.create({
        id: userId,
        email: socialUser.getEmail(),
        name: socialUser.getName(),
      })
      await userRepository.linkToSocial(Provider, socialUser.getId(), userId)
      user = await userRepository.getByProvider(Provider, socialUser.getId())
    }
    if (!user) throw new Error('unable to retrieve user data')

    req.session.userId = user.id
    await req.session.save()
    await this.provider.interactionFinished(req, res, {
      login: { accountId: user.id },
    })

    return { props: {} }
  }
}
