import { forwardRef, InputHTMLAttributes } from 'react'

type InputPosition = 'top' | 'middle' | 'bottom' | 'single'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  position?: InputPosition
}

const getRoundedBorderClassName = (position: InputPosition) => {
  switch (position) {
    case 'bottom':
      return 'rounded-b-md'
    case 'top':
      return 'rounded-t-md'
    case 'single':
      return 'rounded-md'
    default:
      return ''
  }
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { position = 'single', className } = props
  const isNeedBottomBorder = position !== 'bottom' && position !== 'single'

  return (
    <input
      {...props}
      ref={ref}
      className={`block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none
            w-full pl-4 pr-4 relative ${getRoundedBorderClassName(position)}
            shadow-sm h-10 bg-transparent border border-white/[0.24]
            ${isNeedBottomBorder && 'border-b-0'} ${className}`}
    />
  )
})

Input.displayName = 'Input'

export default Input
