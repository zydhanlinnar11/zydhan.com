import { AuthorizationConsentDataScope } from './AuthorizationConsentDataScope'

export type AuthorizationConsentData = {
  client_name: string
  scopes: AuthorizationConsentDataScope[]
}
