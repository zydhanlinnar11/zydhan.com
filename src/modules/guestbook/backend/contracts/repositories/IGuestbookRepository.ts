import { Guestbook } from '@/guestbook/types/Guestbook'

export interface IGuestbookRepository {
  getAll: () => Promise<Guestbook[]>
  create: (userId: string, content: string) => Promise<void>
}
