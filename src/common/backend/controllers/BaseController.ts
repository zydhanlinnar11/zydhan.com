import { NextApiResponse } from 'next'
export abstract class BaseController {
  static notFound = (res: NextApiResponse) =>
    res.status(404).send({ message: 'Not Found!' })

  static unauthorized = (res: NextApiResponse) =>
    res.status(401).send({ message: 'Unauthorized!' })

  static methodNotAllowed = (res: NextApiResponse) =>
    res.status(405).send({ message: 'Method not allowed!' })

  static noContent = (res: NextApiResponse) => res.status(204).send(null)
}
