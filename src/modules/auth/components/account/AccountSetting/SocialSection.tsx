import React, { FC } from 'react'
import Button from '@/common/components/elements/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { User } from '@/modules/auth/types/AccountSettingUser'
import { mutate } from 'swr'

type Props = {
  user: User
}

const SocialSection: FC<Props> = ({ user }) => {
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
            {user.linkedAccount.google ? (
              <Button>
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
              <Button>
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
