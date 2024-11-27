import Image from 'next/image'
import { Routes } from '../../routes'
import { Professions } from '../../types/user.types'
import useStyles from './styles'
import { Link } from '../../../navigation'
import { BUTTON_SIZE, Button } from '../button'

interface IServiceProps {
  name: string
  description: string
  image: string
  link: Routes
}

export const ServiceCard = (props: IServiceProps) => {
  const { name, description, image, link } = props
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.img} style={{ backgroundImage: `url(${image})` }}></div>
      <div className={classes.info}>
        <div className={classes.title}>{name}</div>
        <div className={classes.description}>{description}</div>
      </div>
      <Button btn_size={BUTTON_SIZE.SMALL} fullWidth>
        Իմանալ ավելին
      </Button>
    </div>
  )
}
