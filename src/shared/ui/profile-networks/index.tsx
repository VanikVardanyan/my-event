import { Link } from '@/navigation'
import useStyles from './styles'
import { INetworksProps } from './types'

export const Networks = (props: INetworksProps) => {
  const { links } = props
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      {links.map((item, i) => {
        return (
          <Link href={item.href} key={i}>
            {item.icon}
          </Link>
        )
      })}
    </div>
  )
}
