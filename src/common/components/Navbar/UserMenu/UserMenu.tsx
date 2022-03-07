import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useUserDispatch, useUserState } from '@/common/providers/UserProvider'
import Router from 'next/router'
import logout from '@/modules/auth/utils/Logout'
import { toast } from 'react-toastify'
import Menu from '@/components/Menu'
import MenuItem from '@/components/Menu/MenuItem'
import UserInfo from './UserInfo'

const UserMenu = () => {
  const userState = useUserState()
  const userDispatch = useUserDispatch()

  const logoutHandler = async () => {
    try {
      await logout()
      userDispatch({ state: 'unauthenticated' })
      toast.success('Successfully logged out!', {
        theme: 'dark',
      })
    } catch (e) {
      toast.error('Failed to log out!', {
        theme: 'dark',
      })
    }
  }

  return (
    <ul className='flex gap-x-8'>
      <Menu icon={faCircleUser} iconSize='2x'>
        {userState.state === 'loading' && <UserInfo />}
        {userState.state === 'authenticated' && (
          <>
            <UserInfo user={userState.user} />
            <MenuItem onClick={() => Router.push('/auth/account')}>
              <FontAwesomeIcon icon={faGear} className='mr-2 my-0' />
              Setting
            </MenuItem>
            <MenuItem onClick={logoutHandler}>
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
    </ul>
  )
}

export default UserMenu
