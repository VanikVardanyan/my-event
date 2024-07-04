export const createQueryParams = (params: Record<string, any>): string => {
  const queryString = Object.keys(params)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&')

  return queryString ? '?' + queryString : ''
}

export const clearPageParams = (slug: string) => (slug ? slug.replace('%40', '') : slug)
