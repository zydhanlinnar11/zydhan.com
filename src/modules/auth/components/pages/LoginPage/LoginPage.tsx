import { backendFetcher } from '@/common/hooks/useAxios'
import useCSRFCookie from '@/common/hooks/useCSRFCookie'
import { useRefetchUser, useUser } from '@/common/providers/UserProvider'
import { FormEventHandler, useState } from 'react'

const LoginPage = () => {
  useCSRFCookie()
  const { user } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const refetchUser = useRefetchUser()

  const handleLogin: FormEventHandler = (e) => {
    e.preventDefault()
    backendFetcher.post('/auth/login', { email, password }).then(() => {
      refetchUser && refetchUser()
    })
  }

  return (
    <>
      <p>LoginPage</p>
      <p>{!user ? 'Currently unauthenticated' : `Hello ${user.name}`}</p>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default LoginPage
