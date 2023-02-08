import { withSessionRoute } from '@/common/config/iron-session'
import { getProvider } from '@/oauth/backend/lib/oidc'
import { NextApiRequest, NextApiResponse } from 'next'

async function oauth2Route(req: NextApiRequest, res: NextApiResponse) {
  return (await getProvider(req)).callback()(req, res)
}

export default withSessionRoute(oauth2Route)
