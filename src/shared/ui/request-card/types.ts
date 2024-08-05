import { EventTypes } from '@/shared/types/user.types'
import { ServiceSearchStatus } from '../../../app/[locale]/event/create/types'

interface IServices {
  amount: string
  service: string
  status: ServiceSearchStatus
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
