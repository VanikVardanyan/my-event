import Image from 'next/image'
import { Routes } from '../../routes'
import { Professions } from '../../types/user.types'
import useStyles from './styles'
import { Link } from '../../../navigation'

interface IServiceProps {
  name: Professions
  description: string
  image: string
  link: Routes
}

export const ServiceCard = (props: IServiceProps) => {
  const { name, description, image, link } = props
  const { classes } = useStyles()

  return (
    <Link href={link} className={classes.root}>
      <Image src={image} alt={name} width={200} height={200} className={classes.img} />
      <h3>{name}</h3>
      <p>{description}</p>
      <a href={link}>Learn more</a>
    </Link>
  )
}
