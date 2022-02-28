import AnchorLink from '@/common/components/elements/AnchorLink'
import Button from '@/common/components/elements/Button'
import TextInput from '@/common/components/elements/Form/TextInput'
import SpinnerLoading from '@/common/components/elements/SpinnerLoading'
import { useUserState } from '@/common/providers/UserProvider'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { FormEventHandler, useRef, useState } from 'react'
import SocialLoginButtonGroup from './SocialLoginButtonGroup'

const RegisterPage = () => {
  const userState = useUserState()
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setProcessing] = useState<boolean>(false)

  if (userState.state !== 'unauthenticated') {
    if (userState.state === 'authenticated') router.push('/')
    return (
      <div className='grow flex flex-col justify-center items-center'>
        <SpinnerLoading />
      </div>
    )
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)
    setError('')
    if (!nameRef?.current?.value) {
      setError('Name must be filled')
      return
    }
    if (!emailRef?.current?.value) {
      setError('Email must be filled')
      return
    }
    if (!passwordRef?.current?.value) {
      setError('Password must be filled')
      return
    }
    if (!confirmPasswordRef?.current?.value) {
      setError('Password confirmation must be filled')
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
    } catch (e) {
      if (!(e instanceof Error)) return
      setError(e.message)
    } finally {
      setProcessing(false)
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
            <small className='text-red-500'>{error}</small>
          </div>
          <Button type='submit' disabled={isProcessing}>
            Register
          </Button>
          <SocialLoginButtonGroup
            isProcessing={isProcessing}
            setProcessing={setProcessing}
          />
        </form>
      </div>
    </>
  )
}

export default RegisterPage
