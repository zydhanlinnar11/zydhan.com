import axios, { AxiosError, AxiosResponse } from 'axios'

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
      user: null
    }
  | {
      state: 'unauthenticated'
      user: null
      login: (email: string, password: string) => Promise<void>
      register: (
        name: string,
        email: string,
        password: string,
        passwordConfirm: string
      ) => Promise<void>
    }
  | {
      state: 'authenticated'
      user: User
      logout: () => void
    }

type Action =
  | { type: 'USER_AUTHENTICATED'; user: User; logout: () => void }
  | {
      type: 'USER_UNAUTHENTICATED'
      login: (email: string, password: string) => Promise<void>
      register: (
        name: string,
        email: string,
        password: string,
        passwordConfirm: string
      ) => Promise<void>
    }
  | { type: 'LOGOUT' }

const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'USER_AUTHENTICATED':
      return {
        state: 'authenticated',
        user: action.user,
        logout: action.logout,
      }
    case 'USER_UNAUTHENTICATED':
      return {
        state: 'unauthenticated',
        user: null,
        login: action.login,
        register: action.register,
      }
    default:
      throw new Error()
  }
}

const initialState: UserState = {
  state: 'loading',
  user: null,
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

      dispatch({ type: 'USER_AUTHENTICATED', user: res.data, logout: logout })
    } catch (e) {
      dispatch({ type: 'USER_UNAUTHENTICATED', login, register })
    }
  }

  const logout = async () => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + '/auth/logout', {
        withCredentials: true,
      })

      dispatch({ type: 'USER_UNAUTHENTICATED', login, register })
    } catch (e) {}
  }

  const login = async (email: string, password: string) => {
    try {
      const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
      })

      await instance.get('/sanctum/csrf-cookie')
      await instance.post('/auth/login', {
        email,
        password,
      })

      fetchUser()
    } catch (e) {
      if (!axios.isAxiosError(e)) return
      throw Error(e.response?.data?.message)
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
      })

      await instance.get('/sanctum/csrf-cookie')
      await instance.post('/auth/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      })
    } catch (e) {
      if (!axios.isAxiosError(e)) return
      throw Error(e.response?.data?.message)
    }
  }

  return (
    <UserStateContext.Provider value={state}>
      {children}
    </UserStateContext.Provider>
  )
}

export const useUserState = () => useContext(UserStateContext)
export const useUserDispatch = () => useContext(UserDispatchContext)
