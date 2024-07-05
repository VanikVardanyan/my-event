import React from 'react'

import useStyles from './styles'
import { IProgressBarProps } from './types'
import { useTranslations } from 'next-intl'

export const ProgressBar = (props: IProgressBarProps) => {
  const { classes } = useStyles()
  const t = useTranslations('Shared')

  const { currentStep, totalStep } = props

  const fillWidth = (currentStep / totalStep) * 100

  return (
    <div className={classes.root}>
      <div className={classes.description}>
        <div className={classes.step}>{t('step')}</div>
        <div>
          <span className={classes.current}>{currentStep}</span>
          <span className={classes.total}> / {totalStep}</span>
        </div>
      </div>
      <div className={classes.progressBar}>
        <div className={classes.fill} style={{ width: `${fillWidth}%` }} />
      </div>
    </div>
  )
}

export default ProgressBar
