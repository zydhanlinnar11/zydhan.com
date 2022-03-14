import Card from './Card'

const datas = [
  {
    name: 'TypeScript',
    image: '/ts-logo-512.png',
  },
  {
    name: 'Next.js',
    image: '/nextjs-logo.png',
  },
  {
    name: 'PHP',
    image: '/php-logo.png',
  },
  {
    name: 'Laravel',
    image: '/laravel-logo.png',
  },
]

const LangAndTools = () => {
  return (
    <>
      <h2 className="text-2xl font-medium">Favourite Languages and Tools</h2>
      <div className="flex flex-wrap py-8 gap-8 last:col-start-2 justify-center">
        {datas.map((data) => (
          <Card {...data} key={data.name} />
        ))}
      </div>
    </>
  )
}

export default LangAndTools
