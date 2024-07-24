import Image from 'next/image'

import useStyles from './styles'
import { ICardProps } from './types'

export const Card = (props: ICardProps) => {
  const { classes } = useStyles()
  const { name, avatar, channelClickHandler, id, isInstagram } = props

  return (
    <div className={classes.root} onClick={channelClickHandler(id, isInstagram)}>
      <div>
        <Image src={avatar || '/default.jpg'} alt="avatar" width={36} height={36} className={classes.avatar} />
      </div>
      <div>
        <div className={classes.userName}>{name}</div>
      </div>
    </div>
  )
}
