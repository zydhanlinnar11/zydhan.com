import Button from '@/common/components/elements/Button'
import TextInput from '@/common/components/elements/Form/TextInput'
import {
  faCircleExclamation,
  faCircleXmark,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { FC, FormEventHandler, useRef, useState } from 'react'
import { mutate } from 'swr'
import { User } from '@/modules/auth/types/AccountSettingUser'

type Props = {
  user: User
}

const InformationSection: FC<Props> = ({ user }) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [showAccountUpdateSuccess, setShowAccountUpdateSuccess] =
    useState<boolean>(false)
  const [accountUpdateError, setAccountUpdateError] = useState<string>('')
  const [isInProgress, setInProgress] = useState<boolean>(false)

  const handleAccountChange: FormEventHandler<HTMLFormElement> = async (e) => {
    setInProgress(true)
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
    } finally {
      setInProgress(false)
    }
  }

  return (
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
            defaultValue={user.name}
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
            defaultValue={user.email}
          />
        </div>

        <div className='mt-3 flex sm:justify-end'>
          <div className='w-full sm:w-1/3'>
            <Button disabled={isInProgress}>
              <span className='flex justify-center items-center gap-x-2'>
                <FontAwesomeIcon className='my-0' icon={faFloppyDisk} />{' '}
                {isInProgress ? 'Saving' : 'Save'}
              </span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default InformationSection
