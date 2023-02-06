import { SocialMedia } from '@/auth/types/SocialMedia'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { NextApiRequest, NextApiResponse } from 'next'
import { oauth2Providers } from '../config/oauth2-providers'
import { ProviderBuilder } from '../providers/OAuth2/ProviderBuilder'
import { userRepository } from '../providers/dependencies'
import { uuid } from 'uuidv4'

export class SocialMediaController extends BaseController {
  public index = async (req: NextApiRequest, res: NextApiResponse) => {
    const data: SocialMedia[] = oauth2Providers.map(({ id, providerName }) => ({
      id,
      name: providerName,
    }))

    res.send(data)
  }

  protected getProvider = (req: NextApiRequest) =>
    oauth2Providers.find(({ id }) => id === req.query.id)

  public getRedirectUrl = async (req: NextApiRequest, res: NextApiResponse) => {
    const Provider = this.getProvider(req)
    if (!Provider) return BaseController.notFound(res)

    return res.send({
      redirect_url: await ProviderBuilder.build(Provider).getRedirectUrl(req),
    })
  }

  public callback = async (req: NextApiRequest, res: NextApiResponse) => {
    const Provider = this.getProvider(req)
    if (!Provider) return BaseController.notFound(res)
    const provider = ProviderBuilder.build(Provider)

    const socialUser = await provider.getUser(req)
    let user = await userRepository.getByProvider(Provider, socialUser.getId())

    const authenticatedUserId = req.session.userId

    if (authenticatedUserId) {
      if (user !== null)
        return res
          .status(403)
          .send({ message: 'already_linked_to_another_user' })

      await userRepository.linkToSocial(
        Provider,
        socialUser.getId(),
        authenticatedUserId
      )

      return BaseController.noContent(res)
    }

    if (!user) {
      const isUserWithSameEmailExist =
        (await userRepository.getByEmail(socialUser.getEmail())) !== null
      if (isUserWithSameEmailExist)
        return res.status(401).send({ message: 'user_with_same_email_exist' })

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

    req.session.userId = user?.id
    await req.session.save()

    return BaseController.noContent(res)
  }

  public unlinkSocial = async (req: NextApiRequest, res: NextApiResponse) => {
    const Provider = this.getProvider(req)
    if (!Provider) return BaseController.notFound(res)
    const authenticatedUserId = req.session.userId
    if (!authenticatedUserId) return BaseController.unauthorized(res)

    await userRepository.unlinkSocial(Provider, authenticatedUserId)
    return BaseController.noContent(res)
  }
}
