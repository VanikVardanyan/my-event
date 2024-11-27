import Image from 'next/image'
import { CardProps } from './types'
import useStyles from './styles'
import { IService } from '../../../../../shared/utils/main-helper'
import { Button, BUTTON_SIZE } from '../../../../../shared/ui/button'
import { Link } from '../../../../../navigation'

export const Card = (props: IService) => {
  const { image, name, description, link } = props
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
      <div className={classes.titleWrapper}>
        <div className={classes.title}>{name}</div>
        <div className={classes.title}>{description}</div>
      </div>
      <Button btn_size={BUTTON_SIZE.SMALL} fullWidth LinkComponent={Link} href={link}>
        Իմանալ ավելին
      </Button>
    </div>
  )
}
