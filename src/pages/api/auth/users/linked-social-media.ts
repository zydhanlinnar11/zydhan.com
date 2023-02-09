import { UserController } from '@/auth/backend/controllers/UserController'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { NextApiRequest, NextApiResponse } from 'next'

async function linkedSocialMediaRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const controller = new UserController()
  if (req.method === 'GET') return controller.linkedSocial(req, res)
  return BaseController.methodNotAllowed(res)
}

export default linkedSocialMediaRoute
