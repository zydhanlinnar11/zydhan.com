import useSWR from 'swr'
import { getProviders } from 'next-auth/react'

const useSocialMediaList = () => {
  const { data, error, isLoading } = useSWR(
    '/api/auth/providers',
    async (arg) => {
      // @ts-ignore
      const providers = Object.values(await getProviders())
      return providers
    }
  )

  return { socialMedia: data, error, isLoading }
}

export default useSocialMediaList
