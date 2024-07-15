import { GreyBase } from '../consts/colors'
import { IIcons } from './types'

const PhoneIcon = (props: IIcons) => {
  const { style, fill = GreyBase } = props
  const defaultStyle = { width: 18, height: 18 }

  return (
    <svg style={{ ...style, ...defaultStyle }} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.92444 11.152C7.68444 14.6109 10.52 17.4342 13.9789 19.2064L16.6678 16.5176C16.9978 16.1876 17.4867 16.0776 17.9144 16.2242C19.2833 16.6764 20.7622 16.9209 22.2778 16.9209C22.95 16.9209 23.5 17.4709 23.5 18.1431V22.4087C23.5 23.0809 22.95 23.6309 22.2778 23.6309C10.8011 23.6309 1.5 14.3298 1.5 2.85311C1.5 2.18089 2.05 1.63089 2.72222 1.63089H7C7.67222 1.63089 8.22222 2.18089 8.22222 2.85311C8.22222 4.38089 8.46667 5.84756 8.91889 7.21645C9.05333 7.64422 8.95556 8.12089 8.61333 8.46311L5.92444 11.152Z"
        fill={fill}
      />
    </svg>
  )
}

export default PhoneIcon
