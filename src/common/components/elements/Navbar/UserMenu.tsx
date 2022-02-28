import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import MenuItem from './MenuItem'
import { useUserState } from '@/common/providers/UserProvider'
import Router from 'next/router'

const UserMenu = () => {
  const userState = useUserState()
  return (
    <ul className='flex gap-x-8'>
      <Menu as='div' className='ml-3 relative'>
        <div>
          <Menu.Button className='bg-gray-800 flex text-sm rounded-full'>
            <span className='sr-only'>Open user menu</span>
            <span className='text-gray-300'>
              <FontAwesomeIcon icon={faCircleUser} size={'2x'} />
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            className='absolute origin-top-right bg-gray-900 flex
                  flex-col right-0 w-56 mt-2 border border-white/20 rounded py-1 z-10'
          >
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
                    <small className='text-gray-400'>
                      {userState.user.email}
                    </small>
                  </div>
                </div>
                <div className='bg-gray-600 h-px mx-4 my-1' />
                <MenuItem onClick={userState.logout}>
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
          </Menu.Items>
        </Transition>
      </Menu>
    </ul>
  )
}

export default UserMenu
