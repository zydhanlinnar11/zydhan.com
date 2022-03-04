import Button from '@/common/components/elements/Button'
import TextInput from '@/common/components/elements/Form/TextInput'
import SpinnerLoading from '@/common/components/elements/SpinnerLoading'
import { useUserState } from '@/common/providers/UserProvider'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useReducer, useRef } from 'react'
import useForgotPasswordStatus from './useForgotPasswordStatus'

const loading = (
  <div className='grow flex flex-col justify-center items-center'>
    <SpinnerLoading />
  </div>
)

const ForgotPasswordPage = () => {
  const userState = useUserState()
  const router = useRouter()
  const { state, dispatch } = useForgotPasswordStatus()
  const emailRef = useRef<HTMLInputElement>(null)

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

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/forgot-password`,
        {
          email: emailRef.current.value,
        },
        {
          withCredentials: true,
        }
      )
      dispatch({
        status: 'IDLE',
        successMessage: 'Check your email for reset password link',
      })
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
        <title>Forgot Password - zydhan.xyz</title>
        <meta property='og:title' content='Forgot Password - zydhan.xyz' />
        <meta
          property='og:url'
          content='https://zydhan.xyz/auth/forgot-password'
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
          <TextInput
            type={'email'}
            name='email'
            label='E-mail'
            autoComplete='username'
            position='single'
            reference={emailRef}
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

export default ForgotPasswordPage
