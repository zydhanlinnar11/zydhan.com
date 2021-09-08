import User from '../model/User'

interface responseObjectModel {
  name: string
  username: string
}

class APIv2UserService {
  async getUser(id: string): Promise<User | null> {
    try {
      const response = await fetch(`http://blog-api.zydhan.xyz/api/user/${id}`)
      if (!response.ok) throw new Error('Error')
      const user: responseObjectModel = await response.json()
      return new User(id, user.name, user.username)
    } catch (error) {
      console.error('APIv2UserService.getUser(): Unable to fetch data from API')
      return null
    }
  }
}
export default APIv2UserService
