import useSWR from 'swr'
import { getProviders } from 'next-auth/react'

const useSocialMediaList = () => {
  const { data } = useSWR('/api/auth/providers', async (arg) => {
    // @ts-ignore
    const providers = Object.values(await getProviders())
    return providers
  })

  return data ?? []
}

export default useSocialMediaList
