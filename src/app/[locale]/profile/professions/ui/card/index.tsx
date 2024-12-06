'use client'

import { useTranslations } from 'next-intl'
import { useStyles } from './styles'
import { IProfessionCard } from './types'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import { IconButton } from '@mui/material'
import cn from 'classnames'
import EventIcon from '@mui/icons-material/EventOutlined'

export const ProfessionCard = ({ category, profession, status, createDate }: IProfessionCard) => {
  const { classes } = useStyles()
  const t = useTranslations()

  return (
    <div className={classes.root}>
      <div className={cn(classes.professionSection)}>
        <div>
          <div>{t(profession)}</div>
          <div className={classes.textGrey}>{category}</div>
        </div>
        <div>
          <IconButton>
            <ZoomInMapIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.section}>
        <div className={cn(classes.textGrey, classes.date)}>
          Ներբեռնման մսաթիվ <EventIcon />
        </div>
        <div>{createDate}</div>
      </div>
      <div className={cn(classes.status, classes[status])}>{t(`status_${status}`)}</div>
    </div>
  )
}
