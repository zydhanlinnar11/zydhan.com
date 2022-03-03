import AnchorLink from '@/common/components/elements/AnchorLink'
import Button from '@/common/components/elements/Button'
import TextInput from '@/common/components/elements/Form/TextInput'
import SpinnerLoading from '@/common/components/elements/SpinnerLoading'
import { useUserState } from '@/common/providers/UserProvider'
import axios from 'axios'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { FormEventHandler, useReducer, useRef } from 'react'
import SocialLoginButtonGroup from './SocialLoginButtonGroup'

type RegisterState =
  | { state: 'PROCESSING' }
  | { state: 'IDLE'; errorMessage?: string }

type Action = { type: 'PROCESSING' } | { type: 'IDLE'; errorMessage?: string }

const reducer = (state: RegisterState, action: Action): RegisterState => {
  if (action.type === 'PROCESSING')
    return {
      state: action.type,
    }
  if (action.type === 'IDLE')
    return {
      state: action.type,
      errorMessage: action.errorMessage,
    }
  throw Error('Unknown action')
}

const RegisterPage = () => {
  const userState = useUserState()
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, { state: 'IDLE' })
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  if (userState.state !== 'unauthenticated') {
    let basePath =
      process.env.NODE_ENV === 'production'
        ? 'https://zydhan.xyz'
        : 'https://dev.zydhan.xyz'
    const nextPath = router.query['next']

    let redirectTo = new URL(basePath)
    try {
      if (typeof nextPath === 'string')
        redirectTo = new URL(`${basePath}${nextPath}`)
    } catch (e) {}
    if (userState.state === 'authenticated') router.push(redirectTo.toString())
    return (
      <div className='grow flex flex-col justify-center items-center'>
        <SpinnerLoading />
      </div>
    )
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    dispatch({ type: 'PROCESSING' })
    if (!nameRef?.current?.value) {
      dispatch({ type: 'IDLE', errorMessage: 'Name must be filled' })
      return
    }
    if (!emailRef?.current?.value) {
      dispatch({ type: 'IDLE', errorMessage: 'Email must be filled' })
      return
    }
    if (!passwordRef?.current?.value) {
      dispatch({ type: 'IDLE', errorMessage: 'Password must be filled' })
      return
    }
    if (confirmPasswordRef?.current?.value !== passwordRef.current.value) {
      dispatch({
        type: 'IDLE',
        errorMessage: 'Password confirmation must match',
      })
      return
    }

    try {
      await userState.register(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        confirmPasswordRef.current.value
      )
      Router.push('/auth/login')

      sessionStorage.setItem(
        'flash_success',
        JSON.stringify('User successfully registered')
      )
      dispatch({ type: 'IDLE' })
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e
      dispatch({
        type: 'IDLE',
        errorMessage: e.response?.data?.message || e.message,
      })
    }
  }

  return (
    <>
      <Head>
        <title>Register - zydhan.xyz</title>
        <meta property='og:title' content='Login - zydhan.xyz' />
        <meta property='og:url' content='https://zydhan.xyz/auth/register' />
        <meta property='og:description' content='Create new account' />
      </Head>
      <div className='grow flex flex-col items-center justify-center'>
        <header className='text-center'>
          <h1 className='text-3xl font-semibold'>Register</h1>
          <p className='mt-3 text-gray-400'>Create new account</p>
        </header>
        <form
          className='text-center mt-5 max-w-xs mx-auto'
          method='POST'
          onSubmit={submitHandler}
        >
          <TextInput
            type={'text'}
            name='name'
            label='Name'
            autoComplete='name'
            position='top'
            reference={nameRef}
          />
          <TextInput
            type={'email'}
            name='email'
            label='E-mail'
            autoComplete='username'
            position='middle'
            reference={emailRef}
          />
          <TextInput
            type={'password'}
            name='password'
            label='Password'
            autoComplete='new-password'
            position='middle'
            reference={passwordRef}
          />
          <TextInput
            type={'password'}
            name='password'
            label='Confirm Password'
            autoComplete='new-password'
            position='bottom'
            reference={confirmPasswordRef}
            inputId='confirm-password'
          />
          <div className='mt-1'>
            <small>
              Already have an account?{' '}
              <AnchorLink href='/auth/login'>Log in</AnchorLink>
            </small>
            <br />
            <small className='text-red-500'>
              {state.state === 'IDLE' && state.errorMessage}
            </small>
          </div>
          <div className='mt-3'>
            <Button type='submit' disabled={state.state === 'PROCESSING'}>
              Register
            </Button>
          </div>
          <div className='mt-3'>
            <SocialLoginButtonGroup disabled={state.state === 'PROCESSING'} />
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterPage
