import { BaseController } from '@/common/backend/controllers/BaseController'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'
import { userRepository } from '../providers/dependencies'

export class SocialMediaController extends BaseController {
  public unlinkSocial = async (req: NextApiRequest, res: NextApiResponse) => {
    const providerId = req.query.id
    if (typeof providerId !== 'string' || !providerId)
      return BaseController.notFound(res)

    const session = await getServerSession(req, res, authOptions)
    const userId = session?.user.id
    if (!userId) return BaseController.unauthorized(res)
    await userRepository.unlinkSocial(providerId, userId)
    return BaseController.noContent(res)
  }
}
