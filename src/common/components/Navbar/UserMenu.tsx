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
        {userState.state === 'loading' && (
          <>
            <div className='flex flex-col gap-y-3 items-center justify-center py-3 px-6'>
              <FontAwesomeIcon icon={faCircleUser} size={'2x'} />
              <div className='text-center flex flex-col gap-y-1 w-full'>
                <div className='h-2 bg-slate-700 rounded animate-pulse'></div>
                <div className='h-2 mx-5 bg-slate-700 rounded animate-pulse'></div>
              </div>
            </div>
            <div className='bg-gray-600 h-px mx-4 my-1' />
          </>
        )}
        {userState.state === 'authenticated' && (
          <>
            <div className='flex flex-col gap-y-3 items-center justify-center py-3 px-6'>
              <FontAwesomeIcon icon={faCircleUser} size={'2x'} />
              <div className='text-center'>
                <p>{userState.user.name}</p>
                <small className='text-gray-400'>{userState.user.email}</small>
              </div>
            </div>
            <div className='bg-gray-600 h-px mx-4 my-1' />
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
          <MenuItem onClick={() => Router.push('/auth/login')}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className='mr-2 my-0'
            />
            Sign in
          </MenuItem>
        )}
      </Menu>
    </ul>
  )
}

export default UserMenu
