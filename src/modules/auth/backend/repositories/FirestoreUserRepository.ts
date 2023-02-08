import { db } from '@/common/lib/firebase'
import { User } from '@/common/types/User'
import { FieldPath, FieldValue } from 'firebase-admin/firestore'
import { oauth2Providers } from '@/common/config/oauth2-providers'
import { IUserRepository } from '../contracts/repositories/IUserRepository'

export type FirestoreUser = {
  created_at: { _seconds: number; _nanoseconds: number } | FieldValue
  email: string
  githubId: string | null
  googleId: string | null
  name: string
  updated_at: { _seconds: number; _nanoseconds: number } | FieldValue
}

export class FirestoreUserRepository implements IUserRepository {
  getById: (id: string) => Promise<User | null> = async (id) => {
    const userRef = db.collection('users').doc(id)
    const doc = await userRef.get()
    if (!doc.exists) return null
    const data = doc.data()
    if (!data) return null

    const user: User = {
      id: doc.id,
      email: data.email,
      name: data.name,
      social_media: this.getLinkedSocialMedia(
        doc.data() as unknown as FirestoreUser
      ),
    }

    return user
  }

  private async getByIdOrFail(userId: string) {
    const user = await this.getById(userId)
    const userExistInDb = user !== null
    if (!userExistInDb) throw new Error('user_not_exist')

    return user
  }

  private getLinkedSocialMedia(user: FirestoreUser): string[] {
    const linked: string[] = []

    oauth2Providers.forEach(({ id }) => {
      const field = `${id}Id`
      // @ts-ignore
      if (field in user && user[field]) linked.push(id)
    })

    return linked
  }

  update: (
    id: string,
    personalInfo: { email: string; name: string }
  ) => Promise<void> = async (id, personalInfo) => {
    await this.getByIdOrFail(id)

    const userRef = db.collection('users').doc(id)
    await userRef.update(personalInfo)

    // TODO: update related guestbooks
  }

  isAnotherUserIdWithSameEmailExists: (
    email: string,
    excludedUserId: string
  ) => Promise<boolean> = async (email, excludedUserId) => {
    const res = await db
      .collection('users')
      .where(FieldPath.documentId(), '!=', excludedUserId)
      .where('email', '==', email)
      .limit(1)
      .count()
      .get()

    return res.data().count !== 0
  }
}
