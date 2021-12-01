import React, { useContext, useState } from 'react'
import BlogConfig from '../config/BlogConfig'

const AuthContext = React.createContext(null)

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
  const [user, setUser] = useState()

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
      const csrf = await fetch(
        `${BlogConfig.BLOG_DOMAIN}/sanctum/csrf-cookie`,
        {
          credentials: 'same-origin',
        }
      )
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

  const value = {
    user,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
