import getBaseURL from '@/common/utils/GetBaseUrl'
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { FC } from 'react'

type Props = {
  title: string
  description?: string
  date: string
  userName: string
}

const OpenGraphLayout: FC<Props> = ({ title, description, date, userName }) => {
  return (
    <div
      id="opengraph"
      className="w-[959px] h-[480px] bg-black text-white flex flex-col justify-between pt-16"
    >
      <div className="flex flex-col justify-center items-center text-center px-16">
        <div>
          <Image
            priority={true}
            width={96}
            height={96}
            src="/logo.webp"
            alt="Animated photo of Zydhan Linnar Putra"
          />
        </div>
        <p className="mt-8 text-4xl font-medium">{title}</p>
        <p className="mt-6 text-xl text-gray-400">{description}</p>
      </div>
      <div>
        <div className="grid grid-cols-3 mb-4 text-gray-300 justify-items-center">
          <p>
            <FontAwesomeIcon className="my-auto mr-2" icon={faUser} />
            <span> {userName}</span>
          </p>
          <p>
            <FontAwesomeIcon className="my-auto mr-2" icon={faCalendar} />
            <span> {date}</span>
          </p>
          <p>
            <FontAwesomeIcon className="my-auto mr-2" icon={faGlobe} />
            <span> {getBaseURL()}/blog</span>
          </p>
        </div>
        <div className="h-3 w-full bg-sky-500"></div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  if (typeof req.query.title !== 'string')
    return {
      notFound: true,
    }

  if (
    typeof req.query.description !== 'string' &&
    typeof req.query.description !== 'undefined'
  )
    return {
      notFound: true,
    }

  if (typeof req.query.title !== 'string')
    return {
      notFound: true,
    }

  const title = req.query.title
  const description = req.query.description || null
  const date = req.query.date
  const userName = 'Zydhan Linnar Putra'

  return { props: { title, description, date, userName } }
}

export default OpenGraphLayout
