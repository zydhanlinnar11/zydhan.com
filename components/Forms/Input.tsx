interface InputProps {
  type: React.HTMLInputTypeAttribute
  name: string
  label: string
  reference: any
  autoComplete?: string
  position: 'top' | 'middle' | 'bottom'
  inputId?: string
}

export default function Input({
  type,
  name,
  label,
  reference,
  autoComplete,
  position,
  inputId,
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className='hidden' aria-hidden>
        {label}
      </label>
      <div className='relative rounded-md shadow-sm'>
        <input
          type={type}
          name={name}
          id={inputId ?? name}
          className={`block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 ${
            position === 'bottom'
              ? 'rounded-b-md'
              : position === 'top'
              ? 'rounded-t-md'
              : ''
          } h-10 bg-transparent`}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.24)',
            borderBottom:
              position !== 'bottom'
                ? 'none'
                : '1px solid rgba(255, 255, 255, 0.24)',
          }}
          placeholder={label}
          autoComplete={autoComplete}
          ref={reference}
        />
      </div>
    </div>
  )
}
