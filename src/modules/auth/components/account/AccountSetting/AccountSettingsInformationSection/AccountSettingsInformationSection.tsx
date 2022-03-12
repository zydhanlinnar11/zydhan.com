import Button from '@/common/components/Button'
import Input from '@/common/components/Form/Input'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, FormEventHandler, useEffect, useRef, useState } from 'react'
import { mutate } from 'swr'
import { User } from '@/modules/auth/types/AccountSettingUser'
import fetchUser from '@/modules/auth/utils/FetchUser'
import { useUserDispatch } from '@/common/providers/UserProvider'
import { toast } from 'react-toastify'
import axios from 'axios'

type Props = {
  user: User
}

const AccountSettingsInformationSection: FC<Props> = ({ user }) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [isInProgress, setInProgress] = useState<boolean>(false)
  const userDispatch = useUserDispatch()

  const handleAccountChange: FormEventHandler<HTMLFormElement> = async (e) => {
    setInProgress(true)
    e.preventDefault()

    try {
      const name = nameRef.current?.value
      const email = emailRef.current?.value
      if (!name) {
        toast.error('Name must be filled', {
          theme: 'dark',
        })
        return
      }
      if (!email) {
        toast.error('Email must be filled', {
          theme: 'dark',
        })
        return
      }

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
        { name, email },
        {
          withCredentials: true,
        }
      )

      const user = await fetchUser()
      userDispatch({ state: 'authenticated', user })

      await mutate(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`)
      toast.success('Successfully update account information!', {
        theme: 'dark',
      })
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e
      toast.error(e.response?.data?.message || 'Failed to change password', {
        theme: 'dark',
      })
    } finally {
      setInProgress(false)
    }
  }

  return (
    <div
      className="flex flex-col
border border-white/20 rounded px-6 py-5"
    >
      <h3 className="text-lg font-semibold">Account Information</h3>
      <div className="h-px w-full bg-white/20 mt-3"></div>
      <form
        className="mt-5 flex flex-col gap-y-3"
        onSubmit={handleAccountChange}
      >
        <div className="grid grid-cols-3">
          <div className="flex">
            <label className="my-auto" htmlFor="name">
              Name
            </label>
          </div>
          <Input
            className="col-span-2"
            placeholder="Name"
            position="single"
            type="text"
            ref={nameRef}
            autoComplete="name"
            defaultValue={user.name}
          />
        </div>

        <div className="grid grid-cols-3">
          <div className="flex">
            <label className="my-auto" htmlFor="email">
              Email
            </label>
          </div>
          <Input
            className="col-span-2"
            placeholder="Email"
            position="single"
            type="text"
            ref={emailRef}
            autoComplete="email"
            defaultValue={user.email}
          />
        </div>

        <div className="mt-3 flex sm:justify-end">
          <div className="w-full sm:w-1/3">
            <Button disabled={isInProgress}>
              <span className="flex justify-center items-center gap-x-2">
                <FontAwesomeIcon className="my-0" icon={faFloppyDisk} />{' '}
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
