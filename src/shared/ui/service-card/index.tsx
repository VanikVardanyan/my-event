import { Routes } from '../../routes'
import useStyles from './styles'
import { Link } from '@/navigation'
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
      <Button btn_size={BUTTON_SIZE.SMALL} fullWidth LinkComponent={Link} href={link}>
        Իմանալ ավելին
      </Button>
    </div>
  )
}
