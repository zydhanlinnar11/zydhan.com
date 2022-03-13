type User = {
  name: string
  email: string
  linkedAccount: {
    github: boolean
    google: boolean
  }
  admin: boolean
}

export default User
