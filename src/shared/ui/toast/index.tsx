'use client'

import React, { useMemo } from 'react'
import cn from 'classnames'

import { GreenDarken22, RedDarken4, YellowDarken20 } from '../../consts/colors'
// import { CheckIcon, CrossIcon, NoticeIcon } from '../../icons'
import useStyles from './styles'
import { IToastSMBProps, TOAST_VARIANT } from './types'

export const Toast = (props: IToastSMBProps) => {
  const { variant = TOAST_VARIANT.success, content, closeButtonText, onClose, extraButton } = props

  const { classes } = useStyles({ ...props })

  const onCloseHandler = () => {
    onClose()
  }

  // const renderIcon = useMemo(() => {
  //   switch (variant) {
  //     case TOAST_VARIANT.success:
  //       return <CheckIcon fill={GreenDarken22} />
  //     case TOAST_VARIANT.warning:
  //       return <CrossIcon fill={RedDarken4} />
  //     case TOAST_VARIANT.info:
  //       return <NoticeIcon fill={YellowDarken20} />
  //   }
  // }, [variant])

  return (
    <div className={cn(classes.root, classes[variant])}>
      <div className={classes.inner}>
        <div className={classes.iconWrapper}>{/* <div className={classes.icon}>{renderIcon}</div> */}</div>
        <div className={classes.content}>
          <div className={classes.text}>{content}</div>
          {closeButtonText && (
            <div className={classes.button} onClick={onCloseHandler}>
              {closeButtonText}
            </div>
          )}
        </div>
      </div>
      {extraButton && <div className={classes.extra}>{extraButton}</div>}
    </div>
  )
}

export { TOAST_VARIANT }
