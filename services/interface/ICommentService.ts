import Comment from '@blog-models/Comment'

export default interface ICommentService {
  /**
   * Get all comments from API.
   *
   * @param slug - Post slug
   * @returns All comments from API
   *
   * @public
   */
  getAllCommentsByPostSlug(slug: string): Promise<Comment[]>

  /**
   * Add comment to a post.
   *
   * @param slug - Post slug
   * @param content - Comment content
   *
   * @returns comment id
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
  addComment(slug: string, content: string): Promise<Comment>

  /**
   * Delete comment.
   *
   * @param id - comment id
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
  deleteComment(id: string): Promise<void>

  /**
   * Edit comment.
   *
   * @param id - Comment id
   * @param content - Comment content
   *
   * @returns new comment
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
  editComment(id: string, content: string): Promise<Comment>
}
