import { BaseController } from '@/common/backend/controllers/BaseController'
import { withSessionRoute } from '@/common/config/iron-session'
import { SocialMediaController } from '@/oauth/backend/controllers/SocialMediaController'
import { NextApiRequest, NextApiResponse } from 'next'

function redirectRoute(req: NextApiRequest, res: NextApiResponse) {
  const controller = new SocialMediaController()
  if (req.method === 'GET') return controller.redirect(req, res)
  return BaseController.methodNotAllowed(res)
}

export default withSessionRoute(redirectRoute)
