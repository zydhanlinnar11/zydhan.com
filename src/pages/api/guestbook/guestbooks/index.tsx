import { GuestbookController } from '@/guestbook/backend/controllers/GuestbookController'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const controller = new GuestbookController()
  if (req.method === 'GET') return controller.index(req, res)
  if (req.method === 'POST') return controller.store(req, res)
}
