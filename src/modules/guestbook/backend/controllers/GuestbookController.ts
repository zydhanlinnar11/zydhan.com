import { db } from '@/common/lib/firebase'
import { Guestbook } from '@/guestbook/types/Guestbook'
import { NextApiRequest, NextApiResponse } from 'next'
import { GuestbookFirestore } from '@/guestbook/backend/types/GuestbookFirestore'
import { Timestamp } from 'firebase-admin/firestore'

export class GuestbookController {
  public index = async (req: NextApiRequest, res: NextApiResponse) => {
    const guestbooksRef = db.collection('guestbooks')
    const snapshot = await guestbooksRef.get()
    const data: Guestbook[] = []
    snapshot.forEach((doc) => {
      const docData = doc.data() as unknown as GuestbookFirestore
      const timestamp = new Timestamp(
        docData.createdAt._seconds,
        docData.createdAt._nanoseconds
      )
      data.push({
        content: docData.content,
        createdAt: timestamp.toDate().toISOString(),
        id: doc.id,
        user: docData.userName,
      })
    })

    res.send(data)
  }

  public store = async (req: NextApiRequest, res: NextApiResponse) => {
    res.send({ message: 'store' })
  }
}
