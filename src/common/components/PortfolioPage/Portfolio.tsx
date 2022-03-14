import Image from 'next/image'
import React from 'react'
import NarrowPageContainer from '../NarrowPageContainer'
import LangAndTools from './LangAndTools'

const Portfolio = () => {
  return (
    <NarrowPageContainer>
      <header className="flex flex-col p-3 gap-y-3 md:flex-row-reverse md:justify-between">
        <div>
          <Image src={'/logo.webp'} width={128} height={128}></Image>
        </div>
        <div className="flex flex-col gap-y-3 max-w-lg">
          <h1 className="text-3xl font-medium">Zydhan Linnar Putra</h1>
          <p className="text-lg dark:text-gray-200">Full-stack Developer</p>
          <p className="dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </header>

      <main className="p-3 mt-8">
        <LangAndTools />
      </main>
    </NarrowPageContainer>
  )
}

export default Portfolio
