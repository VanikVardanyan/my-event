import Image from 'next/image'

import useStyles from './styles'
import { ICardProps } from './types'

export const Card = (props: ICardProps) => {
  const { classes } = useStyles()
  const { username, subscribers, channelClickHandler } = props

  return (
    <div className={classes.root} onClick={channelClickHandler(username)}>
      <div>
        {/* TODO: waiting Image from back */}
        <Image src="/avatar.jpg" alt="avatar" width={36} height={36} className={classes.avatar} />
      </div>
      <div>
        <div className={classes.userName}>{username}</div>
        <div className={classes.subscriber}>
          {/* <PeopleIcon style={{ width: 15, height: 15 }} fill={SlateGreyLighten10} />  */}
          {subscribers}
        </div>
      </div>
    </div>
  )
}
