import { db } from '@/common/lib/firebase'
import { CookieKey } from '../contracts/models/CookieKey'
import { ICookieKeyRepository } from '../contracts/repositories/ICookieKeyRepository'
import { Timestamp } from 'firebase-admin/firestore'

export class FirestoreCookieKeyRepository implements ICookieKeyRepository {
  getLatest: () => Promise<CookieKey | null> = async () => {
    const snapshot = await db
      .collection('cookie_keys')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get()

    let cookieKey: CookieKey | null = null

    snapshot.forEach((doc) => {
      const data = doc.data()
      cookieKey = new CookieKey(
        doc.id,
        data.key,
        new Timestamp(
          data.timestamp?._seconds,
          data.timestamp?._nanoseconds
        ).toDate()
      )
    })

    return cookieKey
  }
}
