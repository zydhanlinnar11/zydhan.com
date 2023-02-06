import { SocialMediaController } from '@/auth/backend/controllers/SocialMediaController'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { ironSessionOption } from '@/common/config/iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(async (req, res) => {
  const controller = new SocialMediaController()
  if (req.method === 'GET') return controller.getRedirectUrl(req, res)
  return BaseController.methodNotAllowed(res)
}, ironSessionOption)
