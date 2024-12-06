import { EventTypes } from '@/shared/types/user.types'

export enum ResumeStatus {
  Pending = 'pending',
  Approve = 'approve',
  Cancel = 'cancel',
}

export interface IEventCard {
  eventType: EventTypes
  title: string
  createDate: string
  status: ResumeStatus
  time: string
  id: string
}
