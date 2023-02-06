import { SocialMediaController } from '@/auth/backend/controllers/SocialMediaController'
import { BaseController } from '@/common/backend/controllers/BaseController'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new SocialMediaController()
  if (req.method === 'GET') return controller.index(req, res)
  return BaseController.methodNotAllowed(res)
}
