import { backendFetcher } from '@/common/hooks/useAxios'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  CallbackErrorMessage,
  isCallbackErrorMessage,
} from '@/auth/types/CallbackErrorMessage'
import useSocialMediaList from './useSocialMediaList'

const useSocialMediaCallback = () => {
  const router = useRouter()
  const { socialMedia } = router.query
  const { socialMediaList } = useSocialMediaList()
  const [error, setError] = useState<CallbackErrorMessage>()

  useEffect(() => {
    if (!socialMedia || !socialMediaList || !router.isReady) return
    const filtered = socialMediaList.filter(({ id }) => id === socialMedia)
    if (typeof socialMedia !== 'string' || filtered.length === 0)
      throw Error('not_found')
    const query = router.query
    delete query.socialMedia

    const params = convertQueryToSearchParams(query)

    backendFetcher
      .get<{ message: string }>(
        `/api/auth/social-media/${socialMedia}/callback?${params.toString()}`
      )
      .then(() => {
        window.close()
      })
      .catch((e) => {
        const message = e.response?.data?.message
        if (!axios.isAxiosError(e) || !isCallbackErrorMessage(message)) throw e
        setError(message)
      })
  }, [socialMedia, socialMediaList, router.query, router.isReady])

  return { error }
}

export default useSocialMediaCallback
