import { SocialMedia } from '@/auth/types/SocialMedia'
import { backendFetcher } from '@/common/hooks/useAxios'
import { FC, memo, useCallback } from 'react'
import socialLoginHandler from './SocialLoginHandler'

type Props = {
  socialMedia: SocialMedia
}

type ResponseData = {
  redirect_url: string
}

const SocialMediaLoginButton: FC<Props> = ({ socialMedia: { id, name } }) => {
  const handler = useCallback(async () => {
    const { data } = await backendFetcher.get<ResponseData>(
      `/auth/${id}/redirect`
    )
    socialLoginHandler(name, data.redirect_url, () => {})
  }, [id, name])

  return <button onClick={handler}>{name}</button>
}

export default memo(SocialMediaLoginButton)
