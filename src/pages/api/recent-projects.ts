import RecentProject from '@/modules/portfolio/types/RecentProject'
import axios, { AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await axios.get<
    any,
    AxiosResponse<RecentProject[], any>,
    any
  >('https://api.github.com/users/zydhanlinnar11/repos?sort=update&per_page=5')
  if (!response.data) {
    res.status(500).json(null)
    return
  }
  const data: RecentProject[] = []
  response.data.forEach((project) => {
    const { description, name, updated_at, html_url, topics } = project
    data.push({
      description,
      name,
      updated_at: new Date(updated_at).toLocaleDateString('id-ID', {
        timeZone: 'Asia/Jakarta',
      }),
      html_url,
      topics,
    })
  })
  res.status(200).json(data)
}
