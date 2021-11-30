import BlogConfig from '../config/BlogConfig'
import Link from 'next/link'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import styles from '../styles/Navbar.module.css'

const navigation = [
  { name: 'Home', href: '/', passHref: false },
  {
    name: 'Resume',
    href: 'https://zydhanlinnar11.github.io/resume/',
    passHref: true,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    // <header
    //   style={{
    //     borderBottom: '1px solid rgba(255,255,255,0.24)',
    //   }}
    //   className='sticky top-0 h-px52 z-10'
    // >
    //   <div
    //     style={{
    //       backgroundColor: 'rgba(29,29,31,0.72)',
    //     }}
    //     className='absolute top-0 h-full w-full backdrop-blur-20 backdrop-saturate-180'
    //   ></div>
    //   <div
    //     className='flex justify-between h-full my-0 mx-auto py-0'
    //     style={{
    //       maxWidth: '980px',
    //       paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
    //       paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
    //     }}
    //   >
    //     <h1 className='z-20 my-auto font-semibold text-lg'>
    //       {BlogConfig.getBlogTitle()}
    //     </h1>
    //     <nav className='z-20 my-auto text-sm'>
    //       <ul className='flex gap-x-8'>
    //         <li>
    //           <Link href='/'>
    //             <a>Home</a>
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href='https://zydhanlinnar11.github.io/resume/'
    //             passHref={true}
    //           >
    //             <a>Resume</a>
    //           </Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   </div>
    // </header>
    <Disclosure
      id={styles.navbar}
      as='nav'
      className='sticky top-0 min-h-px52 sm:h-px52 z-10 w-full backdrop-blur-20 backdrop-saturate-180'
      //   style={{
      //     backgroundColor: 'rgba(29,29,31,0.72)',
      //   }}
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
              {BlogConfig.getBlogTitle()}
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
                  <li>
                    <Link href={item.href} passHref={item.passHref}>
                      <a>{item.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Disclosure.Panel
            className='sm:hidden pt-0 py-5'
            // style={{
            //   backgroundColor: 'rgba(29,29,31,0.72)',
            // }}
          >
            <ul
              className='flex flex-col gap-y-3 divide-y divide-main'
              style={{
                maxWidth: '980px',
                paddingLeft: 'calc(max(46px, env(safe-area-inset-left)))',
                paddingRight: 'calc(max(46px, env(safe-area-inset-right)))',
              }}
            >
              {navigation.map((item) => (
                <li className='pt-2'>
                  <Link href={item.href} passHref={item.passHref}>
                    <a>{item.name}</a>
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
