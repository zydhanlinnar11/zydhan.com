import { NextApiRequest, NextApiResponse } from 'next'
import chromium from 'chrome-aws-lambda'
import config from '@/common/config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryString = Object.keys(req.query)
    .map((key) => key + '=' + req.query[key])
    .join('&')

  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage()
  await page.goto(`${config.baseUrl}/og-image/blog-post?${queryString}`)

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
    res.status(500).send({ message: 'Internal server error' })
    return
  }

  const image = await opengraph.screenshot({ omitBackground: true })
  await browser.close()

  res
    .setHeader('Content-Type', 'image/png')
    .setHeader(
      'Cache-Control',
      `immutable, no-transform, s-max-age=2592000, max-age=2592000`
    )
    .send(image)
}
