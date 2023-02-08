// import { UserController } from '@/auth/backend/controllers/UserController'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { withSessionRoute } from '@/common/config/iron-session'
import { NextApiRequest, NextApiResponse } from 'next'

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  // const controller = new UserController()
  // if (req.method === 'GET') return controller.index(req, res)
  return BaseController.methodNotAllowed(res)
}

export default withSessionRoute(userRoute)
