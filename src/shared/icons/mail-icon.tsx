import { GreyBase } from '../consts/colors'
import { IIcons } from './types'

const PhoneIcon = (props: IIcons) => {
  const { style, fill = GreyBase } = props
  const defaultStyle = { width: 18, height: 18 }

  return (
    <svg style={{ ...style, ...defaultStyle }} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.501 7.535V16.6469C22.501 17.3836 22.2087 18.0924 21.6837 18.6284C21.1587 19.1644 20.4409 19.487 19.677 19.5302L19.501 19.535H5.50098C4.73577 19.535 3.99946 19.2536 3.44272 18.7482C2.88597 18.2428 2.55087 17.5517 2.50598 16.8163L2.50098 16.6469V7.535L11.946 13.5971L12.062 13.6606C12.1987 13.7249 12.3488 13.7584 12.501 13.7584C12.6531 13.7584 12.8033 13.7249 12.94 13.6606L13.056 13.5971L22.501 7.535Z"
        fill={fill}
      />
      <path
        d="M19.1172 4.00001C20.1722 4.00001 21.0972 4.58485 21.613 5.46416L12.2796 12L2.94629 5.46416C3.1912 5.04633 3.52769 4.69607 3.92769 4.44262C4.32768 4.18917 4.77958 4.03988 5.24568 4.00719L5.44202 4.00001H19.1172Z"
        fill={fill}
      />
    </svg>
  )
}

export default PhoneIcon
