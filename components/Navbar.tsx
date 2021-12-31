import Link from 'next/link'
import { Disclosure, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { useAuth } from '@blog-providers/AuthProvider'
import BlogConfig from '@blog-config/BlogConfig'

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
      className="bg-zinc-900/25 sticky top-0 min-h-[52px] sm:h-[52px] z-10 w-full backdrop-blur-[20px] backdrop-saturate-[1.80]
      after:w-full after:h-px after:bg-white/[0.24] after:content-[''] after:block after:absolute after:top-full"
    >
      {({ open }) => (
        <>
          <div className='flex justify-between h-[52px] my-0 mx-auto py-0 max-w-5xl px-6'>
            <Link href='/'>
              <a className='my-auto font-semibold text-lg'>
                <h1>{BlogConfig.BLOG_TITLE}</h1>
              </a>
            </Link>
            <Disclosure.Button className='sm:hidden'>
              <span className='sr-only'>Open main menu</span>
              <div className='flex flex-col w-4 h-3 justify-between'>
                <div
                  className={`w-full h-[2px] transition-transform ease-in-out	duration-300 bg-white origin-top-left ${
                    open && 'rotate-45'
                  }`}
                ></div>
                <div
                  className={`w-full transition-opacity	duration-300 h-[2px] bg-white ${
                    open && 'opacity-0'
                  }`}
                ></div>
                <div
                  className={`w-full h-[2px] transition-transform ease-in-out	duration-300 bg-white origin-bottom-left ${
                    open && '-rotate-45 translate-y-[0.5px]'
                  }`}
                ></div>
              </div>
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

          <Transition
            show={open}
            enter='transition duration-200 ease-out'
            enterFrom='transform -translate-y-2 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-200 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform -translate-y-2 opacity-0'
          >
            <Disclosure.Panel className='sm:hidden pt-0 py-5'>
              <ul className='flex flex-col gap-y-3 divide-y divide-white/[0.24] max-w-5xl px-12'>
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
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
