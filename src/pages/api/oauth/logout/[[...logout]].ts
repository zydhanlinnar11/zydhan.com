import { withSessionRoute } from '@/common/config/iron-session'
import { getOidcProviderConfig, getProvider } from '@/oauth/backend/lib/oidc'
import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration } from 'oidc-provider'

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  const defaultConfig = await getOidcProviderConfig()

  // Hack to make it work
  const config: Configuration = {
    ...defaultConfig,
    routes: {
      ...defaultConfig.routes,
      end_session: '/api/oauth/logout',
    },
  }

  return (await getProvider(req, config)).callback()(req, res)
}

export default withSessionRoute(logoutRoute)
