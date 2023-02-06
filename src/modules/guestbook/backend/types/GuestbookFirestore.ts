export type GuestbookFirestore = {
  userId: string
  content: string
  createdAt: { _seconds: number; _nanoseconds: number }
  userName: string
}
