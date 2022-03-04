import React, { useReducer } from 'react'

type ResetPasswordState =
  | { status: 'PROCESSING' }
  | { status: 'IDLE'; errorMessage?: string; successMessage?: string }

type Action = ResetPasswordState

const reducer = (
  state: ResetPasswordState,
  action: Action
): ResetPasswordState => action

const useResetPasswordStatus = () => {
  const [state, dispatch] = useReducer(reducer, { status: 'IDLE' })

  return { state, dispatch }
}

export default useResetPasswordStatus
