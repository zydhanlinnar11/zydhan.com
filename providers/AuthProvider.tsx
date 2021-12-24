import React, { useContext, useEffect, useState } from 'react'

interface IAPILoginResponse {
  message: string
  token?: string
  errors?: string
}

export interface IAuthenticatedUser {
  created_at: string
  email: string
  email_verified_at: string
  id: string
  name: string
  updated_at: string
  username: string
  admin: boolean
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
    message: string
  }>
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  isUserFetched: boolean
}

const AuthContext = React.createContext<AuthContextInterface | null>(null)

function getFirstObjectItem(obj): string | null {
  for (let key in obj) {
    // Each key has value array of string
    // We only need to return first index
    return obj[key]?.[0]
  }
  return null
}

export function getCookie(cname) {
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
  const [isUserFetched, setUserFetched] = useState(false)

  useEffect(() => {
    getUserFromToken().then((updatedUser: IAuthenticatedUser) =>
      updateUser(updatedUser)
    )
  }, [])

  function updateUser(updatedUser: IAuthenticatedUser) {
    if (!updatedUser) {
      localStorage.removeItem('token')
      setUser(null)
      setUserFetched(true)
      return
    }
    // Laravel return this value as integer
    // So we need to convert to boolean
    const isAdmin = updatedUser.admin as unknown as number
    updatedUser.admin = isAdmin != 0
    setUser(updatedUser)
    setUserFetched(true)
  }

  async function register(
    username: string,
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    try {
      const csrf = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/sanctum/csrf-cookie`,
        {
          credentials: 'include',
        }
      )
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/register`,
        {
          method: 'POST',
          body: JSON.stringify({
            username,
            name,
            email,
            password,
            password_confirmation,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            credentials: 'include',
          },
        }
      )
      const json: { message?: string; errors?: string } = await response.json()

      if (response.status !== 200)
        return {
          success: false,
          message: json.errors ? getFirstObjectItem(json.errors) : json.message,
        }

      return {
        success: true,
        message: 'Account successfully created.',
        errors: {},
      }
    } catch {
      throw 'Connection error.'
    }
  }

  async function login(email: string, password: string) {
    try {
      const csrf = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/sanctum/csrf-cookie`,
        {
          credentials: 'include',
        }
      )
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/login`,
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            credentials: 'include',
          },
        }
      )
      const json: IAPILoginResponse = await response.json()

      if (response.status !== 200)
        return {
          success: false,
          message: json.errors ? getFirstObjectItem(json.errors) : json.message,
        }

      localStorage.setItem('token', json.token)
      updateUser(await getUserFromToken())
      return { success: true, message: 'Login success.' }
    } catch {
      throw 'Connection error.'
    }
  }

  async function getUserFromToken() {
    const token = localStorage.getItem('token') || getCookie('token')
    if (token) localStorage.setItem('token', token)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BLOG_API}/user`, {
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

    if (!token) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/logout`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const json = await response.json()
    } catch (error) {}
  }

  const value = {
    user,
    register,
    login,
    logout,
    isUserFetched,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
