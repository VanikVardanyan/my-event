import Image from 'next/image'
import { Routes } from '../../routes'
import { Professions } from '../../types/user.types'
import useStyles from './styles'
import { Link } from '../../../navigation'
import { useTranslations } from 'next-intl'
import { BUTTON_SIZE, PinkButton } from '../button'

interface IServiceProps {
  name: string
  description: string
  image: string
  link: Routes
}

export const ServiceCard = (props: IServiceProps) => {
  const { name, description, image, link } = props
  const { classes } = useStyles()
  const professions = useTranslations('Professions')
  const mainT = useTranslations('Main')

  return (
    <div className={classes.root}>
      <div className={classes.img} style={{ backgroundImage: `url(${image})` }}></div>
      <div className={classes.info}>
        <div className={classes.title}>{name}</div>
        <div className={classes.description}>{description}</div>
      </div>
      <PinkButton btn_size={BUTTON_SIZE.SMALL} fullWidth>
        Իմանալ ավելին
      </PinkButton>
    </div>
  )
}
