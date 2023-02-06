import { UserController } from '@/auth/backend/controllers/UserController'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { ironSessionOption } from '@/common/config/iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(async (req, res) => {
  const controller = new UserController()
  if (req.method === 'GET') return controller.index(req, res)
  return BaseController.methodNotAllowed(res)
}, ironSessionOption)
