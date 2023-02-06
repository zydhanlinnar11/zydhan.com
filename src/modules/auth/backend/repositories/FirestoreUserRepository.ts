import { db } from '@/common/lib/firebase'
import { User } from '@/common/types/User'
import { IUserRepository } from '@/auth/backend/contracts/repositories/IUserRepository'
import { AbstractProvider } from '@/auth/backend/providers/OAuth2/AbstractProvider'
import { FieldPath, FieldValue } from 'firebase-admin/firestore'
import { oauth2Providers } from '../config/oauth2-providers'

export type FirestoreUser = {
  created_at: { _seconds: number; _nanoseconds: number } | FieldValue
  email: string
  githubId: string | null
  googleId: string | null
  name: string
  updated_at: { _seconds: number; _nanoseconds: number } | FieldValue
}

export class FirestoreUserRepository implements IUserRepository {
  getByProvider: (
    Provider: typeof AbstractProvider,
    socialId: any
  ) => Promise<User | null> = async (Provider, socialId) => {
    const snapshot = await db
      .collection('users')
      .where(`${Provider.id}Id`, '==', socialId)
      .limit(1)
      .get()

    return this.mapSnapshotToUser(snapshot)
  }

  getByEmail: (email: string) => Promise<User | null> = async (email) => {
    const snapshot = await db
      .collection('users')
      .where(`email`, '==', email)
      .limit(1)
      .get()

    return this.mapSnapshotToUser(snapshot)
  }

  getById: (id: string) => Promise<User | null> = async (id) => {
    const userRef = db.collection('users').doc(id)
    const doc = await userRef.get()
    if (!doc.exists) return null
    const data = doc.data()
    if (!data) return null

    const user: User = {
      id: doc.id,
      admin: false,
      email: data.email,
      name: data.name,
      social_media: this.getLinkedSocialMedia(
        doc.data() as unknown as FirestoreUser
      ),
    }

    return user
  }

  create: (user: { id: string; email: string; name: string }) => Promise<void> =
    async ({ email, id, name }) => {
      const userRef = db.collection('users').doc(id)
      const user = await this.getById(id)
      const userExistInDb = user !== null
      if (userExistInDb) throw new Error('user_already_exist')

      const newUser: FirestoreUser = {
        email,
        name,
        githubId: null,
        googleId: null,
        created_at: FieldValue.serverTimestamp(),
        updated_at: FieldValue.serverTimestamp(),
      }

      await userRef.set(newUser)
    }

  linkToSocial: (
    Provider: typeof AbstractProvider,
    socialId: any,
    userId: string
  ) => Promise<void> = async (Provider, socialId, userId) => {
    await this.getByIdOrFail(userId)

    const userRef = db.collection('users').doc(userId)
    await userRef.update({ [`${Provider.id}Id`]: socialId })
  }

  private async getByIdOrFail(userId: string) {
    const user = await this.getById(userId)
    const userExistInDb = user !== null
    if (!userExistInDb) throw new Error('user_not_exist')

    return user
  }

  private mapSnapshotToUser(
    snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
  ) {
    if (snapshot.empty) return null

    let userData: User | null = null
    snapshot.forEach((doc) => {
      const user = doc.data() as unknown as FirestoreUser
      userData = {
        admin: false,
        email: user.email,
        id: doc.id,
        name: user.name,
        social_media: this.getLinkedSocialMedia(user),
      }
    })

    return userData
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

  unlinkSocial: (
    Provider: typeof AbstractProvider,
    userId: string
  ) => Promise<void> = async (Provider, userId) => {
    await this.getByIdOrFail(userId)

    const userRef = db.collection('users').doc(userId)
    await userRef.update({ [`${Provider.id}Id`]: null })
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
