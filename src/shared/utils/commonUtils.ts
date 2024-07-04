import getNumWithSpaces from 'prettify-numbers'

import { DelimitersType } from '@/shared/types/common'

export const getNumWithDelimiter = (value: string | number, delimiter?: DelimitersType) => {
  return value ? (delimiter ? getNumWithSpaces(value, ...delimiter) : getNumWithSpaces(value)) : value
}
