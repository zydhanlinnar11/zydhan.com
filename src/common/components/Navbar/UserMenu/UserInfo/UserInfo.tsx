import User from '@/modules/auth/types/User'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

type Props = {
  user?: User | null
}

const loading = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi bi-person-circle"
      viewBox="0 0 16 16"
    >
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path
        fillRule="evenodd"
        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
      />
    </svg>
    <div className="h-2 bg-slate-700 rounded animate-pulse py-1 w-full mt-1"></div>
    <div className="h-2 mx-5 bg-slate-700 rounded animate-pulse py-1 w-full"></div>
  </>
)

const noUser = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi bi-person-circle"
      viewBox="0 0 16 16"
    >
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path
        fillRule="evenodd"
        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
      />
    </svg>
    <div className="text-center">
      <p>Guest</p>
      <small className="text-gray-600 dark:text-gray-400">Welcome</small>
    </div>
  </>
)

const withUser = (user: User) => (
  <>
    {user.avatar_url ? (
      <Image
        className="h-8 w-8 rounded-full dark:bg-white transition duration-150 ease-in-out"
        src={user.avatar_url}
        width={28}
        height={28}
        alt="User profile picture"
      />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-person-circle"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </svg>
    )}
    <div className="text-center">
      <p>{user.name}</p>
      <small className="text-gray-600 dark:text-gray-400">{user.email}</small>
    </div>
  </>
)

const UserInfo: FC<Props> = ({ user }) => {
  const [userDetail, setUserDetail] = useState<JSX.Element>(loading)

  useEffect(() => {
    if (user === undefined) setUserDetail(loading)
    else if (user === null) setUserDetail(noUser)
    else setUserDetail(withUser(user))
  }, [user])

  return (
    <>
      <div className="flex flex-col gap-y-3 items-center justify-center pt-2 pb-1 px-6">
        {userDetail}
      </div>
      <div className="bg-black/20 dark:bg-white/20 h-px mx-4 my-1" />
    </>
  )
}

export default UserInfo
