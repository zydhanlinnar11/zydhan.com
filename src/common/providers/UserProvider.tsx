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
      state: 'loading' | 'unauthenticated'
      user: null
    }
  | {
      state: 'authenticated'
      user: User
    }

type Action =
  | { type: 'USER_AUTHENTICATED'; user: User }
  | { type: 'USER_UNAUTHENTICATED' }

const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'USER_AUTHENTICATED':
      return {
        state: 'authenticated',
        user: action.user,
      }
    case 'USER_UNAUTHENTICATED':
      return {
        state: 'unauthenticated',
        user: null,
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
    const fetchUser = async () => {
      try {
        const res = await axios.get<any, AxiosResponse<User, any>, any>(
          process.env.NEXT_PUBLIC_API_URL + '/auth/authenticated-user',
          {
            withCredentials: true,
          }
        )

        dispatch({ type: 'USER_AUTHENTICATED', user: res.data })
      } catch (e) {
        dispatch({ type: 'USER_UNAUTHENTICATED' })
      }
    }

    fetchUser()
  }, [])

  return (
    <UserStateContext.Provider value={state}>
      {children}
    </UserStateContext.Provider>
  )
}

export const useUserState = () => useContext(UserStateContext)
export const useUserDispatch = () => useContext(UserDispatchContext)
