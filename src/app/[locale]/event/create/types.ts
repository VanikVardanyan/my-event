export interface IRequestTypes {
  title: string
  type: string
  city: string
  date: string
  location: string
  personQuantity: number
  services: IServices[]
  other?: string
}

export interface IServices {
  service: string
  amount: string
  status: ServiceSearchStatus
  id: string
  selections: ISelection[]
  respondents: IRespondents[]
}

export interface ISelection {
  isInstagram?: boolean
  id: string
  avatar?: string
  name: string
  userName?: string
}

export interface IRespondents {
  userId: string
  avatar?: string
  userName: string
  isApprove: boolean
}

export enum ServiceSearchStatus {
  Todo = 'todo',
  Done = 'done',
  Doing = 'doing',
}
