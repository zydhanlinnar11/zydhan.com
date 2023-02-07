import { SocialMedia } from '@/auth/types/SocialMedia'
import { backendFetcher } from '@/common/hooks/useAxios'
import { Button } from '@chakra-ui/react'
import { FC, memo, useCallback } from 'react'
import socialLoginHandler from './SocialLoginHandler'

type Props = {
  socialMedia: SocialMedia
}

const SocialMediaLoginButton: FC<Props> = ({ socialMedia: { id, name } }) => {
  const handler = useCallback(async () => {
    socialLoginHandler(name, `/api/auth/social-media/${id}/redirect`, () => {})
  }, [id, name])

  return (
    <Button onClick={handler} w={'full'}>
      Log in using {name}
    </Button>
  )
}

export default memo(SocialMediaLoginButton)
