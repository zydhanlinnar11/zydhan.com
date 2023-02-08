import { BaseController } from '@/common/backend/controllers/BaseController'
import { IncomingMessage, ServerResponse } from 'http'
import Provider, { PromptDetail } from 'oidc-provider'
import { AuthorizationSuccess } from '@/oauth/types/AuthorizationSuccess'
import { ConsentPageProps } from 'src/pages/oauth/consent'
import { GetStaticPropsResult } from 'next'

export type Interaction = {
  prompt: PromptDetail
  params: {
    [key: string]: any
  }
  grantId?: string
}

export class ConsentController extends BaseController {
  constructor(
    private provider: Provider,
    private interaction: Interaction,
    private userId: string
  ) {
    super()
  }

  public show: () => Promise<GetStaticPropsResult<ConsentPageProps>> =
    async () => {
      // TODO: handle first party app
      const { prompt, params } = this.interaction
      const client = await this.provider.Client.find(params.client_id as string)
      if (!client) return { notFound: true }

      const data: ConsentPageProps = {
        client: { name: client.clientName ?? null },
        dbg:
          process.env.NODE_ENV === 'development'
            ? {
                params,
                prompt,
              }
            : null,
        scopes: [],
      }

      return {
        props: data, // will be passed to the page component as props
      }
    }

  public deny: (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
  ) => Promise<GetStaticPropsResult<{}>> = async (req, res) => {
    const result = {
      error: 'access_denied',
      error_description: 'End-User aborted interaction',
    }
    const redirectTo = await this.provider.interactionResult(req, res, result, {
      mergeWithLastSubmission: false,
    })

    const data: AuthorizationSuccess = { location: redirectTo }
    BaseController.writeJson(res, data)

    return { props: {} }
  }

  public authorize: (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
  ) => Promise<GetStaticPropsResult<{}>> = async (req, res) => {
    const {
      prompt: { details },
      params,
    } = this.interaction

    let { grantId } = this.interaction
    const grant = grantId
      ? await this.provider.Grant.find(grantId)
      : new this.provider.Grant({
          accountId: this.userId,
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
    if (!this.interaction.grantId) {
      // we don't have to pass grantId to consent, we're just modifying existing one
      consent.grantId = grantId
    }
    const redirectTo = await this.provider.interactionResult(
      req,
      res,
      { consent },
      { mergeWithLastSubmission: true }
    )

    const data: AuthorizationSuccess = { location: redirectTo }

    BaseController.writeJson(res, data)
    return { props: {} }
  }
}
