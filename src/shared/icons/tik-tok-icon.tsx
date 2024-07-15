import { GreyBase } from '../consts/colors'
import { IIcons } from './types'

const TikTokIcon = (props: IIcons) => {
  const { style, fill = GreyBase } = props
  const defaultStyle = { width: 18, height: 18 }

  return (
    <svg style={{ ...style, ...defaultStyle }} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.3673 4.45991C17.4954 3.50612 17.0149 2.28122 17.0153 1.01324H13.074V16.1688C13.0436 16.9889 12.6822 17.7658 12.066 18.3357C11.4498 18.9057 10.6268 19.2242 9.77041 19.2244C7.95918 19.2244 6.45408 17.8066 6.45408 16.0466C6.45408 13.9444 8.57143 12.3677 10.7526 13.0155V9.15324C6.35204 8.59102 2.5 11.8666 2.5 16.0466C2.5 20.1166 6.02041 23.0132 9.75765 23.0132C13.7628 23.0132 17.0153 19.8966 17.0153 16.0466V8.3588C18.6135 9.45862 20.5324 10.0487 22.5 10.0455V6.2688C22.5 6.2688 20.102 6.3788 18.3673 4.45991Z"
        fill={fill}
      />
    </svg>
  )
}

export default TikTokIcon
