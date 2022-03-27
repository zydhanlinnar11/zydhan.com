import HomePost from '../types/HomePost'
import gambarBiner from '../assets/img/gambar-biner.webp'

const HomePosts: HomePost[] = [
  {
    cover: gambarBiner,
    created_at: 'Saturday, March 19, 2022',
    slug: 'simple-and-easy-rest-api-implementation-with-laravel',
    title: 'Simple and Easy REST API Implementation With Laravel',
    description:
      'Laravel bring us ease of API development with eloquent, API controller, migration, etc.',
  },
]

export default HomePosts
