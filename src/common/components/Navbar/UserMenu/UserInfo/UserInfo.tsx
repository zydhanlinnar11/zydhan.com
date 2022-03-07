import User from '@/modules/auth/types/User'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useEffect, useState } from 'react'

type Props = {
  user?: User | null
}

const loading = (
  <>
    <FontAwesomeIcon icon={faCircleUser} size={'2x'} />
    <div className='h-2 bg-slate-700 rounded animate-pulse py-1 w-full mt-1'></div>
    <div className='h-2 mx-5 bg-slate-700 rounded animate-pulse py-1 w-full'></div>
  </>
)

const noUser = (
  <>
    <FontAwesomeIcon icon={faCircleUser} size={'2x'} />
    <div className='text-center'>
      <p>Guest</p>
      <small className='text-gray-400'>Welcome</small>
    </div>
  </>
)

const withUser = (user: User) => (
  <>
    <FontAwesomeIcon icon={faCircleUser} size={'2x'} />
    <div className='text-center'>
      <p>{user.name}</p>
      <small className='text-gray-400'>{user.email}</small>
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
      <div className='flex flex-col gap-y-3 items-center justify-center pt-2 pb-1 px-6'>
        {userDetail}
      </div>
      <div className='bg-gray-600 h-px mx-4 my-1' />
    </>
  )
}

export default UserInfo
