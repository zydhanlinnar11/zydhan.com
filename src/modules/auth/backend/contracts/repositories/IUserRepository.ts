import { User } from '@/common/types/User'

type NewUser = {
  id: string
  email: string
  name: string
}

type PersonalInfo = {
  email: string
  name: string
}

export interface IUserRepository {
  getByProvider: (providerId: string, socialId: any) => Promise<User | null>

  isAnotherUserIdWithSameEmailExists: (
    email: string,
    excludedUserId: string
  ) => Promise<boolean>

  getByEmail: (email: string) => Promise<User | null>

  getById: (id: string) => Promise<User | null>

  create: (user: NewUser) => Promise<void>

  linkToSocial: (
    providerId: string,
    socialId: any,
    userId: string
  ) => Promise<void>

  unlinkSocial: (providerId: string, userId: string) => Promise<void>

  getLinkedSocial: (userId: string) => Promise<string[]>
}
