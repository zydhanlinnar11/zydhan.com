import FullscreenLoading from '@/common/components/FullscreenLoading'
import Modal from '@/common/components/Modal'
import { useUserDispatch } from '@/common/providers/UserProvider'
import PrivateRoute from '@/modules/auth/components/PrivateRoute'
import logout from '@/modules/auth/utils/Logout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

const LogoutPage = () => {
  const [isModalShowed, setModalShowed] = useState(true)
  const userDispatch = useUserDispatch()
  const router = useRouter()

  const logoutHandler = async () => {
    setModalShowed(false)
    try {
      await logout()
      await router.push('/')
      toast.success('Successfully logged out!', {
        theme: 'dark',
      })
      userDispatch({ state: 'unauthenticated' })
    } catch (e) {
      toast.error('Failed to log out!', {
        theme: 'dark',
      })
    }
  }

  const cancelLogout = () => {
    setModalShowed(false)
    try {
      router.push(new URL(`${router.query['from']}`).toString())
    } catch (e) {
      router.push('/')
    }
  }

  return (
    <>
      <Head>
        <title>Log out - zydhan.xyz</title>
      </Head>
      <PrivateRoute>
        <Modal
          title='Log out'
          bodyText='Are you sure want to log out?'
          isShowed={isModalShowed}
          handleClose={cancelLogout}
          action={{ handler: logoutHandler, text: 'Log out', type: 'danger' }}
        />
        <FullscreenLoading />
      </PrivateRoute>
    </>
  )
}

export default LogoutPage
