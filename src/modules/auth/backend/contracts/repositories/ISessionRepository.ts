import { Session } from '@/auth/types/Session'

export interface ISessionRepository {
  getById: (id: string) => Promise<Session | null>
  create: (session: Session) => Promise<void>
  update: (id: string, session: Omit<Session, 'id'>) => Promise<void>
  delete: (id: string) => Promise<void>
}
