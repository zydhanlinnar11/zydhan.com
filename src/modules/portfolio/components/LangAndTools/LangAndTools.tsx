import Card from './Card'

const datas = [
  {
    name: 'Laravel',
    image: '/laravel-logo.png',
  },
  {
    name: 'Next.js',
    image: '/nextjs-logo.png',
  },
  {
    name: 'TypeScript',
    image: '/ts-logo-512.png',
  },
  {
    name: 'PHP',
    image: '/php-logo.png',
  },
  {
    name: 'Docker',
    image: '/docker-logo.png',
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
