import { PROFESSIONS } from '@/shared/types/proffesion.types'

export interface IPostProps {
  avatar: string
  name: string
  images: string[]
  description?: string
  profession: PROFESSIONS[]
  id: string
  likeCount: number
  isFavorite?: boolean
  fetchProviderUsers?: () => void
}
