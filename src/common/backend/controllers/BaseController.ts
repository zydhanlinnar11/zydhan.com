import { IncomingMessage, ServerResponse } from 'http'
import { NextApiResponse } from 'next'
export abstract class BaseController {
  static isNextApiResponse = function (
    res: NextApiResponse | ServerResponse<IncomingMessage>
  ): res is NextApiResponse {
    return 'status' in res
  }

  static writeJson = (
    res: ServerResponse<IncomingMessage>,
    data: any,
    statusCode: number = 200
  ) => {
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = statusCode
    res.write(JSON.stringify(data))
    res.end()
  }

  static badRequest = (
    res: NextApiResponse | ServerResponse<IncomingMessage>
  ) => {
    const data = { message: 'Bad Request!' }
    if (this.isNextApiResponse(res))
      return res.status(400).send({ message: 'Bad Request!' })

    this.writeJson(res, data, 400)
  }

  static notFound = (
    res: NextApiResponse | ServerResponse<IncomingMessage>
  ) => {
    const data = { message: 'Not Found!' }
    if (this.isNextApiResponse(res)) return res.status(404).send(data)

    this.writeJson(res, data, 404)
  }

  static unauthorized = (
    res: NextApiResponse | ServerResponse<IncomingMessage>
  ) => {
    const data = { message: 'Unauthorized!' }
    if (this.isNextApiResponse(res)) return res.status(401).send(data)

    this.writeJson(res, data, 401)
  }

  static methodNotAllowed = (
    res: NextApiResponse | ServerResponse<IncomingMessage>
  ) => {
    const data = { message: 'Method not allowed!' }
    if (this.isNextApiResponse(res)) return res.status(405).send(data)

    this.writeJson(res, data, 405)
  }

  static noContent = (
    res: NextApiResponse | ServerResponse<IncomingMessage>
  ) => {
    const data = null
    if (this.isNextApiResponse(res)) return res.status(204).send(data)

    this.writeJson(res, data, 204)
  }
}
