import Image from 'next/image'
import { Routes } from '../../routes'
import { Professions } from '../../types/user.types'
import useStyles from './styles'
import { Link } from '../../../navigation'
import { useTranslations } from 'next-intl'

interface IServiceProps {
  name: Professions
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
    <Link href={link} className={classes.root}>
      <div className={classes.img} style={{ backgroundImage: `url(${image})` }}></div>
      <div className={classes.info}>
        <h4 className={classes.title}>{professions(name)}</h4>
        <div className={classes.description}>{mainT(description)}</div>
      </div>
    </Link>
  )
}
