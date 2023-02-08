import { BaseController } from '@/common/backend/controllers/BaseController'
import { withSessionRoute } from '@/common/config/iron-session'
import { NextApiRequest, NextApiResponse } from 'next'

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return BaseController.methodNotAllowed(res)
  if (req.session.userId) return res.redirect('/')

  if (!process.env.OIDC_CLIENT_ID || !process.env.OIDC_REDIRECT_URI)
    throw new Error('missing oidc config')

  const params = new URLSearchParams()
  params.append('response_type', 'code')
  params.append('scope', 'openid')
  params.append('client_id', process.env.OIDC_CLIENT_ID)
  params.append('redirect_uri', process.env.OIDC_REDIRECT_URI)

  return res.redirect(`/api/oauth/auth?${params.toString()}`)
}

export default withSessionRoute(loginRoute)
