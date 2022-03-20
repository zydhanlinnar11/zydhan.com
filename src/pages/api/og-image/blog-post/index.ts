import { NextApiRequest, NextApiResponse } from 'next'
import chromium from 'chrome-aws-lambda'
import config from '@/common/config'
import db from '@/common/utils/db'

type BlogOpengraph = {
  data: string
  date: string
  description: string
  title: string
  url: string
  userName: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const title = req.query.title
  const description = req.query.description
  const date = req.query.date
  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof date !== 'string'
  ) {
    res.status(400).json({ message: 'Not found' })
    return
  }

  const entries = await db
    .collection('blog_opengraphs')
    .where('title', '==', title)
    .where('description', '==', description)
    .where('date', '==', date)
    .limit(1)
    .get()

  const entriesData = entries.docs.map((entry) => entry.data() as BlogOpengraph)

  if (entriesData.length !== 0) {
    const data = entriesData[0].data
    const img = Buffer.from(
      data.replace('data:image/png;base64,', ''),
      'base64'
    )
    res
      .setHeader('Content-Type', 'image/png')
      .setHeader('Content-Length', img.length)
      .setHeader(
        'Cache-Control',
        `immutable, no-transform, s-max-age=2592000, max-age=2592000`
      )
      .send(img)
    return
  }

  try {
    const image = await generateImage(title, description, date)
    if (!(image instanceof Buffer)) throw new Error('image is not a buffer')
    res
      .setHeader('Content-Type', 'image/png')
      .setHeader(
        'Cache-Control',
        `immutable, no-transform, s-max-age=2592000, max-age=2592000`
      )
      .send(image)

    const data = 'data:image/png;base64,' + image.toString('base64')
    const cached: BlogOpengraph = {
      data,
      date,
      description,
      title,
      url: config.baseUrl + '/blog',
      userName: 'Zydhan Linnar Putra',
    }
    await db.collection('blog_opengraphs').add(cached)
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal server error' })
  }
}

const generateImage = async (
  title: string,
  description: string,
  date: string
) => {
  const queryString = new URLSearchParams()
  queryString.append('title', title)
  queryString.append('description', description)
  queryString.append('date', date)

  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage()
  await page.goto(
    `${config.baseUrl}/og-image/blog-post?${queryString.toString()}`
  )

  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'))
    await Promise.all([
      document.fonts.ready,
      ...selectors.map((img) => {
        // Image has already finished loading, let’s see if it worked
        if (img.complete) {
          // Image loaded and has presence
          if (img.naturalHeight !== 0) return
          // Image failed, so it has no height
          throw new Error('Image failed to load')
        }
        // Image hasn’t loaded yet, added an event listener to know when it does
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve)
          img.addEventListener('error', reject)
        })
      }),
    ])
  })

  const opengraph = await page.$('#opengraph')
  if (!opengraph) {
    throw Error('cant capture opengraph')
    return
  }

  const image = await opengraph.screenshot({ omitBackground: true })
  await browser.close()

  return image
}
