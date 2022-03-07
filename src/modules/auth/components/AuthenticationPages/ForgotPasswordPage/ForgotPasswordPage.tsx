import Button from '@/common/components/Button'
import Input from '@/common/components/Form/Input'
import Head from 'next/head'
import React, { FormEventHandler, useRef, useState } from 'react'
import GuestRoute from '../../GuestRoute'
import ForgotPasswordHandler from './ForgotPasswordHandler'

const ForgotPasswordPage = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setProcessing] = useState<boolean>(false)

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)
    ForgotPasswordHandler(emailRef.current?.value).finally(() =>
      setProcessing(false)
    )
  }

  return (
    <GuestRoute>
      <Head>
        <title>Forgot Password - zydhan.xyz</title>
        <meta property='og:title' content='Forgot Password - zydhan.xyz' />
        <meta
          property='og:url'
          content='https://zydhan.xyz/auth/forgot-password'
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
          <Input
            type='email'
            name='email'
            placeholder='E-mail'
            autoComplete='username'
            position='single'
            ref={emailRef}
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

export default ForgotPasswordPage
