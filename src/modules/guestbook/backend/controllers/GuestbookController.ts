import { BaseController } from '@/common/backend/controllers/BaseController'
import { guestbookRepository } from '@/guestbook/providers/dependencies'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'

export class GuestbookController {
  public index = async (req: NextApiRequest, res: NextApiResponse) => {
    res.send(await guestbookRepository.getAll())
  }

  public store = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    const userId = session?.user.id
    if (!userId) return BaseController.unauthorized(res)

    // Input validation
    const message = req.body.message

    if (
      typeof message !== 'string' ||
      message.trim().length > 255 ||
      message.trim().length === 0
    )
      return res.status(422).send({
        message: 'Invalid message!',
        errors: { message: ['Invalid message!'] },
      })

    await guestbookRepository.create(userId, message)

    return BaseController.noContent(res)
  }
}
