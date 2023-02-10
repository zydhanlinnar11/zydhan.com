import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
} from 'next-auth/adapters'
import { sessionRepository, userRepository } from '../providers/dependencies'
import { v4 as uuidv4 } from 'uuid'
import { User } from '@/common/types/User'

function mapUserToAdapterUser(user: User | null): AdapterUser | null {
  if (!user) return null

  return { ...user, emailVerified: null }
}

export function NextAuthDbAdapter(): Adapter {
  return {
    async createUser({ email, name, ...user }) {
      const id = uuidv4()
      const data = { email, name: name ?? '', id }
      await userRepository.create(data)

      return { ...data, emailVerified: null }
    },

    async getUser(id) {
      const user = await userRepository.getById(id)
      return mapUserToAdapterUser(user)
    },

    async getUserByEmail(email) {
      const user = await userRepository.getByEmail(email)
      return mapUserToAdapterUser(user)
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const user = await userRepository.getByProvider(
        provider,
        providerAccountId
      )
      return mapUserToAdapterUser(user)
    },

    async updateUser(partialUser): Promise<AdapterUser> {
      if (!partialUser.id) throw new Error('[updateUser] Missing id')
      const user = await userRepository.getById(partialUser.id)
      if (!user) throw new Error('[updateUser] User not found')

      const email = partialUser.email ?? user.email
      const name = partialUser.name ?? user.name

      await userRepository.update(partialUser.id, { email, name })

      const updatedUser = await userRepository.getById(partialUser.id)
      if (!updatedUser)
        throw new Error('[updateUser] Failed to fetch updated user')

      return { ...updatedUser, emailVerified: null }
    },

    async deleteUser(userId) {
      await userRepository.delete(userId)
    },

    async linkAccount({
      provider,
      providerAccountId,
      userId,
      type,
    }): Promise<AdapterAccount> {
      await userRepository.linkToSocial(provider, providerAccountId, userId)

      return { provider, providerAccountId, type, userId }
    },

    async unlinkAccount({ provider, providerAccountId }) {
      const user = await userRepository.getByProvider(
        provider,
        providerAccountId
      )
      if (!user) throw new Error('[unlinkAccount] User not found')

      await userRepository.unlinkSocial(provider, user.id)
    },

    async createSession(session): Promise<AdapterSession> {
      await sessionRepository.create({ ...session, id: session.sessionToken })

      return session
    },

    async getSessionAndUser(
      sessionToken
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      const session = await sessionRepository.getById(sessionToken)
      if (!session) return null

      const user = mapUserToAdapterUser(
        await userRepository.getById(session.userId)
      )
      if (!user) return null

      return { session: { ...session, sessionToken: session.id }, user }
    },

    async updateSession({
      sessionToken,
      expires,
      userId,
    }): Promise<AdapterSession | null> {
      const session = await sessionRepository.getById(sessionToken)
      if (!session) return null

      await sessionRepository.update(sessionToken, {
        expires: expires ?? session.expires,
        userId: userId ?? session.userId,
      })

      const updatedSession = await sessionRepository.getById(sessionToken)
      if (updatedSession) return { ...updatedSession, sessionToken }

      throw new Error('[updateSession] Failed to fetch updated session')
    },

    async deleteSession(sessionToken) {
      await sessionRepository.delete(sessionToken)
    },

    async createVerificationToken(verificationToken) {
      return null
    },

    async useVerificationToken({ identifier, token }) {
      return null
    },
  }
}
