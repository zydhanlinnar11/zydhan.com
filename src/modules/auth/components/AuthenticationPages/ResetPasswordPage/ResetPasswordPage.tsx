import Button from '@/common/components/elements/Button'
import Input from '@/common/components/elements/Form/Input'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useRef, useState } from 'react'
import ResetPasswordHandler from './ResetPasswordHandler'
import GuestRoute from '../../GuestRoute'

const ResetPasswordPage = () => {
  const router = useRouter()
  const tokenRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmationRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setProcessing] = useState<boolean>(false)

  const token = router.query['token']
  const email = router.query['email']

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)
    ResetPasswordHandler(
      emailRef.current?.value,
      passwordRef.current?.value,
      passwordConfirmationRef.current?.value,
      tokenRef.current?.value
    ).finally(() => setProcessing(false))
  }

  return (
    <GuestRoute>
      <Head>
        <title>Reset Password - zydhan.xyz</title>
        <meta property='og:title' content='Reset Password - zydhan.xyz' />
        <meta
          property='og:url'
          content='https://zydhan.xyz/auth/reset-password'
        />
        <meta property='og:description' content='Reset your account password' />
      </Head>
      <div className='grow flex flex-col items-center justify-center'>
        <header className='text-center'>
          <h1 className='text-3xl font-semibold'>Reset password</h1>
          <p className='mt-3 text-gray-400'>Reset your account password</p>
        </header>
        <form
          className='text-center mt-5 max-w-xs mx-auto'
          method='POST'
          onSubmit={submitHandler}
        >
          <Input type='hidden' defaultValue={`${token}`} ref={tokenRef} />
          <Input
            type='hidden'
            defaultValue={`${email}`}
            ref={emailRef}
            autoComplete='username'
          />
          <Input
            type={'password'}
            name='password'
            placeholder='Password'
            autoComplete='new-password'
            position='top'
            ref={passwordRef}
          />
          <Input
            type={'password'}
            name='password_confirmation'
            placeholder='Password Confirmation'
            autoComplete='new-password'
            position='bottom'
            ref={passwordConfirmationRef}
          />
          <div className='mt-3'>
            <Button type='submit' disabled={isProcessing}>
              Reset password
            </Button>
          </div>
        </form>
      </div>
    </GuestRoute>
  )
}

export default ResetPasswordPage
