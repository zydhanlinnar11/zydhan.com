import { ICookieKeyRepository } from '../contracts/repositories/ICookieKeyRepository'
import { IJwkRepository } from '../contracts/repositories/IJwkRepository'
import { FirestoreCookieKeyRepository } from '../repositories/FirestoreCookieKeyRepository'
import { FirestoreJwkRepository } from '../repositories/FirestoreJwkRepository'

export const cookieKeyRepository: ICookieKeyRepository =
  new FirestoreCookieKeyRepository()

export const jwkRepository: IJwkRepository = new FirestoreJwkRepository()
