interface IFavorites {
  instagram: string[] | []
  direct: string[] | []
}

export interface IClientState {
  favorites: IFavorites
}
