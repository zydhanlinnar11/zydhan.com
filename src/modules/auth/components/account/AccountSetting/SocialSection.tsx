import React, { FC, useState } from 'react'
import Button from '@/common/components/elements/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { User } from '@/modules/auth/types/AccountSettingUser'
import { mutate } from 'swr'
import axios from 'axios'
import {
  faCircleExclamation,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
  user: User
}

const SocialSection: FC<Props> = ({ user }) => {
  const [success, setSuccess] = useState<string>('')
  const [error, setError] = useState<string>('')

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

  const handleUnlinkAccount = async (provider: 'google' | 'github') => {
    setSuccess('')
    setError('')
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/unlink-social/${provider}`,
        { withCredentials: true }
      )
      await mutate(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`)
      setSuccess(
        `Successfully unlink ${
          provider.charAt(0).toUpperCase() + provider.slice(1)
        } account.`
      )
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e
      setError(e.message)
    }
  }

  return (
    <div
      className='flex flex-col
border border-white/20 rounded px-6 py-5'
    >
      <h3 className='text-lg font-semibold'>Social Account</h3>
      <div className='h-px w-full bg-white/20 mt-3'></div>
      <div className='mt-5 flex flex-col gap-y-3'>
        {success && (
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
              {success}
            </span>
            <span
              className='flex justify-center items-center hover:cursor-pointer'
              onClick={() => setSuccess('')}
            >
              <FontAwesomeIcon
                className='my-0'
                icon={faCircleXmark}
                size={'sm'}
              />
            </span>
          </div>
        )}
        {error && (
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
              {error}
            </span>
            <span
              className='flex justify-center items-center hover:cursor-pointer'
              onClick={() => setError('')}
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
          <p className='my-auto'>Google</p>
          <div className='col-span-2'>
            {user.linkedAccount.google ? (
              <Button onClick={() => handleUnlinkAccount('google')}>
                <span className='flex justify-center items-center gap-x-2'>
                  <FontAwesomeIcon className='my-0' icon={faGoogle} /> Unlink
                  Google Account
                </span>
              </Button>
            ) : (
              <Button onClick={() => handleLinkAccount('google')}>
                <span className='flex justify-center items-center gap-x-2'>
                  <FontAwesomeIcon className='my-0' icon={faGoogle} /> Link
                  Google Account
                </span>
              </Button>
            )}
          </div>
        </div>

        <div className='grid grid-cols-3'>
          <p className='my-auto'>Github</p>
          <div className='col-span-2'>
            {user.linkedAccount.github ? (
              <Button onClick={() => handleUnlinkAccount('github')}>
                <span className='flex justify-center items-center gap-x-2'>
                  <FontAwesomeIcon className='my-0' icon={faGithub} /> Unlink
                  Github Account
                </span>
              </Button>
            ) : (
              <Button onClick={() => handleLinkAccount('github')}>
                <span className='flex justify-center items-center gap-x-2'>
                  <FontAwesomeIcon className='my-0' icon={faGithub} /> Link
                  Github Account
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialSection
