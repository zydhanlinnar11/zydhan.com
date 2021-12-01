import BlogConfig from '../config/BlogConfig'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import styles from '../styles/Navbar.module.css'

const navigation = [
  { name: 'Home', href: '/', passHref: false },
  // {
  //   name: 'Resume',
  //   href: 'https://zydhanlinnar11.github.io/resume/',
  //   passHref: true,
  // },
]

export default function Navbar() {
  return (
    <Disclosure
      id={styles.navbar}
      as='nav'
      className='sticky top-0 min-h-px52 sm:h-px52 z-10 w-full backdrop-blur-20 backdrop-saturate-180'
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
              </ul>
            </nav>
          </div>

          <Disclosure.Panel className='sm:hidden pt-0 py-5'>
            <ul
              className='flex flex-col gap-y-3 divide-y divide-main'
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
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
