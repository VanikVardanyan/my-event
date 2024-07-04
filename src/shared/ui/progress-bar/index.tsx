import React from 'react'

import useStyles from './styles'
import { IProgressBarProps } from './types'

export const ProgressBar = (props: IProgressBarProps) => {
  const { classes } = useStyles()
  const { currentStep, totalStep } = props

  const fillWidth = (currentStep / totalStep) * 100

  return (
    <div className={classes.root}>
      <div className={classes.description}>
        <div className={classes.step}>шаг</div>
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
