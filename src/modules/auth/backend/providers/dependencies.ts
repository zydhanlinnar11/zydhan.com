import { IUserRepository } from '@/auth/backend/contracts/repositories/IUserRepository'
import { FirestoreUserRepository } from '@/auth/backend/repositories/FirestoreUserRepository'
import { ISessionRepository } from '../contracts/repositories/ISessionRepository'
import { FirestoreSessionRepository } from '../repositories/FirestoreSessionRepository'

export const userRepository: IUserRepository = new FirestoreUserRepository()
export const sessionRepository: ISessionRepository =
  new FirestoreSessionRepository()
