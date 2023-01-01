import { Post } from '@/blog/types/Post'
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  post: Post
}

const PostCard: FC<Props> = ({
  post: { author, createdAt, description, slug, title },
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
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
        />
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
