type User = {
  name: string
  email: string
  linkedAccount: {
    github: boolean
    google: boolean
  }
}

export default User
