import Button from '@/common/components/elements/Button'
import { useUserState } from '@/common/providers/UserProvider'
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Dispatch, FC, SetStateAction } from 'react'

type Props = {
  disabled: boolean
}

const SocialLoginButtonGroup: FC<Props> = ({ disabled }) => {
  const userState = useUserState()

  if (userState.state === 'unauthenticated')
    return (
      <div className='flex flex-col gap-3'>
        <Button
          type='button'
          disabled={disabled}
          onClick={() => userState.socialLogin('google')}
        >
          <span className='flex justify-center items-center gap-x-2'>
            <FontAwesomeIcon className='my-0' icon={faGoogle} /> Log in with
            Google
          </span>
        </Button>
        <Button
          type='button'
          disabled={disabled}
          onClick={() => userState.socialLogin('github')}
        >
          <span className='flex justify-center items-center gap-x-2'>
            <FontAwesomeIcon className='my-0' icon={faGithub} /> Log in with
            Github
          </span>
        </Button>
      </div>
    )
  else return <></>
}

export default SocialLoginButtonGroup
