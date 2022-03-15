import Image from 'next/image'
import { FC } from 'react'

type Props = {
  image: string
  name: string
}

const Card: FC<Props> = ({ name, image }) => {
  return (
    <div className="w-40 h-40 bg-white/20 rounded flex flex-col justify-center hover:scale-105 duration-200">
      <div className="pb-6 flex justify-center">
        <Image src={image} height={50} width={50} priority={true} />
      </div>
      <p className="font-medium text-center">{name}</p>
    </div>
  )
}

export default Card
