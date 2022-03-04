import { useReducer } from 'react'

type AuthenticationPageState =
  | { status: 'PROCESSING' }
  | { status: 'IDLE'; errorMessage?: string; successMessage?: string }

type Action = AuthenticationPageState

const reducer = (
  state: AuthenticationPageState,
  action: Action
): AuthenticationPageState => action

const useAuthenticationPageStatus = () => {
  const [state, dispatch] = useReducer(reducer, { status: 'IDLE' })

  return { state, dispatch }
}

export default useAuthenticationPageStatus
