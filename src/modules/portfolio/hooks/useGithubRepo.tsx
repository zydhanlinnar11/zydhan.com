import useSWR from 'swr'
import GithubRepo from '../types/GithubRepo'

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const useGithubRepo = (user: string, sort = 'updated', per_page = 5) => {
  const { data, error, isLoading } = useSWR<GithubRepo[]>(
    `https://api.github.com/users/${user}/repos?sort=${sort}&per_page=${per_page}`,
    fetcher
  )

  return {
    repositories: data,
    isLoading,
    isError: error,
  }
}

export default useGithubRepo
