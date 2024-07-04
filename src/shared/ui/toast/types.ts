import { ReactNode } from 'react'

export interface IToastSMBProps {
  id?: number | string
  variant?: TOAST_VARIANT
  content: ReactNode | string
  closeButtonText?: string
  onClose: () => void
  duration?: number
  extraButton?: ReactNode
}

export enum TOAST_VARIANT {
  success = 'SUCCESS',
  warning = 'WARNING',
  info = 'INFO',
}
