import { SocialMediaController } from '@/auth/backend/controllers/SocialMediaController'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { withSessionRoute } from '@/common/config/iron-session'
import { NextApiRequest, NextApiResponse } from 'next'

async function redirectRoute(req: NextApiRequest, res: NextApiResponse) {
  const controller = new SocialMediaController()
  if (req.method === 'GET') return controller.getRedirectUrl(req, res)
  return BaseController.methodNotAllowed(res)
}

export default withSessionRoute(redirectRoute)
