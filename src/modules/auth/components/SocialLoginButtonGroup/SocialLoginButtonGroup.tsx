import Button from '@/common/components/elements/Button'
import { useUserDispatch } from '@/common/providers/UserProvider'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import SocialProvider from '@/modules/auth/types/SocialProvider'
import socialLoginHandler from './SocialLoginHandler'
import fetchUser from '../../utils/FetchUser'

type Props = {
  disabled: boolean
}

const SocialLoginButtonGroup: FC<Props> = ({ disabled }) => {
  const userDispatch = useUserDispatch()

  const clickHandler = (provider: SocialProvider) => {
    userDispatch({ type: 'LOADING' })
    socialLoginHandler(provider, () => {
      fetchUser()
        .then((user) => userDispatch({ type: 'USER_AUTHENTICATED', user }))
        .catch(() => userDispatch({ type: 'USER_UNAUTHENTICATED' }))
    })
  }

  return (
    <div className='flex flex-col gap-3'>
      <Button
        type='button'
        disabled={disabled}
        onClick={() => clickHandler('google')}
      >
        <span className='flex justify-center items-center gap-x-2'>
          <FontAwesomeIcon className='my-0' icon={faGoogle} /> Log in with
          Google
        </span>
      </Button>
      <Button
        type='button'
        disabled={disabled}
        onClick={() => clickHandler('github')}
      >
        <span className='flex justify-center items-center gap-x-2'>
          <FontAwesomeIcon className='my-0' icon={faGithub} /> Log in with
          Github
        </span>
      </Button>
    </div>
  )
}

export default SocialLoginButtonGroup
