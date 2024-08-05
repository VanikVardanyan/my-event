import React from 'react'

import useStyles from './styles'
import { IProgressBarProps } from './types'

export const ProgressLine = (props: IProgressBarProps) => {
  const { classes } = useStyles()

  const { fillWidth } = props

  return (
    <div className={classes.progressBar}>
      <div className={classes.fill} style={{ width: `${fillWidth}%` }} />
    </div>
  )
}
