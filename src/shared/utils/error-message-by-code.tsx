export const enum HTTPResponseStatusCodes {
  SERVER_ERROR_500 = '500',
  CLIENT_ERROR_404 = '404',
  CLIENT_ERROR_401 = '401',
  CLIENT_ERROR_400 = '400',
  OK_200 = '200',
  CREATED_201 = '201',
}

export const getErrorMessageByCode = (code: HTTPResponseStatusCodes) => {
  switch (code) {
    case HTTPResponseStatusCodes.SERVER_ERROR_500:
      return `${code} Internal Server Error`
    case HTTPResponseStatusCodes.CLIENT_ERROR_404:
      return `${code} Request is invalid`
    default:
      return `${code} Unexpected error`
  }
}
