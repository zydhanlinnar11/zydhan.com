import AnchorLink from '@/common/components/AnchorLink'
import Button from '@/common/components/Button'
import Input from '@/common/components/Form/Input'
import { useUserDispatch } from '@/common/providers/UserProvider'
import getBaseURL from '@/common/utils/GetBaseUrl'
import fetchUser from '@/modules/auth/utils/FetchUser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useRef, useState } from 'react'
import SocialLoginButtonGroup from '@/modules/auth/components/SocialLoginButtonGroup'
import GuestRoute from '../../GuestRoute'
import LoginHandler from './LoginHandler'

const LoginPage = () => {
  const userDispatch = useUserDispatch()
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setProcessing] = useState<boolean>(false)

  const nextPath = router.query['next']
  const registerPath = new URL(`${getBaseURL()}/auth/register`)
  if (typeof nextPath === 'string')
    registerPath.searchParams.append('next', nextPath)

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)
    LoginHandler(emailRef.current?.value, passwordRef.current?.value).finally(
      () =>
        fetchUser()
          .then((user) => userDispatch({ state: 'authenticated', user }))
          .finally(() => setProcessing(false))
    )
  }

  return (
    <GuestRoute>
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
          <Input
            type='email'
            name='email'
            placeholder='E-mail'
            autoComplete='username'
            position='top'
            ref={emailRef}
          />
          <Input
            type={'password'}
            name='password'
            placeholder='Password'
            autoComplete='current-password'
            position='bottom'
            ref={passwordRef}
          />
          <div className='mt-1'>
            <small>
              Don&apos;t have account?{' '}
              <AnchorLink href={registerPath.toString()}>
                Create an account
              </AnchorLink>
            </small>
            <br />
            <small>or</small>
            <br />
            <small>
              Forgot your password?{' '}
              <AnchorLink href='/auth/forgot-password'>
                Reset password
              </AnchorLink>
            </small>
            <br />
          </div>
          <div className='mt-3'>
            <Button type='submit' disabled={isProcessing}>
              Log in
            </Button>
          </div>
          <div className='mt-3'>
            <SocialLoginButtonGroup disabled={isProcessing} />
          </div>
        </form>
      </div>
    </GuestRoute>
  )
}

export default LoginPage