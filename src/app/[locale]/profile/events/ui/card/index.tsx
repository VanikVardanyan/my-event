'use client'

import { useTranslations } from 'next-intl'
import { useStyles } from './styles'
import { IEventCard } from './types'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import { IconButton } from '@mui/material'
import cn from 'classnames'
import EventIcon from '@mui/icons-material/EventOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export const ProfessionCard = ({ title, eventType, status, createDate, time }: IEventCard) => {
  const { classes } = useStyles()
  const t = useTranslations()

  return (
    <div className={classes.root}>
      <div className={cn(classes.professionSection)}>
        <div>
          <div className={classes.title}>{title}</div>
          <div className={classes.textGrey}>{t(eventType)}</div>
        </div>
        <div>
          <IconButton>
            <ZoomInMapIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.section}>
        <div>
          <div className={cn(classes.textGrey, classes.date)}>
            Ամսաթիվ <EventIcon />
          </div>
          <div>{createDate}</div>
        </div>
        <div>
          <div className={cn(classes.textGrey, classes.date)}>
            Ժամը <AccessTimeIcon />
          </div>
          <div>{time}</div>
        </div>
      </div>
      <div className={cn(classes.status, classes[status])}>{t(`status_event_${status}`)}</div>
    </div>
  )
}
