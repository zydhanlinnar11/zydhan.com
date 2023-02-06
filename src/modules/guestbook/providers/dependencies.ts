import { IGuestbookRepository } from '@/guestbook/backend/contracts/repositories/IGuestbookRepository'
import { FirestoreGuestbookRepository } from '@/guestbook/backend/repositories/FirestoreGuestbookRepository'

export const guestbookRepository: IGuestbookRepository =
  new FirestoreGuestbookRepository()
