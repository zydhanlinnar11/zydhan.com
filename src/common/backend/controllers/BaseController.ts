import { NextApiResponse } from 'next'
export abstract class BaseController {
  protected notFound = (res: NextApiResponse) =>
    res.status(404).send({ message: 'Not Found!' })
}
