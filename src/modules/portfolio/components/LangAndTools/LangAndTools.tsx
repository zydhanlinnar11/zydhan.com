import Card from './Card'
import laravel from '../../../../../public/laravel-logo.png'
import nextjs from '../../../../../public/nextjs-logo.png'
import ts from '../../../../../public/ts-logo-512.png'
import php from '../../../../../public/php-logo.png'
import docker from '../../../../../public/docker-logo.png'

const datas = [
  {
    name: 'Laravel',
    image: laravel,
  },
  {
    name: 'Next.js',
    image: nextjs,
  },
  {
    name: 'TypeScript',
    image: ts,
  },
  {
    name: 'PHP',
    image: php,
  },
  {
    name: 'Docker',
    image: docker,
  },
]

const LangAndTools = () => {
  return (
    <div className="flex flex-wrap py-8 gap-8 last:col-start-2 justify-center">
      {datas.map((data) => (
        <Card {...data} key={data.name} />
      ))}
    </div>
  )
}

export default LangAndTools
