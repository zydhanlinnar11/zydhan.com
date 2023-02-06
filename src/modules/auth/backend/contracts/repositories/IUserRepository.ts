import { User } from '@/common/types/User'
import { AbstractProvider } from '@/auth/backend/providers/OAuth2/AbstractProvider'

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
  getByProvider: (
    Provider: typeof AbstractProvider,
    socialId: any
  ) => Promise<User | null>

  isAnotherUserIdWithSameEmailExists: (
    email: string,
    excludedUserId: string
  ) => Promise<boolean>

  getByEmail: (email: string) => Promise<User | null>

  getById: (id: string) => Promise<User | null>

  create: (user: NewUser) => Promise<void>

  update: (id: string, personalInfo: PersonalInfo) => Promise<void>

  linkToSocial: (
    Provider: typeof AbstractProvider,
    socialId: any,
    userId: string
  ) => Promise<void>

  unlinkSocial: (
    Provider: typeof AbstractProvider,
    userId: string
  ) => Promise<void>
}
