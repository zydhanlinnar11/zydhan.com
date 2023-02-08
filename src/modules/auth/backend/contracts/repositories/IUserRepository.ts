import { User } from '@/common/types/User'

type PersonalInfo = {
  email: string
  name: string
}

export interface IUserRepository {
  isAnotherUserIdWithSameEmailExists: (
    email: string,
    excludedUserId: string
  ) => Promise<boolean>

  getById: (id: string) => Promise<User | null>

  update: (id: string, personalInfo: PersonalInfo) => Promise<void>
}
