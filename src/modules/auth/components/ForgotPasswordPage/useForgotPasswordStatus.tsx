import React, { useReducer } from 'react'

type ForgotPasswordState =
  | { status: 'PROCESSING' }
  | { status: 'IDLE'; errorMessage?: string; successMessage?: string }

type Action = ForgotPasswordState

const reducer = (
  state: ForgotPasswordState,
  action: Action
): ForgotPasswordState => action

const useForgotPasswordStatus = () => {
  const [state, dispatch] = useReducer(reducer, { status: 'IDLE' })

  return { state, dispatch }
}

export default useForgotPasswordStatus
