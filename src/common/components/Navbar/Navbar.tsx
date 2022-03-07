import Link from 'next/link'
import UserMenu from '@/common/components/Navbar/UserMenu'

export default function Navbar() {
  return (
    <nav
      className="bg-zinc-900/25 sticky top-0 min-h-[52px] sm:h-[52px] z-10 w-full backdrop-blur-[20px] backdrop-saturate-[1.80]
      after:w-full after:h-px after:bg-white/[0.24] after:content-[''] after:block after:absolute after:top-full
      print:hidden"
    >
      <div className='flex justify-between h-[52px] my-0 mx-auto py-0 max-w-5xl px-6'>
        <Link href='/'>
          <a className='my-auto font-semibold text-lg'>
            <h1>Zydhan Linnar Putra</h1>
          </a>
        </Link>
        <nav className='z-20 my-auto text-sm block'>
          <UserMenu />
        </nav>
      </div>
    </nav>
  )
}
