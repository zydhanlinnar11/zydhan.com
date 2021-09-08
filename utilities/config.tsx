interface BlogOptionalConfig {
  customRightFooterText?: string
  customHomeHeaderTitle?: string
}

class BlogConfig {
  private blogName: string
  private blogOptionalConfig: BlogOptionalConfig
  private titleBoxDefaultBackground: string

  constructor(
    blogName: string,
    titleBoxDefaultBackground: string,
    blogOptionalConfig: BlogOptionalConfig = {}
  ) {
    this.blogName = blogName
    this.blogOptionalConfig = blogOptionalConfig
    this.titleBoxDefaultBackground = titleBoxDefaultBackground
  }

  getBlogName(): string {
    return this.blogName
  }

  getRightFooterText(): string {
    if (this.blogOptionalConfig.customRightFooterText)
      return this.blogOptionalConfig.customRightFooterText
    return 'Created with React'
  }

  getHomeHeaderTitle(): string {
    if (this.blogOptionalConfig.customHomeHeaderTitle)
      return this.blogOptionalConfig.customHomeHeaderTitle
    return this.getBlogName()
  }

  getTitleBoxDefaultBackground(): string {
    return this.titleBoxDefaultBackground
  }
}

const blogConfig = new BlogConfig("Zydhan's Blog", '/images/title-bg.webp', {
  customHomeHeaderTitle: "Welcome to Zydhan's Blog",
})

export default blogConfig
