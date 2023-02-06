import { BaseController } from '@/common/backend/controllers/BaseController'
import { withSessionRoute } from '@/common/config/iron-session'
import { GuestbookController } from '@/guestbook/backend/controllers/GuestbookController'
import { NextApiRequest, NextApiResponse } from 'next'

function guestbooksRoute(req: NextApiRequest, res: NextApiResponse) {
  const controller = new GuestbookController()
  if (req.method === 'GET') return controller.index(req, res)
  if (req.method === 'POST') return controller.store(req, res)
  return BaseController.methodNotAllowed(res)
}

export default withSessionRoute(guestbooksRoute)
