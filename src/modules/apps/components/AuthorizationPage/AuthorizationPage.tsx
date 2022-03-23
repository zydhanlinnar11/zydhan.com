import FullscreenLoading from '@/common/components/FullscreenLoading'
import { axiosAPI } from '@/common/utils/AxiosInstance'
import PrivateRoute from '@/modules/auth/components/PrivateRoute'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const AuthorizationPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    const response_type = router.query.response_type
    const app_id = router.query.app_id
    const redirect_uri = router.query.redirect_uri
    if (
      typeof app_id !== 'string' ||
      typeof redirect_uri !== 'string' ||
      response_type !== 'token'
    ) {
      router.replace('/400')
      return
    }

    axiosAPI
      .get(`/apps/create-token?app_id=${app_id}&redirect_uri=${redirect_uri}`)
      .then((res) => {
        const redirect = new URL(redirect_uri.replace('javascript:', ''))
        redirect.searchParams.append('token', res.data.token)
        router.push(redirect.toString())
      })
      .catch((e) => {
        if (!axios.isAxiosError(e) || e.response?.status !== 400)
          router.replace('/500')
        router.replace('/400')
      })
  }, [router.isReady])

  return (
    <PrivateRoute>
      <FullscreenLoading />
    </PrivateRoute>
  )
}

export default AuthorizationPage
