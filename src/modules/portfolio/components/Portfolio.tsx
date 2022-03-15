import Image from 'next/image'
import React from 'react'
import LangAndTools from './LangAndTools'
import Projects from './Projects'
import NarrowPageContainer from '@/common/components/NarrowPageContainer'
import Head from 'next/head'
import Posts from './Posts'
import WorkExperiences from './WorkExperiences'

const Portfolio = () => {
  return (
    <NarrowPageContainer>
      <Head>
        <title>Zydhan Linnar Putra - Full-stack Developer</title>
      </Head>
      <header className="flex flex-col p-3 gap-y-3 md:flex-row-reverse md:justify-between">
        <div>
          <Image
            src={'/logo.webp'}
            width={128}
            height={128}
            priority={true}
          ></Image>
        </div>
        <div className="flex flex-col gap-y-3 max-w-lg">
          <h1 className="text-3xl font-medium">Zydhan Linnar Putra</h1>
          <p className="text-lg dark:text-gray-200">Full-stack Developer</p>
          <p className="dark:text-gray-300">
            Web development enthusiast with {new Date().getFullYear() - 2021}{' '}
            year of experience{new Date().getFullYear() > 2022 && 's'} of bla
            bla bla
          </p>
        </div>
      </header>

      <main className="p-3 mt-8">
        <h2 className="text-2xl font-medium">Favourite Languages and Tools</h2>
        <LangAndTools />
        <h2 className="text-2xl font-medium">Work Experiences</h2>
        <WorkExperiences />
        <h2 className="text-2xl font-medium mt-4">Recent Projects</h2>
        <Projects />
        <h2 className="text-2xl font-medium mt-8">Recent Posts</h2>
        <Posts />
      </main>
    </NarrowPageContainer>
  )
}

export default Portfolio
