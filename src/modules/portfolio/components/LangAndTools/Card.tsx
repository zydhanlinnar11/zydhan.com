import Image, { StaticImageData } from 'next/image'
import { FC } from 'react'

type Props = {
  image: string | StaticImageData
  name: string
}

const Card: FC<Props> = ({ name, image }) => {
  return (
    <div className="w-32 h-32 bg-white/20 rounded flex flex-col justify-between p-6 hover:scale-105 duration-200">
      <div className="flex justify-center">
        <Image
          src={image}
          height={48}
          width={48}
          placeholder="blur"
          alt={`Image of ${name}`}
        />
      </div>
      <p className="font-medium text-center">{name}</p>
    </div>
  )
}

export default Card
