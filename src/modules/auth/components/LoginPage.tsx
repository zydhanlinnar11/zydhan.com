import AnchorLink from '@/common/components/elements/AnchorLink'
import Button from '@/common/components/elements/Button'
import TextInput from '@/common/components/elements/Form/TextInput'
import SpinnerLoading from '@/common/components/elements/SpinnerLoading'
import { useUserState } from '@/common/providers/UserProvider'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
import SocialLoginButtonGroup from './SocialLoginButtonGroup'

const LoginPage = () => {
  const userState = useUserState()
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setProcessing] = useState<boolean>(false)
  const [flashSuccess, setFlashSuccess] = useState<string>('')
  const loading = (
    <div className='grow flex flex-col justify-center items-center'>
      <SpinnerLoading />
    </div>
  )

  useEffect(() => {
    const message = sessionStorage.getItem('flash_success')
    if (!message) return
    setFlashSuccess(JSON.parse(message))
    sessionStorage.removeItem('flash_success')
  }, [])

  if (userState.state !== 'unauthenticated') {
    const nextPath = router.query['next']

    try {
      if (typeof nextPath !== 'string') throw Error()
      const redirectTo = new URL(`${nextPath}`)
      if (userState.state === 'loading') return loading
      router.push(redirectTo.toString())
    } catch (e) {
      if (userState.state === 'loading') return loading
      router.push('/')
    }
    return loading
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)
    setError('')
    if (!emailRef?.current?.value) {
      setError('Email must be filled')
      return
    }
    if (!passwordRef?.current?.value) {
      setError('Password must be filled')
      return
    }

    try {
      await userState.login(emailRef.current.value, passwordRef.current.value)
    } catch (e) {
      if (e instanceof Error) setError(e.message)
    }
    setProcessing(false)
  }

  return (
    <>
      <Head>
        <title>Login - zydhan.xyz</title>
        <meta property='og:title' content='Login - zydhan.xyz' />
        <meta property='og:url' content='https://zydhan.xyz/auth/login' />
        <meta property='og:description' content='Log in to your account' />
      </Head>
      <div className='grow flex flex-col items-center justify-center'>
        <header className='text-center'>
          <h1 className='text-3xl font-semibold'>Login</h1>
          <p className='mt-3 text-gray-400'>Log in to your account</p>
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
            position='top'
            reference={emailRef}
          />
          <TextInput
            type={'password'}
            name='password'
            label='Password'
            autoComplete='current-password'
            position='bottom'
            reference={passwordRef}
          />
          <div className='mt-1'>
            <small>
              Don&apos;t have account?{' '}
              <AnchorLink href='/auth/register'>Create an account</AnchorLink>
            </small>
            <br />
            <small className='text-green-500'>{flashSuccess}</small>
            <small className='text-red-500'>{error}</small>
          </div>
          <div className='mt-3'>
            <Button type='submit' disabled={isProcessing}>
              Log in
            </Button>
          </div>
          <div className='mt-3'>
            <SocialLoginButtonGroup
              isProcessing={isProcessing}
              setProcessing={setProcessing}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage
