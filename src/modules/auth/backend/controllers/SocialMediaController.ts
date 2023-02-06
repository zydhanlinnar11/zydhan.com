import { SocialMedia } from '@/auth/types/SocialMedia'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { NextApiRequest, NextApiResponse } from 'next'
import { oauth2Providers } from '../config/oauth2-providers'
import { ProviderBuilder } from '../providers/OAuth2/ProviderBuilder'

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
    if (!Provider) return this.notFound(res)

    return res.send({
      redirect_url: ProviderBuilder.build(Provider).getRedirectUrl(),
    })
  }

  public callback = async (req: NextApiRequest, res: NextApiResponse) => {
    const Provider = this.getProvider(req)
    if (!Provider) return this.notFound(res)
    const provider = ProviderBuilder.build(Provider)

    const user = await provider.getUser(req)
    return res.send(user)
  }
}
