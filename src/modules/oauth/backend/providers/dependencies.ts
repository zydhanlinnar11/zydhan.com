import { ICookieKeyRepository } from '../contracts/repositories/ICookieKeyRepository'
import { IJwkRepository } from '../contracts/repositories/IJwkRepository'
import { IUserRepository } from '../contracts/repositories/IUserRepository'
import { FirestoreCookieKeyRepository } from '../repositories/FirestoreCookieKeyRepository'
import { FirestoreJwkRepository } from '../repositories/FirestoreJwkRepository'
import { FirestoreUserRepository } from '../repositories/FirestoreUserRepository'

export const cookieKeyRepository: ICookieKeyRepository =
  new FirestoreCookieKeyRepository()

export const jwkRepository: IJwkRepository = new FirestoreJwkRepository()
export const userRepository: IUserRepository = new FirestoreUserRepository()
