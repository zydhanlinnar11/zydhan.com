import User from '@/modules/auth/types/User'
import fetchUser from '@/modules/auth/utils/FetchUser'
import axios from 'axios'

import {
  createContext,
  FC,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
} from 'react'

type UserState =
  | {
      state: 'loading'
    }
  | {
      state: 'unauthenticated'
    }
  | {
      state: 'authenticated'
      user: User
    }

type Action =
  | {
      type: 'USER_AUTHENTICATED'
      user: User
    }
  | {
      type: 'USER_UNAUTHENTICATED'
    }
  | { type: 'LOADING' }

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
    getUserData()
  }, [])

  const getUserData = async () => {
    try {
      const data = await fetchUser()
      dispatch({
        type: 'USER_AUTHENTICATED',
        user: data,
      })
    } catch (e) {
      dispatch({ type: 'USER_UNAUTHENTICATED' })
    }
  }

  const logout = async () => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + '/auth/logout', {
        withCredentials: true,
      })

      dispatch({ type: 'USER_UNAUTHENTICATED' })
    } catch (e) {}
  }

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export const useUserState = () => useContext(UserStateContext)
export const useUserDispatch = () => useContext(UserDispatchContext)
