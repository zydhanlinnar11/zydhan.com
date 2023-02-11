import { db } from '@/common/lib/firebase'
import { IAuthorizedCallbackOriginRepository } from '../contracts/repositories/IAuthorizedCallbackOriginRepository'

export class FirestoreAuthorizedCallbackOriginRepository
  implements IAuthorizedCallbackOriginRepository
{
  isExistByHostName: (hostName: string) => Promise<boolean> = async (
    hostName
  ) => {
    const doc = await db
      .collection('authorized_callback_hostname')
      .doc(hostName)
      .get()

    return doc.exists
  }
}
