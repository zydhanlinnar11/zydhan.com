import { useReducer } from 'react'

type RegisterState =
  | { status: 'PROCESSING' }
  | { status: 'IDLE'; errorMessage?: string }

type Action = { type: 'PROCESSING' } | { type: 'IDLE'; errorMessage?: string }

const reducer = (status: RegisterState, action: Action): RegisterState => {
  if (action.type === 'PROCESSING')
    return {
      status: action.type,
    }
  if (action.type === 'IDLE')
    return {
      status: action.type,
      errorMessage: action.errorMessage,
    }
  throw Error('Unknown action')
}

const useRegisterStatus = () => {
  const [state, dispatch] = useReducer(reducer, { status: 'IDLE' })

  return { state, dispatch }
}

export default useRegisterStatus
