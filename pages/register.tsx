import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SpinnerLoading from '../components/SpinnerLoading'
import BlogConfig from '../config/BlogConfig'
import { useAuth } from '../providers/AuthProvider'

export default function RegisterPage() {
  const usernameRef = useRef(null)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { register, isUserFetched, user } = useAuth()
  const [disabledRegister, setDisabledRegister] = useState(false)

  useEffect(() => {
    if (isUserFetched && user) {
      Router.push('/')
      return
    }
  }, [isUserFetched, user])

  async function registerHandler(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setDisabledRegister(true)

    try {
      const registerStatus = await register(
        usernameRef.current.value,
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value,
        confirmPasswordRef.current.value
      )
      if (!registerStatus.success) {
        setErrorMessage(registerStatus.message)
        return
      }
      setSuccessMessage(registerStatus.message)
    } catch (e) {
      setErrorMessage(e)
    } finally {
      setDisabledRegister(false)
    }
  }

  return (
    <div className='my-auto'>
      <Head>
        <title>Register - {BlogConfig.BLOG_TITLE}</title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={`Register`} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>

      {isUserFetched && !user ? (
        <div>
          <header className='text-center'>
            <h1 className='text-3xl font-semibold'>Register</h1>
            <p className='mt-3 text-gray-400'>Create new account</p>
          </header>
          <form
            className='text-center mt-5 max-w-xs mx-auto'
            method='POST'
            onSubmit={registerHandler}
          >
            <div>
              <label htmlFor='name' className='hidden' aria-hidden>
                Name
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 rounded-t-md h-10 bg-transparent'
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.24)',
                    borderBottom: 'none',
                  }}
                  placeholder='Name'
                  autoComplete='name'
                  ref={nameRef}
                />
              </div>
            </div>
            <div>
              <label htmlFor='email' className='hidden' aria-hidden>
                E-mail
              </label>
              <div className='relative rounded-md shadow-sm'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 h-10 bg-transparent'
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
              <label htmlFor='username' className='hidden' aria-hidden>
                Username
              </label>
              <div className='relative rounded-md shadow-sm'>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 h-10 bg-transparent'
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.24)',
                    borderBottom: 'none',
                  }}
                  placeholder='Username'
                  ref={usernameRef}
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
                  className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 h-10 bg-transparent'
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.24)',
                    borderBottom: 'none',
                  }}
                  placeholder='Password'
                  autoComplete='new-password'
                  ref={passwordRef}
                />
              </div>
            </div>
            <div>
              <label htmlFor='password' className='hidden' aria-hidden>
                Confirm Password
              </label>
              <div className='relative rounded-md shadow-sm'>
                <input
                  type='password'
                  name='password'
                  id='confirm-password'
                  className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 rounded-b-md h-10 bg-transparent'
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.24)',
                  }}
                  placeholder='Confirm Password'
                  autoComplete='new-password'
                  ref={confirmPasswordRef}
                />
              </div>
            </div>
            <div className='mt-1'>
              <small>
                Already have an account?{' '}
                <Link href='/login'>
                  <a className='text-blue-400 hover:underline'>Log in</a>
                </Link>
              </small>
              <br />
              <small className='text-red-500'>{errorMessage}</small>
              <small className='text-green-500'>{successMessage}</small>
            </div>
            <button
              type='submit'
              disabled={disabledRegister}
              className='rounded-md border-2 border-opacity-50 border-gray-600 w-full h-10 mt-3 hover:bg-blue-600 hover:bg-opacity-30 transition-colors duration-100 focus:bg-blue-900 focus:bg-opacity-30 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed'
            >
              Register
            </button>
          </form>
        </div>
      ) : (
        <SpinnerLoading />
      )}
    </div>
  )
}
