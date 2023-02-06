import { SocialMediaController } from '@/auth/backend/controllers/SocialMediaController'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new SocialMediaController()
  if (req.method === 'GET') return controller.callback(req, res)
  return res.status(405).send({ message: 'Method not allowed!' })
}
