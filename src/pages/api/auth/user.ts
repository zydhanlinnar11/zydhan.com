import { UserController } from '@/auth/backend/controllers/UserController'
import { ironSessionOption } from '@/common/config/iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(async (req, res) => {
  const controller = new UserController()
  if (req.method === 'GET') return controller.index(req, res)
  return res.status(405).send({ message: 'Method not allowed!' })
}, ironSessionOption)
