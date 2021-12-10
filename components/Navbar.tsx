import BlogConfig from '../config/BlogConfig'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useAuth } from '../providers/AuthProvider'
import React from 'react'

const navigation = [
  { name: 'Home', href: '/', passHref: false },
  // {
  //   name: 'Resume',
  //   href: 'https://zydhanlinnar11.github.io/resume/',
  //   passHref: true,
  // },
]

export default function Navbar() {
  const { user, logout } = useAuth()

  async function logoutHandler(e: React.FormEvent) {
    e.preventDefault()

    logout()
  }

  return (
    <Disclosure
      as='nav'
      className="bg-zinc-900/25 sticky top-0 min-h-px52 sm:h-px52 z-10 w-full backdrop-blur-20 backdrop-saturate-180
      after:w-full after:h-px after:bg-white/[0.24] after:content-[''] after:block after:absolute after:top-full"
    >
      {({ open }) => (
        <>
          <div
            className='flex justify-between h-px52 my-0 mx-auto py-0'
            style={{
              maxWidth: '980px',
              paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
              paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
            }}
          >
            <h1 className='z-20 my-auto font-semibold text-lg'>
              {BlogConfig.BLOG_TITLE}
            </h1>
            <Disclosure.Button className='sm:hidden'>
              <span className='sr-only'>Open main menu</span>
              {open ? (
                <XIcon className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <MenuIcon className='block h-6 w-6' aria-hidden='true' />
              )}
            </Disclosure.Button>
            <nav className='z-20 my-auto text-sm hidden sm:block'>
              <ul className='flex gap-x-8'>
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} passHref={item.passHref}>
                      <a>{item.name}</a>
                    </Link>
                  </li>
                ))}
                {!user && (
                  <li>
                    <Link href='/login'>
                      <a>Log in</a>
                    </Link>
                  </li>
                )}
                {user?.admin && (
                  <li>
                    <Link href='/admin'>
                      <a>Admin</a>
                    </Link>
                  </li>
                )}
                {user && (
                  <li>
                    <form onSubmit={logoutHandler}>
                      <button type='submit'>Log out</button>
                    </form>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          <Disclosure.Panel className='sm:hidden pt-0 py-5'>
            <ul
              className='flex flex-col gap-y-3 divide-y divide-white/[0.24]'
              style={{
                maxWidth: '980px',
                paddingLeft: 'calc(max(46px, env(safe-area-inset-left)))',
                paddingRight: 'calc(max(46px, env(safe-area-inset-right)))',
              }}
            >
              {navigation.map((item) => (
                <li className='pt-2' key={item.name}>
                  <Link href={item.href} passHref={item.passHref}>
                    <a className='w-full inline-block'>{item.name}</a>
                  </Link>
                </li>
              ))}
              {!user && (
                <li className='pt-2'>
                  <Link href='/login'>
                    <a className='w-full inline-block'>Login</a>
                  </Link>
                </li>
              )}
              {user?.admin && (
                <li className='pt-2'>
                  <Link href='/admin'>
                    <a className='w-full inline-block'>Admin</a>
                  </Link>
                </li>
              )}
              {user && (
                <li className='pt-2'>
                  <form onSubmit={logoutHandler}>
                    <button
                      className='w-full inline-block text-left'
                      type='submit'
                    >
                      Log out
                    </button>
                  </form>
                </li>
              )}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
