import { SocialMediaController } from '@/auth/backend/controllers/SocialMediaController'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { NextApiRequest, NextApiResponse } from 'next'

async function unlinkSocialMediaRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const controller = new SocialMediaController()
  if (req.method === 'DELETE') return controller.unlinkSocial(req, res)
  return BaseController.methodNotAllowed(res)
}

export default unlinkSocialMediaRoute
