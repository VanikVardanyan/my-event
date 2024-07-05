import { UserType } from '@/shared/types/user.types'

export interface IUserTypeSelection {
  onSelectUserType: (type: UserType) => () => void
  currentUserType: UserType | ''
}
