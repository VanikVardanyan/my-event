import { EventTypes } from '@/shared/types/user.types'

interface IServices {
  amount: string
  service: string
}

export interface IRequestTypes {
  service: string
  location: string
  personQuantity: number
  amount: string
  date: string
  city: string
  other?: string
  title: string
  services: IServices[]
  type: EventTypes
}
