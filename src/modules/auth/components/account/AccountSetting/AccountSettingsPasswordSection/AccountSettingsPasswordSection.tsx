import React, { FormEventHandler, useRef, useState } from 'react'
import Input from '@/common/components/Form/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@/common/components/Button'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useUserDispatch } from '@/common/providers/UserProvider'

const AccountSettingsPasswordSection = () => {
  const [isInProgress, setInProgress] = useState<boolean>(false)
  const currentPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordConfirmationRef = useRef<HTMLInputElement>(null)
  const userDispatch = useUserDispatch()

  const handleChangePassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setInProgress(true)
    try {
      if (!currentPasswordRef.current?.value) {
        toast.error('Current password must be filled', { theme: 'dark' })
        return
      }
      if (!newPasswordRef.current?.value) {
        toast.error('New password must be filled', { theme: 'dark' })
        return
      }
      if (
        newPasswordRef.current.value !==
        newPasswordConfirmationRef.current?.value
      ) {
        toast.error('Password confirmation must be match', { theme: 'dark' })
        return
      }
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/change-password`,
        {
          current_password: currentPasswordRef.current.value,
          new_password: newPasswordRef.current.value,
          new_password_confirmation: newPasswordConfirmationRef.current.value,
        },
        {
          withCredentials: true,
        }
      )
      toast.success('Password changed successfully', { theme: 'dark' })
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e
      if (e.response?.status === 401) userDispatch({ state: 'unauthenticated' })
      toast.error(e.response?.data?.message || 'Failed to change password', {
        theme: 'dark',
      })
    } finally {
      setInProgress(false)
    }
  }

  return (
    <div
      className="sm:col-span-3 flex flex-col
  border border-white/20 rounded px-6 py-5"
    >
      <h3 className="text-lg font-semibold">Change Password</h3>
      <div className="h-px w-full bg-white/20 mt-3"></div>
      <form
        className="mt-5 flex flex-col gap-y-3"
        onSubmit={handleChangePassword}
      >
        <div className="grid grid-cols-3">
          <div className="flex">
            <label className="my-auto" htmlFor="current_password">
              Current password
            </label>
          </div>
          <Input
            className="col-span-2"
            placeholder="Current password"
            position="single"
            type="password"
            ref={currentPasswordRef}
            autoComplete="current-password"
          />
        </div>

        <div className="grid grid-cols-3">
          <div className="flex">
            <label className="my-auto" htmlFor="new_password">
              New password
            </label>
          </div>
          <Input
            className="col-span-2"
            placeholder="New password"
            position="single"
            type="password"
            ref={newPasswordRef}
            autoComplete="new-password"
          />
        </div>

        <div className="grid grid-cols-3">
          <div className="flex">
            <label className="my-auto" htmlFor="new_password_confirmation">
              Confirm password
            </label>
          </div>
          <Input
            className="col-span-2"
            placeholder="Confirm password"
            position="single"
            type={'password'}
            ref={newPasswordConfirmationRef}
            autoComplete="new-password"
          />
        </div>

        <div className="mt-3 flex sm:justify-end">
          <div className="w-full sm:w-1/3">
            <Button type="submit" disabled={isInProgress}>
              <span className="flex justify-center items-center gap-x-2">
                <FontAwesomeIcon className="my-0" icon={faFloppyDisk} />
                {isInProgress ? 'Saving' : 'Change password'}
              </span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AccountSettingsPasswordSection
