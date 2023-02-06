// You may need the next line in some situations
import * as IronSession from 'iron-session'

declare module 'iron-session' {
  interface IronSessionData {
    userId?: string
  }
}
