import { ironSessionOption } from '@/common/config/iron-session'
import { withIronSessionApiRoute } from 'iron-session/next'

export default withIronSessionApiRoute(function logoutRoute(req, res) {
  if (req.method !== 'DELETE')
    return res.status(405).send({ message: 'Method not allowed!' })

  req.session.destroy()
  res.status(204).send(null)
}, ironSessionOption)
