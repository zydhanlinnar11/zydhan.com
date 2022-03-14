import React, { FC, MouseEventHandler } from 'react'
import ModalAction from '../types/ModalAction'

type Props = {
  isShowed: boolean
  handleClose: MouseEventHandler<HTMLElement>
  title: string
  bodyText: string
  action?: ModalAction
}

const Modal: FC<Props> = ({
  isShowed,
  bodyText,
  handleClose,
  title,
  action,
}) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-screen h-screen
                    transition-colors duration-300
                    ${isShowed ? 'z-40 bg-black/30' : '-z-50'}`}
        onClick={(e) => handleClose(e)}
      ></div>
      <div
        className={`fixed z-50 bg-gray-800 mx-auto my-auto w-[288px] text-center rounded-md
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                transition-transform overflow-hidden duration-300 ${
                  isShowed ? 'scale-100' : 'scale-0'
                }`}
      >
        <div className="p-4">
          <div>
            <p className="font-bold text-lg">{title}</p>
          </div>
          <p>{bodyText}</p>
        </div>
        <div className="bg-gray-600 w-full h-px"></div>
        <div className="grid grid-cols-2 min-h-[2.75rem]">
          <button
            className={`hover:bg-gray-600 transition-colors ${
              !action && 'col-span-2'
            }`}
            onClick={handleClose}
          >
            <p>Close</p>
          </button>
          {action && (
            <button
              onClick={action.handler}
              className={`hover:bg-gray-600 transition-colors border-l border-gray-600 ${
                action.type === 'danger'
                  ? 'text-red-500'
                  : action.type === 'success'
                  ? 'text-green-500'
                  : 'text-blue-500'
              }`}
            >
              <p>{action.text}</p>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Modal
