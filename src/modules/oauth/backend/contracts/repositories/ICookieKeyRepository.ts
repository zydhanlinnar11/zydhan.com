import { CookieKey } from '../models/CookieKey'

export interface ICookieKeyRepository {
  getLatest: () => Promise<CookieKey | null>
}
