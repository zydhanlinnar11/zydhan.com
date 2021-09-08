interface PostOptionalAttributes {
  description?: string
  slug?: string
  author?: string
  markdown?: string
  coverUrl?: string
}

class Post {
  public title: string
  public dateISOFormatString: string
  public coverFileName: string
  public URL: string
  public postOptionalAttributes?: PostOptionalAttributes

  constructor(
    title: string,
    dateISOFormatString: string,
    coverFileName: string,
    postOptionalAttributes?: PostOptionalAttributes
  ) {
    this.title = title
    this.dateISOFormatString = dateISOFormatString
    this.coverFileName = coverFileName
    this.postOptionalAttributes = postOptionalAttributes
    this.URL = `/post/${this.postOptionalAttributes?.slug}`
  }
}

export default Post
