import Link from 'next/link'
import useStyles from './styles'
import { INetworksProps } from './types'

export const Networks = (props: INetworksProps) => {
  const { links } = props
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      {links.map((item, i) => {
        return (
          <Link href={item.href} className={classes.link} key={i}>
            {item.icon} {item.name}
          </Link>
        )
      })}
    </div>
  )
}
