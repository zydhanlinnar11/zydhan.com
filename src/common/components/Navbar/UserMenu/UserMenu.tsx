import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useUserState } from '@/common/providers/UserProvider'
import Router from 'next/router'
import Menu from '@/components/Menu'
import MenuItem from '@/components/Menu/MenuItem'
import UserInfo from './UserInfo'

const UserMenu = () => {
  const userState = useUserState()

  return (
    <Menu icon={faCircleUser} iconSize='2x'>
      {userState.state === 'loading' && <UserInfo />}
      {userState.state === 'authenticated' && (
        <>
          <UserInfo user={userState.user} />
          <MenuItem onClick={() => Router.push('/auth/account')}>
            <FontAwesomeIcon icon={faGear} className='mr-2 my-0' />
            Setting
          </MenuItem>
          <MenuItem onClick={() => Router.push('/auth/logout')}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className='mr-2 my-0'
            />
            Sign out
          </MenuItem>
        </>
      )}
      {userState.state === 'unauthenticated' && (
        <>
          <UserInfo user={null} />
          <MenuItem onClick={() => Router.push('/auth/login')}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className='mr-2 my-0'
            />
            Sign in
          </MenuItem>
        </>
      )}
    </Menu>
  )
}

export default UserMenu
