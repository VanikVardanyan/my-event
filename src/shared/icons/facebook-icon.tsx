import { GreyBase } from '../consts/colors'
import { IIcons } from './types'

const FacebookIcon = (props: IIcons) => {
  const { style, fill = GreyBase } = props
  const defaultStyle = { width: 18, height: 18 }

  return (
    <svg style={{ ...style, ...defaultStyle }} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.2558 1.21324H4.14464C2.8002 1.21324 1.7002 2.31324 1.7002 3.65769V20.7688C1.7002 22.1145 2.8002 23.2132 4.14464 23.2132H12.7002V14.6577H10.2558V11.6327H12.7002V9.12713C12.7002 6.48224 14.1815 4.62446 17.3031 4.62446L19.5068 4.62691V7.8108H18.0438C16.8289 7.8108 16.3669 8.72257 16.3669 9.56835V11.6339H19.5055L18.8113 14.6577H16.3669V23.2132H21.2558C22.6002 23.2132 23.7002 22.1145 23.7002 20.7688V3.65769C23.7002 2.31324 22.6002 1.21324 21.2558 1.21324Z"
        fill={fill}
      />
    </svg>
  )
}

export default FacebookIcon
