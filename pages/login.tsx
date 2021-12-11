import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import BlogConfig from '../config/BlogConfig'
import { useAuth } from '../providers/AuthProvider'
import Router from 'next/router'
import SpinnerLoading from '../components/SpinnerLoading'
import FullWidthButton from '../components/Button/FullWidthButton'
import Input from '../components/Forms/Input'
import AnchorLink from '../components/AnchorLink'

export default function LoginPage() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState('')
  const { login, isUserFetched, user } = useAuth()
  const [disabledLogin, setDisabledLogin] = useState(false)

  async function loginHandler(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')
    setDisabledLogin(true)

    try {
      const email: string = emailRef.current.value
      const password: string = passwordRef.current.value

      const loginStatus = await login(email, password)

      if (!loginStatus.success) {
        setErrorMessage(loginStatus.message)
        setDisabledLogin(false)
        return
      }

      Router.replace('/')
    } catch (e) {
      setErrorMessage(e)
      setDisabledLogin(false)
    }
  }

  useEffect(() => {
    if (isUserFetched && user) {
      Router.replace('/')
      return
    }
  }, [isUserFetched, user])

  return (
    <div className='my-auto'>
      <Head>
        <title>Login - {BlogConfig.BLOG_TITLE}</title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={`Login`} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      {isUserFetched && !user ? (
        <>
          <div>
            <header className='text-center'>
              <h1 className='text-3xl font-semibold'>Login</h1>
              <p className='mt-3 text-gray-400'>Log in to your account</p>
            </header>
            <form
              className='text-center mt-5 max-w-xs mx-auto'
              method='POST'
              onSubmit={loginHandler}
            >
              <Input
                type={'email'}
                name='email'
                label='E-mail'
                autoComplete='username'
                position='top'
                reference={emailRef}
              />
              <Input
                type={'password'}
                name='password'
                label='Password'
                autoComplete='current-password'
                position='bottom'
                reference={passwordRef}
              />
              <div className='mt-1'>
                <small>
                  Don't have account?{' '}
                  <AnchorLink href='/register' text='Create an account' />
                </small>
                <br />
                <small className='text-red-500'>{errorMessage}</small>
              </div>
              <FullWidthButton type='submit' disabled={disabledLogin}>
                Log in
              </FullWidthButton>
            </form>
          </div>
        </>
      ) : (
        <SpinnerLoading />
      )}
    </div>
  )
}
