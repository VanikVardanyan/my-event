import { useTranslations } from 'next-intl'
import useStyles from './styles'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

interface IWorkCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export const WorkCard = (props: IWorkCardProps) => {
  const { title, description, icon } = props
  const t = useTranslations('Main')

  const { classes } = useStyles()
  return (
    <div className={classes.root}>
      <div>{icon}</div>
      <h4 className={classes.title}>{t(title)}</h4>
      <div className={classes.description}>{t(description)}</div>
    </div>
  )
}
