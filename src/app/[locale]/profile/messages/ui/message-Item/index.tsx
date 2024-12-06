import { Avatar, Chip } from '@mui/material'
import useStyles from './styles'
import cn from 'classnames'

interface IMessageItemProps {
  //   id: string
  //   created_at: string
  message: string
  //   author_id: string
  //   is_read: boolean
  me?: boolean
}

export const MessageItem = (props: IMessageItemProps) => {
  const { message, me } = props
  const { classes } = useStyles()

  return (
    <div className={cn(classes.root, { [classes.rightMessage]: me })}>
      {!me && <Avatar src={'/default.jpg'} />}{' '}
      <div className={cn(classes.message, { [classes.messageMe]: me })}>{message}</div>
      {me && <Avatar src={'/default.jpg'} />}
    </div>
  )
}
