import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BlogConfig from '../config/BlogConfig'
import { useAuth } from '../providers/AuthProvider'
import Router from 'next/router'
import SpinnerLoading from '../components/SpinnerLoading'

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
      const loginStatus = await login(
        emailRef.current.value,
        passwordRef.current.value
      )

      if (!loginStatus.success) {
        setErrorMessage(loginStatus.message)
        setDisabledLogin(false)
        return
      }

      Router.push('/')
    } catch {
      setErrorMessage('Internal error. Please contact admin.')
      setDisabledLogin(false)
    }
  }

  useEffect(() => {
    if (isUserFetched && user) {
      Router.push('/')
      return
    }
  }, [isUserFetched, user])

  return (
    <div>
      <Head>
        <title>Login - {BlogConfig.BLOG_TITLE}</title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={`Login`} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      <Navbar />
      <main
        className='flex flex-col justify-center mx-auto'
        style={{
          minHeight: '75vh',
          maxWidth: '980px',
          paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
          paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
        }}
      >
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
                <div>
                  <label htmlFor='email' className='hidden' aria-hidden>
                    E-mail
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 rounded-t-md h-10 bg-transparent'
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.24)',
                        borderBottom: 'none',
                      }}
                      placeholder='E-mail'
                      autoComplete='username'
                      ref={emailRef}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='password' className='hidden' aria-hidden>
                    Password
                  </label>
                  <div className='relative rounded-md shadow-sm'>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 rounded-b-md h-10 bg-transparent'
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.24)',
                      }}
                      placeholder='Password'
                      autoComplete='current-password'
                      ref={passwordRef}
                    />
                  </div>
                </div>
                <div className='mt-1'>
                  <small>
                    Don't have account?{' '}
                    <Link href='/register'>
                      <a className='text-blue-400 hover:underline'>
                        Create an account
                      </a>
                    </Link>
                  </small>
                  <br />
                  <small className='text-red-500'>{errorMessage}</small>
                </div>
                <button
                  type='submit'
                  disabled={disabledLogin}
                  className='rounded-md border-2 border-opacity-50 border-gray-600 w-full h-10 mt-3 hover:bg-blue-600 hover:bg-opacity-30 transition-colors duration-100 focus:bg-blue-900 focus:bg-opacity-30 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed'
                >
                  Log in
                </button>
              </form>
            </div>
          </>
        ) : (
          <SpinnerLoading />
        )}
      </main>
      <Footer />
    </div>
  )
}
