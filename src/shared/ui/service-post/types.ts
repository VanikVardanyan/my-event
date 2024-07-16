import { Professions } from '../../types/user.types'

export interface IPostProps {
  avatar: string
  name: string
  images: string[]
  description?: string
  profession: Professions[]
  id: string
  likeCount: number
  isFavorite?: boolean
  fetchProviderUsers?: () => void
}
