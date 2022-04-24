import User from '@/modules/auth/types/User'
import fetchUser from '@/modules/auth/utils/FetchUser'
import {
  createContext,
  FC,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
  PropsWithChildren,
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

type Action = UserState

const reducer = (state: UserState, action: Action): UserState => action

const initialState: UserState = {
  state: 'loading',
}

const UserStateContext = createContext<UserState>(initialState)
const UserDispatchContext = createContext<Dispatch<Action>>(() => null)

export const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchUser()
      .then((user) =>
        dispatch({
          state: 'authenticated',
          user,
        })
      )
      .catch(() => dispatch({ state: 'unauthenticated' }))
  }, [])

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
