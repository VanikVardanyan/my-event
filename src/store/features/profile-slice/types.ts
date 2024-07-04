export interface IProfile {
  name: string
  role: string
  profession?: string[] | [] | null
  nickname?: string | null
  avatar?: string | null
  facebook?: string | null
  instagram?: string | null
  youtube?: string | null
  tiktok?: string | null
  phone?: string | null
  email?: string | null
  description?: string | null
  images?: string[] | [] | null
}

export interface IProfileState {
  profile: IProfile | null
  loading: boolean
  userId: null | string
}
