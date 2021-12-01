import React, { useContext, useEffect, useState } from 'react'
import BlogConfig from '../config/BlogConfig'

interface IAPILoginResponse {
  message: string
  token: string
}

export interface IAuthenticatedUser {
  created_at: string
  email: string
  email_verified_at: string
  id: string
  name: string
  updated_at: string
  username: string
}

interface AuthContextInterface {
  user: IAuthenticatedUser
  register: (
    username: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<{
    success: boolean
    message: any
  }>
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextInterface | null>(null)

function getCookie(cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState<IAuthenticatedUser>(null)

  useEffect(() => {
    getUserFromToken().then((updatedUser: IAuthenticatedUser) =>
      updateUser(updatedUser)
    )
  }, [])

  function updateUser(updatedUser: IAuthenticatedUser) {
    if (!updatedUser) {
      localStorage.removeItem('token')
      setUser(null)
      return
    }
    setUser(updatedUser)
  }

  async function register(
    username: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    if (password != confirmPassword) {
      return { success: false, message: "Password confirmation doesn't match." }
    }
    try {
      const csrf = await fetch(`${BlogConfig.BLOG_API}/sanctum/csrf-cookie`, {
        credentials: 'same-origin',
      })
      const response = await fetch(`${BlogConfig.BLOG_API}/register`, {
        method: 'POST',
        body: JSON.stringify({ username, name, email, password }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCookie('XSRF-TOKEN'),
        },
      })
      const json = await response.json()

      if (response.status !== 200)
        return { success: false, message: json.message }

      return { success: true, message: 'Account successfully created.' }
    } catch {
      return { success: false, message: 'Connection error.' }
    }
  }

  async function login(email: string, password: string) {
    try {
      const csrf = await fetch(`${BlogConfig.BLOG_API}/sanctum/csrf-cookie`, {
        credentials: 'same-origin',
      })
      const response = await fetch(`${BlogConfig.BLOG_API}/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCookie('XSRF-TOKEN'),
        },
      })
      const json: IAPILoginResponse = await response.json()

      if (response.status !== 200)
        return { success: false, message: json.message }

      localStorage.setItem('token', json.token)
      updateUser(await getUserFromToken())
      return { success: true, message: 'Login success.' }
    } catch {
      return { success: false, message: 'Connection error.' }
    }
  }

  async function getUserFromToken() {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(`${BlogConfig.BLOG_API}/user`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status !== 200) {
        return null
      }
      const json: IAuthenticatedUser = await response.json()

      return json
    } catch (error) {
      return null
    }
  }

  async function logout() {
    const token = localStorage.getItem('token')
    updateUser(null)

    try {
      const response = await fetch(`${BlogConfig.BLOG_API}/logout`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await response.json()
    } catch (error) {}
  }

  const value = {
    user,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
