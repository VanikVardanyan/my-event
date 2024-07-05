import { useTranslations } from 'next-intl'
import useStyles from './styles'

export const Empty = () => {
  const { classes } = useStyles()
  const t = useTranslations('Shared')

  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        <h5 className={classes.title}>{t('oops')}</h5>
        <div className={classes.description}>{t('something_went_wrong')}</div>
      </div>
    </div>
  )
}
