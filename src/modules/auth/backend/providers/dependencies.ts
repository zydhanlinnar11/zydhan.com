import { IUserRepository } from '../contracts/repositories/IUserRepository'
import { FirestoreUserRepository } from '../repositories/FirestoreUserRepository'

export const userRepository: IUserRepository = new FirestoreUserRepository()
