import fetchMock from 'jest-fetch-mock'
import BlogConfig from '../../../config/BlogConfig'

fetchMock.enableMocks()

beforeEach(() => {
  fetchMock.resetMocks()
})

describe('getAllPosts', () => {
  it('Properly encapsulate post list', async () => {
    const postsResponse = [
      {
        title: 'Test post 1',
        slug: 'test-post-1',
        created_at: '2021-12-23 12:45:00',
        cover_url: 'https://dummyimage.com/600x400/000/fff',
      },
      {
        title: 'Test post 2',
        slug: 'test-post-2',
        created_at: '2021-12-23 12:45:00',
        cover_url: 'https://dummyimage.com/600x400/000/fff',
      },
      {
        title: 'Test post 3',
        slug: 'test-post-3',
        created_at: '2021-12-23 12:45:00',
        cover_url: 'https://dummyimage.com/600x400/000/fff',
      },
    ]

    fetchMock.mockResponseOnce(JSON.stringify(postsResponse))

    const posts = await BlogConfig.POST_SERVICE.getAllPosts()

    expect(posts).toStrictEqual(
      postsResponse.map(({ title, slug, created_at, cover_url }) => ({
        title,
        slug,
        createdAt: created_at,
        coverUrl: cover_url,
      }))
    )
  })

  it('Properly handle empty array response.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]))

    expect(await BlogConfig.POST_SERVICE.getAllPosts()).toStrictEqual([])
  })

  it('Throw exception with status text if status code not ok.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('INTERNAL_SERVER_ERROR'), {
      status: 500,
      statusText: '500',
    })

    await expect(BlogConfig.POST_SERVICE.getAllPosts()).rejects.toThrow('500')

    fetchMock.mockResponseOnce(JSON.stringify('BAD_REQUEST'), {
      status: 400,
      statusText: '400',
    })

    await expect(BlogConfig.POST_SERVICE.getAllPosts()).rejects.toThrow('400')
  })

  it('Throw CONN_ERROR exception if there is connection error.', async () => {
    fetchMock.mockRejectOnce()

    await expect(BlogConfig.POST_SERVICE.getAllPosts()).rejects.toThrow(
      'CONN_ERROR'
    )
  })
})
