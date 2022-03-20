type User = {
  name: string
  email: string
  linkedAccount: {
    github: boolean
    google: boolean
  }
  admin: boolean
  avatar_url: string | null
}

export default User
