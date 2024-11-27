import { GreyBase } from '../consts/colors'
import { IIcons } from './types'

const AmdIcon = (props: IIcons) => {
  const { style, fill = GreyBase } = props
  const defaultStyle = { width: 18, height: 18 }

  return (
    <svg style={{ ...defaultStyle, ...style }} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.66663 6.66669C2.66663 5.60582 3.08805 4.58841 3.8382 3.83826C4.58834 3.08811 5.60576 2.66669 6.66663 2.66669C7.72749 2.66669 8.74491 3.08811 9.49505 3.83826C10.2452 4.58841 10.6666 5.60582 10.6666 6.66669V13.3334M7.99996 10.6667H13.3333M7.99996 8.00002H13.3333"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default AmdIcon
