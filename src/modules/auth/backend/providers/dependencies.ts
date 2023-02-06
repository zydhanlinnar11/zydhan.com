import { IUserRepository } from '@/auth/backend/contracts/repositories/IUserRepository'
import { FirestoreUserRepository } from '@/auth/backend/repositories/FirestoreUserRepository'

export const userRepository: IUserRepository = new FirestoreUserRepository()
