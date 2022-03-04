import AnchorLink from '@/common/components/elements/AnchorLink'
import Button from '@/common/components/elements/Button'
import TextInput from '@/common/components/elements/Form/TextInput'
import getBaseURL from '@/common/utils/GetBaseUrl'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useRef, useState } from 'react'
import SocialLoginButtonGroup from '@/modules/auth/components/SocialLoginButtonGroup'
import AuthenticationPages from '../AuthenticationPages'
import RegisterHandler from './RegisterHandler'

const RegisterPage = () => {
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setProcessing] = useState<boolean>(false)

  const nextPath = router.query['next']
  const loginPath = new URL(`${getBaseURL()}/auth/login`)
  if (typeof nextPath === 'string')
    loginPath.searchParams.append('next', nextPath)

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setProcessing(true)
    RegisterHandler(
      nameRef.current?.value,
      emailRef.current?.value,
      passwordRef.current?.value,
      confirmPasswordRef.current?.value
    ).finally(() => setProcessing(false))
  }

  return (
    <AuthenticationPages>
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
          <TextInput
            type={'text'}
            name='name'
            label='Name'
            autoComplete='name'
            position='top'
            reference={nameRef}
          />
          <TextInput
            type={'email'}
            name='email'
            label='E-mail'
            autoComplete='username'
            position='middle'
            reference={emailRef}
          />
          <TextInput
            type={'password'}
            name='password'
            label='Password'
            autoComplete='new-password'
            position='middle'
            reference={passwordRef}
          />
          <TextInput
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
              <AnchorLink href={loginPath.toString()}>Log in</AnchorLink>
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
    </AuthenticationPages>
  )
}

export default RegisterPage
