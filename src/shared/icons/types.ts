import { CSSProperties, SVGProps } from 'react'

export interface IIcons extends Omit<SVGProps<SVGSVGElement>, 'style' | 'fill'> {
  fill?: string
  fillBg?: string
  style?: CSSProperties
}
