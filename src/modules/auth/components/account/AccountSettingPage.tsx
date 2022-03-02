import Button from '@/common/components/elements/Button'
import PrivateRoute from '@/modules/auth/components/PrivateRoute'
import NarrowPageContainer from '@/common/components/elements/NarrowPageContainer'
import {
  faCircleArrowLeft,
  faCircleExclamation,
  faCircleXmark,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import TextInput from '@/common/components/elements/Form/TextInput'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import SpinnerLoading from '@/common/components/elements/SpinnerLoading'
import Header from '@/common/components/elements/Header'
import { FormEventHandler, useRef, useState } from 'react'

type User = {
  name: string
  email: string
  linkedAccount: {
    github: boolean
    google: boolean
  }
}

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data)

const AccountSettingPage = () => {
  const { mutate } = useSWRConfig()
  const { data, error } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
    fetcher
  )
  const [showAccountUpdateSuccess, setShowAccountUpdateSuccess] =
    useState<boolean>(false)
  const [accountUpdateError, setAccountUpdateError] = useState<string>('')
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const handleAccountChange: FormEventHandler<HTMLFormElement> = async (e) => {
    setShowAccountUpdateSuccess(false)
    setAccountUpdateError('')
    e.preventDefault()

    const name = nameRef.current?.value
    const email = emailRef.current?.value

    if (!name) {
      setAccountUpdateError('Name must be filled')
      return
    }
    if (!email) {
      setAccountUpdateError('Email must be filled')
      return
    }

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
        { name, email },
        {
          withCredentials: true,
        }
      )

      await mutate(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`)
      setShowAccountUpdateSuccess(true)
    } catch (e) {
      if (axios.isAxiosError(e)) setAccountUpdateError(e.message)
    }
  }

  const handleLinkAccount = (provider: 'google' | 'github') => {
    const width = 500
    const height = 400
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2.5

    const popup = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/redirect`,
      `Sign in with ${provider}`,
      `width=${width},height=${height},left=${left},top=${top}`
    )

    const interval = setInterval(() => {
      if (!popup || popup.closed) {
        interval && clearInterval(interval)
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`)
        return
      }
    }, 500)
  }

  return (
    <PrivateRoute>
      <NarrowPageContainer>
        {data && (
          <>
            <div className='w-full flex flex-col pb-10 gap-y-3 items-center sm:flex-row justify-between align-middle'>
              <h2 className='text-2xl'>Account Setting</h2>
              <div className='w-24 text-sm'>
                <Button onClick={() => window.history.back()}>
                  <FontAwesomeIcon
                    className='my-auto mr-2'
                    icon={faCircleArrowLeft}
                  ></FontAwesomeIcon>{' '}
                  Back
                </Button>
              </div>
            </div>
            <div className='flex flex-col gap-y-5 sm:flex-row sm:gap-x-5'>
              <div
                className='sm:w-64 sm:h-fit bg-gray-900 flex flex-col w-full
              border border-white/20 rounded p-6
              justify-center text-center gap-y-5 break-words text-ellipsis overflow-hidden'
              >
                <>
                  <FontAwesomeIcon icon={faCircleUser} size={'4x'} />
                  <div>
                    <p className='text-lg'>{data.name}</p>
                    <p className='text-sm text-gray-400'>{data.email}</p>
                  </div>
                </>
              </div>

              <div className='sm:w-full flex flex-col gap-y-5'>
                <div
                  className='flex flex-col
              border border-white/20 rounded px-6 py-5'
                >
                  <h3 className='text-lg font-semibold'>Account Information</h3>
                  <div className='h-px w-full bg-white/20 mt-3'></div>
                  <form
                    className='mt-5 flex flex-col gap-y-3'
                    onSubmit={handleAccountChange}
                  >
                    {showAccountUpdateSuccess && (
                      <div
                        className='flex justify-between gap-x-2 py-2 px-4 rounded-md
    text-green-400 bg-green-300/[0.15] mb-3'
                        role={'alert'}
                      >
                        <span className='flex justify-center items-center gap-x-2'>
                          <FontAwesomeIcon
                            className='my-0'
                            icon={faCircleExclamation}
                            size={'sm'}
                          />{' '}
                          Account updated successfully!
                        </span>
                        <span
                          className='flex justify-center items-center hover:cursor-pointer'
                          onClick={() => setShowAccountUpdateSuccess(false)}
                        >
                          <FontAwesomeIcon
                            className='my-0'
                            icon={faCircleXmark}
                            size={'sm'}
                          />
                        </span>
                      </div>
                    )}

                    {accountUpdateError && (
                      <div
                        className='flex justify-between gap-x-2 py-2 px-4 rounded-md
    text-red-400 bg-red-300/[0.15] mb-3'
                        role={'alert'}
                      >
                        <span className='flex justify-center items-center gap-x-2'>
                          <FontAwesomeIcon
                            className='my-0'
                            icon={faCircleExclamation}
                            size={'sm'}
                          />{' '}
                          {accountUpdateError}
                        </span>
                        <span
                          className='flex justify-center items-center hover:cursor-pointer'
                          onClick={() => setAccountUpdateError('')}
                        >
                          <FontAwesomeIcon
                            className='my-0'
                            icon={faCircleXmark}
                            size={'sm'}
                          />
                        </span>
                      </div>
                    )}
                    <div className='grid grid-cols-3'>
                      <div className='flex'>
                        <label className='my-auto' htmlFor='name'>
                          Name
                        </label>
                      </div>
                      <TextInput
                        className='col-span-2'
                        label='Name'
                        position='single'
                        name='name'
                        type={'text'}
                        reference={nameRef}
                        autoComplete={'name'}
                        defaultValue={data.name}
                      />
                    </div>

                    <div className='grid grid-cols-3'>
                      <div className='flex'>
                        <label className='my-auto' htmlFor='email'>
                          Email
                        </label>
                      </div>
                      <TextInput
                        className='col-span-2'
                        label='Email'
                        position='single'
                        name='email'
                        type={'text'}
                        reference={emailRef}
                        autoComplete={'email'}
                        defaultValue={data.email}
                      />
                    </div>

                    <div className='mt-3 flex sm:justify-end'>
                      <div className='w-full sm:w-1/3'>
                        <Button>
                          <span className='flex justify-center items-center gap-x-2'>
                            <FontAwesomeIcon
                              className='my-0'
                              icon={faFloppyDisk}
                            />{' '}
                            Save
                          </span>
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className='flex flex-col
              border border-white/20 rounded px-6 py-5'
                >
                  <h3 className='text-lg font-semibold'>Social Account</h3>
                  <div className='h-px w-full bg-white/20 mt-3'></div>
                  <div className='mt-5 flex flex-col gap-y-3'>
                    <div className='grid grid-cols-3'>
                      <p className='my-auto'>Google</p>
                      <div className='col-span-2'>
                        {data.linkedAccount.google ? (
                          <Button>
                            <span className='flex justify-center items-center gap-x-2'>
                              <FontAwesomeIcon
                                className='my-0'
                                icon={faGoogle}
                              />{' '}
                              Unlink Google Account
                            </span>
                          </Button>
                        ) : (
                          <Button onClick={() => handleLinkAccount('google')}>
                            <span className='flex justify-center items-center gap-x-2'>
                              <FontAwesomeIcon
                                className='my-0'
                                icon={faGoogle}
                              />{' '}
                              Link Google Account
                            </span>
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className='grid grid-cols-3'>
                      <p className='my-auto'>Github</p>
                      <div className='col-span-2'>
                        {data.linkedAccount.github ? (
                          <Button>
                            <span className='flex justify-center items-center gap-x-2'>
                              <FontAwesomeIcon
                                className='my-0'
                                icon={faGithub}
                              />{' '}
                              Unlink Github Account
                            </span>
                          </Button>
                        ) : (
                          <Button onClick={() => handleLinkAccount('github')}>
                            <span className='flex justify-center items-center gap-x-2'>
                              <FontAwesomeIcon
                                className='my-0'
                                icon={faGithub}
                              />{' '}
                              Link Github Account
                            </span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className='sm:col-span-3 flex flex-col
              border border-white/20 rounded px-6 py-5'
                >
                  <h3 className='text-lg font-semibold'>Change Password</h3>
                  <div className='h-px w-full bg-white/20 mt-3'></div>
                  <form className='mt-5 flex flex-col gap-y-3'>
                    <div className='grid grid-cols-3'>
                      <div className='flex'>
                        <label className='my-auto' htmlFor='current-password'>
                          Current password
                        </label>
                      </div>
                      <TextInput
                        className='col-span-2'
                        label='Current password'
                        position='single'
                        name='current-password'
                        type={'password'}
                        reference={null}
                        autoComplete={'current-password'}
                      />
                    </div>

                    <div className='grid grid-cols-3'>
                      <div className='flex'>
                        <label className='my-auto' htmlFor='new-password'>
                          New password
                        </label>
                      </div>
                      <TextInput
                        className='col-span-2'
                        label='New password'
                        position='single'
                        name='new-password'
                        type={'password'}
                        reference={null}
                        autoComplete={'new-password'}
                      />
                    </div>

                    <div className='grid grid-cols-3'>
                      <div className='flex'>
                        <label
                          className='my-auto'
                          htmlFor='confirm-new-password'
                        >
                          Confirm password
                        </label>
                      </div>
                      <TextInput
                        className='col-span-2'
                        label='Confirm new password'
                        position='single'
                        name='confirm-new-password'
                        type={'password'}
                        reference={null}
                        autoComplete={'new-password'}
                      />
                    </div>

                    <div className='mt-3 flex sm:justify-end'>
                      <div className='w-full sm:w-1/3'>
                        <Button>
                          <span className='flex justify-center items-center gap-x-2'>
                            <FontAwesomeIcon
                              className='my-0'
                              icon={faFloppyDisk}
                            />{' '}
                            Change password
                          </span>
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
        {!data && !error && (
          <div className='my-auto'>
            <SpinnerLoading />
          </div>
        )}
        {error && (
          <Header
            className='my-auto'
            midText='An error ocurred'
            bottomText='Please try again later.'
          />
        )}
      </NarrowPageContainer>
    </PrivateRoute>
  )
}

export default AccountSettingPage
