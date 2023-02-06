import { SocialMediaController } from '@/auth/backend/controllers/SocialMediaController'
import { ironSessionOption } from '@/common/config/iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(async (req, res) => {
  const controller = new SocialMediaController()
  if (req.method === 'GET') return controller.callback(req, res)
  return res.status(405).send({ message: 'Method not allowed!' })
}, ironSessionOption)
