import { Session } from '@/auth/types/Session'
import { db } from '@/common/lib/firebase'
import { ISessionRepository } from '../contracts/repositories/ISessionRepository'
import { Timestamp } from 'firebase-admin/firestore'

export type FirestoreSession = {
  expires_at: Timestamp
  user_id: string
}

export class FirestoreSessionRepository implements ISessionRepository {
  getById: (id: string) => Promise<Session | null> = async (id) => {
    const sessionRef = db.collection('sessions').doc(id)
    const doc = await sessionRef.get()
    if (!doc.exists) return null
    let data = doc.data()
    if (!data) return null
    const { expires_at, user_id } = data as FirestoreSession

    return { expires: expires_at.toDate(), id, userId: user_id }
  }

  create: (session: Session) => Promise<void> = async ({
    expires,
    id,
    userId,
  }) => {
    const sessionRef = db.collection('sessions').doc(id)
    const session = await this.getById(id)
    const sessionExistInDb = session !== null
    if (sessionExistInDb) throw new Error('session_already_exist')

    const newSession: FirestoreSession = {
      expires_at: Timestamp.fromDate(expires),
      user_id: userId,
    }

    await sessionRef.set(newSession)
  }

  update: (id: string, session: Omit<Session, 'id'>) => Promise<void> = async (
    id,
    session
  ) => {
    await this.getByIdOrFail(id)

    const sessionRef = db.collection('sessions').doc(id)
    await sessionRef.update(session)
  }

  delete: (id: string) => Promise<void> = async (id) => {
    await db.collection('sessions').doc(id).delete()
  }

  private async getByIdOrFail(sessionId: string) {
    const session = await this.getById(sessionId)
    const sessionExistInDb = session !== null
    if (!sessionExistInDb) throw new Error('session_not_exist')

    return session
  }
}
