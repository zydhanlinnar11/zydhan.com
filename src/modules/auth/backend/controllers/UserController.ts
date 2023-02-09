import { BaseController } from '@/common/backend/controllers/BaseController'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from 'src/pages/api/auth/[...nextauth]'
import { userRepository } from '../providers/dependencies'

export class UserController extends BaseController {
  public update = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    const userId = session?.user.id
    if (!userId) return BaseController.unauthorized(res)

    const user = await userRepository.getById(userId)
    if (!user) return BaseController.unauthorized(res)

    // Input validation
    const name = req.body.name
    const email = req.body.email

    // TODO: handle errornya yang lebih bener
    if (
      typeof name !== 'string' ||
      name.trim().length > 255 ||
      name.trim().length === 0
    )
      return res
        .status(422)
        .send({ message: 'Invalid name!', errors: { name: ['Invalid name!'] } })

    // TODO: validasi email
    if (
      typeof email !== 'string' ||
      email.trim().length > 255 ||
      email.trim().length === 0 ||
      (await userRepository.isAnotherUserIdWithSameEmailExists(email, userId))
    )
      return res.status(422).send({
        message: 'Invalid email!',
        errors: { email: ['Invalid email!'] },
      })

    await userRepository.update(userId, { email, name })

    return BaseController.noContent(res)
  }

  public linkedSocial = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    const userId = session?.user.id
    if (!userId) return BaseController.unauthorized(res)

    return res.send(await userRepository.getLinkedSocial(userId))
  }
}
