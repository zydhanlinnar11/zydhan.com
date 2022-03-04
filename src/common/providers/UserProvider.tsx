import axios, { AxiosResponse } from 'axios'

import {
  createContext,
  FC,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
} from 'react'

type User = {
  name: string
  email: string
}

type UserState =
  | {
      state: 'loading'
    }
  | {
      state: 'unauthenticated'
      socialLogin: (provider: 'google' | 'github') => void
    }
  | {
      state: 'authenticated'
      user: User
      logout: () => void
      revalidate: () => void
    }

type Action =
  | {
      type: 'USER_AUTHENTICATED'
      user: User
      logout: () => void
      revalidate: () => void
    }
  | {
      type: 'USER_UNAUTHENTICATED'
      socialLogin: (provider: 'google' | 'github') => void
    }
  | { type: 'LOGOUT' }
  | { type: 'LOADING' }

const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'USER_AUTHENTICATED':
      return {
        state: 'authenticated',
        user: action.user,
        logout: action.logout,
        revalidate: action.revalidate,
      }
    case 'USER_UNAUTHENTICATED':
      return {
        state: 'unauthenticated',
        socialLogin: action.socialLogin,
      }
    case 'LOADING':
      return {
        state: 'loading',
      }
    default:
      throw new Error(`Unknown action ${JSON.stringify(action)}`)
  }
}

const initialState: UserState = {
  state: 'loading',
}

const UserStateContext = createContext<UserState>(initialState)
const UserDispatchContext = createContext<Dispatch<Action>>(() => null)

export const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const res = await axios.get<any, AxiosResponse<User, any>, any>(
        process.env.NEXT_PUBLIC_API_URL + '/auth/authenticated-user',
        {
          withCredentials: true,
        }
      )

      dispatch({
        type: 'USER_AUTHENTICATED',
        user: res.data,
        logout: logout,
        revalidate: fetchUser,
      })
    } catch (e) {
      dispatch({ type: 'USER_UNAUTHENTICATED', socialLogin })
    }
  }

  const logout = async () => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + '/auth/logout', {
        withCredentials: true,
      })

      dispatch({ type: 'USER_UNAUTHENTICATED', socialLogin })
    } catch (e) {}
  }

  const socialLogin = (provider: 'google' | 'github') => {
    dispatch({ type: 'LOADING' })
    const width = 500
    const height = 400
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2.5

    const popup = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/redirect`,
      `Sign in with ${provider}`,
      `width=${width},height=${height},left=${left},top=${top}`
    )

    const interval = setInterval(() => {
      if (!popup || popup.closed) {
        interval && clearInterval(interval)
        fetchUser()
        return
      }
    }, 500)
  }

  return (
    <UserStateContext.Provider value={state}>
      {children}
    </UserStateContext.Provider>
  )
}

export const useUserState = () => useContext(UserStateContext)
export const useUserDispatch = () => useContext(UserDispatchContext)
