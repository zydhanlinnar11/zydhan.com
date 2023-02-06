import { BaseController } from '@/common/backend/controllers/BaseController'
import { ironSessionOption } from '@/common/config/iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(function logoutRoute(req, res) {
  if (req.method !== 'DELETE') return BaseController.methodNotAllowed(res)

  req.session.destroy()
  return BaseController.noContent(res)
}, ironSessionOption)
