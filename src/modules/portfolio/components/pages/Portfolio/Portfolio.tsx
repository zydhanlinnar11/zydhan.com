import { getMetadataAllPosts } from '@/blog/lib/api'
import { PostMetadata } from '@/blog/types/PostMetadata'
import { VStack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { FC } from 'react'
import BlogSection from './Sections/BlogSection'
import ExperienceSection from './Sections/ExperienceSection'
import LanguageToolSection from './Sections/LanguageToolSection'
import ProfileSection from './Sections/ProfileSection'
import ProjectSection from './Sections/ProjectSection'

type Props = {
  posts: PostMetadata[]
}

const Portfolio: FC<Props> = ({ posts }) => {
  return (
    <VStack as={'div'} spacing={8}>
      <ProfileSection />
      <LanguageToolSection />
      <ExperienceSection />
      <ProjectSection />
      <BlogSection posts={posts} />
    </VStack>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPosts = getMetadataAllPosts()

  return {
    props: { posts: allPosts },
  }
}

export default Portfolio
