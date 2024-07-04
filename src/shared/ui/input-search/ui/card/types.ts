import { IProfile } from '@/store/features/profile-slice/types'
import { UserType } from '../../../../types/user.types'

export interface ICardProps extends IProfile {
  channelClickHandler: (id: string) => () => void
  id: string
  name: string
  role: UserType
}