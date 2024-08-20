import { IRespondents, ISelection } from '../../../create/types'

export interface IRespondentsList {
  respondents: IRespondents[] | []
  updateRespondents: (serviceId: string, newSelections: IRespondents[] | []) => void
  serviceId: string
}
