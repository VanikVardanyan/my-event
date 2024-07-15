import { IClientState } from './features/client-slice/types'
import { IProfileState } from './features/profile-slice/types'

export default interface IApplicationState {
  profile: IProfileState
  client: IClientState
}
