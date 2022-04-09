const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'https://api.zydhan.com',
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://zydhan.com'
      : 'https://zydhan.dev',
}

export default config
