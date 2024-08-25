import { Link } from '../../../../../navigation'
import useStyles from './styles'

interface ILink {
  title: string
  link: string
  isDisabled?: boolean
}

interface IFooterLinksProps {
  title: string
  links: ILink[]
}

export const FooterLinks = (props: IFooterLinksProps) => {
  const { classes } = useStyles()
  const { title, links } = props

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.linksWrapper}>
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.isDisabled ? '#' : link.link}
              className={classes.link}
              rel="nofollow noopener noreferrer"
            >
              {link.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
