import { BaseController } from '@/common/backend/controllers/BaseController'
import { withSessionRoute } from '@/common/config/iron-session'
import { InteractionController } from '@/oauth/backend/controllers/InteractionController'
import { NextApiRequest, NextApiResponse } from 'next'

function interactionRoute(req: NextApiRequest, res: NextApiResponse) {
  const controller = new InteractionController()
  if (req.method === 'GET') return controller.show(req, res)
  if (req.method === 'POST') return controller.authorize(req, res)
  if (req.method === 'DELETE') return controller.deny(req, res)
  return BaseController.methodNotAllowed(res)
}

export default withSessionRoute(interactionRoute)
