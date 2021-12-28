import BlogConfig from '@blog-config/BlogConfig'
import Post from '@blog-models/Post'
import { GetServerSideProps } from 'next'

function generateSiteMap(posts: Post[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BlogConfig.BLOG_DOMAIN}</loc>
     </url>
     ${posts
       .map(({ slug, updatedAt }) => {
         return `
       <url>
           <loc>${`${BlogConfig.BLOG_DOMAIN}/post/${slug}`}</loc>
           <lastmod>${updatedAt}</lastmod>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await BlogConfig.POST_SERVICE.getAllPosts()
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
