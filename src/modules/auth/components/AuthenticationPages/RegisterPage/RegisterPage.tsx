import AnchorLink from '@/common/components/AnchorLink'
import Button from '@/common/components/Button'
import Input from '@/common/components/Form/Input'
import Head from 'next/head'
import { FormEventHandler, useRef, useState } from 'react'
import SocialLoginButtonGroup from '@/modules/auth/components/SocialLoginButtonGroup'
import GuestRoute from '../../GuestRoute'
import registerHandler from './registerHandler'
import useNextPath from '@/modules/auth/hooks/useNextPath'
import axios from 'axios'
import { toast } from 'react-toastify'

const RegisterPage = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const [isProcessing, setProcessing] = useState<boolean>(false)
  const nextPath = useNextPath()

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)

    try {
      await registerHandler(
        nameRef.current?.value,
        emailRef.current?.value,
        passwordRef.current?.value,
        confirmPasswordRef.current?.value
      )
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
          <Input
            type='text'
            placeholder='Name'
            autoComplete='name'
            position='top'
            ref={nameRef}
          />
          <Input
            type='email'
            name='email'
            placeholder='E-mail'
            autoComplete='username'
            position='middle'
            ref={emailRef}
          />
          <Input
            type='password'
            placeholder='Password'
            autoComplete='new-password'
            position='middle'
            ref={passwordRef}
          />
          <Input
            type='password'
            placeholder='Confirm Password'
            autoComplete='new-password'
            position='bottom'
            ref={confirmPasswordRef}
          />
          <div className='mt-1'>
            <small>
              Already have an account?{' '}
              <AnchorLink
                href={
                  '/auth/login' +
                  (nextPath && `?next=${encodeURIComponent(nextPath)}`)
                }
              >
                Log in
              </AnchorLink>
            </small>
            <br />
          </div>
          <div className='mt-3'>
            <Button type='submit' disabled={isProcessing}>
              Register
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

export default RegisterPage
