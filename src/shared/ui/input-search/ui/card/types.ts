import { IChannelItem } from '@/store/features/channels-slice/types'

export interface ICardProps extends IChannelItem {
  channelClickHandler: (userName: string) => () => void
}
