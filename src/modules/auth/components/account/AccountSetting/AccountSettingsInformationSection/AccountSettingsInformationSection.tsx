import Button from '@/common/components/elements/Button'
import TextInput from '@/common/components/elements/Form/TextInput'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, FormEventHandler, useEffect, useRef, useState } from 'react'
import { mutate } from 'swr'
import { User } from '@/modules/auth/types/AccountSettingUser'
import fetchUser from '@/modules/auth/utils/FetchUser'
import handleInformationChange from './HandleInformationChange'
import { useUserDispatch } from '@/common/providers/UserProvider'
import { toast } from 'react-toastify'
import handleError from './HandleError'

type Props = {
  user: User
}

const AccountSettingsInformationSection: FC<Props> = ({ user }) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [isInProgress, setInProgress] = useState<boolean>(false)
  const userDispatch = useUserDispatch()
  const [mounted, setMounted] = useState<boolean>(true)

  useEffect(() => () => setMounted(false), [])

  const handleAccountChange: FormEventHandler<HTMLFormElement> = (e) => {
    setInProgress(true)
    e.preventDefault()
    handleInformationChange(nameRef.current?.value, emailRef.current?.value)
      .then(() => {
        const updateUserData = async () => {
          const user = await fetchUser()
          userDispatch({ state: 'authenticated', user })

          await mutate(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`)
          toast.success('Successfully update account information!', {
            theme: 'dark',
          })
        }
        if (mounted) updateUserData()
      })
      .catch(handleError)
      .finally(() => setInProgress(false))
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

export default AccountSettingsInformationSection
