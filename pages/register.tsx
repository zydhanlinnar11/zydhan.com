import AnchorLink from '@blog-components/AnchorLink'
import FullWidthButton from '@blog-components/Button/FullWidthButton'
import Input from '@blog-components/Forms/Input'
import HeadTemplate from '@blog-components/HeadTemplate'
import SmallErrorText from '@blog-components/SmallErrorText'
import SmallSuccessText from '@blog-components/SmallSuccessText'
import SocialLoginButtons from '@blog-components/SocialLoginButtons'
import SpinnerLoading from '@blog-components/SpinnerLoading'
import { useAuth } from '@blog-providers/AuthProvider'
import Router from 'next/router'
import { useEffect, useRef, useState } from 'react'

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
      Router.replace('/')
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
      <HeadTemplate title='Register'></HeadTemplate>
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
            <Input
              type={'text'}
              name='name'
              label='Name'
              autoComplete='name'
              position='top'
              reference={nameRef}
            />
            <Input
              type={'email'}
              name='email'
              label='E-mail'
              autoComplete='username'
              position='middle'
              reference={emailRef}
            />
            <Input
              type={'text'}
              name='username'
              label='Username'
              position='middle'
              reference={usernameRef}
            />
            <Input
              type={'password'}
              name='password'
              label='Password'
              autoComplete='new-password'
              position='middle'
              reference={passwordRef}
            />
            <Input
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
                <AnchorLink href='/login' text='Log in' />
              </small>
              <br />
              <SmallErrorText>{errorMessage}</SmallErrorText>
              <SmallSuccessText>{successMessage}</SmallSuccessText>
            </div>
            <FullWidthButton type='submit' disabled={disabledRegister}>
              Register
            </FullWidthButton>
            <SocialLoginButtons />
          </form>
        </div>
      ) : (
        <SpinnerLoading />
      )}
    </div>
  )
}
