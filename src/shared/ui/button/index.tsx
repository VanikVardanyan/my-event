import { Button as ButtonMui, styled } from '@mui/material'
import { PinkBrownBase, PinkBrownDarken16, White } from '../../consts/colors'

export enum BUTTON_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface ButtonProps {
  btn_size?: BUTTON_SIZE
  btn_color?: string
  bg_color?: string
  shadow?: boolean
}

export const buttonSize = {
  [BUTTON_SIZE.SMALL]: '8px 32px',
  [BUTTON_SIZE.MEDIUM]: '22px 48px',
  [BUTTON_SIZE.LARGE]: '30px 64px',
}

export const Button = styled(ButtonMui)<ButtonProps>(
  ({ theme, btn_size, fullWidth, bg_color = PinkBrownBase, btn_color = White, shadow = true }) => ({
    backgroundColor: bg_color,
    color: btn_color,
    maxWidth: fullWidth ? '100%' : 'fit-content',
    borderRadius: btn_size ? 8 : 40,
    boxShadow: shadow ? '3px 4px 10.1px 0px #00000040' : '',
    padding: btn_size ? buttonSize[btn_size] : buttonSize[BUTTON_SIZE.SMALL],

    '&:hover': {
      backgroundColor: bg_color,
    },
  })
)
