import { AuthorizationConsentDataScope } from './AuthorizationConsentDataScope'

export type AuthorizationConsentData = {
  client_id: string
  client_name: string
  scopes: AuthorizationConsentDataScope[]
  state?: string
  auth_token: string
}
