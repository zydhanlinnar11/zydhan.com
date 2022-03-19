import getBaseURL from '@/common/utils/GetBaseUrl'
import { GetServerSideProps } from 'next'

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_API_URL}/blog/posts`

export type Post = {
  title: string
  cover_url: string
  slug: string
  created_at: string
}

function generateSiteMap(posts: Post[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://zydhan.xyz</loc>
     </url>
     <url>
       <loc>https://zydhan.xyz/blog</loc>
     </url>
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${getBaseURL()}/blog/posts/${slug}`}</loc>
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
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL)
  const posts = await request.json()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
