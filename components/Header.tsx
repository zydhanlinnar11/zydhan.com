interface HeaderComponentProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  topText?: string
  midText: string
  bottomText: string
}

export default function Header({
  topText,
  midText,
  bottomText,
  children,
}: HeaderComponentProps) {
  return (
    <header className='flex flex-col min-h-24 my-16 text-center mx-auto'>
      <h3 className='text-sm font-bolder my-2 text-gray-400'>{topText}</h3>
      <h1 className='text-4xl font-bold'>{midText}</h1>
      <h2 className='text-lg font-bolder my-2 text-gray-400 text-center'>
        {bottomText}
      </h2>
      {children}
    </header>
  )
}
