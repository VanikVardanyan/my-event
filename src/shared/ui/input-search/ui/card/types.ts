export interface ICardProps {
  channelClickHandler: (userName: string) => () => void
  username: string
  subscribers: string
}
