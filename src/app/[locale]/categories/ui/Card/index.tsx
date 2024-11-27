import Image from 'next/image'
import { CardProps } from './types'
import useStyles from './styles'
import { Link } from '../../../../../navigation'

export const Card = (props: CardProps) => {
  const { image, title, link } = props
  const { classes } = useStyles()

  return (
    <Link className={classes.root} href={link}>
      <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
      <div className={classes.title}>{title}</div>
    </Link>
  )
}
