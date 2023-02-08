import { Button } from '@chakra-ui/react'
import { ClientSafeProvider, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, memo, useCallback } from 'react'

type Props = {
  socialMedia: ClientSafeProvider
}

const SocialMediaLoginButton: FC<Props> = ({ socialMedia: { id, name } }) => {
  const { query } = useRouter()

  const handler = useCallback(async () => {
    signIn(id, {
      callbackUrl: typeof query.redirect === 'string' ? query.redirect : '/',
    })
  }, [id, query.redirect])

  return (
    <Button onClick={handler} w={'full'}>
      Log in using {name}
    </Button>
  )
}

export default memo(SocialMediaLoginButton)
