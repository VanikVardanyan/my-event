import { Professions } from '@/shared/types/user.types'

export enum ResumeStatus {
  Pending = 'pending',
  Approve = 'approve',
  Cancel = 'cancel',
}

export interface IProfessionCard {
  profession: Professions
  category: string
  createDate: string
  status: ResumeStatus
  id: string
}
