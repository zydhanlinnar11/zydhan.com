import { BaseController } from '@/common/backend/controllers/BaseController'
import { withSessionRoute } from '@/common/config/iron-session'
import { NextApiRequest, NextApiResponse } from 'next'

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return BaseController.methodNotAllowed(res)

  req.session.destroy()
  return BaseController.noContent(res)
}

export default withSessionRoute(logoutRoute)
