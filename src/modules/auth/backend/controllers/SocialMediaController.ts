import { SocialMedia } from '@/auth/types/SocialMedia'
import { NextApiRequest, NextApiResponse } from 'next'
import { oauth2Providers } from '../config/oauth2-providers'
import { ProviderBuilder } from '../providers/OAuth2/ProviderBuilder'

export class SocialMediaController {
  public index = async (req: NextApiRequest, res: NextApiResponse) => {
    const data: SocialMedia[] = oauth2Providers.map(({ id, providerName }) => ({
      id,
      name: providerName,
    }))

    res.send(data)
  }

  public getRedirectUrl = async (req: NextApiRequest, res: NextApiResponse) => {
    const Provider = oauth2Providers.find(({ id }) => id === req.query.id)
    if (!Provider) return res.status(404).send({ message: 'Not found!' })

    return res.send({
      redirect_url: ProviderBuilder.build(Provider, req, res).getRedirectUrl(),
    })
  }
}
