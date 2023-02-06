import { BaseController } from '@/common/backend/controllers/BaseController'
import { db } from '@/common/lib/firebase'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/common/types/User'

export class UserController extends BaseController {
  public index = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!('userId' in req.session) || typeof req.session.userId !== 'string')
      return this.unauthorized(res)
    const id = req.session.userId
    const userRef = db.collection('users').doc(id)
    const doc = await userRef.get()
    if (!doc.exists) return this.unauthorized(res)
    const data = doc.data()
    if (!data) return this.unauthorized(res)

    const user: User = {
      admin: false,
      email: data.email,
      name: data.name,
      social_media: [],
    }
    return res.send(user)
  }
}
