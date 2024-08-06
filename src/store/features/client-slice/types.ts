import { IRequestTypes } from '@/shared/ui/request-card/types'

interface IFavorites {
  instagram: string[] | []
  direct: string[] | []
}
export interface IRequestTypesWithId extends IRequestTypes {
  id: string
  profileId: string
  isInstagram?: boolean
  profileName: string
}

export interface IClientState {
  favorites: IFavorites
  events: IRequestTypesWithId[] | []
}
