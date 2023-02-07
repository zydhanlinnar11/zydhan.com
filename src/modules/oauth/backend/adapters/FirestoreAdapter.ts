import { db } from '@/common/lib/firebase'
import snakeCase from 'lodash/snakeCase.js'
import { Adapter, AdapterPayload } from 'oidc-provider'
import { Timestamp } from 'firebase-admin/firestore'

class FirestoreAdapter implements Adapter {
  private collection: string

  constructor(collection: string) {
    this.collection = `oidc_${snakeCase(collection)}`
  }

  async upsert(
    id: string,
    payload: AdapterPayload,
    expiresIn: number
  ): Promise<void | undefined> {
    let expiresAt: Date | null = null

    if (expiresIn) {
      expiresAt = new Date(Date.now() + expiresIn * 1000)
    }

    const ref = db.collection(this.collection).doc(id)
    await ref.set({
      ...payload,
      expiresAt: expiresAt ? Timestamp.fromDate(expiresAt) : undefined,
    })
  }

  async find(id: string): Promise<void | AdapterPayload | undefined> {
    const ref = db.collection(this.collection).doc(id)
    const doc = await ref.get()

    if (!doc.exists) return undefined
    const data = doc.data()
    if (!data) return undefined

    const expiration = new Timestamp(
      data.expiresAt._seconds,
      data.expiresAt._nanoseconds
    ).toDate()
    if (expiration.getTime() < Date.now()) return undefined

    return data
  }

  async findByUserCode(
    userCode: string
  ): Promise<void | AdapterPayload | undefined> {
    const snapshot = await db
      .collection(this.collection)
      .where('userCode', '==', userCode)
      .limit(1)
      .get()

    if (snapshot.empty) return undefined
    let data: any = undefined

    snapshot.forEach((doc) => (data = doc.data()))

    const expiration = new Timestamp(
      data.expiresAt._seconds,
      data.expiresAt._nanoseconds
    ).toDate()
    if (expiration.getTime() < Date.now()) return undefined

    return data
  }

  async findByUid(uid: string): Promise<void | AdapterPayload | undefined> {
    const snapshot = await db
      .collection(this.collection)
      .where('uid', '==', uid)
      .limit(1)
      .get()

    if (snapshot.empty) return undefined
    let data: any = undefined

    snapshot.forEach((doc) => (data = doc.data()))

    const expiration = new Timestamp(
      data.expiresAt._seconds,
      data.expiresAt._nanoseconds
    ).toDate()
    if (expiration.getTime() < Date.now()) return undefined

    return data
  }

  async consume(id: string): Promise<void | undefined> {
    const doc = await db.collection(this.collection).doc(id).get()

    if (!doc.exists) return undefined
    const data = doc.data()
    if (!data) return undefined

    const expiration = new Timestamp(
      data.expiresAt._seconds,
      data.expiresAt._nanoseconds
    ).toDate()
    if (expiration.getTime() < Date.now()) return undefined

    await doc.ref.update({
      consumed: Math.floor(Date.now() / 1000),
    })
  }

  async destroy(id: string): Promise<void | undefined> {
    await db.collection(this.collection).doc(id).delete()
  }

  async revokeByGrantId(grantId: string): Promise<void | undefined> {
    const snapshot = await db
      .collection(this.collection)
      .where('grantId', '==', grantId)
      .get()

    const batch = db.batch()
    snapshot.forEach((doc) => {
      batch.delete(doc.ref)
    })

    await batch.commit()
  }
}

export default FirestoreAdapter
