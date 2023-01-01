import { Post } from '@/blog/types/Post'
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  post: Post
}

const PostCard: FC<Props> = ({
  post: { author, createdAt, description, slug, title, featuredImage },
}) => {
  return (
    <Card
      as={'article'}
      maxW="sm"
      variant={'outline'}
      overflow="hidden"
      _hover={{ transform: 'scale(1.05)' }}
      transitionProperty={'transform'}
      transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
      transitionDuration={'150ms'}
    >
      <Link href={`/blog/posts/${slug}`}>
        <Box position={'relative'} w={'full'} h={'160px'} overflow={'hidden'}>
          <Image
            src={featuredImage.image}
            alt={featuredImage.alt ?? `Featured image of ${title}`}
            placeholder="blur"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes={'320px'}
          />
        </Box>
        <CardBody>
          <Heading size="md">{title}</Heading>
        </CardBody>
        <CardFooter>
          <Text>{createdAt}</Text>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default PostCard
