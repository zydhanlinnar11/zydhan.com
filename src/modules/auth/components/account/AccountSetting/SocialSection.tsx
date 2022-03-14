import React, { FC, MouseEventHandler, useState } from 'react'
import Button from '@/common/components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import Modal from '@/common/components/Modal'
import { toast } from 'react-toastify'
import User from '@/modules/auth/types/User'
import fetchUser from '@/modules/auth/utils/FetchUser'
import { useUserDispatch } from '@/common/providers/UserProvider'
import { axiosAPI } from '@/common/utils/AxiosInstance'

type Props = {
  user: User
}

const SocialSection: FC<Props> = ({ user }) => {
  const userDispatch = useUserDispatch()
  const [isUnlinkModalShowed, setUnlinkModalShowed] = useState<boolean>(false)
  const [isUnlinkModalProviderName, setUnlinkModalProviderName] =
    useState<string>('')
  const [unlinkModalAction, setUnlinkModalAction] = useState<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    return () => {}
  })

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
        fetchUser().catch((e) => {
          if (!axios.isAxiosError(e)) return
          if (e.response?.status === 401)
            userDispatch({ state: 'unauthenticated' })
        })
        return
      }
    }, 500)
  }

  const handleUnlinkAccount = async (provider: 'google' | 'github') => {
    try {
      await axiosAPI.delete(`/auth/user/unlink-social/${provider}`)
      await fetchUser()
      toast.success(
        `Successfully unlink ${
          provider.charAt(0).toUpperCase() + provider.slice(1)
        } account.`,
        { theme: 'dark' }
      )
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e
      if (e.response?.status === 401) userDispatch({ state: 'unauthenticated' })
      toast.error(e.response?.data?.message || 'Failed to change password', {
        theme: 'dark',
      })
    }
  }

  const showUnlinkModal = (provider: 'google' | 'github') => {
    setUnlinkModalProviderName(
      provider.charAt(0).toUpperCase() + provider.slice(1)
    )
    setUnlinkModalShowed(true)
    setUnlinkModalAction(() => {
      return async () => {
        await handleUnlinkAccount(provider)
        setUnlinkModalShowed(false)
      }
    })
  }

  return (
    <>
      <Modal
        bodyText={`Are you sure want to unlink your ${isUnlinkModalProviderName} account?`}
        title={`Unlink ${isUnlinkModalProviderName}`}
        handleClose={() => {
          setUnlinkModalShowed(false)
        }}
        isShowed={isUnlinkModalShowed}
        action={{ handler: unlinkModalAction, text: 'Unlink', type: 'danger' }}
      />
      <div
        className="flex flex-col
border border-white/20 rounded px-6 py-5"
      >
        <h3 className="text-lg font-semibold">Social Account</h3>
        <div className="h-px w-full bg-white/20 mt-3"></div>
        <div className="mt-5 flex flex-col gap-y-3">
          <div className="grid grid-cols-3">
            <p className="my-auto">Google</p>
            <div className="col-span-2">
              {user.linkedAccount.google ? (
                <Button onClick={() => showUnlinkModal('google')}>
                  <span className="flex justify-center items-center gap-x-2">
                    <FontAwesomeIcon className="my-0" icon={faGoogle} /> Unlink
                    Google Account
                  </span>
                </Button>
              ) : (
                <Button onClick={() => handleLinkAccount('google')}>
                  <span className="flex justify-center items-center gap-x-2">
                    <FontAwesomeIcon className="my-0" icon={faGoogle} /> Link
                    Google Account
                  </span>
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3">
            <p className="my-auto">Github</p>
            <div className="col-span-2">
              {user.linkedAccount.github ? (
                <Button onClick={() => showUnlinkModal('github')}>
                  <span className="flex justify-center items-center gap-x-2">
                    <FontAwesomeIcon className="my-0" icon={faGithub} /> Unlink
                    Github Account
                  </span>
                </Button>
              ) : (
                <Button onClick={() => handleLinkAccount('github')}>
                  <span className="flex justify-center items-center gap-x-2">
                    <FontAwesomeIcon className="my-0" icon={faGithub} /> Link
                    Github Account
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SocialSection
