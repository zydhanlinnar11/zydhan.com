import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'

const cookieName = process.env.IRON_SESSION_COOKIE_NAME
const ironSessionPassword = process.env.IRON_SESSION_PASSWORD

if (!cookieName || !ironSessionPassword) {
  throw new Error('iron session env is not set')
}

export const ironSessionOption: IronSessionOptions = {
  cookieName,
  password: ironSessionPassword,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironSessionOption)
}
