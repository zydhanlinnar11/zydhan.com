import React from 'react'
import TextInput from '@/common/components/elements/Form/TextInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@/common/components/elements/Button'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

const PasswordSection = () => {
  return (
    <div
      className='sm:col-span-3 flex flex-col
  border border-white/20 rounded px-6 py-5'
    >
      <h3 className='text-lg font-semibold'>Change Password</h3>
      <div className='h-px w-full bg-white/20 mt-3'></div>
      <form className='mt-5 flex flex-col gap-y-3'>
        <div className='grid grid-cols-3'>
          <div className='flex'>
            <label className='my-auto' htmlFor='current-password'>
              Current password
            </label>
          </div>
          <TextInput
            className='col-span-2'
            label='Current password'
            position='single'
            name='current-password'
            type={'password'}
            reference={null}
            autoComplete={'current-password'}
          />
        </div>

        <div className='grid grid-cols-3'>
          <div className='flex'>
            <label className='my-auto' htmlFor='new-password'>
              New password
            </label>
          </div>
          <TextInput
            className='col-span-2'
            label='New password'
            position='single'
            name='new-password'
            type={'password'}
            reference={null}
            autoComplete={'new-password'}
          />
        </div>

        <div className='grid grid-cols-3'>
          <div className='flex'>
            <label className='my-auto' htmlFor='confirm-new-password'>
              Confirm password
            </label>
          </div>
          <TextInput
            className='col-span-2'
            label='Confirm new password'
            position='single'
            name='confirm-new-password'
            type={'password'}
            reference={null}
            autoComplete={'new-password'}
          />
        </div>

        <div className='mt-3 flex sm:justify-end'>
          <div className='w-full sm:w-1/3'>
            <Button>
              <span className='flex justify-center items-center gap-x-2'>
                <FontAwesomeIcon className='my-0' icon={faFloppyDisk} /> Change
                password
              </span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PasswordSection
