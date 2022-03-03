import Button from '@/common/components/elements/Button'
import PrivateRoute from '@/modules/auth/components/PrivateRoute'
import NarrowPageContainer from '@/common/components/elements/NarrowPageContainer'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import SpinnerLoading from '@/common/components/elements/SpinnerLoading'
import Header from '@/common/components/elements/Header'
import { User } from '@/modules/auth/types/AccountSettingUser'
import AccountSettingInformationSection from './InformationSection'
import AccountSettingSocialSection from './SocialSection'

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data)

const AccountSettingPage = () => {
  const { data, error } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
    fetcher
  )

  return (
    <PrivateRoute>
      <NarrowPageContainer>
        {data && !error && (
          <>
            <div className='w-full flex flex-col pb-10 gap-y-3 items-center sm:flex-row justify-between align-middle'>
              <h2 className='text-2xl'>Account Setting</h2>
              <div className='w-24 text-sm'>
                <Button onClick={() => window.history.back()}>
                  <FontAwesomeIcon
                    className='my-auto mr-2'
                    icon={faCircleArrowLeft}
                  ></FontAwesomeIcon>{' '}
                  Back
                </Button>
              </div>
            </div>
            <div className='flex flex-col gap-y-5 sm:flex-row sm:gap-x-5'>
              <div
                className='sm:w-64 sm:h-fit bg-gray-900 flex flex-col w-full
              border border-white/20 rounded p-6
              justify-center text-center gap-y-5 break-words text-ellipsis overflow-hidden'
              >
                <>
                  <FontAwesomeIcon icon={faCircleUser} size={'4x'} />
                  <div>
                    <p className='text-lg'>{data.name}</p>
                    <p className='text-sm text-gray-400'>{data.email}</p>
                  </div>
                </>
              </div>

              <div className='sm:w-full flex flex-col gap-y-5'>
                <AccountSettingInformationSection user={data} />
                <AccountSettingSocialSection user={data} />
              </div>
            </div>
          </>
        )}
        {!data && !error && (
          <div className='my-auto'>
            <SpinnerLoading />
          </div>
        )}
        {error && (
          <Header
            className='my-auto'
            midText='An error ocurred'
            bottomText='Please try again later.'
          />
        )}
      </NarrowPageContainer>
    </PrivateRoute>
  )
}

export default AccountSettingPage
