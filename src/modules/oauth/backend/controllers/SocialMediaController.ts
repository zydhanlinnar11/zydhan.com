import { BaseController } from '@/common/backend/controllers/BaseController'
import { NextApiRequest, NextApiResponse } from 'next'
import { userRepository } from '../providers/dependencies'
import { SocialMedia } from '@/common/types/SocialMedia'
import { oauth2Providers } from '@/common/config/oauth2-providers'
import { ProviderBuilder } from '@/common/backend/providers/OAuth2/ProviderBuilder'

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

  public redirect = async (req: NextApiRequest, res: NextApiResponse) => {
    const Provider = this.getProvider(req)
    if (!Provider) return BaseController.notFound(res)

    return res.redirect(
      await ProviderBuilder.build(Provider).getRedirectUrl(req)
    )
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
