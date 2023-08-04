import { RecentRepositoriesClient } from './RecentRepositoriesClient'

export type GithubRepo = {
  name: string
  description: string | null
  updated_at: string
  html_url: string
  topics: string[]
}

export const githubUsername = 'zydhanlinnar11'

export const RecentRepositories = async () => {
  const response = await fetch(
    `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`
  )
  const data: GithubRepo[] = await response.json()

  return <RecentRepositoriesClient repositories={data} />
}
