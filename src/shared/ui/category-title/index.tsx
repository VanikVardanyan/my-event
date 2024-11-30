import { useTranslations } from 'next-intl'
import useStyles from './styles'

export const CategoryTitle = (props: { title: string }) => {
  const { classes } = useStyles()
  const t = useTranslations()

  return (
    <div className={classes.titleWrapper}>
      <div className={classes.titleBorder} />
      <h3 className={classes.title}>{t(props.title)}</h3>
    </div>
  )
}
