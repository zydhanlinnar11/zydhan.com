import { db } from '@/common/lib/firebase'
import { IGuestbookRepository } from '@/guestbook/backend/contracts/repositories/IGuestbookRepository'
import { Guestbook } from '@/guestbook/types/Guestbook'
import { Timestamp } from 'firebase-admin/firestore'
import { uuid } from 'uuidv4'

export type FirestoreUser = {
  name: string
}

export type FirestoreGuestbook = {
  userId: string
  content: string
  created_at: { _seconds: number; _nanoseconds: number } | Timestamp
  userName: string
}

export class FirestoreGuestbookRepository implements IGuestbookRepository {
  getAll: () => Promise<Guestbook[]> = async () => {
    const guestbooksRef = db.collection('guestbooks')
    const snapshot = await guestbooksRef.get()
    const data: Guestbook[] = []

    snapshot.forEach((doc) => {
      const docData = doc.data() as unknown as FirestoreGuestbook
      const timestamp =
        '_seconds' in docData.created_at
          ? new Timestamp(
              docData.created_at._seconds,
              docData.created_at._nanoseconds
            )
          : docData.created_at

      data.push({
        content: docData.content,
        created_at: timestamp.toDate().toISOString(),
        id: doc.id,
        user: docData.userName,
      })
    })

    return data
  }

  getUserById: (id: string) => Promise<FirestoreUser | null> = async (id) => {
    const userRef = db.collection('users').doc(id)
    const doc = await userRef.get()
    if (!doc.exists) return null
    const data = doc.data()
    if (!data) return null

    return data as unknown as FirestoreUser
  }

  create: (userId: string, content: string) => Promise<void> = async (
    userId,
    content
  ) => {
    const user = await this.getUserById(userId)
    if (!user) throw new Error('user_not_found')

    const guestbookRef = db.collection('guestbooks').doc(uuid())

    const newUser: FirestoreGuestbook = {
      content,
      created_at: Timestamp.now(),
      userId,
      userName: user.name,
    }

    await guestbookRef.set(newUser)
  }
}
