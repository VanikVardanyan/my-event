import { ReactNode } from 'react'
import { TooltipProps } from 'react-tooltip'

export interface ITooltipSMBProps extends TooltipProps {
  content: ReactNode | string
  variant?: TOOLTIP_VARIANT
  size?: TOOLTIP_SIZE
  children: ReactNode | string
  id: string
}

export enum TOOLTIP_VARIANT {
  default = 'default',
}

export enum TOOLTIP_SIZE {
  size168 = 'size168',
  size247 = 'size247',
  size312 = 'size312',
  sizeAuto = 'sizeAuto',
}
