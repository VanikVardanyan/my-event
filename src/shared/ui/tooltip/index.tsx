'use client'

import React from 'react'
import ReactTooltip from 'react-tooltip'
import cn from 'classnames'

import useStyles, { tooltipColors } from './styles'
import { ITooltipSMBProps, TOOLTIP_SIZE, TOOLTIP_VARIANT } from './types'

export const Tooltip = (props: ITooltipSMBProps) => {
  const {
    content,
    variant = TOOLTIP_VARIANT.default,
    children,
    place = 'top',
    id,
    effect = 'solid',
    size = TOOLTIP_SIZE.size168,
    className,
    clickable = false,
    delayShow = 0,
    disable = false,
  } = props

  const { classes } = useStyles()

  const getContent = () => content

  const getChildrenWithProps = React.Children.map(children, (child) => {
    let newProps: any = { 'data-for': id, 'data-tip': '' }

    if (clickable) {
      newProps = {
        ...newProps,
        'data-event': 'click',
      }
    }

    if (React.isValidElement(child)) {
      return React.cloneElement(child, newProps)
    }

    return React.createElement('span', newProps, child)
  })

  return (
    <>
      {getChildrenWithProps}
      <ReactTooltip
        id={id}
        place={place}
        effect={effect}
        className={cn(classes.root, classes[variant], classes.opacity, classes[size], className)}
        getContent={getContent}
        arrowColor={tooltipColors[variant]}
        backgroundColor={tooltipColors[variant]}
        {...(clickable ? { globalEventOff: 'click' } : {})}
        clickable={clickable}
        delayShow={delayShow}
        disable={disable}
      />
    </>
  )
}
