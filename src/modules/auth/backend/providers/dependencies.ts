import { IUserRepository } from '@/auth/backend/contracts/repositories/IUserRepository'
import { FirestoreUserRepository } from '@/auth/backend/repositories/FirestoreUserRepository'
import { IAuthorizedCallbackOriginRepository } from '../contracts/repositories/IAuthorizedCallbackOriginRepository'
import { ISessionRepository } from '../contracts/repositories/ISessionRepository'
import { FirestoreAuthorizedCallbackOriginRepository } from '../repositories/FirestoreAuthorizedCallbackOriginRepository'
import { FirestoreSessionRepository } from '../repositories/FirestoreSessionRepository'

export const userRepository: IUserRepository = new FirestoreUserRepository()
export const sessionRepository: ISessionRepository =
  new FirestoreSessionRepository()

export const authorizedCallbackOriginRepository: IAuthorizedCallbackOriginRepository =
  new FirestoreAuthorizedCallbackOriginRepository()
