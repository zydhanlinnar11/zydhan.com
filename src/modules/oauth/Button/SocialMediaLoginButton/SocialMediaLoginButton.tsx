import { SocialMedia } from '@/common/types/SocialMedia'
import { Button } from '@chakra-ui/react'
import { FC, memo, useCallback } from 'react'
import socialLoginHandler from './SocialLoginHandler'

type Props = {
  socialMedia: SocialMedia
}

const SocialMediaLoginButton: FC<Props> = ({ socialMedia: { id, name } }) => {
  const handler = useCallback(async () => {
    socialLoginHandler(name, `/api/oauth/social-media/${id}/redirect`, () => {})
  }, [id, name])

  return (
    <Button onClick={handler} w={'full'}>
      Log in using {name}
    </Button>
  )
}

export default memo(SocialMediaLoginButton)
