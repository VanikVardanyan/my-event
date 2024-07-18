import { GreyBase } from '../consts/colors'
import { IIcons } from './types'

const AmdIcon = (props: IIcons) => {
  const { style, fill = GreyBase } = props
  const defaultStyle = { width: 18, height: 18 }

  return (
    <svg
      fill={fill}
      style={{ ...defaultStyle, ...style }}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 440 440"
    >
      <path
        d="M351.33,231.808v-30h-35v-87.932C316.33,51.084,265.266,0,202.5,0S88.67,51.084,88.67,113.876h30
	C118.67,67.627,156.276,30,202.5,30s83.83,37.627,83.83,83.876v87.932H202.5v30h83.83v40H202.5v30h83.83V440h30V301.808h35v-30h-35
	v-40H351.33z"
      />
    </svg>
  )
}

export default AmdIcon
