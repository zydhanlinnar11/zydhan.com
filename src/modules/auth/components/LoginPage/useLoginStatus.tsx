import React, { useReducer } from 'react'

type LoginState =
  | { state: 'PROCESSING' }
  | { state: 'IDLE'; errorMessage?: string; successMessage?: string }

type Action =
  | { type: 'PROCESSING' }
  | { type: 'IDLE'; errorMessage?: string; successMessage?: string }

const reducer = (state: LoginState, action: Action): LoginState => {
  if (action.type === 'PROCESSING')
    return {
      state: action.type,
    }
  if (action.type === 'IDLE')
    return {
      state: action.type,
      errorMessage: action.errorMessage,
      successMessage: action.successMessage,
    }
  throw Error('Unknown action')
}

const useLoginStatus = () => {
  const [state, dispatch] = useReducer(reducer, { state: 'IDLE' })

  return { state, dispatch }
}

export default useLoginStatus
