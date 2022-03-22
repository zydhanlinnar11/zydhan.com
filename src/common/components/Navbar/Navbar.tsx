import Link from 'next/link'
import UserMenu from './UserMenu'
import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import animatedPic from '../../../../public/logo.webp'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog', startWith: '/blog' },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [currentActiveName, setActiveName] = useState<string>('')
  const { pathname } = useRouter()

  useEffect(() => {
    navigation.forEach((nav) => {
      if (nav.startWith && pathname.startsWith(nav.startWith)) {
        setActiveName(nav.name)
      }
    })
    if (pathname === '/') setActiveName('Home')
  }, [pathname])

  return (
    <Disclosure as="nav" className="dark:bg-black sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative flex items-center justify-between h-11">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-list"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/">
                  <a className="my-auto flex">
                    <Image
                      src={animatedPic}
                      width={24}
                      height={24}
                      className="m-auto"
                      alt="Animated photo of Zydhan Linnar Putra"
                      priority
                    />
                  </a>
                </Link>
                <div className="hidden sm:flex sm:ml-6 items-center">
                  <div className="flex gap-x-6 text-xs">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.name === currentActiveName
                              ? 'dark:text-white'
                              : 'dark:text-gray-300 dark:hover:text-white',
                            'group relative transition-colors duration-300'
                          )}
                          aria-current={
                            item.name === currentActiveName ? 'page' : undefined
                          }
                        >
                          {item.name}
                          <span
                            className={classNames(
                              item.name === currentActiveName && 'scale-x-100',
                              'h-px absolute bg-white w-full bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300'
                            )}
                          ></span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <UserMenu />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden pt-0 py-5">
            <ul className="flex flex-col gap-y-3 divide-y divide-white/[0.24] max-w-5xl px-12">
              {navigation.map((item) => (
                <li
                  className="pt-2 dark:text-gray-300 dark:hover:text-white"
                  key={item.name}
                >
                  <Link href={item.href}>
                    <a className="w-full inline-block">{item.name}</a>
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
