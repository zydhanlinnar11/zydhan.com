import Post from '@blog-models/Post'

export interface EditSinglePostInterface {
  success: boolean
  message?: string
  newSlug?: string
}

export default interface IPostService {
  /**
   * Get all posts from API.
   *
   * @param passCredential - Post slug
   * @returns All posts from API
   *
   * @throws {@link INTERNAL_SERVER_ERROR}
   * This exception is thrown if server return 500 HTTP status code.
   *
   * @throws {@link CONN_ERROR}
   * Thrown if connection to the server failed.
   *
   * @public
   */
  getAllPosts(passCredential?: boolean): Promise<Post[]>

  /**
   * Get single post from API.
   *
   * @param slug - Post slug
   * @param passCredential - Post slug
   *
   * @returns single post from API
   *
   * @throws {@link INTERNAL_SERVER_ERROR}
   * This exception is thrown if server return 500 HTTP status code.
   *
   * @throws {@link NOT_FOUND_ERROR}
   * Thrown if post is not found.
   *
   * @throws {@link CONN_ERROR}
   * Thrown if connection to the server failed.
   *
   * @public
   */
  getSinglePost(slug: string, passCredential?: boolean): Promise<Post>

  /**
   * Edit single post from API.
   *
   * @param slug - Post slug
   * @param submissionBody - Submission body of the post
   *
   * @returns new post slug
   *
   * @throws {@link INTERNAL_SERVER_ERROR}
   * This exception is thrown if server return 500 HTTP status code.
   *
   * @throws {@link NOT_FOUND_ERROR}
   * Thrown if post is not found.
   *
   * @throws {@link FORBIDDEN_ERROR}
   * This exception is thrown if server return 403 HTTP status code.
   *
   * @throws {@link UNAUTHORIZED_ERROR}
   * This exception is thrown if server return 401 HTTP status code.
   *
   * @throws {@link UNPROCESSABLE_ERROR}
   * This exception is thrown if server return 422 HTTP status code.
   *
   * @throws {@link CONN_ERROR}
   * Thrown if connection to the server failed.
   *
   * @public
   */
  editSinglePost(slug: string, submissionBody): Promise<string>

  /**
   * Add single post from API.
   *
   * @param submissionBody - Submission body of the post
   *
   * @returns new post slug
   *
   * @throws {@link INTERNAL_SERVER_ERROR}
   * This exception is thrown if server return 500 HTTP status code.
   *
   * @throws {@link FORBIDDEN_ERROR}
   * This exception is thrown if server return 403 HTTP status code.
   *
   * @throws {@link UNAUTHORIZED_ERROR}
   * This exception is thrown if server return 401 HTTP status code.
   *
   * @throws {@link UNPROCESSABLE_ERROR}
   * This exception is thrown if server return 422 HTTP status code.
   *
   * @throws {@link CONN_ERROR}
   * Thrown if connection to the server failed.
   *
   * @public
   */
  addSinglePost(submissionBody): Promise<string | null>

  /**
   * Delete single post from API.
   *
   * @param slug - Post slug
   *
   * @returns true if success, false if unknown error
   *
   * @throws {@link INTERNAL_SERVER_ERROR}
   * This exception is thrown if server return 500 HTTP status code.
   *
   * @throws {@link NOT_FOUND_ERROR}
   * Thrown if post is not found.
   *
   * @throws {@link FORBIDDEN_ERROR}
   * This exception is thrown if server return 403 HTTP status code.
   *
   * @throws {@link UNAUTHORIZED_ERROR}
   * This exception is thrown if server return 401 HTTP status code.
   *
   * @throws {@link CONN_ERROR}
   * Thrown if connection to the server failed.
   *
   * @public
   */
  deleteSinglePost(slug: string): Promise<void>
}
