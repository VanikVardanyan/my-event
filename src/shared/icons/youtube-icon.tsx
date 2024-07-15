import { GreyBase } from '../consts/colors'
import { IIcons } from './types'

const YoutubeIcon = (props: IIcons) => {
  const { style, fill = GreyBase } = props
  const defaultStyle = { width: 18, height: 18 }

  return (
    <svg style={{ ...style, ...defaultStyle }} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_229_268)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5 3.01324C13.4405 3.01324 14.4052 3.03799 15.3402 3.07849L16.4446 3.13249L17.5017 3.19662L18.4917 3.26524L19.3959 3.33724C20.3773 3.41362 21.3009 3.84173 22.004 4.54617C22.707 5.25061 23.1445 6.18619 23.2393 7.18812L23.2833 7.66624L23.3658 8.68999C23.4428 9.75087 23.5 10.9074 23.5 12.0132C23.5 13.1191 23.4428 14.2756 23.3658 15.3365L23.2833 16.3602L23.2393 16.8384C23.1445 17.8405 22.7068 18.7762 22.0035 19.4807C21.3002 20.1851 20.3764 20.6131 19.3948 20.6892L18.4928 20.7601L17.5028 20.8299L16.4446 20.894L15.3402 20.948C14.394 20.9899 13.4471 21.0117 12.5 21.0132C11.5529 21.0117 10.606 20.9899 9.6598 20.948L8.5554 20.894L7.4983 20.8299L6.5083 20.7601L5.6041 20.6892C4.62269 20.6129 3.69912 20.1848 2.99605 19.4803C2.29298 18.7759 1.85551 17.8403 1.7607 16.8384L1.7167 16.3602L1.6342 15.3365C1.55042 14.2308 1.50565 13.1223 1.5 12.0132C1.5 10.9074 1.5572 9.75087 1.6342 8.68999L1.7167 7.66624L1.7607 7.18812C1.85547 6.18637 2.29278 5.25093 2.99563 4.54651C3.69848 3.8421 4.62179 3.41388 5.603 3.33724L6.5061 3.26524L7.4961 3.19662L8.5543 3.13249L9.6587 3.07849C10.6053 3.03656 11.5526 3.01481 12.5 3.01324ZM10.3 9.28512V14.7414C10.3 15.2611 10.85 15.5851 11.29 15.3264L15.91 12.5982C16.0105 12.5391 16.094 12.4538 16.1521 12.3511C16.2102 12.2484 16.2407 12.1319 16.2407 12.0132C16.2407 11.8946 16.2102 11.7781 16.1521 11.6754C16.094 11.5727 16.0105 11.4874 15.91 11.4282L11.29 8.70124C11.1896 8.64198 11.0758 8.61079 10.9599 8.61081C10.844 8.61083 10.7302 8.64206 10.6298 8.70135C10.5295 8.76065 10.4462 8.84592 10.3883 8.94859C10.3304 9.05127 10.2999 9.16772 10.3 9.28624V9.28512Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_229_268">
          <rect width="24" height="24" fill="white" transform="translate(0.5 0.0132446)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default YoutubeIcon
