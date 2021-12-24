import fetchMock from 'jest-fetch-mock'
import BlogConfig from '../../../config/BlogConfig'
import Post from '../../../models/Post'
import IPostService from '../../interface/IPostService'

fetchMock.enableMocks()
const postService: IPostService = BlogConfig.POST_SERVICE

beforeEach(() => {
  fetchMock.resetMocks()
})

describe('getAllPosts', () => {
  it('Properly encapsulate post list', async () => {
    const postsResponse = [
      {
        created_at: '2021-12-21T08:56:37.000000Z',
        description: 'Test desc',
        id: '8e3a361d-f7e0-427c-a3cd-0989d3e40430',
        markdown: 'Test content 1',
        slug: 'test-post-1',
        title: 'Test Post 1',
        updated_at: '2021-12-21T13:41:40.000000Z',
        user_id: '8e3a361d-f7e0-427c-a3cd-0989d3e40430',
        cover_url: 'https://dummyimage.com/600x400/000/fff',
      },
      {
        created_at: '2021-12-21T08:56:37.000000Z',
        description: 'Test desc',
        id: '8e3a361d-f7e0-427c-a3cd-0989d3e40430',
        markdown: 'Test content 2',
        slug: 'test-post-2',
        title: 'Test Post 2',
        updated_at: '2021-12-21T13:41:40.000000Z',
        user_id: '8e3a361d-f7e0-427c-a3cd-0989d3e40430',
        cover_url: 'https://dummyimage.com/600x400/000/fff',
      },
      {
        created_at: '2021-12-21T08:56:37.000000Z',
        description: 'Test desc',
        id: '8e3a361d-f7e0-427c-a3cd-0989d3e40430',
        markdown: 'Test content 2',
        slug: 'test-post-2',
        title: 'Test Post 2',
        updated_at: '2021-12-21T13:41:40.000000Z',
        user_id: '8e3a361d-f7e0-427c-a3cd-0989d3e40430',
        cover_url: 'https://dummyimage.com/600x400/000/fff',
      },
    ]
    const postsList: Post[] = postsResponse.map(
      ({
        title,
        slug,
        created_at,
        cover_url,
        id,
        markdown,
        description,
        user_id,
        updated_at,
      }) => ({
        title,
        slug,
        createdAt: created_at,
        updatedAt: updated_at,
        coverUrl: cover_url,
        id,
        userId: user_id,
        markdown,
        description,
      })
    )

    fetchMock.mockResponseOnce(JSON.stringify(postsResponse))

    const posts = await postService.getAllPosts()

    expect(posts).toStrictEqual(postsList)
  })

  it('Properly handle empty array response.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]))

    expect(await postService.getAllPosts()).toStrictEqual([])
  })

  it('Throw exception INTERNAL_SERVER_ERROR if status code is 500.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('INTERNAL_SERVER_ERROR'), {
      status: 500,
      statusText: '500',
    })
  })

  it('Throw CONN_ERROR exception if there is connection error.', async () => {
    fetchMock.mockRejectOnce()

    await expect(postService.getAllPosts()).rejects.toThrow('CONN_ERROR')
  })
})

describe('getSinglePosts', () => {
  it('Properly encapsulate post', async () => {
    const postResponse = {
      title: 'Test post 1',
      slug: 'test-post-1',
      created_at: '2021-12-23 12:45:00',
      cover_url: 'https://dummyimage.com/600x400/000/fff',
      description: 'Test description',
      user_id: 'ID',
      markdown: 'Test markdown',
      updated_at: '2021-12-21T13:41:40.000000Z',
      id: 'ID',
    }

    const post: Post = {
      title: postResponse.title,
      slug: postResponse.slug,
      createdAt: postResponse.created_at,
      coverUrl: postResponse.cover_url,
      description: postResponse.description,
      userId: postResponse.user_id,
      markdown: postResponse.markdown,
      updatedAt: postResponse.updated_at,
      id: postResponse.id,
    }

    fetchMock.mockResponseOnce(JSON.stringify(postResponse))

    const postResult = await postService.getSinglePost(postResponse.slug)

    expect(postResult).toStrictEqual(post)
  })

  it('Throw NOT_FOUND_ERROR if post not available (404 not found).', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 404,
      statusText: '404',
    })

    await expect(postService.getSinglePost('not-found')).rejects.toThrow(
      'NOT_FOUND_ERROR'
    )
  })

  it('Throw INTERNAL_SERVER_ERROR if status code is 500.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('INTERNAL_SERVER_ERROR'), {
      status: 500,
      statusText: '500',
    })

    await expect(postService.getSinglePost('test')).rejects.toThrow(
      'INTERNAL_SERVER_ERROR'
    )
  })

  it('Throw CONN_ERROR exception if there is connection error.', async () => {
    fetchMock.mockRejectOnce()

    await expect(postService.getSinglePost('test')).rejects.toThrow(
      'CONN_ERROR'
    )
  })
})

describe('editSinglePosts', () => {
  it('Return new post slug', async () => {
    const slug = 'new-slug'

    fetchMock.mockResponseOnce(JSON.stringify({ slug }))

    const newSlug = await postService.editSinglePost(slug, {})

    expect(newSlug).toStrictEqual(slug)
  })

  it('Throw NOT_FOUND_ERROR if post not available (404 not found).', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 404,
      statusText: '404',
    })

    await expect(postService.editSinglePost('not-found', {})).rejects.toThrow(
      'NOT_FOUND_ERROR'
    )
  })

  it('Throw INTERNAL_SERVER_ERROR if status code is 500.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('INTERNAL_SERVER_ERROR'), {
      status: 500,
      statusText: '500',
    })

    await expect(postService.editSinglePost('test', {})).rejects.toThrow(
      'INTERNAL_SERVER_ERROR'
    )
  })

  it('Throw CONN_ERROR exception if there is connection error.', async () => {
    fetchMock.mockRejectOnce()

    await expect(postService.editSinglePost('test', {})).rejects.toThrow(
      'CONN_ERROR'
    )
  })

  it('Throw UNPROCESSABLE_ERROR if status code is 422.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('UNPROCESSABLE_ERROR'), {
      status: 422,
      statusText: '422',
    })

    await expect(postService.editSinglePost('test', {})).rejects.toThrow(
      'UNPROCESSABLE_ERROR'
    )
  })

  it('Throw FORBIDDEN_ERROR if status code is 403.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('FORBIDDEN_ERROR'), {
      status: 403,
      statusText: '403',
    })

    await expect(postService.editSinglePost('test', {})).rejects.toThrow(
      'FORBIDDEN_ERROR'
    )
  })

  it('Throw UNAUTHORIZED_ERROR if status code is 401.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('UNAUTHORIZED_ERROR'), {
      status: 401,
      statusText: '401',
    })

    await expect(postService.editSinglePost('test', {})).rejects.toThrow(
      'UNAUTHORIZED_ERROR'
    )
  })
})

describe('addSinglePosts', () => {
  it('Return post slug', async () => {
    const slug = 'new-slug'

    fetchMock.mockResponseOnce(JSON.stringify({ slug }))

    const newSlug = await postService.addSinglePost({})

    expect(newSlug).toStrictEqual(slug)
  })

  it('Throw INTERNAL_SERVER_ERROR if status code is 500.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('INTERNAL_SERVER_ERROR'), {
      status: 500,
      statusText: '500',
    })

    await expect(postService.addSinglePost({})).rejects.toThrow(
      'INTERNAL_SERVER_ERROR'
    )
  })

  it('Throw CONN_ERROR exception if there is connection error.', async () => {
    fetchMock.mockRejectOnce()

    await expect(postService.addSinglePost({})).rejects.toThrow('CONN_ERROR')
  })

  it('Throw UNPROCESSABLE_ERROR if status code is 422.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('UNPROCESSABLE_ERROR'), {
      status: 422,
      statusText: '422',
    })

    await expect(postService.addSinglePost({})).rejects.toThrow(
      'UNPROCESSABLE_ERROR'
    )
  })

  it('Throw FORBIDDEN_ERROR if status code is 403.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('FORBIDDEN_ERROR'), {
      status: 403,
      statusText: '403',
    })

    await expect(postService.addSinglePost({})).rejects.toThrow(
      'FORBIDDEN_ERROR'
    )
  })

  it('Throw UNAUTHORIZED_ERROR if status code is 401.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('UNAUTHORIZED_ERROR'), {
      status: 401,
      statusText: '401',
    })

    await expect(postService.addSinglePost({})).rejects.toThrow(
      'UNAUTHORIZED_ERROR'
    )
  })
})

describe('deleteSinglePosts', () => {
  it('Throw nothing if success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200,
      statusText: '200',
    })

    await expect(postService.deleteSinglePost('slug')).resolves.not.toThrow()
  })

  it('Throw NOT_FOUND_ERROR if post not available (404 not found).', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 404,
      statusText: '404',
    })

    await expect(postService.deleteSinglePost('not-found')).rejects.toThrow(
      'NOT_FOUND_ERROR'
    )
  })

  it('Throw INTERNAL_SERVER_ERROR if status code is 500.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('INTERNAL_SERVER_ERROR'), {
      status: 500,
      statusText: '500',
    })

    await expect(postService.deleteSinglePost('test')).rejects.toThrow(
      'INTERNAL_SERVER_ERROR'
    )
  })

  it('Throw CONN_ERROR exception if there is connection error.', async () => {
    fetchMock.mockRejectOnce()

    await expect(postService.deleteSinglePost('test')).rejects.toThrow(
      'CONN_ERROR'
    )
  })

  it('Throw FORBIDDEN_ERROR if status code is 403.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('FORBIDDEN_ERROR'), {
      status: 403,
      statusText: '403',
    })

    await expect(postService.deleteSinglePost('test')).rejects.toThrow(
      'FORBIDDEN_ERROR'
    )
  })

  it('Throw UNAUTHORIZED_ERROR if status code is 401.', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('UNAUTHORIZED_ERROR'), {
      status: 401,
      statusText: '401',
    })

    await expect(postService.deleteSinglePost('test')).rejects.toThrow(
      'UNAUTHORIZED_ERROR'
    )
  })
})
