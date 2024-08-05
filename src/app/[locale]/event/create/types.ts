export enum ServiceSearchStatus {
  Todo = 'todo',
  Done = 'done',
  Doing = 'doing',
}

export interface IServices {
  service: string
  amount: string
  status: ServiceSearchStatus
  id: string
}

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
