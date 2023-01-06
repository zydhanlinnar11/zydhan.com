import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { config as webConfig } from '@/common/config'

export const config = {
  runtime: 'experimental-edge',
}

const generateImage = (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const author = searchParams.get('author')
  const date = searchParams.get('date')
  const description = searchParams.get('description')
  const title = searchParams.get('title')

  if (typeof author !== 'string') {
    return new Response(JSON.stringify({ message: 'Invalid author' }))
  }

  if (typeof date !== 'string') {
    return new Response(JSON.stringify({ message: 'Invalid date' }))
  }

  if (typeof description !== 'string') {
    return new Response(JSON.stringify({ message: 'Invalid description' }))
  }

  if (typeof title !== 'string') {
    return new Response(JSON.stringify({ message: 'Invalid title' }))
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '48px',
            textAlign: 'center',
            padding: '0 64px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '128px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              marginTop: '48px',
            }}
          >
            <img
              width="128"
              height="128"
              src={`https://github.com/zydhanlinnar11.png`}
              style={{
                borderRadius: 128,
              }}
            />
          </div>
          <p
            style={{
              marginTop: '32px',
              fontSize: '60px',
              fontWeight: '500',
              marginBottom: '0',
            }}
          >
            {title}
          </p>
          <p
            style={{
              marginTop: '24px',
              fontSize: '30px',
              color: 'rgb(156, 163, 175)',
            }}
          >
            {description}
          </p>
        </div>
        <div
          style={{
            width: '100%',
            height: '60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: '560px',
              height: '32px',
              display: 'flex',
              padding: '0 64px',
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '32px',
                display: 'flex',
              }}
            >
              <p>{author}</p>
            </div>
            <div
              style={{
                width: '100%',
                height: '32px',
                display: 'flex',
              }}
            >
              <p>{date}</p>
            </div>
            <div
              style={{
                width: '100%',
                height: '32px',
                display: 'flex',
              }}
            >
              <p>{webConfig.frontendUrl}/blog</p>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'rgb(14, 165, 233)',
              width: '100%',
              height: '12px',
              display: 'flex',
              flexDirection: 'column',
            }}
          ></div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

export default generateImage
