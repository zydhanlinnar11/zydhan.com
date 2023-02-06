import { withSessionRoute } from '@/common/config/iron-session'
import { getProvider } from '@/oauth/backend/lib/oidc'
import { NextApiRequest, NextApiResponse } from 'next'

function oauth2Route(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  req.originalUrl = req.url
  req.url = req.url?.replace('/api/oauth', '')

  return getProvider(req).callback()(req, res)
}

export default withSessionRoute(oauth2Route)
