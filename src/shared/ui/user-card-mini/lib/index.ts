export const decodeUrl = (encodedUrl: string) => {
  return encodedUrl.replace(/\\u0026/g, '&')
}
