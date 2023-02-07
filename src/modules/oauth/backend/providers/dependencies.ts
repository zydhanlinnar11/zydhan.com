import { ICookieKeyRepository } from '../contracts/repositories/ICookieKeyRepository'
import { FirestoreCookieKeyRepository } from '../repositories/FirestoreCookieKeyRepository'

export const cookieKeyRepository: ICookieKeyRepository =
  new FirestoreCookieKeyRepository()
