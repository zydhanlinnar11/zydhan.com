import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import Router from 'next/router'
import SpinnerLoading from '../components/SpinnerLoading'
import FullWidthButton from '../components/Button/FullWidthButton'
import Input from '../components/Forms/Input'
import AnchorLink from '../components/AnchorLink'
import HeadTemplate from '../components/HeadTemplate'
import SmallErrorText from '../components/SmallErrorText'

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
      <HeadTemplate title='Login'></HeadTemplate>
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
                  Don&apos;t have account?{' '}
                  <AnchorLink href='/register' text='Create an account' />
                </small>
                <br />
                <SmallErrorText>{errorMessage}</SmallErrorText>
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
