import { backendFetcher } from '@/common/hooks/useAxios'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSocialMediaList from './useSocialMediaList'

const useSocialMediaCallback = () => {
  const router = useRouter()
  const { socialMedia } = router.query
  const { socialMediaList } = useSocialMediaList()

  useEffect(() => {
    if (!socialMedia || !socialMediaList) return
    const filtered = socialMediaList.filter(({ id }) => id === socialMedia)
    if (typeof socialMedia !== 'string' || filtered.length === 0)
      throw Error('not_found')
    const query = router.query
    delete query.socialMedia

    const params = convertQueryToSearchParams(query)

    backendFetcher
      .get<{ message: string }>(
        `/auth/${socialMedia}/callback?${params.toString()}`
      )
      .then(() => {
        window.close()
      })
  }, [socialMedia, socialMediaList])
}

export default useSocialMediaCallback
