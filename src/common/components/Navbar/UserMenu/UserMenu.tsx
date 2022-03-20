import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons'
import { useUserState } from '@/common/providers/UserProvider'
import Router, { useRouter } from 'next/router'
import Menu from '@/components/Menu'
import MenuItem from '@/components/Menu/MenuItem'
import UserInfo from './UserInfo'

const UserMenu = () => {
  const userState = useUserState()
  const router = useRouter()

  const logoutHandler = () => {
    const url = '/auth/logout'
    if (router.pathname === url) return
    router.push(url + `?from=${encodeURIComponent(location.href)}`)
  }

  const loginHandler = () => {
    const url = '/auth/login'
    if (router.pathname === url) return
    router.push(url + `?next=${encodeURIComponent(location.href)}`)
  }

  return (
    <Menu
      icon={
        userState.state === 'authenticated' && userState.user.avatar_url
          ? userState.user.avatar_url
          : faCircleUser
      }
      iconSize="2x"
    >
      {userState.state === 'loading' && <UserInfo />}
      {userState.state === 'authenticated' && (
        <>
          <UserInfo user={userState.user} />
          <MenuItem onClick={() => Router.push('/auth/account')}>
            <FontAwesomeIcon icon={faGear} className="mr-2 my-0" />
            Setting
          </MenuItem>
          <MenuItem onClick={logoutHandler}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="mr-2 my-0"
            />
            Log out
          </MenuItem>
        </>
      )}
      {userState.state === 'unauthenticated' && (
        <>
          <UserInfo user={null} />
          <MenuItem onClick={loginHandler}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="mr-2 my-0"
            />
            Log in
          </MenuItem>
        </>
      )}
    </Menu>
  )
}

export default UserMenu
