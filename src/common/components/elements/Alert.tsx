import {
  faCircleExclamation,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, MouseEventHandler } from 'react'

type Props = {
  text: string
  handleClose: MouseEventHandler<HTMLElement>
  type: 'info' | 'danger' | 'success'
}

const Alert: FC<Props> = ({ text, handleClose, type }) => {
  const tailwindColors = {
    info: 'sky',
    danger: 'red',
    success: 'green',
  }
  const color = tailwindColors[type]

  return (
    <>
      <div
        className={`flex justify-between gap-x-2 py-2 px-4 rounded-md
        text-${color}-400 bg-${color}-300/[0.15] mb-3`}
        role={'alert'}
      >
        <span className='flex justify-center items-center gap-x-2'>
          <FontAwesomeIcon
            className='my-0'
            icon={faCircleExclamation}
            size={'sm'}
          />{' '}
          {text}
        </span>
        <span
          className='flex justify-center items-center hover:cursor-pointer'
          onClick={handleClose}
        >
          <FontAwesomeIcon className='my-0' icon={faCircleXmark} size={'sm'} />
        </span>
      </div>
    </>
  )
}

export default Alert
