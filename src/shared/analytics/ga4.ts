import { SyntheticEvent } from 'react'
import { IGA4EventProps } from './types'
const isProduction = process.env.NODE_ENV === 'production'

export const sendGA4Event = (props: IGA4EventProps) => {
  const winw = window as any

  if (isProduction && winw?.gtag) {
    winw.gtag('event', props.action, {
      ...props,
      send_to: process.env.NEXT_PUBLIC_GA4_ID,
    })
  }
}

export const onSendGA4Event = (props: IGA4EventProps) => {
  return (event?: SyntheticEvent) => {
    event?.stopPropagation()

    sendGA4Event(props)
  }
}
