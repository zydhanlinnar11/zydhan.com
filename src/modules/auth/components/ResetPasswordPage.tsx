import Button from '@/common/components/elements/Button'
import TextInput from '@/common/components/elements/Form/TextInput'
import SpinnerLoading from '@/common/components/elements/SpinnerLoading'
import { useUserState } from '@/common/providers/UserProvider'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useReducer, useRef } from 'react'

type ResetPasswordState =
  | { status: 'PROCESSING' }
  | { status: 'IDLE'; errorMessage?: string; successMessage?: string }

type Action = ResetPasswordState

const reducer = (
  state: ResetPasswordState,
  action: Action
): ResetPasswordState => action

const ResetPasswordPage = () => {
  const userState = useUserState()
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, { status: 'IDLE' })
  const tokenRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)
  const loading = (
    <div className='grow flex flex-col justify-center items-center'>
      <SpinnerLoading />
    </div>
  )
  const token = router.query['token']
  const email = router.query['email']

  if (userState.state !== 'unauthenticated') {
    if (userState.state === 'authenticated') router.push('/')
    return loading
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    dispatch({ status: 'PROCESSING' })
    if (!emailRef?.current?.value) {
      dispatch({ status: 'IDLE', errorMessage: 'Email must be filled' })
      return
    }
    if (!passwordRef?.current?.value) {
      dispatch({ status: 'IDLE', errorMessage: 'Password must be filled' })
      return
    }
    const password = passwordRef.current.value
    if (passwordConfirmationRef?.current?.value !== password) {
      dispatch({
        status: 'IDLE',
        errorMessage: 'Password confirmation should match',
      })
      return
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/reset-password`,
        {
          token: tokenRef.current?.value,
          email: emailRef.current.value,
          password,
          password_confirmation: passwordConfirmationRef.current.value,
        },
        {
          withCredentials: true,
        }
      )
      router.push('/auth/login')
      dispatch({ status: 'IDLE' })

      sessionStorage.setItem(
        'flash_success',
        JSON.stringify(res.data?.message ?? 'Password has been reset')
      )
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e
      dispatch({
        status: 'IDLE',
        errorMessage: e.response?.data?.message || e.message,
      })
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password - zydhan.xyz</title>
        <meta property='og:title' content='Reset Password - zydhan.xyz' />
        <meta
          property='og:url'
          content='https://zydhan.xyz/auth/reset-password'
        />
        <meta property='og:description' content='Reset your account password' />
      </Head>
      <div className='grow flex flex-col items-center justify-center'>
        <header className='text-center'>
          <h1 className='text-3xl font-semibold'>Reset password</h1>
          <p className='mt-3 text-gray-400'>Reset your account password</p>
        </header>
        <form
          className='text-center mt-5 max-w-xs mx-auto'
          method='POST'
          onSubmit={submitHandler}
        >
          <div className='hidden'>
            <TextInput
              type='text'
              name='token'
              label='token'
              defaultValue={`${token}`}
              reference={tokenRef}
              position='bottom'
            />
            <TextInput
              type={'text'}
              name='email'
              label='E-mail'
              defaultValue={`${email}`}
              position='top'
              reference={emailRef}
            />
          </div>
          <TextInput
            type={'password'}
            name='password'
            label='Password'
            autoComplete='new-password'
            position='top'
            reference={passwordRef}
          />
          <TextInput
            type={'password'}
            name='password_confirmation'
            label='Password Confirmation'
            autoComplete='new-password'
            position='bottom'
            reference={passwordConfirmationRef}
          />
          <div className='mt-1'>
            <small className='text-green-500'>
              {state.status === 'IDLE' && state.successMessage}
            </small>
            <small className='text-red-500'>
              {state.status === 'IDLE' && state.errorMessage}
            </small>
          </div>
          <div className='mt-3'>
            <Button type='submit' disabled={state.status === 'PROCESSING'}>
              Reset password
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ResetPasswordPage
