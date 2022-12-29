import { ParsedUrlQuery } from 'querystring'

export const convertQueryToSearchParams = (query: ParsedUrlQuery) => {
  const params = new URLSearchParams()
  for (let key in query) {
    const value = query[key]
    if (typeof value !== 'string') continue
    params.append(key, value)
  }

  return params
}
