import { db } from '@/common/lib/firebase'
import { Timestamp } from 'firebase-admin/firestore'
import { Jwk } from '../contracts/models/Jwk'
import { IJwkRepository } from '../contracts/repositories/IJwkRepository'

export class FirestoreJwkRepository implements IJwkRepository {
  getAll: () => Promise<Jwk[]> = async () => {
    const snapshot = await db.collection('jwks').get()

    const jwks: Jwk[] = []

    snapshot.forEach((doc) => {
      const data = doc.data()
      jwks.push(
        new Jwk(
          doc.id,
          data.key,
          new Timestamp(
            data.timestamp?._seconds,
            data.timestamp?._nanoseconds
          ).toDate()
        )
      )
    })

    return jwks
  }
}
