import React from 'react'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  name: string
  label: string
  reference: any
  autoComplete?: string
  position: 'top' | 'middle' | 'bottom' | 'single'
  inputId?: string
  defaultValue?: string
  showLabel?: boolean
  className?: string
}

export default function Input({
  type,
  name,
  label,
  reference,
  autoComplete,
  position,
  inputId,
  defaultValue,
  showLabel,
  className,
}: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className={showLabel ? '' : 'hidden'}>
        {label}
      </label>
      <div
        className={`${showLabel ? 'mt-2' : ''} relative rounded-md shadow-sm`}
      >
        <input
          type={type}
          name={name}
          id={inputId ?? name}
          className={`block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 ${
            position === 'bottom'
              ? 'rounded-b-md'
              : position === 'top'
              ? 'rounded-t-md'
              : position === 'single'
              ? 'rounded-md'
              : ''
          } h-10 bg-transparent border border-white/[0.24] ${
            position !== 'bottom' && position !== 'single' ? 'border-b-0' : ''
          }`}
          placeholder={label}
          autoComplete={autoComplete}
          ref={reference}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  )
}
