class User {
  public name: string
  public user_name: string
  public user_id: string

  constructor(user_id: string, name: string, user_name: string) {
    this.user_id = user_id
    this.name = name
    this.user_name = user_name
  }
}

export default User
