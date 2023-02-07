import { BaseController } from '@/common/backend/controllers/BaseController'
import { AuthorizationConsentData } from '@/oauth/types/AuthorizationConsentData'
import { AuthorizationError } from '@/oauth/types/AuthorizationError'
import { AuthorizationSuccess } from '@/oauth/types/AuthorizationSuccess'
import { NextApiRequest, NextApiResponse } from 'next'
import { getProvider } from '../lib/oidc'

export class InteractionController extends BaseController {
  public show = async (req: NextApiRequest, res: NextApiResponse) => {
    // TODO: handle sessionnotfound
    const provider = await getProvider(req)
    const { jti, prompt, params } = await provider.interactionDetails(req, res)

    if (req.query.redirect === 'true') {
      if (
        (prompt.name === 'login' &&
          prompt.reasons.find((reason) => reason !== 'no_session')) ||
        !req.session.userId
      ) {
        req.session.destroy()
        return res.redirect(`/auth/login?uid=${jti}`)
      }

      return res.redirect(`/oauth/authorize?uid=${jti}`)
    }

    const client = await provider.Client.find(params.client_id as string)
    if (!client) return res.status(400).send({ message: 'Bad request' })

    const data: AuthorizationConsentData = {
      client_name: client.clientName ?? '',
      scopes:
        client.scope
          ?.split(' ')
          .map((scope) => ({ description: scope, id: scope })) ?? [],
    }
    res.send(data)
  }

  public authorize = async (req: NextApiRequest, res: NextApiResponse) => {
    const userId = req.session.userId
    if (!userId) return BaseController.unauthorized(res)

    const provider = await getProvider(req)
    const interactionDetails = await provider.interactionDetails(req, res)
    const {
      prompt: { name, details },
      params,
    } = interactionDetails

    let { grantId } = interactionDetails
    const grant = grantId
      ? await provider.Grant.find(grantId)
      : new provider.Grant({
          accountId: userId,
          clientId: (params.client_id as string | undefined | null) ?? '',
        })

    if (Array.isArray(details.missingOIDCScope)) {
      grant?.addOIDCScope(details.missingOIDCScope.join(' '))
    }
    if (Array.isArray(details.missingOIDCClaims)) {
      grant?.addOIDCClaims(details.missingOIDCClaims)
    }

    if (details.missingResourceScopes) {
      for (const [indicator, scopes] of Object.entries(
        details.missingResourceScopes
      )) {
        grant?.addResourceScope(indicator, scopes.join(' '))
      }
    }

    grantId = await grant?.save()

    const consent: { grantId?: string } = {}
    if (!interactionDetails.grantId) {
      // we don't have to pass grantId to consent, we're just modifying existing one
      consent.grantId = grantId
    }
    const redirectTo = await provider.interactionResult(
      req,
      res,
      {
        consent,
        login: { accountId: userId },
      },
      { mergeWithLastSubmission: true }
    )

    const data: AuthorizationSuccess = { location: redirectTo }

    return res.send(data)
  }

  deny = async (req: NextApiRequest, res: NextApiResponse) => {
    const provider = await getProvider(req)
    const result = {
      error: 'access_denied',
      error_description: 'End-User aborted interaction',
    }
    const redirectTo = await provider.interactionResult(req, res, result, {
      mergeWithLastSubmission: false,
    })

    const data: AuthorizationError = {
      data: { action: 'redirect', location: redirectTo },
      status: 'error',
    }

    return res.status(400).send(data)
  }
}
