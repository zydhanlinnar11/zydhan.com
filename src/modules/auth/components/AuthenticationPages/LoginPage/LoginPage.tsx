import AnchorLink from '@/common/components/AnchorLink'
import Button from '@/common/components/Button'
import Input from '@/common/components/Form/Input'
import { useUserDispatch } from '@/common/providers/UserProvider'
import fetchUser from '@/modules/auth/utils/FetchUser'
import Head from 'next/head'
import { FormEventHandler, useRef, useState } from 'react'
import SocialLoginButtonGroup from '@/modules/auth/components/SocialLoginButtonGroup'
import GuestRoute from '../../GuestRoute'
import loginHandler from './loginHandler'
import useNextPath from '@/modules/auth/hooks/useNextPath'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setProcessing] = useState<boolean>(false)

  const userDispatch = useUserDispatch()
  const nextPath = useNextPath()

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)
    try {
      await loginHandler(emailRef.current?.value, passwordRef.current?.value)
      const user = await fetchUser()
      userDispatch({ state: 'authenticated', user })
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e
      toast.error(e.response?.data?.message || e.message, {
        theme: 'dark',
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <GuestRoute>
      <Head>
        <title>Login - zydhan.com</title>
        <meta property="og:title" content="Login - zydhan.com" />
        <meta property="og:url" content="https://zydhan.com/auth/login" />
        <meta property="og:description" content="Log in to your account" />
      </Head>
      <div className="grow flex flex-col items-center justify-center">
        <header className="text-center">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Log in to your account
          </p>
        </header>
        <form
          className="text-center mt-5 max-w-xs mx-auto"
          method="POST"
          onSubmit={submitHandler}
        >
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            autoComplete="username"
            position="top"
            ref={emailRef}
          />
          <Input
            type={'password'}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            position="bottom"
            ref={passwordRef}
          />
          <div className="mt-1">
            <small>
              Don&apos;t have account?{' '}
              <AnchorLink
                href={
                  '/auth/register' +
                  (nextPath && `?next=${encodeURIComponent(nextPath)}`)
                }
              >
                Create an account
              </AnchorLink>
            </small>
            <br />
            <small>or</small>
            <br />
            <small>
              Forgot your password?{' '}
              <AnchorLink href="/auth/forgot-password">
                Reset password
              </AnchorLink>
            </small>
            <br />
          </div>
          <div className="mt-3">
            <Button type="submit" disabled={isProcessing}>
              Log in
            </Button>
          </div>
          <div className="mt-3">
            <SocialLoginButtonGroup disabled={isProcessing} />
          </div>
        </form>
      </div>
    </GuestRoute>
  )
}

export default LoginPage
