export interface IMessage {
  id: string
  created_at: string
  message: string
  author_id: string
  is_read: boolean
}

export interface IMessagesProps {
  messages: IMessage[] | []
  threadId: string
  fetchUserDetails: (isLoading?: boolean) => void
}
