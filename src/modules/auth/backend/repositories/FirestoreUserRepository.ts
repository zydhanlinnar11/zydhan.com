import { db } from '@/common/lib/firebase'
import { User } from '@/common/types/User'
import { IUserRepository } from '@/auth/backend/contracts/repositories/IUserRepository'
import { FieldPath, FieldValue } from 'firebase-admin/firestore'
import { getProviders } from 'next-auth/react'

export type FirestoreUser = {
  created_at: { _seconds: number; _nanoseconds: number } | FieldValue
  email: string
  githubId: string | null
  googleId: string | null
  name: string
  updated_at: { _seconds: number; _nanoseconds: number } | FieldValue
}

export class FirestoreUserRepository implements IUserRepository {
  getByProvider: (providerId: string, socialId: any) => Promise<User | null> =
    async (providerId, socialId) => {
      const snapshot = await db
        .collection('users')
        .where(`${providerId}Id`, '==', socialId)
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
      email: data.email,
      name: data.name,
      // TODO: fix sosmed
      // social_media: this.getLinkedSocialMedia(
      //   doc.data() as unknown as FirestoreUser
      // ),
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
    providerId: string,
    socialId: any,
    userId: string
  ) => Promise<void> = async (providerId, socialId, userId) => {
    await this.getByIdOrFail(userId)

    const userRef = db.collection('users').doc(userId)
    await userRef.update({ [`${providerId}Id`]: socialId })
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
        email: user.email,
        id: doc.id,
        name: user.name,
        // TODO: fix sosmed
        // social_media: this.getLinkedSocialMedia(user),
      }
    })

    return userData
  }

  private getLinkedSocialMedia(user: FirestoreUser): string[] {
    const linked: string[] = []

    // const providers = Object.values(await getProviders())

    // providers.forEach(({ id }) => {
    //   const field = `${id}Id`
    //   // @ts-ignore
    //   if (field in user && user[field]) linked.push(id)
    // })

    return linked
  }

  unlinkSocial: (providerId: string, userId: string) => Promise<void> = async (
    providerId,
    userId
  ) => {
    await this.getByIdOrFail(userId)

    const userRef = db.collection('users').doc(userId)
    await userRef.update({ [`${providerId}Id`]: null })
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
