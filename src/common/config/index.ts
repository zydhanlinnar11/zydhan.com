const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.zydhan.xyz',
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://zydhan.xyz'
      : 'https://dev.zydhan.xyz',
  githubToken: process.env.GITHUB_API_TOKEN,
}

export default config
