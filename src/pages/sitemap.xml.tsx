import { getMetadataAllPosts } from '@/blog/lib/api'
import { PostMetadata } from '@/blog/types/PostMetadata'
import { config } from '@/common/config'
import { GetServerSideProps } from 'next'

function generateSiteMap(posts: PostMetadata[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://zydhan.com</loc>
     </url>
     <url>
       <loc>https://zydhan.com/guestbook</loc>
     </url>
     <url>
       <loc>https://zydhan.com/blog/posts</loc>
     </url>
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${config.frontendUrl}/blog/posts/${slug}`}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getMetadataAllPosts()
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default SiteMap
